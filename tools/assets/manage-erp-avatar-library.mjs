import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const ASSET_ROOT = path.join(ROOT, 'public/assets/honesty-erp-avatars/users');
const MANIFEST_PATH = path.join(ASSET_ROOT, 'manifest.json');
const GENERATED_PATH = path.join(ROOT, 'src/app/controls/avatar-picker/avatar-catalog.generated.ts');
const URL_ROOT = '/assets/honesty-erp-avatars/users';
const MALE_NUMBERS = [...range(1, 25), ...range(71, 91), ...range(102, 115)];
const FEMALE_NUMBERS = [...range(26, 70), ...range(92, 101), 116];
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CRC_TABLE = createCrcTable();

function range(start, end) {
  return Array.from({length: end - start + 1}, (_, index) => start + index);
}

function createCrcTable() {
  return Array.from({length: 256}, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    return value >>> 0;
  });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  if (aboveDistance <= upperLeftDistance) return above;
  return upperLeft;
}

function inspectPng(buffer, sourceName) {
  if (buffer.length < 33 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`${sourceName}: invalid PNG signature`);
  }
  let offset = 8;
  let ihdr = null;
  let sawEnd = false;
  let hasTransparencyChunk = false;
  const imageData = [];
  while (offset < buffer.length) {
    if (offset + 12 > buffer.length) throw new Error(`${sourceName}: truncated PNG chunk`);
    const length = buffer.readUInt32BE(offset);
    const typeStart = offset + 4;
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const chunkEnd = dataEnd + 4;
    if (chunkEnd > buffer.length) throw new Error(`${sourceName}: truncated PNG payload`);
    const type = buffer.toString('ascii', typeStart, dataStart);
    if (crc32(buffer.subarray(typeStart, dataEnd)) !== buffer.readUInt32BE(dataEnd)) {
      throw new Error(`${sourceName}: ${type} CRC mismatch`);
    }
    const data = buffer.subarray(dataStart, dataEnd);
    if (type === 'IHDR') {
      if (ihdr || length !== 13) throw new Error(`${sourceName}: invalid IHDR`);
      ihdr = {
        width: data.readUInt32BE(0), height: data.readUInt32BE(4), bitDepth: data[8],
        colorType: data[9], compression: data[10], filter: data[11], interlace: data[12],
      };
    } else if (type === 'IDAT') imageData.push(data);
    else if (type === 'tRNS') hasTransparencyChunk = true;
    else if (type === 'IEND') {
      if (length !== 0) throw new Error(`${sourceName}: invalid IEND`);
      sawEnd = true;
      offset = chunkEnd;
      break;
    }
    offset = chunkEnd;
  }
  if (!ihdr || !sawEnd || offset !== buffer.length || imageData.length === 0) {
    throw new Error(`${sourceName}: incomplete PNG structure`);
  }
  if (ihdr.width !== 512 || ihdr.height !== 512) {
    throw new Error(`${sourceName}: expected 512x512, found ${ihdr.width}x${ihdr.height}`);
  }
  if (ihdr.bitDepth !== 8 || ihdr.colorType !== 6 || ihdr.compression !== 0 || ihdr.filter !== 0 || ihdr.interlace !== 0) {
    throw new Error(`${sourceName}: expected non-interlaced 8-bit RGBA PNG`);
  }
  const inflated = zlib.inflateSync(Buffer.concat(imageData));
  const bytesPerPixel = 4;
  const stride = ihdr.width * bytesPerPixel;
  if (inflated.length !== ihdr.height * (stride + 1)) {
    throw new Error(`${sourceName}: decompressed image length mismatch`);
  }
  let previous = Buffer.alloc(stride);
  let transparentPixels = 0;
  for (let row = 0; row < ihdr.height; row += 1) {
    const rowOffset = row * (stride + 1);
    const filter = inflated[rowOffset];
    const encoded = inflated.subarray(rowOffset + 1, rowOffset + 1 + stride);
    const decoded = Buffer.allocUnsafe(stride);
    for (let index = 0; index < stride; index += 1) {
      const left = index >= bytesPerPixel ? decoded[index - bytesPerPixel] : 0;
      const above = previous[index];
      const upperLeft = index >= bytesPerPixel ? previous[index - bytesPerPixel] : 0;
      const value = encoded[index];
      if (filter === 0) decoded[index] = value;
      else if (filter === 1) decoded[index] = (value + left) & 0xff;
      else if (filter === 2) decoded[index] = (value + above) & 0xff;
      else if (filter === 3) decoded[index] = (value + Math.floor((left + above) / 2)) & 0xff;
      else if (filter === 4) decoded[index] = (value + paeth(left, above, upperLeft)) & 0xff;
      else throw new Error(`${sourceName}: unsupported PNG filter ${filter}`);
    }
    for (let alpha = 3; alpha < decoded.length; alpha += bytesPerPixel) {
      if (decoded[alpha] < 255) transparentPixels += 1;
    }
    previous = decoded;
  }
  if (transparentPixels === 0 && !hasTransparencyChunk) {
    throw new Error(`${sourceName}: PNG has no transparent pixels`);
  }
  return {width: ihdr.width, height: ihdr.height, transparentPixels};
}

