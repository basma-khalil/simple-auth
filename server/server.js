import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app  = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'build'), {
    extensions: ['html'],
}));

app.use((req, res) => {
  res.status(404);
  res.send(`
    <div style="margin-top:100px; text-align: center">
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
