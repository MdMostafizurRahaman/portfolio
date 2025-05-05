// Simple vite development server starter
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting Vite development server...');

// Run the vite command
const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const vite = spawn(cmd, ['vite'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  env: {
    ...process.env,
    HOST: '0.0.0.0',
    PORT: '3000'
  }
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.error(`Vite process exited with code ${code}`);
    process.exit(code);
  }
});