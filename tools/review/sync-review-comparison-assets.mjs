import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {REVIEW_EVIDENCE} from '../catalog/erp-review-authority.mjs';
import {REPO_ROOT} from '../catalog/erp-component-catalog.mjs';

const sync = process.argv.includes('--sync');
const imagePaths = new Set();
for (const evidence of REVIEW_EVIDENCE.values()) {
  for (const imagePath of [evidence.referenceImage, evidence.implementationImage]) {
    if (imagePath) imagePaths.add(imagePath);
  }
}

function digest(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const errors = [];
for (const imagePath of imagePaths) {
  if (!imagePath.startsWith('/review-evidence/')) {
    errors.push(`unsupported review-evidence URL: ${imagePath}`);
    continue;
  }
  const relativePath = imagePath.slice('/review-evidence/'.length);
  const sourcePath = path.join(REPO_ROOT, 'docs/review-evidence', relativePath);
  const publicPath = path.join(REPO_ROOT, 'public/assets/review-evidence', relativePath);
  if (!fs.existsSync(sourcePath)) {
    errors.push(`missing canonical review evidence: ${sourcePath}`);
    continue;
  }
  if (sync) {
    fs.mkdirSync(path.dirname(publicPath), {recursive: true});
    fs.copyFileSync(sourcePath, publicPath);
  }
  if (!fs.existsSync(publicPath)) {
    errors.push(`missing published review evidence: ${publicPath}`);
    continue;
  }
  if (digest(sourcePath) !== digest(publicPath)) {
    errors.push(`published review evidence differs from canonical source: ${imagePath}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Review comparison assets ${sync ? 'synchronized' : 'PASS'} (${imagePaths.size} images).`);
