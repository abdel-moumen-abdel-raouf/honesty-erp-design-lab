import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(toolDirectory, '..', '..');
const routesPath = resolve(repositoryRoot, 'src', 'app', 'app.routes.ts');

export function findNonErpAuthoredTags(source) {
  const tags = new Set();
  const pattern = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;

  for (const match of source.matchAll(pattern)) {
    const tag = match[1].toLowerCase();
    if (!tag.startsWith('erp-')) {
      tags.add(tag);
    }
  }

  return [...tags].sort();
}

export function resolveRouteTemplates(routesSource) {
  const routeDirectory = dirname(routesPath);
  const modulePaths = new Set();
  const importPattern = /import\(\s*(['"])(.*?)\1\s*\)/g;

  for (const match of routesSource.matchAll(importPattern)) {
    modulePaths.add(resolve(routeDirectory, match[2] + '.ts'));
  }

  const templates = [];
  for (const modulePath of modulePaths) {
    const moduleSource = readFileSync(modulePath, 'utf8');
    const templateMatch = /templateUrl:\s*(['"])(.*?)\1/.exec(moduleSource);
    if (!templateMatch) {
      throw new Error(
        'Routed review component must use an external templateUrl: ' + modulePath,
      );
    }

    templates.push(resolve(dirname(modulePath), templateMatch[2]));
  }

  return [...new Set(templates)].sort();
}

function runSelfTest() {
  const allowed = findNonErpAuthoredTags(
    '<erp-container><erp-stack><erp-text>Text</erp-text></erp-stack></erp-container>',
  );
  if (allowed.length !== 0) {
    throw new Error('Route-page ERP-only self-test rejected ERP tags.');
  }

  const rejected = findNonErpAuthoredTags(
    '<erp-container><section><erp-text>Text</erp-text></section></erp-container>',
  );
  if (rejected.length !== 1 || rejected[0] !== 'section') {
    throw new Error('Route-page ERP-only self-test failed to detect native HTML.');
  }

  console.log('Route-page ERP-only authoring self-test: PASS');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  const routesSource = readFileSync(routesPath, 'utf8');
  const templates = resolveRouteTemplates(routesSource);
  const failures = [];

  for (const templatePath of templates) {
    const source = readFileSync(templatePath, 'utf8');
    const violations = findNonErpAuthoredTags(source);

    if (violations.length > 0) {
      failures.push(
        templatePath.replace(repositoryRoot + '/', '') +
          ': ' +
          violations.join(', '),
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(
      'Routed Design Lab templates must author ERP tags only.\n' +
        failures.join('\n'),
    );
  }

  console.log(
    'Route-page ERP-only authoring: PASS (' +
      templates.length +
      ' routed templates)',
  );
}
