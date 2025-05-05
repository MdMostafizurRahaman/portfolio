// Simple Express server to serve the built React app
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

console.log("Starting portfolio website server...");
console.log("Serving from:", path.join(__dirname, 'client'));

// Serve static files from the client directory directly
app.use(express.static(path.join(__dirname, 'client')));

// All requests that don't match static files should serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio website server is running at http://localhost:${PORT}`);
});