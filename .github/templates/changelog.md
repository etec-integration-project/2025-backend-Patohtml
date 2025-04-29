# Changelog

*Última actualización: {{current_date}}*

{{#each categories}}
## {{this.title}}

{{#each this.issues}}
- **[#{{this.number}}]({{this.html_url}})**: {{this.title}} *(cerrado {{format_date this.closed_at}})* - {{#if this.assignee}}@{{this.assignee.login}}{{else}}Sin asignar{{/if}}
{{else}}
*No hay issues en esta categoría.*
{{/each}}

{{/each}}

## Otros Cambios

{{#each uncategorized_issues}}
- **[#{{this.number}}]({{this.html_url}})**: {{this.title}} *(cerrado {{format_date this.closed_at}})* - {{#if this.assignee}}@{{this.assignee.login}}{{else}}Sin asignar{{/if}}
{{else}}
*No hay otros cambios.*
{{/each}} 