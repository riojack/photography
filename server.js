var express = require('express'),
  app = express(),
  port = 9320;

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/data.min.js', (req, res) => {
  res.sendFile('./dist/example-data.js', {root: __dirname});
});

app.get('/support.min.js', (req, res) => {
  res.sendFile('./dist/support.min.js', {root: __dirname});
});

app.get('/application.min.js', (req, res) => {
  res.sendFile('./dist/application.js', {root: __dirname});
});

app.listen(port, () => console.log(`Started on port ${port}`));