function mappingFor(gender, sourceNumber) {
  if (gender === 'male' && sourceNumber <= 20) {
    const suffix = String(sourceNumber).padStart(2, '0');
    return {id: `avatar-${suffix}`, filename: `avatar-${suffix}.png`, legacy: true};
  }
  if (gender === 'female' && sourceNumber >= 26 && sourceNumber <= 45) {
    const suffix = String(sourceNumber - 5).padStart(2, '0');
    return {id: `avatar-${suffix}`, filename: `avatar-${suffix}.png`, legacy: true};
  }
  const suffix = String(sourceNumber).padStart(3, '0');
  return {id: `avatar-${gender}-${suffix}`, filename: `avatar-${gender}-${suffix}.png`, legacy: false};
}

function expectedSourceEntries(sourceRoot) {
  const entries = [];
  for (const [gender, numbers] of [['male', MALE_NUMBERS], ['female', FEMALE_NUMBERS]]) {
    for (const sourceNumber of numbers) {
      const sourceRelativePath = `${gender}/Number=${sourceNumber}.png`;
      entries.push({
        gender, sourceNumber, sourceRelativePath,
        sourcePath: path.join(sourceRoot, gender, `Number=${sourceNumber}.png`),
        ...mappingFor(gender, sourceNumber),
      });
    }
  }
  return entries;
}

function inspectSource(sourceRoot) {
  const expected = expectedSourceEntries(sourceRoot);
  const expectedPaths = new Set(expected.map((item) => path.resolve(item.sourcePath)));
  const actual = [];
  for (const gender of ['male', 'female']) {
    const directory = path.join(sourceRoot, gender);
    if (!fs.existsSync(directory)) throw new Error(`Missing source directory: ${directory}`);
    for (const name of fs.readdirSync(directory)) {
      const absolute = path.join(directory, name);
      if (fs.statSync(absolute).isFile() && name.toLowerCase().endsWith('.png')) actual.push(path.resolve(absolute));
    }
  }
  const missing = expected.filter((item) => !fs.existsSync(item.sourcePath));
  const unexpected = actual.filter((item) => !expectedPaths.has(item));
  if (missing.length || unexpected.length) {
    throw new Error(`Source inventory mismatch: ${missing.length} missing, ${unexpected.length} unexpected`);
  }
  return expected.map((item, index) => {
    const buffer = fs.readFileSync(item.sourcePath);
    const png = inspectPng(buffer, item.sourceRelativePath);
    return {
      sequence: index + 1, id: item.id, gender: item.gender, sourceNumber: item.sourceNumber,
      sourceFile: item.sourceRelativePath,
      imageUrl: `${URL_ROOT}/${item.gender}/${item.filename}`,
      label: item.gender === 'male'
        ? `صورة رمزية ثلاثية الأبعاد للرجال رقم ${item.sourceNumber}`
        : `صورة رمزية ثلاثية الأبعاد للنساء رقم ${item.sourceNumber}`,
      width: png.width, height: png.height, transparency: true,
      transparentPixels: png.transparentPixels, bytes: buffer.length,
      sha256: sha256(buffer), legacyCompatibility: item.legacy, sourcePath: item.sourcePath,
    };
  });
}

function publicItem(item) {
  const {sourcePath: _sourcePath, ...result} = item;
  return result;
}

