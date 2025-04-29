import json
from datetime import datetime
from jinja2 import Template
import os

def load_data():
    try:
        with open('data/issues.json', 'r') as f:
            issues = json.load(f)
        with open('data/milestones.json', 'r') as f:
            milestones = json.load(f)
        return issues, milestones
    except FileNotFoundError:
        # Si los archivos no existen, crear datos vacíos
        print("Archivos de datos no encontrados. Creando documentación con datos vacíos.")
        return [], []

def generate_docs():
    issues, milestones = load_data()
    
    # Asegurar que los directorios necesarios existen
    os.makedirs('docs/milestones', exist_ok=True)
    
    # Template para la documentación principal
    template_str = """---
layout: default
title: Documentación Detallada
---

# Documentación Detallada del Proyecto 2025-Backend

_Última actualización: {{ current_date }}_

## Resumen de Milestones

| Milestone | Estado | Fecha Límite |
|-----------|--------|--------------|
{% for milestone in milestones %}
| {{ milestone.title }} | {{ milestone.state }} | {{ milestone.due_on if milestone.due_on else 'No definida' }} |
{% endfor %}

## Issues Activos

{% for issue in issues if issue.state == 'open' %}
### #{{ issue.number }}: {{ issue.title }}
**Estado:** {{ issue.state }}
**Creado:** {{ issue.created_at }}
{% if issue.milestone %}**Milestone:** {{ issue.milestone }}{% endif %}
{% if issue.labels %}**Labels:** {{ issue.labels|join(', ') }}{% endif %}

{{ issue.body }}

---
{% endfor %}

## Issues Cerrados Recientemente

{% for issue in issues if issue.state == 'closed' %}
### #{{ issue.number }}: {{ issue.title }}
**Estado:** {{ issue.state }}
**Creado:** {{ issue.created_at }}
**Cerrado:** {{ issue.closed_at }}
{% if issue.milestone %}**Milestone:** {{ issue.milestone }}{% endif %}
{% if issue.labels %}**Labels:** {{ issue.labels|join(', ') }}{% endif %}

{{ issue.body }}

---
{% endfor %}
"""
    
    template = Template(template_str)
    doc_content = template.render(
        current_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        issues=issues,
        milestones=milestones
    )
    
    # Guardar la documentación principal
    with open('docs/project-documentation.md', 'w') as f:
        f.write(doc_content)
    
    # Generar changelog basado en issues cerrados
    generate_changelog(issues)
    
    # Generar documentación para cada milestone
    generate_milestone_docs(milestones, issues)

def generate_changelog(issues):
    changelog_template = """# Changelog

Registro de cambios en el proyecto 2025-Backend.

## Última actualización

_{{ current_date }}_

{% for issue in closed_issues %}
### {{ issue.closed_at.split('T')[0] }} - #{{ issue.number }}: {{ issue.title }}
{% if issue.labels %}**Tipo:** {{ issue.labels|join(', ') }}{% endif %}

{{ issue.body }}

---
{% endfor %}
"""
    
    template = Template(changelog_template)
    # Filtrar y ordenar issues cerrados por fecha de cierre
    closed_issues = [issue for issue in issues if issue.get('state') == 'closed']
    closed_issues.sort(key=lambda x: x.get('closed_at', ''), reverse=True)
    
    content = template.render(
        current_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        closed_issues=closed_issues
    )
    
    with open('docs/changelog.md', 'w') as f:
        f.write(content)

def generate_milestone_docs(milestones, issues):
    # Template para documento de índice de milestones
    index_template = """# Milestones del Proyecto

Lista de objetivos del proyecto 2025-Backend:

{% for milestone in milestones %}
## [{{ milestone.title }}]({{ milestone.number }}.md)
**Estado:** {{ milestone.state }}
{% if milestone.due_on %}**Fecha límite:** {{ milestone.due_on }}{% endif %}

{{ milestone.description }}

---
{% endfor %}
"""
    
    # Template para documentos de milestone individual
    milestone_template = """# {{ milestone.title }}

**Estado:** {{ milestone.state }}
{% if milestone.due_on %}**Fecha límite:** {{ milestone.due_on }}{% endif %}

{{ milestone.description }}

## Issues asociados

{% for issue in milestone_issues %}
### #{{ issue.number }}: {{ issue.title }}
**Estado:** {{ issue.state }}
**Creado:** {{ issue.created_at }}
{% if issue.state == 'closed' %}**Cerrado:** {{ issue.closed_at }}{% endif %}
{% if issue.labels %}**Labels:** {{ issue.labels|join(', ') }}{% endif %}

{{ issue.body }}

---
{% endfor %}
"""
    
    # Generar índice de milestones
    template = Template(index_template)
    content = template.render(milestones=milestones)
    with open('docs/milestones/index.md', 'w') as f:
        f.write(content)
    
    # Generar documento para cada milestone
    for milestone in milestones:
        milestone_issues = [issue for issue in issues if issue.get('milestone', {}).get('number') == milestone.get('number')]
        template = Template(milestone_template)
        content = template.render(
            milestone=milestone,
            milestone_issues=milestone_issues
        )
        
        with open(f'docs/milestones/{milestone.get("number")}.md', 'w') as f:
            f.write(content)

if __name__ == '__main__':
    generate_docs() 