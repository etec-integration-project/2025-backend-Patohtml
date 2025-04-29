# 2025-Backend Project

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Backend: Express](https://img.shields.io/badge/Backend-Express-green)
![Frontend: React](https://img.shields.io/badge/Frontend-React-blue)
![Database: MySQL](https://img.shields.io/badge/Database-MySQL-orange)

## 📝 Descripción
### Cabe aclarar que este README fue creado por Patohtml. Benicio Corro seguramente borro esta linea y se quedo con mi readme sin dar nada de creditos. Saludos

Este proyecto es una aplicación web full-stack con una arquitectura de microservicios containerizada usando Docker. Incluye un backend en Node.js/Express, un frontend en React, y una base de datos MySQL.

### Backend
- Node.js
- Express
- Sequelize ORM
- JWT para autenticación
- MySQL como base de datos

### Frontend
- React
- React Router
- Axios para peticiones HTTP
- SweetAlert2 para notificaciones
- React Icons

### Infraestructura
- Docker y Docker Compose
- Nginx como servidor web para el frontend
- Contenedores separados para cada servicio

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Docker y Docker Compose
- Git

### Pasos para Iniciar el Proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/2025-backend-Patohtml.git
   cd 2025-backend-Patohtml
   ```

2. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acceder a la aplicación:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

## 📚 Estructura del Proyecto

```
2025-backend-Patohtml/
├── backend/         # Servidor Node.js con Express
├── frontend/        # Aplicación React
├── db/              # Datos persistentes de MySQL
├── docs/            # Documentación automática
└── docker-compose.yml
```

## 📖 Documentación Automática

Este proyecto incluye un sistema de generación automática de documentación basada en los cambios en milestones, issues y pull requests de GitHub.

### Características

- **Documentación de Milestones**: Resumen automático de cada milestone con su progreso y issues asociados.
- **Changelog Automático**: Registro de cambios basado en issues cerrados, categorizados por etiquetas.
- **Notas de Lanzamiento**: Documentación automática de los pull requests fusionados.

### Cómo Funciona

1. Los cambios en GitHub (creación/cierre de issues, fusión de PRs, etc.) activan workflows de GitHub Actions.
2. Los scripts procesan la información y generan documentación en formato Markdown.
3. La documentación se actualiza automáticamente en la carpeta `docs/`.

### Configuración

La configuración se realiza a través del archivo `.github/doc-config.yml`

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
