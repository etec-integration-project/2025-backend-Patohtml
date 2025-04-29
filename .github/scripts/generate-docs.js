#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');
const moment = require('moment');

// Configuración inicial
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Variables globales
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
const configPath = path.join(process.cwd(), '.github/doc-config.yml');
let config;

// Registrar helpers de Handlebars
Handlebars.registerHelper('format_date', function(date) {
  return moment(date).format('DD/MM/YYYY');
});

Handlebars.registerHelper('join', function(array, separator) {
  return array.join(separator);
});

/**
 * Carga la configuración desde el archivo doc-config.yml
 */
function loadConfig() {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    config = yaml.load(fileContents);
    console.log('Configuración cargada correctamente');
  } catch (error) {
    console.error('Error al cargar la configuración:', error);
    process.exit(1);
  }
}

/**
 * Crea directorios necesarios si no existen
 */
function createDirectories() {
  const directories = [
    config.output.directory,
    config.milestones.output_dir
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directorio creado: ${dir}`);
    }
  });
}

/**
 * Obtiene todos los milestones del repositorio
 */
async function getMilestones() {
  try {
    const response = await octokit.issues.listMilestonesForRepo({
      owner: repoOwner,
      repo: repoName,
      state: 'all',
      per_page: config.api.per_page || 100
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener milestones:', error);
    return [];
  }
}

/**
 * Obtiene todos los issues asociados a un milestone
 */
async function getIssuesForMilestone(milestoneNumber) {
  try {
    const openIssues = await octokit.issues.listForRepo({
      owner: repoOwner,
      repo: repoName,
      milestone: milestoneNumber,
      state: 'open',
      per_page: config.api.per_page || 100
    });

    const closedIssues = await octokit.issues.listForRepo({
      owner: repoOwner,
      repo: repoName,
      milestone: milestoneNumber,
      state: 'closed',
      per_page: config.api.per_page || 100
    });

    return {
      open: openIssues.data.filter(issue => !issue.pull_request),
      closed: closedIssues.data.filter(issue => !issue.pull_request)
    };
  } catch (error) {
    console.error(`Error al obtener issues para milestone ${milestoneNumber}:`, error);
    return { open: [], closed: [] };
  }
}

/**
 * Genera documentación para un milestone
 */
async function generateMilestoneDoc(milestone) {
  // Verificar si deberíamos excluir este milestone
  if (config.milestones.exclude) {
    if (config.milestones.exclude.names && 
        config.milestones.exclude.names.includes(milestone.title)) {
      console.log(`Saltando milestone excluido: ${milestone.title}`);
      return;
    }
  }

  const issues = await getIssuesForMilestone(milestone.number);
  const totalIssues = issues.open.length + issues.closed.length;
  const progress = totalIssues > 0 ? Math.round((issues.closed.length / totalIssues) * 100) : 0;

  // Calcular tiempo medio de resolución para issues cerrados
  let avgResolutionTime = 'N/A';
  if (issues.closed.length > 0) {
    const totalTime = issues.closed.reduce((acc, issue) => {
      const created = new Date(issue.created_at);
      const closed = new Date(issue.closed_at);
      return acc + (closed - created);
    }, 0);
    const avgTimeMs = totalTime / issues.closed.length;
    avgResolutionTime = `${Math.round(avgTimeMs / (1000 * 60 * 60 * 24))} días`;
  }

  // Obtener contribuidores únicos
  const contributors = new Set();
  [...issues.open, ...issues.closed].forEach(issue => {
    if (issue.assignee) contributors.add(issue.assignee.login);
  });

  // Preparar datos para la plantilla
  const templateData = {
    milestone: {
      ...milestone,
      progress,
      total_issues: totalIssues,
      closed_issues: issues.closed.length,
      open_issues: issues.open,
      closed_issues: issues.closed,
      avg_resolution_time: avgResolutionTime,
      contributors: Array.from(contributors)
    }
  };

  // Cargar y compilar la plantilla
  const templatePath = path.join(process.cwd(), config.milestones.template);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);
  const output = template(templateData);

  // Guardar la documentación generada
  const outputFileName = `${config.milestones.output_dir}/${milestone.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
  fs.writeFileSync(outputFileName, output);
  console.log(`Documentación generada para milestone: ${milestone.title}`);
}

/**
 * Obtiene todos los issues cerrados desde la última ejecución
 */
async function getClosedIssues() {
  try {
    // Obtener fecha del último changelog generado o usar fecha predeterminada
    let since = new Date();
    since.setMonth(since.getMonth() - 1); // Por defecto, 1 mes atrás

    const response = await octokit.issues.listForRepo({
      owner: repoOwner,
      repo: repoName,
      state: 'closed',
      since: since.toISOString(),
      per_page: config.api.per_page || 100
    });

    // Filtrar pull requests (queremos solo issues)
    return response.data.filter(issue => !issue.pull_request);
  } catch (error) {
    console.error('Error al obtener issues cerrados:', error);
    return [];
  }
}

/**
 * Genera el archivo changelog basado en issues cerrados
 */
async function generateChangelog() {
  const issues = await getClosedIssues();
  
  // Filtrar issues excluidos
  const filteredIssues = issues.filter(issue => {
    if (!config.issues.exclude || !config.issues.exclude.labels) return true;
    
    // Verificar si alguna etiqueta del issue está en la lista de exclusión
    const issueLabels = issue.labels.map(label => label.name);
    return !issueLabels.some(label => config.issues.exclude.labels.includes(label));
  });

  // Agrupar issues por categorías
  const categories = config.issues.categories.map(category => {
    return {
      title: category.title,
      issues: filteredIssues.filter(issue => 
        issue.labels.some(label => label.name === category.label)
      )
    };
  });

  // Encontrar issues no categorizados
  const categorizedIssueIds = new Set();
  categories.forEach(category => {
    category.issues.forEach(issue => categorizedIssueIds.add(issue.id));
  });

  const uncategorizedIssues = filteredIssues.filter(issue => 
    !categorizedIssueIds.has(issue.id)
  );

  // Preparar datos para la plantilla
  const templateData = {
    current_date: moment().format('DD/MM/YYYY HH:mm:ss'),
    categories,
    uncategorized_issues: uncategorizedIssues
  };

  // Cargar y compilar la plantilla
  const templatePath = path.join(process.cwd(), config.issues.template);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);
  const output = template(templateData);

  // Guardar el changelog generado
  fs.writeFileSync(config.issues.changelog_file, output);
  console.log(`Changelog generado con ${filteredIssues.length} issues`);
}

/**
 * Obtiene todos los pull requests fusionados desde la última ejecución
 */
async function getMergedPullRequests() {
  try {
    // Buscar PRs cerrados y determinar cuáles fueron fusionados
    const response = await octokit.pulls.list({
      owner: repoOwner,
      repo: repoName,
      state: 'closed',
      sort: 'updated',
      direction: 'desc',
      per_page: config.api.per_page || 100
    });

    // Filtrar solo los PRs fusionados
    return response.data.filter(pr => pr.merged_at !== null);
  } catch (error) {
    console.error('Error al obtener pull requests:', error);
    return [];
  }
}

/**
 * Encuentra issues relacionados con un PR a través de las referencias en el cuerpo del PR
 */
async function findLinkedIssues(pullRequest) {
  const issueRefs = [];
  const regex = /#(\d+)/g;
  let match;

  // Buscar referencias a issues en el cuerpo del PR
  if (pullRequest.body) {
    while ((match = regex.exec(pullRequest.body)) !== null) {
      issueRefs.push(match[1]);
    }
  }

  // Obtener detalles de los issues referenciados
  const linkedIssues = [];
  for (const issueNumber of issueRefs) {
    try {
      const response = await octokit.issues.get({
        owner: repoOwner,
        repo: repoName,
        issue_number: parseInt(issueNumber)
      });
      
      // Solo incluir si es un issue y no un PR
      if (!response.data.pull_request) {
        linkedIssues.push(response.data);
      }
    } catch (error) {
      console.warn(`No se pudo obtener el issue #${issueNumber}:`, error.message);
    }
  }

  return linkedIssues;
}

/**
 * Genera el archivo de notas de lanzamiento basado en PRs fusionados
 */
async function generateReleases() {
  const pullRequests = await getMergedPullRequests();
  
  // Filtrar PRs excluidos
  const filteredPRs = pullRequests.filter(pr => {
    if (!config.pull_requests.exclude || !config.pull_requests.exclude.labels) return true;
    
    // Verificar si alguna etiqueta del PR está en la lista de exclusión
    const prLabels = pr.labels.map(label => label.name);
    return !prLabels.some(label => config.pull_requests.exclude.labels.includes(label));
  });

  // Obtener releases si existen
  let releases = [];
  try {
    const releasesResponse = await octokit.repos.listReleases({
      owner: repoOwner,
      repo: repoName,
      per_page: 10
    });
    releases = releasesResponse.data;
  } catch (error) {
    console.warn('No se pudieron obtener los releases:', error.message);
  }

  // Si no hay releases, crear uno virtual con todos los PRs
  if (releases.length === 0) {
    releases = [{
      title: 'Desarrollo Actual',
      created_at: new Date().toISOString(),
      body: 'Pull requests fusionados sin un release oficial.',
      pull_requests: []
    }];
  }

  // Asociar PRs con releases (o con el release virtual si no hay coincidencia)
  for (const pr of filteredPRs) {
    // Buscar issues relacionados
    pr.linked_issues = await findLinkedIssues(pr);
    
    // Obtener información del usuario que fusionó el PR
    try {
      const mergeDetail = await octokit.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: pr.number
      });
      pr.merged_by = mergeDetail.data.merged_by;
    } catch (error) {
      console.warn(`No se pudo obtener detalles de fusión para PR #${pr.number}:`, error.message);
      pr.merged_by = { login: 'unknown' };
    }

    // Determinar a qué release pertenece este PR
    let assigned = false;
    for (const release of releases) {
      // Si el PR se fusionó antes del release, asignarlo a ese release
      if (release.created_at && pr.merged_at && new Date(pr.merged_at) <= new Date(release.created_at)) {
        if (!release.pull_requests) release.pull_requests = [];
        release.pull_requests.push(pr);
        assigned = true;
        break;
      }
    }

    // Si no se asignó a ningún release, asignarlo al release virtual o al más reciente
    if (!assigned) {
      if (!releases[0].pull_requests) releases[0].pull_requests = [];
      releases[0].pull_requests.push(pr);
    }
  }

  // Buscar milestones asociados a cada release
  for (const release of releases) {
    if (release.pull_requests && release.pull_requests.length > 0) {
      // Buscar milestone en los PRs de este release
      for (const pr of release.pull_requests) {
        if (pr.milestone) {
          release.milestone = pr.milestone;
          break;
        }
      }
    }
  }

  // Preparar datos para la plantilla
  const templateData = {
    current_date: moment().format('DD/MM/YYYY HH:mm:ss'),
    releases
  };

  // Cargar y compilar la plantilla
  const templatePath = path.join(process.cwd(), config.pull_requests.template);
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);
  const output = template(templateData);

  // Guardar las notas de lanzamiento generadas
  fs.writeFileSync(config.pull_requests.releases_file, output);
  console.log(`Notas de lanzamiento generadas con ${filteredPRs.length} pull requests`);
}

/**
 * Función principal
 */
async function main() {
  console.log('Iniciando generación de documentación automática...');
  
  loadConfig();
  createDirectories();

  if (config.milestones.enabled) {
    console.log('Generando documentación de milestones...');
    const milestones = await getMilestones();
    for (const milestone of milestones) {
      await generateMilestoneDoc(milestone);
    }
  }

  if (config.issues.enabled) {
    console.log('Generando changelog basado en issues...');
    await generateChangelog();
  }

  if (config.pull_requests.enabled) {
    console.log('Generando notas de lanzamiento basadas en pull requests...');
    await generateReleases();
  }

  console.log('Documentación generada exitosamente');
}

// Ejecutar el programa
main().catch(error => {
  console.error('Error en la ejecución principal:', error);
  process.exit(1);
}); 