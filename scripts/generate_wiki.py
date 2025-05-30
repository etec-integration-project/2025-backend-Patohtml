import os
import json
import subprocess
from pathlib import Path
import requests

class WikiGenerationError(Exception):
    """Error específico para generación de wiki"""
    pass

def run_command(cmd, check=True):
    """Ejecutar comando con mejor manejo de errores"""
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error ejecutando {' '.join(cmd)}")
        print(f"stdout: {result.stdout}")
        print(f"stderr: {result.stderr}")
        raise subprocess.CalledProcessError(result.returncode, cmd)
    return result

def get_default_branch(wiki_url, headers):
    """Determinar la rama por defecto de la wiki"""
    try:
        result = run_command(['git', 'ls-remote', '--symref', wiki_url, 'HEAD'], check=False)
        if 'ref: refs/heads/master' in result.stdout:
            return 'master'
    except:
        pass
    return 'main'  # Default a main si no podemos determinar

def run_git_command(cmd, error_msg=None, check=True):
    """Ejecutar comando git con mejor manejo de errores"""
    try:
        result = run_command(cmd, check=False)  # Siempre False para manejar errores nosotros
        if check and result.returncode != 0:  # Solo verificar si check=True
            if 'Authentication failed' in result.stderr:
                raise WikiGenerationError("Autenticación Git fallida. Verifica el token.")
            elif 'repository not found' in result.stderr:
                raise WikiGenerationError("Repositorio wiki no encontrado. Verifica que esté habilitado.")
            elif error_msg:
                raise WikiGenerationError(f"{error_msg}: {result.stderr}")
            else:
                raise WikiGenerationError(f"Error en comando Git: {result.stderr}")
        return result
    except Exception as e:
        if not isinstance(e, WikiGenerationError):
            raise WikiGenerationError(f"Error ejecutando Git: {str(e)}")
        raise

def verify_token():
    """Verificar que el token existe y tiene el formato correcto"""
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        raise WikiGenerationError("GITHUB_TOKEN no encontrado en variables de entorno")
    if not token.strip():
        raise WikiGenerationError("GITHUB_TOKEN está vacío")
    return token

