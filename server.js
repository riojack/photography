var express = require('express'),
  app = express(),
  port = 9320;

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/index.css', (req, res) => {
  res.sendFile('./index.css', {root: __dirname});
});

app.get('/bg.jpg', (req, res) => {
  res.sendFile('./art/bg_16-9_IMG_1482_3_4_5_6_7_8_GoldenHour5.jpg', {root: __dirname});
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