function manifestFor(items) {
  const publicItems = items.map(publicItem);
  const librarySha256 = sha256(Buffer.from(
    publicItems.map((item) => `${item.gender}:${item.sourceNumber}:${item.sha256}`).join('\n'),
  ));
  return {
    version: 2,
    authority: 'Product Owner supplied 3D avatar PNG library',
    decisionDate: '2026-10-08',
    librarySha256,
    total: publicItems.length,
    male: publicItems.filter((item) => item.gender === 'male').length,
    female: publicItems.filter((item) => item.gender === 'female').length,
    width: 512,
    height: 512,
    compatibility: {
      preservedLegacyIds: 40,
      preservedLegacyUrls: 40,
      strategy: 'avatar-01..20 remain male; avatar-21..40 remain female',
      crosswalk: publicItems.filter((item) => item.legacyCompatibility).map((item) => ({
        legacyId: item.id, gender: item.gender, sourceNumber: item.sourceNumber,
        imageUrl: item.imageUrl, sha256: item.sha256,
      })),
    },
    items: publicItems,
  };
}

function generatedCatalog(manifest) {
  const items = manifest.items.map(({id, gender, imageUrl, label}) => ({id, gender, imageUrl, label}));
  return `// Generated by tools/assets/manage-erp-avatar-library.mjs. Do not edit manually.\n` +
    `import type {ErpAvatarCatalogItem} from './avatar-picker-contracts';\n\n` +
    `export const ERP_AVATAR_CATALOG_GENERATED = Object.freeze(\n` +
    `  (${JSON.stringify(items, null, 2)} as const).map((item) => Object.freeze(item)),\n` +
    `) satisfies readonly ErpAvatarCatalogItem[];\n`;
}

function validateManifest(manifest) {
  const errors = [];
  if (manifest.version !== 2) errors.push('manifest version must be 2');
  if (manifest.total !== 116 || manifest.male !== 60 || manifest.female !== 56) {
    errors.push('manifest counts must be 116 total, 60 male, and 56 female');
  }
  if (!Array.isArray(manifest.items) || manifest.items.length !== 116) {
    errors.push('manifest must contain exactly 116 items');
    return errors;
  }
  if (new Set(manifest.items.map((item) => item.id)).size !== 116) errors.push('manifest IDs must be unique');
  if (new Set(manifest.items.map((item) => item.imageUrl)).size !== 116) errors.push('manifest URLs must be unique');
  if (manifest.items.filter((item) => item.gender === 'male').length !== 60) errors.push('male classification mismatch');
  if (manifest.items.filter((item) => item.gender === 'female').length !== 56) errors.push('female classification mismatch');
  const numbers = manifest.items.map((item) => item.sourceNumber).sort((a, b) => a - b);
  if (numbers.join(',') !== range(1, 116).join(',')) errors.push('source numbers must cover 1 through 116');
  for (let index = 0; index < manifest.items.length; index += 1) {
    if (manifest.items[index].sequence !== index + 1) errors.push('manifest sequence is not deterministic');
  }
  if (manifest.compatibility?.crosswalk?.length !== 40) errors.push('crosswalk must preserve 40 legacy IDs');
  const expectedMaleNumbers = new Set(MALE_NUMBERS);
  const expectedFemaleNumbers = new Set(FEMALE_NUMBERS);
  for (const item of manifest.items) {
    const validMembership = item.gender === 'male'
      ? expectedMaleNumbers.has(item.sourceNumber)
      : item.gender === 'female' && expectedFemaleNumbers.has(item.sourceNumber);
    if (!validMembership) errors.push(`gender/source classification mismatch for ${item.id}`);
    if (!item.imageUrl.startsWith(`${URL_ROOT}/${item.gender}/`)) {
      errors.push(`gender/path classification mismatch for ${item.id}`);
    }
    if (typeof item.label !== 'string' || item.label.trim().length === 0) {
      errors.push(`missing searchable accessible label for ${item.id}`);
    }
  }
  for (let legacyNumber = 1; legacyNumber <= 40; legacyNumber += 1) {
    const id = `avatar-${String(legacyNumber).padStart(2, '0')}`;
    const item = manifest.items.find((candidate) => candidate.id === id);
    const gender = legacyNumber <= 20 ? 'male' : 'female';
    if (!item || item.gender !== gender || item.imageUrl !== `${URL_ROOT}/${gender}/${id}.png`) {
      errors.push(`legacy compatibility mismatch for ${id}`);
    }
  }
  return errors;
}