def generate_wiki_pages():
    # Guardar directorio original y asegurar paths absolutos
    original_dir = Path.cwd().absolute()
    data_dir = original_dir / 'data'
    wiki_dir = original_dir / 'wiki_content'
    
    print(f"Iniciando generación de Wiki desde {original_dir}")
    
    # Inicializar flag de éxito
    success = False
    
    # Verificar directorio de datos
    if not data_dir.exists():
        raise WikiGenerationError(f"Directorio de datos no encontrado: {data_dir}")
    
    try:
        token = verify_token()
        # Limpiar directorio wiki si existe
        if wiki_dir.exists():
            safe_cleanup(wiki_dir)
        
        # Configuración
        repo = os.environ['GITHUB_REPOSITORY']
        api_url = f"https://api.github.com/repos/{repo}"
        headers = {
            'Authorization': f'Bearer {token}',
            'Accept': 'application/vnd.github.v3+json,application/vnd.github.mercy-preview+json',
            'X-GitHub-Api-Version': '2022-11-28'  # Especificar versión de API
        }

        # Verificar acceso y permisos en una sola llamada
        print("Verificando acceso al repositorio y permisos...")
        repo_data = check_repo_access(api_url, headers)
        
        # Habilitar wiki si es necesario
        if not repo_data.get('has_wiki'):
            print("Habilitando wiki...")
            response = requests.patch(api_url, headers=headers, json={'has_wiki': True})
            if response.status_code != 200:
                raise WikiGenerationError(f"Error habilitando wiki: {response.status_code}")

        # URL para git con autenticación (formato más seguro)
        wiki_url = f"https://x-access-token:{token}@github.com/{repo}.wiki.git"
        print("URL de wiki configurada (token oculto)")
        
        # Configurar git
        run_command(['git', 'config', '--global', 'user.name', 'github-actions[bot]'])
        run_command(['git', 'config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com'])
        
        # Verificar acceso Git
        print("Verificando acceso Git...")
        run_git_command(['git', 'ls-remote', wiki_url], 
                       "No se puede acceder al repositorio wiki")
        
        # Intentar clonar
        print(f"Intentando clonar wiki en: {wiki_dir}")
        clone_result = run_git_command(['git', 'clone', wiki_url, str(wiki_dir)],
                                     "Error clonando repositorio wiki",
                                     check=False)  # No verificar aquí
        
        is_new_wiki = clone_result.returncode != 0
        
        if is_new_wiki:
            # Inicializar nuevo repositorio
            wiki_dir.mkdir(exist_ok=True)
            os.chdir(str(wiki_dir))
            run_git_command(['git', 'init'],
                          "Error inicializando repositorio")
            run_git_command(['git', 'remote', 'add', 'origin', wiki_url],
                          "Error configurando remote")
            
            # Generar y commit contenido inicial
            if not generate_wiki_content(wiki_dir, data_dir):
                raise WikiGenerationError("No se pudo generar el contenido inicial")
            
            run_git_command(['git', 'add', '.'])
            run_git_command(['git', 'commit', '-m', 'Initial wiki content'])
            run_git_command(['git', 'branch', '-M', 'main'])
            run_git_command(['git', 'push', '--force', 'origin', 'main'])
            print("Wiki inicializada exitosamente")
        else:
            # Wiki existente
            os.chdir(str(wiki_dir))
            default_branch = get_default_branch(wiki_url, headers)
            print(f"Usando rama existente: {default_branch}")
            
            # Verificar checkout y pull
            checkout_result = run_git_command(['git', 'checkout', default_branch], 
                                            "Error cambiando a rama por defecto")  # Siempre verificar
            
            pull_result = run_git_command(['git', 'pull', 'origin', default_branch],
                                        "Error actualizando rama")  # Siempre verificar
            
            if not generate_wiki_content(wiki_dir, data_dir):
                raise WikiGenerationError("No se pudo generar el contenido")
            
            # Verificar y commit cambios
            run_git_command(['git', 'add', '.'])
            status = run_git_command(['git', 'status', '--porcelain'])
            if status.stdout.strip():
                run_git_command(['git', 'commit', '-m', 'Update wiki content'])
                run_git_command(['git', 'push', 'origin', default_branch])
                print("Wiki actualizada exitosamente")
        success = True  # Si llegamos aquí, todo salió bien
        
    except WikiGenerationError:
        # Re-lanzar errores específicos de wiki
        raise
    except subprocess.CalledProcessError as e:
        if 'Authentication failed' in str(e):
            raise WikiGenerationError("Autenticación Git fallida. Verifica el token.")
        raise WikiGenerationError(f"Error en operación Git: {str(e)}")
    except requests.RequestException as e:
        raise WikiGenerationError(f"Error en API de GitHub: {str(e)}")
    except Exception as e:
        raise WikiGenerationError(f"Error inesperado: {str(e)}")
    finally:
        # Volver al directorio original
        os.chdir(str(original_dir))
        print(f"Volviendo a directorio original: {original_dir}")
        
        # Limpiar si no hubo éxito
        if not success and wiki_dir.exists():
            safe_cleanup(wiki_dir)
        
        # Limpiar credenciales
        if os.path.exists(os.path.expanduser('~/.git-credentials')):
            os.remove(os.path.expanduser('~/.git-credentials'))

