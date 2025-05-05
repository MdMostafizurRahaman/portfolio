// Simple Express server for portfolio website
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(__dirname, 'client'),
    });
    
    app.use(vite.middlewares);
    
    // Fallback for SPA routing
    app.use('*', async (req, res) => {
      const url = req.originalUrl;
      let template = path.resolve(__dirname, 'client/index.html');
      
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Portfolio website running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();