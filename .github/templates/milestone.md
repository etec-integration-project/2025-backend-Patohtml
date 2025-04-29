# {{milestone.title}}

{{milestone.description}}

## Información General

- **Estado**: {{milestone.state}}
- **Fecha de Vencimiento**: {{milestone.due_on}}
- **Progreso**: {{milestone.progress}}% ({{milestone.closed_issues}}/{{milestone.total_issues}} issues cerrados)
- **URL**: [Ver en GitHub]({{milestone.html_url}})

## Issues Asociados

### Issues Abiertos

{{#each milestone.open_issues}}
- [{{this.title}}]({{this.html_url}}) {{#if this.labels}}[{{join this.labels ", "}}]{{/if}}
{{else}}
*No hay issues abiertos para este milestone.*
{{/each}}

### Issues Cerrados

{{#each milestone.closed_issues}}
- [{{this.title}}]({{this.html_url}}) {{#if this.labels}}[{{join this.labels ", "}}]{{/if}}
{{else}}
*No hay issues cerrados para este milestone.*
{{/each}}

## Estadísticas

- **Tiempo medio de resolución**: {{milestone.avg_resolution_time}}
- **Contribuidores**: {{join milestone.contributors ", "}} 