def generate_wiki_content(wiki_dir: Path, data_dir: Path):
    """Generar contenido de la wiki usando Path consistentemente"""
    # Verificar y cargar archivos JSON
    issues_file = data_dir / 'issues.json'
    milestones_file = data_dir / 'milestones.json'
    
    # Verificar contenido antes de procesar
    issues = verify_json_content(issues_file)
    milestones = verify_json_content(milestones_file)
    
    if not issues and not milestones:
        print("No hay datos para generar en la wiki")
        return False

    # Generar archivos usando Path consistentemente
    try:
        # Home.md
        with open(wiki_dir / 'Home.md', 'w', encoding='utf-8') as f:
            f.write("""# 2025-Backend Project Wiki

Bienvenido a la Wiki oficial del proyecto 2025-Backend, una aplicación web full-stack con arquitectura de microservicios containerizada usando Docker.

## Navegación Rápida

- [[Milestones]] - Objetivos y progreso del proyecto
- [[Issues-Activos]] - Tareas pendientes
- [[Issues-Cerrados]] - Tareas completadas
- [[Tecnologías]] - Stack tecnológico
- [[Arquitectura]] - Diseño del sistema
""")

        # Tecnologías.md
        with open(wiki_dir / 'Tecnologías.md', 'w', encoding='utf-8') as f:
            f.write("""# Tecnologías Utilizadas

## Backend
- **Node.js**: Entorno de ejecución para JavaScript
- **Express**: Framework web para Node.js
- **Sequelize ORM**: ORM para interactuar con la base de datos
- **JWT**: Para autenticación segura

## Frontend
- **React**: Biblioteca JavaScript para interfaces de usuario
- **React Router**: Enrutamiento para React
- **Axios**: Cliente HTTP para realizar peticiones
- **SweetAlert2**: Para notificaciones amigables

## Base de Datos
- **MySQL**: Sistema de gestión de bases de datos relacional

## Infraestructura
- **Docker**: Para containerización
- **Docker Compose**: Para orquestar múltiples contenedores
- **Nginx**: Como servidor web para el frontend
""")

        # Arquitectura.md
        with open(wiki_dir / 'Arquitectura.md', 'w', encoding='utf-8') as f:
            f.write("""# Arquitectura del Proyecto

## Visión General

El proyecto 2025-Backend implementa una arquitectura de microservicios containerizada, donde cada componente del sistema se ejecuta en su propio contenedor Docker, facilitando el desarrollo, despliegue y escalabilidad.

## Componentes Principales

### Backend API (Node.js/Express)
- Maneja la lógica de negocio
- Expone endpoints RESTful
- Se comunica con la base de datos
- Implementa autenticación y autorización

### Frontend (React)
- Interfaz de usuario responsive
- Consume la API del backend
- Gestiona el estado de la aplicación
- Implementa rutas y navegación

### Base de Datos (MySQL)
- Almacena datos persistentes
- Se conecta con el backend a través de Sequelize ORM
- Mantiene la integridad de los datos

### Servidor Web (Nginx)
- Sirve la aplicación frontend
- Actúa como proxy inverso para el backend
- Maneja SSL/TLS
- Optimiza la entrega de contenido estático

## Comunicación entre Servicios

Los servicios se comunican principalmente a través de peticiones HTTP/HTTPS, siguiendo principios RESTful.

## Seguridad

- JWT para autenticación
- HTTPS para comunicación segura
- Validación de datos de entrada
- Políticas de CORS configuradas
""")

        # Milestones.md
        with open(wiki_dir / 'Milestones.md', 'w', encoding='utf-8') as f:
            f.write("# Milestones del Proyecto 2025-Backend\n\n")
            for ms in milestones:
                f.write(f"## {ms['title']}\n")
                f.write(f"**Estado:** {ms['state']}\n\n")
                description = ms.get('description') or 'Sin descripción'
                f.write(f"**Descripción:** {description}\n\n")
                if ms.get('due_on'):
                    f.write(f"**Fecha límite:** {ms['due_on']}\n\n")
                
                # Añadir progreso si está disponible
                if 'progress' in ms:
                    f.write(f"**Progreso:** {ms['progress']:.1f}%\n\n")
                if 'open_issues' in ms and 'closed_issues' in ms:
                    total = ms['open_issues'] + ms['closed_issues']
                    f.write(f"**Issues:** {ms['closed_issues']} cerrados de {total} totales\n\n")
                
                f.write("---\n\n")

        # Issues-Activos.md
        def format_labels(labels_data):
            """Formatear labels considerando diferentes formatos posibles"""
            if not labels_data:
                return []
            if isinstance(labels_data, list):
                # Si es una lista de diccionarios
                if all(isinstance(label, dict) for label in labels_data):
                    return [label.get('name', '') for label in labels_data]
                # Si es una lista de strings
                return labels_data
            # Si es un string único
            if isinstance(labels_data, str):
                return [labels_data]
            return []

        active_issues = [i for i in issues if i['state'] == 'open']
        with open(wiki_dir / 'Issues-Activos.md', 'w', encoding='utf-8') as f:
            f.write("# Issues Activos - Proyecto 2025-Backend\n\n")
            for issue in active_issues:
                f.write(f"## #{issue['number']}: {issue['title']}\n")
                f.write(f"**Creado:** {issue['created_at']}\n\n")
                
                # Mostrar milestone (considerar diferentes formatos)
                if issue.get('milestone'):
                    # Si milestone es un diccionario
                    if isinstance(issue['milestone'], dict):
                        milestone_title = issue['milestone'].get('title', 'Sin título')
                    # Si milestone es un string
                    else:
                        milestone_title = issue['milestone']
                    f.write(f"**Milestone:** {milestone_title}\n\n")
                
                # Mostrar etiquetas
                if issue.get('labels'):
                    labels = format_labels(issue['labels'])
                    if labels:
                        f.write(f"**Labels:** {', '.join(labels)}\n\n")
                
                # Mostrar asignados
                if issue.get('assignees') and issue['assignees']:
                    f.write(f"**Asignado a:** {', '.join(issue['assignees'])}\n\n")
                
                # Mostrar enlace al issue
                if issue.get('url'):
                    f.write(f"**Link:** [{issue['number']}]({issue['url']})\n\n")
                
                # Mostrar cuerpo del issue
                body = issue.get('body') or 'Sin descripción'
                f.write(f"{body}\n\n---\n\n")

        # Issues-Cerrados.md
        closed_issues = [i for i in issues if i['state'] == 'closed']
        with open(wiki_dir / 'Issues-Cerrados.md', 'w', encoding='utf-8') as f:
            f.write("# Issues Cerrados - Proyecto 2025-Backend\n\n")
            for issue in closed_issues:
                f.write(f"## #{issue['number']}: {issue['title']}\n")
                f.write(f"**Creado:** {issue['created_at']}\n")
                f.write(f"**Cerrado:** {issue.get('closed_at', 'Desconocido')}\n\n")
                
                # Mostrar milestone (considerar diferentes formatos)
                if issue.get('milestone'):
                    # Si milestone es un diccionario
                    if isinstance(issue['milestone'], dict):
                        milestone_title = issue['milestone'].get('title', 'Sin título')
                    # Si milestone es un string
                    else:
                        milestone_title = issue['milestone']
                    f.write(f"**Milestone:** {milestone_title}\n\n")
                
                # Mostrar etiquetas
                if issue.get('labels'):
                    labels = format_labels(issue['labels'])
                    if labels:
                        f.write(f"**Labels:** {', '.join(labels)}\n\n")
                
                # Mostrar enlace al issue
                if issue.get('url'):
                    f.write(f"**Link:** [{issue['number']}]({issue['url']})\n\n")
                
                # Mostrar cuerpo del issue
                body = issue.get('body') or 'Sin descripción'
                f.write(f"{body}\n\n---\n\n")

        return True
    except IOError as e:
        print(f"Error escribiendo archivos de la wiki del Proyecto 2025-Backend: {e}")
        return False

