const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  fs.readFile('asserts/index.html', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/about', (req, res) => {
  fs.readFile('asserts/about.html', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/contact', (req, res) => {
  fs.readFile('asserts/contact-me.html', 'utf8', (err, data) => {
    res.send(data);
  });
});

// handle 404 - Not Found
app.use('/*splat', (req, res) => {
  fs.readFile('asserts/404.html', 'utf8', (err, data) => {
    res.status(404).send(data);
  }); 
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});