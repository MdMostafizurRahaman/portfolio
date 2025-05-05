// Simple entry script to run the Vite dev server
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Create Vite server
  const server = await createServer({
    // Configure Vite
    configFile: path.resolve(__dirname, 'vite.config.js'),
    root: path.resolve(__dirname, 'client'),
    server: {
      host: '0.0.0.0',
      port: 3000
    }
  });

  // Start the server
  await server.listen();

  // Log server URLs
  server.printUrls();
}

startServer().catch((err) => {
  console.error('Error starting Vite server:', err);
  process.exit(1);
});