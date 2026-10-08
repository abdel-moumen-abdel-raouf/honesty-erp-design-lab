import fs from 'node:fs';
import path from 'node:path';
import {
  REPO_ROOT,
  buildCatalog,
  generatedArtifacts,
} from '../catalog/erp-component-catalog.mjs';

const EXACT_CORE_FOCUS = new Map([
  ['ErpAvatar', 'avatar'],
  ['ErpAvatarPicker', 'avatar-picker'],
  ['ErpSelect', 'select'],
  ['ErpStatusBadge', 'status-badge'],
  ['ErpTable', 'table'],
  ['ErpTabs', 'tabs'],
]);

function validateWorkbenchContracts({controlPanel, floatingSource, floatingStyles, exactSource, exactTemplate}) {
  const errors = [];
  for (const marker of ['invalidDrafts', 'structuredValueError', 'Array.isArray(value)']) {
    if (!controlPanel.includes(marker)) errors.push(`structured editor is missing ${marker}`);
  }
  for (const marker of ['resolveReviewFloatingPosition', 'availableWidth', "direction === 'rtl'"]) {
    if (!floatingSource.includes(marker)) errors.push(`floating preview is missing ${marker}`);
  }
  if (!floatingStyles.includes('left: 0') || floatingStyles.includes('overflow: clip')) {
    errors.push('floating preview does not use an unclipped physical positioning origin');
  }
  if (!exactSource.includes('CoreBatch') ||
      !exactTemplate.includes('data-showcase-exact-reference-toggle') ||
      !exactTemplate.includes('@if (expanded())')) {
    errors.push('on-demand exact-reference owner is incomplete');
  }
  return errors;
}

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
    if (!entry.displayNameAr || !entry.descriptionAr) {
      errors.push(`${entry.className} has no Arabic showcase metadata`);
    }
    if (entry.showcaseOwnerPath !== `src/app/showcase/components/${entry.id}/${entry.id}-showcase.ts`) {
      errors.push(`${entry.className} has no dedicated showcase owner path`);
    }
    if (entry.showcaseLoader !== entry.id) {
      errors.push(`${entry.className} has no dedicated showcase loader`);
    }
    if (!entry.publicApi || !Array.isArray(entry.publicApi.inputs) ||
      !Array.isArray(entry.publicApi.outputs) || !Array.isArray(entry.publicApi.models)) {
      errors.push(`${entry.className} has no public API inventory`);
    }
    if (!Array.isArray(entry.showcaseCases) || entry.showcaseCases.length === 0) {
      errors.push(`${entry.className} has no live showcase cases`);
    } else {
      const requiredInputs = entry.publicApi.inputs.filter((input) => input.required);
      for (const showcaseCase of entry.showcaseCases) {
        for (const requiredInput of requiredInputs) {
          if (!Object.prototype.hasOwnProperty.call(showcaseCase.inputs, requiredInput.name)) {
            errors.push(
              `${entry.className} showcase case ${showcaseCase.id} omits required input ${requiredInput.name}`,
            );
          }
        }
      }
    }
    const coverage = entry.showcaseCoverage;
    if (!coverage) {
      errors.push(`${entry.className} has no machine-readable showcase coverage`);
    } else {
      for (const input of entry.publicApi.inputs) {
        if (!coverage.coveredInputs.includes(input.name)) {
          errors.push(`${entry.className} input ${input.name} has no showcase coverage`);
        }
        for (const value of input.values) {
          if (!coverage.coveredValues[input.name]?.includes(value)) {
            errors.push(`${entry.className} input ${input.name} value ${value} is uncovered`);
          }
        }
      }
      for (const model of entry.publicApi.models) {
        if (!coverage.coveredModels.includes(model.name)) {
          errors.push(`${entry.className} model ${model.name} has no controlled evidence`);
        }
      }
      for (const output of entry.publicApi.outputs) {
        if (!coverage.coveredOutputs.includes(output)) {
          errors.push(`${entry.className} output ${output} has no event evidence`);
        }
      }
      if (entry.visualReference && coverage.coveredReferenceCases.length === 0) {
        errors.push(`${entry.className} exact-reference evidence is missing`);
      }
    }
    const controlNames = new Set(entry.showcaseControls.map((control) => control.name));
    for (const inputApi of entry.publicApi.inputs) {
      if (!controlNames.has(inputApi.name)) {
        errors.push(`${entry.className} input ${inputApi.name} has no live control`);
      }
    }
    for (const modelApi of entry.publicApi.models) {
      if (!controlNames.has(modelApi.name)) {
        errors.push(`${entry.className} model ${modelApi.name} has no live control`);
      }
    }
    if (entry.publicApi.inputs.some((inputApi) => inputApi.name === 'label') &&
        !Object.prototype.hasOwnProperty.call(entry.showcaseInitialValues, 'label')) {
      errors.push(`${entry.className} live showcase has no initial label`);
    }
  }

  if (!publicEntries.some((entry) => entry.className === 'ErpPage')) {
    errors.push('ErpPage is missing from the public catalog');
  }

  const buttonGroup = publicEntries.find((entry) => entry.className === 'ErpButtonGroup');
  if (buttonGroup && (!Array.isArray(buttonGroup.showcaseInitialValues?.items) ||
      buttonGroup.showcaseInitialValues.items.length < 3)) {
    errors.push('ErpButtonGroup live showcase does not start with a real multi-action group');
  }
  for (const className of ['ErpFab', 'ErpExtendedFab', 'ErpFabMenu']) {
    const entry = publicEntries.find((candidate) => candidate.className === className);
    if (!entry) continue;
    const controlNames = new Set(entry?.showcaseControls.map((control) => control.name) ?? []);
    if (!controlNames.has('$previewInline') || !controlNames.has('$previewBlock')) {
      errors.push(`${className} live showcase has no two-axis floating-position controls`);
    }
  }
  for (const className of ['ErpFabMenu', 'ErpSplitButton']) {
    const entry = publicEntries.find((candidate) => candidate.className === className);
    if (!entry) continue;
    const items = entry?.showcaseInitialValues?.items;
    const presentations = new Set(
      Array.isArray(items) ? items.map((item) => item?.presentation) : [],
    );
    if (!Array.isArray(items) || items.length < 5 ||
        !['text', 'icon', 'icon-text'].every((value) => presentations.has(value))) {
      errors.push(`${className} live showcase does not cover five mixed action presentations`);
    }
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
  if (!routes.includes("path: 'components'")) {
    errors.push('component catalog landing route is not registered');
  }
  if (!routes.includes("path: 'components/:componentId'")) {
    errors.push('dedicated component showcase route is not registered');
  }
  const showcase = fs.readFileSync(
    path.join(REPO_ROOT, 'src/app/showcase/component-showcase/component-showcase.html'),
    'utf8',
  );
  if (!showcase.includes('*ngComponentOutlet="dedicatedShowcase"')) {
    errors.push('component page does not load its dedicated showcase owner');
  }
  if (showcase.includes('erp-review-component-host')) {
    errors.push('generic input-only component fallback is still active');
  }
  const appTemplate = fs.readFileSync(path.join(REPO_ROOT, 'src/app/app.html'), 'utf8');
  if (!appTemplate.includes('<app-review-catalog-navigation') ||
      appTemplate.includes('lab-component-group') ||
      appTemplate.includes('id="lab-nav"')) {
    errors.push('compact catalog navigation has not replaced the legacy navigation matrices');
  }
  const migrationLedger = fs.readFileSync(
    path.join(REPO_ROOT, 'docs/governance/LEGACY_SHOWCASE_MIGRATION_LEDGER.md'),
    'utf8',
  );
  if (!migrationLedger.includes('Unmapped meaningful legacy sections: **0**')) {
    errors.push('legacy showcase migration ledger is incomplete');
  }
  for (const oldRoute of [
    'foundation/overview', 'primitives/structural', 'primitives/typography',
    'primitives/icons', 'controls/buttons', 'controls/tooltips', 'controls/inputs',
    'controls/empty-states', 'controls/overlays', 'controls/core-batch',
    'controls/data-batch', 'controls/forms-batch', 'controls/entity-form-batch',
    'controls/shell-batch',
  ]) {
    const routeStart = routes.indexOf(`path: '${oldRoute}'`);
    const routeEnd = routes.indexOf('}', routeStart);
    if (routeStart < 0 || !routes.slice(routeStart, routeEnd).includes('redirectTo:')) {
      errors.push(`legacy route ${oldRoute} is not a redirect alias`);
    }
  }
  for (const entry of buildCatalog().filter((candidate) => candidate.classification === 'PUBLIC ERP COMPONENT')) {
    const htmlPath = entry.showcaseOwnerPath.replace(/\.ts$/, '.html');
    const html = fs.readFileSync(path.join(REPO_ROOT, htmlPath), 'utf8');
    if (!html.includes(`data-dedicated-showcase="${entry.id}"`) ||
        !html.includes('data-showcase-case="live"') ||
        !html.includes(`<${entry.selector}`)) {
      errors.push(`${entry.className} dedicated showcase is empty or does not render its owner`);
    }
    if (!html.includes('data-showcase-sections="1"') ||
        !html.includes('<app-review-showcase-control-panel')) {
      errors.push(`${entry.className} does not use the single live-preview control contract`);
    }
    if ((html.match(/data-showcase-target/g) ?? []).length !== 1) {
      errors.push(`${entry.className} does not identify exactly one live showcase target`);
    }
    const exactFocus = EXACT_CORE_FOCUS.get(entry.className);
    if (exactFocus && !html.includes(`<app-review-showcase-exact-reference focus="${exactFocus}" />`)) {
      errors.push(`${entry.className} does not preserve its on-demand exact-reference evidence`);
    }
    if (['ErpFab', 'ErpExtendedFab', 'ErpFabMenu'].includes(entry.className) &&
        (!html.includes('<app-review-showcase-floating-preview') ||
          html.includes('translate(-50%, -50%)'))) {
      errors.push(`${entry.className} does not use the bounded floating preview owner`);
    }
    for (const inputApi of entry.publicApi.inputs) {
      const bindingName = inputApi.name === 'forId' ? 'for' : inputApi.name;
      const cvaDisabled = inputApi.name === 'disabled' &&
        html.includes('[formControl]="control"') &&
        html.includes('data-showcase-cva-disabled-control');
      if (!cvaDisabled && !html.includes(`[${bindingName}]="$any(value('${inputApi.name}'))"`)) {
        errors.push(`${entry.className} live target is not bound to input ${inputApi.name}`);
      }
    }
    for (const outputName of entry.publicApi.outputs) {
      if (!html.includes(`(${outputName})="recordEvent('${outputName}', $event)"`)) {
        errors.push(`${entry.className} live target has no event evidence for ${outputName}`);
      }
    }
    const projectedChildPattern = new RegExp(
      `<${entry.selector}[\\s\\S]*?>\\s*<erp-`,
    );
    if (entry.showcaseCoverage.coveredProjectionSlots.length &&
        entry.className !== 'ErpText' &&
        !projectedChildPattern.test(html)) {
      errors.push(`${entry.className} projection showcase has no visible projected content`);
    }
    if (entry.className === 'ErpText' && !html.includes('نص تجريبي مباشر')) {
      errors.push('ErpText projection showcase has no visible authored text');
    }
  }
  errors.push(...validateWorkbenchContracts({
    controlPanel: fs.readFileSync(path.join(
      REPO_ROOT,
      'src/app/review-internals/showcase-control-panel/showcase-control-panel.ts',
    ), 'utf8'),
    floatingSource: fs.readFileSync(path.join(
      REPO_ROOT,
      'src/app/review-internals/showcase-floating-preview/showcase-floating-preview.ts',
    ), 'utf8'),
    floatingStyles: fs.readFileSync(path.join(
      REPO_ROOT,
      'src/app/review-internals/showcase-floating-preview/showcase-floating-preview.scss',
    ), 'utf8'),
    exactSource: fs.readFileSync(path.join(
      REPO_ROOT,
      'src/app/review-internals/showcase-exact-reference/showcase-exact-reference.ts',
    ), 'utf8'),
    exactTemplate: fs.readFileSync(path.join(
      REPO_ROOT,
      'src/app/review-internals/showcase-exact-reference/showcase-exact-reference.html',
    ), 'utf8'),
  }));
  const tableReference = fs.readFileSync(path.join(
    REPO_ROOT,
    'src/app/review-internals/review-core-table/review-core-table.html',
  ), 'utf8');
  for (const owner of [
    'erp-table-toolbar', 'erp-search-box', 'erp-column-chooser', 'erp-table', 'erp-pagination',
  ]) {
    if (!tableReference.includes(`<${owner}`)) {
      errors.push(`Table exact-reference experience is missing ${owner}`);
    }
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
    showcaseOwnerPath: 'src/app/showcase/components/button/button-showcase.ts',
    showcaseLoader: 'button',
    displayNameAr: 'زر',
    descriptionAr: 'وصف',
    showcaseCases: [{id: 'default', label: 'default', inputs: {}}],
    showcaseInitialValues: {},
    showcaseControls: [],
    showcaseCoverage: {coveredInputs: [], coveredModels: [], coveredOutputs: [], coveredValues: {}, coveredStates: [], coveredProjectionSlots: [], coveredReferenceCases: [], evidenceKind: 'STATIC_COMPONENT'},
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
    showcaseOwnerPath: 'src/app/showcase/components/page/page-showcase.ts',
    showcaseLoader: 'page',
    displayNameAr: 'صفحة',
    descriptionAr: 'وصف',
    showcaseCases: [{id: 'default', label: 'default', inputs: {}}],
    showcaseInitialValues: {},
    showcaseControls: [],
    showcaseCoverage: {coveredInputs: [], coveredModels: [], coveredOutputs: [], coveredValues: {}, coveredStates: [], coveredProjectionSlots: [], coveredReferenceCases: [], evidenceKind: 'STATIC_COMPONENT'},
  }];
  if (validateCatalog(valid).length !== 0) throw new Error('valid catalog fixture failed');

  const fixtures = [
    valid.filter((entry) => entry.className !== 'ErpPage'),
    [...valid, {...valid[0]}],
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, showcaseRoute: null} : entry),
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, nativeCoverage: null} : entry),
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, showcaseOwnerPath: null} : entry),
    valid.map((entry) => entry.className === 'ErpButton' ? {...entry, showcaseCoverage: null} : entry),
    valid.map((entry) => entry.className === 'ErpButton'
      ? {
          ...entry,
          publicApi: {inputs: [{name: 'label', required: true, values: []}], outputs: [], models: []},
          showcaseCases: [{id: 'default', label: 'default', inputs: {}}],
          showcaseInitialValues: {},
          showcaseControls: [],
          showcaseCoverage: {...entry.showcaseCoverage, coveredInputs: []},
        }
      : entry),
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

  const validWorkbench = {
    controlPanel: 'invalidDrafts structuredValueError Array.isArray(value)',
    floatingSource: "resolveReviewFloatingPosition availableWidth direction === 'rtl'",
    floatingStyles: 'left: 0;',
    exactSource: 'CoreBatch',
    exactTemplate: 'data-showcase-exact-reference-toggle @if (expanded())',
  };
  if (validateWorkbenchContracts(validWorkbench).length !== 0) {
    throw new Error('valid workbench fixture failed');
  }
  const invalidWorkbenches = [
    {...validWorkbench, controlPanel: 'JSON.parse(value)'},
    {...validWorkbench, floatingSource: 'translate(-50%, -50%)'},
    {...validWorkbench, floatingStyles: 'left: 0; overflow: clip;'},
    {...validWorkbench, exactTemplate: '<app-review-exact-core-showcase />'},
  ];
  for (const fixture of invalidWorkbenches) {
    if (validateWorkbenchContracts(fixture).length === 0) {
      throw new Error('invalid workbench fixture was accepted');
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
