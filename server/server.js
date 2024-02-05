import express from 'express';

const app  = express();
const port = 3000;

app.use(express.static('build', {
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
