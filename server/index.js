// This file is a simple redirector to our FastAPI server
// It allows us to keep the same workflow configuration

console.log("Starting FastAPI backend server...");

// Import necessary modules
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the FastAPI server using Python
const pythonProcess = spawn('python', [join(__dirname, 'app.py')], {
  stdio: 'inherit'
});

// Handle process events
pythonProcess.on('close', (code) => {
  console.log(`FastAPI server process exited with code ${code}`);
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down FastAPI server...');
  pythonProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down FastAPI server...');
  pythonProcess.kill('SIGTERM');
});