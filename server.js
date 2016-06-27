var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/data.min.js', (req, res) => {
  res.sendFile('./dist/example-data.min.js', {root: __dirname});
});

app.get('/support.min.js', (req, res) => {
  res.sendFile('./dist/support.min.js', {root: __dirname});
});

app.get('/application.min.js', (req, res) => {
  res.sendFile('./dist/application.js', {root: __dirname});
});

app.listen(9320);
