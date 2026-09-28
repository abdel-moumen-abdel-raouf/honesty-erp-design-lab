import {spawnSync} from 'node:child_process';
import process from 'node:process';

const ANGULAR_WARNING_PATTERN =
  /(?:▲\s*\[WARNING\]|\[WARNING\]|WARNING\s+in\s+)/i;

export function hasAngularWarning(output) {
  return ANGULAR_WARNING_PATTERN.test(output);
}

export function resolveNpmInvocation(env = process.env, platform = process.platform) {
  const npmExecPath = env.npm_execpath?.trim();
  if (npmExecPath) {
    return {
      command: process.execPath,
      args: [npmExecPath, 'run', 'build'],
    };
  }

  if (platform === 'win32') {
    return {
      command: env.ComSpec?.trim() || 'cmd.exe',
      args: ['/d', '/s', '/c', 'npm run build'],
    };
  }

  return {
    command: 'npm',
    args: ['run', 'build'],
  };
}

function runSelfTest() {
  if (!hasAngularWarning('▲ [WARNING] component exceeded maximum budget')) {
    throw new Error('Zero-warning gate self-test failed to detect Angular warning.');
  }

  if (!hasAngularWarning('[WARNING] Module is not ESM')) {
    throw new Error('Zero-warning gate self-test failed to detect bracket warning.');
  }

  if (hasAngularWarning('Application bundle generation complete.')) {
    throw new Error('Zero-warning gate self-test produced a false positive.');
  }

  const npmCli = resolveNpmInvocation(
    {npm_execpath: 'C:\\node\\npm-cli.js'},
    'win32',
  );
  if (
    npmCli.command !== process.execPath ||
    npmCli.args[0] !== 'C:\\node\\npm-cli.js' ||
    npmCli.args[1] !== 'run' ||
    npmCli.args[2] !== 'build'
  ) {
    throw new Error('Zero-warning gate self-test rejected npm_execpath invocation.');
  }

  const cmdFallback = resolveNpmInvocation({ComSpec: 'C:\\Windows\\System32\\cmd.exe'}, 'win32');
  if (
    cmdFallback.command !== 'C:\\Windows\\System32\\cmd.exe' ||
    cmdFallback.args.join(' ') !== '/d /s /c npm run build'
  ) {
    throw new Error('Zero-warning gate self-test rejected Windows fallback invocation.');
  }

  console.log('Zero-warning build gate self-test: PASS');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const invocation = resolveNpmInvocation();
const result = spawnSync(invocation.command, invocation.args, {
  encoding: 'utf8',
  shell: false,
  env: process.env,
  stdio: ['inherit', 'pipe', 'pipe'],
});

const stdout = result.stdout ?? '';
const stderr = result.stderr ?? '';
process.stdout.write(stdout);
process.stderr.write(stderr);

if (result.error) {
  console.error('Zero-warning build gate could not start the build process.');
  console.error(result.error);
  process.exit(1);
}

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

if (hasAngularWarning(stdout + '\n' + stderr)) {
  console.error('Zero-warning build gate failed: Angular emitted at least one warning.');
  process.exit(1);
}

console.log('Zero-warning build gate: PASS');
