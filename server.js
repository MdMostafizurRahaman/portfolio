// Simple server script to start the Vite development server
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  console.log('Starting Vite frontend server...');
  
  try {
    const server = await createServer({
      configFile: path.resolve(__dirname, 'vite.config.js'),
      server: {
        host: '0.0.0.0', // Make it accessible externally
        port: 3000
      }
    });
    
    await server.listen();
    server.printUrls();
    console.log('Vite server is running!');
  } catch (error) {
    console.error('Error starting Vite server:', error);
    process.exit(1);
  }
}

startServer();