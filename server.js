const jpeg = require('jpeg-js');
const express = require('express');

const app = express();
const port = 9320;
const width = 1024;
const height = 576;
const hCount = 4;

function createColorObj() {
  return {
    rc: Math.floor(Math.random() * 255),
    gc: Math.floor(Math.random() * 255),
    bc: Math.floor(Math.random() * 255),
  };
}

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});

app.get('/index.css', (req, res) => {
  res.sendFile('./index.css', { root: __dirname });
});

app.get('/art/bg.jpg', (req, res) => {
  res.sendFile('./art/bg_16-9_IMG_1482_3_4_5_6_7_8_GoldenHour5.jpg', { root: __dirname });
});

app.get('/application.js', (req, res) => {
  res.sendFile('./dist/application.js', { root: __dirname });
});

app.get(/\/[/a-z0-9\-_]+comp\.jpg$/i, (req, res) => {
  const fullWidth = (width * hCount);
  const jpgBuffer = Buffer.from(fullWidth * height * 4);
  let i = 0;
  let pixels = 0;

  const colorBuckets = (function fn() {
    const colors = [];

    for (let j = 0; j < hCount; j++) {
      colors[j] = createColorObj();
    }
    return colors;
  }());

  let column = 0;

  while (i < jpgBuffer.length) {
    if (pixels >= width && pixels % width === 0) {
      column += 1;
    }

    if (column >= hCount) {
      column = 0;
    }

    const color = colorBuckets[column];

    i += 1;
    jpgBuffer[i] = color.rc;

    i += 1;
    jpgBuffer[i] = color.gc;

    i += 1;
    jpgBuffer[i] = color.bc;

    i += 1;
    jpgBuffer[i] = 0xff;

    pixels += 1;
  }

  const imageData = {
    data: jpgBuffer,
    width: (width * hCount),
    height,
  };

  const encoded = jpeg.encode(imageData, 75);

  res.type('image/jpeg');
  res.send(encoded.data);
  res.end();
});

app.get(/\/[/a-z0-9\-_]+\.jpg$/i, (req, res) => {
  const jpgBuffer = Buffer.from(width * height * 4);
  let i = 0;
  const rc = Math.floor(Math.random() * 255);
  const gc = Math.floor(Math.random() * 255);
  const bc = Math.floor(Math.random() * 255);

  while (i < jpgBuffer.length) {
    i += 1;
    jpgBuffer[i] = rc;

    i += 1;
    jpgBuffer[i] = gc;

    i += 1;
    jpgBuffer[i] = bc;

    i += 1;
    jpgBuffer[i] = 0xff;
  }

  const imageData = {
    data: jpgBuffer,
    width,
    height,
  };
  const encoded = jpeg.encode(imageData, 75);

  res.type('image/jpeg');
  res.send(encoded.data);
  res.end();
});

app.listen(port, () => console.log(`Started on port ${port}`));
