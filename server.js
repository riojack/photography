var jpeg = require('jpeg-js'),
  express = require('express'),
  app = express(),
  port = 9320,

  width = 1024,
  height = 576,
  h_count = 4;

function createColorObj() {
  return {
    rc: Math.floor(Math.random() * 255),
    gc: Math.floor(Math.random() * 255),
    bc: Math.floor(Math.random() * 255)
  };
}

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/index.css', (req, res) => {
  res.sendFile('./index.css', {root: __dirname});
});

app.get('/art/bg.jpg', (req, res) => {
  res.sendFile('./art/bg_16-9_IMG_1482_3_4_5_6_7_8_GoldenHour5.jpg', {root: __dirname});
});

app.get('/application.js', (req, res) => {
  res.sendFile('./dist/application.js', {root: __dirname});
});

app.get(/\/[\/a-z0-9\-_]+comp\.jpg$/i, (req, res) => {
  var fullWidth = (width * h_count),
    jpgBuffer = new Buffer(fullWidth * height * 4),
    i = 0,
    pixels = 0,
    color_buckets = (function () {
      var colors = [];
      for (var j = 0; j < h_count; j++) {
        colors[j] = createColorObj();
      }
      return colors;
    })(),
    column = 0;

  while (i < jpgBuffer.length) {
    if (pixels >= width && pixels % width === 0) {
      column++;
    }

    if (column >= h_count) {
      column = 0;
    }

    var color = color_buckets[column];

    jpgBuffer[i++] = color.rc;
    jpgBuffer[i++] = color.gc;
    jpgBuffer[i++] = color.bc;
    jpgBuffer[i++] = 0xff;
    pixels++;
  }

  var imageData = {
      data: jpgBuffer,
      width: (width * h_count),
      height: height
    },
    encoded = jpeg.encode(imageData, 75);

  res.type('image/jpeg');
  res.send(encoded.data);
  res.end();
});

app.get(/\/[\/a-z0-9\-_]+\.jpg$/i, (req, res) => {
  var jpgBuffer = new Buffer(width * height * 4),
    i = 0,
    rc = Math.floor(Math.random() * 255),
    gc = Math.floor(Math.random() * 255),
    bc = Math.floor(Math.random() * 255);

  while (i < jpgBuffer.length) {
    jpgBuffer[i++] = rc;
    jpgBuffer[i++] = gc;
    jpgBuffer[i++] = bc;
    jpgBuffer[i++] = 0xff;
  }

  var imageData = {
      data: jpgBuffer,
      width: width,
      height: height
    },
    encoded = jpeg.encode(imageData, 75);

  res.type('image/jpeg');
  res.send(encoded.data);
  res.end();
});

app.listen(port, () => console.log(`Started on port ${port}`));