def verify_json_content(file_path):
    """Verificar que el archivo JSON tiene contenido válido"""
    if not os.path.exists(file_path):
        raise WikiGenerationError(f"Archivo no encontrado: {file_path}")
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if not data:
                print(f"Advertencia: {file_path} está vacío")
            return data
    except json.JSONDecodeError as e:
        raise WikiGenerationError(f"Error decodificando {file_path}: {e}")
    except IOError as e:
        raise WikiGenerationError(f"Error leyendo archivo {file_path}: {e}")

def safe_cleanup(directory):
    """Limpieza segura de directorio temporal"""
    if os.path.exists(directory) and os.path.isdir(directory):
        try:
            subprocess.run(['rm', '-rf', directory], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error limpiando {directory}: {e}")

def check_repo_access(api_url, headers):
    """Verificar acceso al repositorio y sus características"""
    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()  # Lanzar excepción para códigos de error HTTP
        
        repo_data = response.json()
        
        # Verificar permisos específicos para wiki
        permissions = repo_data.get('permissions', {})
        
        # Verificar todos los permisos necesarios
        if not permissions.get('push'):
            print("Permisos actuales:", permissions)  # Debug
            raise WikiGenerationError("El token no tiene permisos de escritura")
        if not permissions.get('pull'):
            raise WikiGenerationError("El token no tiene permisos de lectura")
        if not repo_data.get('has_wiki') and not permissions.get('admin'):
            raise WikiGenerationError("La wiki está deshabilitada y el token no tiene permisos para habilitarla")
        
        return repo_data
    except requests.exceptions.RequestException as e:
        if response.status_code == 401:
            raise WikiGenerationError("Token inválido o expirado")
        elif response.status_code == 403:
            raise WikiGenerationError("Token sin permisos suficientes")
        elif response.status_code == 404:
            raise WikiGenerationError("Repositorio no encontrado")
        else:
            raise WikiGenerationError(f"Error de API: {str(e)}")

if __name__ == '__main__':
    generate_wiki_pages() 