// Frontend server using Vite for Md Mostafizur's portfolio
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '../client');

async function startServer() {
  console.log('Starting Vite frontend server for portfolio website...');
  console.log('Client directory:', clientDir);
  
  try {
    const server = await createServer({
      configFile: path.resolve(clientDir, 'vite.config.js'),
      root: clientDir,
      server: {
        host: '0.0.0.0',
        port: 3000
      }
    });
    
    await server.listen();
    server.printUrls();
    console.log('Portfolio website is running!');
  } catch (error) {
    console.error('Error starting Vite server:', error);
    process.exit(1);
  }
}

startServer();