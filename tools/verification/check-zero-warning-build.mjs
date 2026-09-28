import {spawnSync} from 'node:child_process';

const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npmExecutable, ['run', 'build'], {
  encoding: 'utf8',
  shell: false,
  env: process.env,
});

const stdout = result.stdout ?? '';
const stderr = result.stderr ?? '';
process.stdout.write(stdout);
process.stderr.write(stderr);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

const combined = stdout + '\n' + stderr;
const angularWarningPattern =
  /(?:▲\s*\[WARNING\]|\[WARNING\]|WARNING\s+in\s+)/i;

if (angularWarningPattern.test(combined)) {
  console.error('Zero-warning build gate failed: Angular emitted at least one warning.');
  process.exit(1);
}

console.log('Zero-warning build gate: PASS');
