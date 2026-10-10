import fs from 'node:fs';
import path from 'node:path';
import {
  NATIVE_ELEMENT_COVERAGE,
  REPO_ROOT,
} from '../catalog/erp-component-catalog.mjs';

const DESIGN_LAB_NATIVE_OWNERS = new Map([
  ['src/app/app.html', {
    tags: new Set(['header', 'nav', 'main', 'div', 'span', 'a']),
    reason: 'Design Lab review chrome and router host; not a production Feature/Page.',
  }],
  ['src/app/review-internals/review-chart/review-chart.html', {
    tags: new Set(['svg']),
    reason: 'Bounded Design Lab chart drawing evidence; no public chart owner exists.',
  }],
  ['src/app/review-internals/review-core-table/review-core-table.html', {
    tags: new Set(['section', 'div', 'span']),
    reason: 'Bounded exact-reference measurement harness; production output remains ERP-owned.',
  }],
  ['src/app/review-internals/review-catalog-navigation/review-catalog-navigation.html', {
    tags: new Set(['nav', 'a', 'div', 'section']),
    reason: 'Design Lab catalog navigation; no public ERP link/navigation-list owner exists.',
  }],
  ['src/app/review-internals/showcase-evidence-image/showcase-evidence-image.html', {
    tags: new Set(['img']),
    reason: 'Bounded Design Lab evidence-image owner for committed review captures; production image semantics remain ERP-owned.',
  }],
  ['src/app/showcase/component-catalog/component-catalog.html', {
    tags: new Set(['div', 'a']),
    reason: 'Design Lab catalog landing links; no public ERP link owner exists.',
  }],
]);

const COVERAGE = new Map(NATIVE_ELEMENT_COVERAGE.map((entry) => [entry.tag, entry]));
const TAG_PATTERN = /<\s*([a-zA-Z][\w-]*)\b/g;

function posix(value) {
  return value.split(path.sep).join('/');
}

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function isComponentAnatomy(sourcePath) {
  return sourcePath.startsWith('src/app/controls/') ||
    sourcePath.startsWith('src/app/primitives/') ||
    sourcePath.startsWith('src/app/shared/');
}

export function validateTemplate(sourcePath, source) {
  const errors = [];
  for (const match of source.matchAll(TAG_PATTERN)) {
    const tag = match[1].toLowerCase();
    const contract = COVERAGE.get(tag);
    if (!contract) continue;
    const exactAllowed = contract.allowedPaths.includes(sourcePath);
    const designLabOwner = DESIGN_LAB_NATIVE_OWNERS.get(sourcePath);
    const designLabAllowed = designLabOwner?.tags.has(tag) ?? false;

    if (contract.policy === 'GLOBAL_OWNER_ONLY' || contract.policy === 'CONTEXTUAL') {
      if (!exactAllowed && !designLabAllowed) {
        errors.push(`${sourcePath}: raw <${tag}> is owned by ${contract.owners.join(', ')}`);
      }
      continue;
    }

    if (
      contract.policy === 'PAGE_AND_CONSUMER_BANNED' &&
      !exactAllowed &&
      !designLabAllowed &&
      !isComponentAnatomy(sourcePath)
    ) {
      errors.push(`${sourcePath}: consumer raw <${tag}> must use an ERP structural/text owner`);
    }
  }
  return errors;
}

function validateRepository() {
  const files = walk(path.join(REPO_ROOT, 'src/app')).filter(
    (absolutePath) => absolutePath.endsWith('.html'),
  );
  return files.flatMap((absolutePath) => {
    const sourcePath = posix(path.relative(REPO_ROOT, absolutePath));
    return validateTemplate(sourcePath, fs.readFileSync(absolutePath, 'utf8'));
  });
}

function selfTest() {
  const validFixtures = [
    ['src/app/controls/button/button.html', '<button type="button"></button>'],
    ['src/app/controls/table/table.html', '<table><tbody><tr><td></td></tr></tbody></table>'],
    ['src/app/controls/page-header/page-header.html', '<header><div></div></header>'],
    ['src/app/showcase/example/example.html', '<erp-button label="حفظ" /><erp-text>نص</erp-text>'],
  ];
  for (const [sourcePath, source] of validFixtures) {
    if (validateTemplate(sourcePath, source).length) throw new Error(`valid fixture failed: ${sourcePath}`);
  }

  const invalidFixtures = [
    ['src/app/showcase/example/example.html', '<button>حفظ</button>'],
    ['src/app/showcase/example/example.html', '<input type="text">'],
    ['src/app/showcase/example/example.html', '<select><option>أ</option></select>'],
    ['src/app/showcase/example/example.html', '<table><tr><td>أ</td></tr></table>'],
    ['src/app/showcase/example/example.html', '<h2>عنوان</h2>'],
    ['src/app/showcase/example/example.html', '<div>محتوى</div>'],
    ['src/app/controls/select/select.html', '<input type="search">'],
  ];
  for (const [sourcePath, source] of invalidFixtures) {
    if (validateTemplate(sourcePath, source).length === 0) {
      throw new Error(`invalid fixture was accepted: ${sourcePath}`);
    }
  }
  console.log('ERP native element ownership self-test PASS');
}

if (process.argv.includes('--self-test')) {
  selfTest();
} else {
  const errors = validateRepository();
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`ERP native element ownership PASS (${NATIVE_ELEMENT_COVERAGE.length} governed tag contracts)`);
  }
}
