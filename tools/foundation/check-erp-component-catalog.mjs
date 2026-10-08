import fs from 'node:fs';
import path from 'node:path';
import {
  REPO_ROOT,
  buildCatalog,
  generatedArtifacts,
} from '../catalog/erp-component-catalog.mjs';

function validateCatalog(catalog) {
  const errors = [];
  const publicEntries = catalog.filter(
    (entry) => entry.classification === 'PUBLIC ERP COMPONENT',
  );
  const ids = new Set();
  const routes = new Set();

  for (const entry of publicEntries) {
    if (ids.has(entry.id)) errors.push(`duplicate public id: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.selector?.startsWith('erp-')) {
      errors.push(`${entry.className} has no public erp selector`);
    }
    if (entry.showcaseRoute !== `/components/${entry.id}`) {
      errors.push(`${entry.className} has no unique dedicated showcase route`);
    }
    if (entry.showcaseRoute && routes.has(entry.showcaseRoute)) {
      errors.push(`duplicate showcase route: ${entry.showcaseRoute}`);
    }
    if (entry.showcaseRoute) routes.add(entry.showcaseRoute);
    if (!Array.isArray(entry.nativeCoverage)) {
      errors.push(`${entry.className} has no native coverage declaration`);
    }
    if (!entry.sourcePath || !entry.purpose || !entry.category) {
      errors.push(`${entry.className} has incomplete inventory metadata`);
    }
    if (!entry.publicApi || !Array.isArray(entry.publicApi.inputs) ||
      !Array.isArray(entry.publicApi.outputs) || !Array.isArray(entry.publicApi.models)) {
      errors.push(`${entry.className} has no public API inventory`);
    }
  }

  if (!publicEntries.some((entry) => entry.className === 'ErpPage')) {
    errors.push('ErpPage is missing from the public catalog');
  }

  return errors;
}

function validatePageOwner({source, styles, tokens, pageShell, appShell}) {
  const errors = [];
  const requiredSourceMarkers = [
    "selector: 'erp-page'",
    "'boxed' | 'fluid' | 'full'",
    "'document' | 'page' | 'free'",
    "input<ErpPageWidthMode>('fluid')",
    "input<ErpPageScrollMode>('document')",
  ];
  for (const marker of requiredSourceMarkers) {
    if (!source.includes(marker)) errors.push(`ErpPage source is missing ${marker}`);
  }
  for (const forbidden of ['HttpClient', 'Router', 'ThemeMode', 'data-theme', 'document.']) {
    if (source.includes(forbidden)) errors.push(`ErpPage owns forbidden ${forbidden}`);
  }
  if (!styles.includes('@include tokens.base')) {
    errors.push('ErpPage does not consume its Component Token base');
  }
  if (/max-inline-size:\s*\d/.test(styles)) {
    errors.push('ErpPage component SCSS owns a raw max-inline-size');
  }
  if (!tokens.includes('@mixin base') ||
      !tokens.includes('--honesty-page-boxed-max-inline-size: 75rem')) {
    errors.push('ErpPage Component Token base is incomplete');
  }
  if (pageShell.includes('<erp-container')) {
    errors.push('ErpPageShell still duplicates the ErpPage width boundary');
  }
  if (!appShell.includes('--honesty-layout-available-block-size')) {
    errors.push('ErpAppShell does not expose the contextual page scroll boundary');
  }
  return errors;
}

function validateRepository() {
  const errors = validateCatalog(buildCatalog());
  for (const [relativePath, expected] of generatedArtifacts()) {
    const absolutePath = path.join(REPO_ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
      errors.push(`missing generated artifact: ${relativePath}`);
      continue;
    }
    if (fs.readFileSync(absolutePath, 'utf8') !== expected) {
      errors.push(`stale generated artifact: ${relativePath}`);
    }
  }

  const routes = fs.readFileSync(path.join(REPO_ROOT, 'src/app/app.routes.ts'), 'utf8');
  if (!routes.includes("path: 'components/:componentId'")) {
    errors.push('dedicated component showcase route is not registered');
  }
  const showcase = fs.readFileSync(
    path.join(REPO_ROOT, 'src/app/showcase/component-showcase/component-showcase.html'),
    'utf8',
  );
  if (!showcase.includes('<erp-review-component-host')) {
    errors.push('dedicated showcase does not render the live ERP owner');
  }
  errors.push(...validatePageOwner({
    source: fs.readFileSync(path.join(REPO_ROOT, 'src/app/controls/page/page.ts'), 'utf8'),
    styles: fs.readFileSync(path.join(REPO_ROOT, 'src/app/controls/page/page.scss'), 'utf8'),
    tokens: fs.readFileSync(
      path.join(REPO_ROOT, 'src/styles/foundation/components/page/_tokens.scss'),
      'utf8',
    ),
    pageShell: fs.readFileSync(
      path.join(REPO_ROOT, 'src/app/controls/page-shell/page-shell.html'),
      'utf8',
    ),
    appShell: fs.readFileSync(
      path.join(REPO_ROOT, 'src/app/controls/app-shell/app-shell.scss'),
      'utf8',
    ),
  }));
  return errors;
}

function selfTest() {
  const valid = [{
    id: 'button',
    selector: 'erp-button',
    className: 'ErpButton',
    category: 'Actions',
    classification: 'PUBLIC ERP COMPONENT',
    sourcePath: 'src/app/controls/button/button.ts',
    purpose: 'Button owner',
    publicApi: {inputs: [], outputs: [], models: []},
    nativeCoverage: ['button'],
    showcaseRoute: '/components/button',
  }, {
    id: 'page',
    selector: 'erp-page',
    className: 'ErpPage',
    category: 'Page Composition',
    classification: 'PUBLIC ERP COMPONENT',
    sourcePath: 'src/app/controls/page/page.ts',
    purpose: 'Page owner',
    publicApi: {inputs: [], outputs: [], models: []},
    nativeCoverage: [],
    showcaseRoute: '/components/page',
  }];
  if (validateCatalog(valid).length !== 0) throw new Error('valid catalog fixture failed');

  const fixtures = [
    valid.filter((entry) => entry.className !== 'ErpPage'),
    [...valid, {...valid[0]}],
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, showcaseRoute: null} : entry),
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, nativeCoverage: null} : entry),
  ];
  for (const fixture of fixtures) {
    if (validateCatalog(fixture).length === 0) {
      throw new Error('invalid catalog fixture was accepted');
    }
  }

  const validPage = {
    source: "selector: 'erp-page'; 'boxed' | 'fluid' | 'full'; 'document' | 'page' | 'free'; input<ErpPageWidthMode>('fluid'); input<ErpPageScrollMode>('document');",
    styles: '@include tokens.base; max-inline-size: var(--honesty-page-boxed-max-inline-size);',
    tokens: '@mixin base { --honesty-page-boxed-max-inline-size: 75rem; }',
    pageShell: '<main></main>',
    appShell: '--honesty-layout-available-block-size: 100%;',
  };
  if (validatePageOwner(validPage).length !== 0) {
    throw new Error('valid ErpPage fixture failed');
  }
  const invalidPages = [
    {...validPage, source: `${validPage.source} HttpClient`},
    {...validPage, styles: '@include tokens.base; max-inline-size: 75rem;'},
    {...validPage, pageShell: '<erp-container />'},
    {...validPage, tokens: '@mixin base {}'},
  ];
  for (const fixture of invalidPages) {
    if (validatePageOwner(fixture).length === 0) {
      throw new Error('invalid ErpPage fixture was accepted');
    }
  }
  console.log('ERP component catalog governance self-test PASS');
}

if (process.argv.includes('--self-test')) {
  selfTest();
} else {
  const errors = validateRepository();
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else {
    const catalog = buildCatalog();
    const publicCount = catalog.filter(
      (entry) => entry.classification === 'PUBLIC ERP COMPONENT',
    ).length;
    console.log(`ERP component catalog governance PASS (${publicCount} public components)`);
  }
}
