import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 1337;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const possibleStaticDirs = [
  path.join(projectRoot, 'frontend', 'dist'),
  path.join(projectRoot, 'backend', 'public'),
];

const staticDir = possibleStaticDirs.find((dir) => fs.existsSync(dir));

app.use(cors({
  origin: true,
}));

app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

if (staticDir) {
  app.use(express.static(staticDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(staticDir, 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
