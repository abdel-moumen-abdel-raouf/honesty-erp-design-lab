import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const toolDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(toolDirectory, '..', '..');
const overviewPath = resolve(
  repositoryRoot,
  'src',
  'app',
  'foundation',
  'overview',
  'overview.html',
);

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

function runSelfTest() {
  const allowed = findNonErpAuthoredTags(
    '<erp-container><erp-stack><erp-text>Text</erp-text></erp-stack></erp-container>',
  );
  if (allowed.length !== 0) {
    throw new Error('Overview ERP-only authoring self-test rejected ERP tags.');
  }

  const rejected = findNonErpAuthoredTags(
    '<erp-container><section><erp-text>Text</erp-text></section></erp-container>',
  );
  if (rejected.length !== 1 || rejected[0] !== 'section') {
    throw new Error('Overview ERP-only authoring self-test failed to detect native HTML.');
  }

  console.log('Overview ERP-only authoring self-test: PASS');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  const source = readFileSync(overviewPath, 'utf8');
  const violations = findNonErpAuthoredTags(source);

  if (violations.length > 0) {
    throw new Error(
      'Foundation Overview must author ERP tags only. Native/authored tags found: ' +
        violations.join(', '),
    );
  }

  console.log('Foundation Overview ERP-only authoring: PASS');
}