function walkTextFiles(directory) {
  const results = [];
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...walkTextFiles(absolute));
    else if (/\.(?:ts|html|scss|mjs|js|json)$/iu.test(entry.name)) results.push(absolute);
  }
  return results;
}

function checkRepository() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8').replace(/^\uFEFF/u, ''));
  const errors = validateManifest(manifest);
  const expectedRelativePaths = new Set();
  for (const item of manifest.items ?? []) {
    const relative = item.imageUrl.replace(`${URL_ROOT}/`, '');
    expectedRelativePaths.add(relative);
    const absolute = path.join(ASSET_ROOT, ...relative.split('/'));
    if (!fs.existsSync(absolute)) {
      errors.push(`missing asset ${item.imageUrl}`);
      continue;
    }
    const buffer = fs.readFileSync(absolute);
    try {
      const png = inspectPng(buffer, item.imageUrl);
      if (png.width !== item.width || png.height !== item.height || item.transparency !== true) {
        errors.push(`PNG metadata mismatch for ${item.imageUrl}`);
      }
    } catch (error) {
      errors.push(error.message);
    }
    if (buffer.length !== item.bytes) errors.push(`byte-size mismatch for ${item.imageUrl}`);
    if (sha256(buffer) !== item.sha256) errors.push(`SHA-256 mismatch for ${item.imageUrl}`);
  }
  const actualRelativePaths = [];
  for (const gender of ['male', 'female']) {
    const directory = path.join(ASSET_ROOT, gender);
    for (const name of fs.readdirSync(directory)) {
      if (name.toLowerCase().endsWith('.png')) actualRelativePaths.push(`${gender}/${name}`);
    }
  }
  if (actualRelativePaths.length !== 116) errors.push(`asset tree contains ${actualRelativePaths.length} PNG files`);
  for (const relative of actualRelativePaths) {
    if (!expectedRelativePaths.has(relative)) errors.push(`untracked avatar asset ${relative}`);
  }
  const aggregate = sha256(Buffer.from(
    manifest.items.map((item) => `${item.gender}:${item.sourceNumber}:${item.sha256}`).join('\n'),
  ));
  if (aggregate !== manifest.librarySha256) errors.push('library SHA-256 mismatch');
  if (fs.readFileSync(GENERATED_PATH, 'utf8') !== generatedCatalog(manifest)) {
    errors.push('generated TypeScript catalog is stale');
  }
  const allowedUrls = new Set(manifest.items.map((item) => item.imageUrl));
  const urlPattern = /\/assets\/honesty-erp-avatars\/users\/(?:male|female)\/[A-Za-z0-9._-]+\.png/gu;
  for (const sourceRoot of ['src', 'tools']) {
    for (const file of walkTextFiles(path.join(ROOT, sourceRoot))) {
      const text = fs.readFileSync(file, 'utf8');
      for (const match of text.matchAll(urlPattern)) {
        if (!allowedUrls.has(match[0])) {
          errors.push(`stale active avatar URL ${match[0]} in ${path.relative(ROOT, file)}`);
        }
      }
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`ERP avatar asset library: PASS (${manifest.total} total, ${manifest.male} male, ${manifest.female} female, SHA-256 ${manifest.librarySha256})`);
}

function importLibrary(sourceRoot) {
  const absoluteSource = path.resolve(sourceRoot);
  const items = inspectSource(absoluteSource);
  const manifest = manifestFor(items);
  const errors = validateManifest(manifest);
  if (errors.length) throw new Error(errors.join('\n'));
  fs.mkdirSync(path.join(ASSET_ROOT, 'male'), {recursive: true});
  fs.mkdirSync(path.join(ASSET_ROOT, 'female'), {recursive: true});
  for (const item of items) {
    fs.copyFileSync(item.sourcePath, path.join(ASSET_ROOT, item.gender, path.basename(item.imageUrl)));
  }
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(GENERATED_PATH, generatedCatalog(manifest));
  checkRepository();
  console.log(`Imported Product Owner avatar library from ${absoluteSource}`);
}

const args = process.argv.slice(2);
if (args[0] === '--import' && args[1]) importLibrary(args[1]);
else if (args[0] === '--check') checkRepository();
else {
  console.error('Usage: node tools/assets/manage-erp-avatar-library.mjs --check | --import <source-root>');
  process.exitCode = 2;
}
