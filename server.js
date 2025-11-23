const jpeg = require('jpeg-js');
const express = require('express');

const app = express();
const port = 9320;
const width = 1024;
const height = 576;
const hCount = 4;

const createColorObj = () => ({
  rc: Math.floor(Math.random() * 255),
  gc: Math.floor(Math.random() * 255),
  bc: Math.floor(Math.random() * 255),
});

// Dynamic image generation routes (must come before static middleware)
app.get(/\/[/a-z0-9\-_]+comp\.jpg$/i, (req, res) => {
  const fullWidth = (width * hCount);
  const jpgBuffer = Buffer.alloc(fullWidth * height * 4);
  let i = 0;
  let pixels = 0;

  const colorBuckets = Array.from({ length: hCount }, () => createColorObj());

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

  res.type('image/jpeg').send(encoded.data);
});

app.get(/\/[/a-z0-9\-_]+\.jpg$/i, (req, res) => {
  const jpgBuffer = Buffer.alloc(width * height * 4);
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

  res.type('image/jpeg').send(encoded.data);
});

// Static file serving (after dynamic routes)
app.use('/dist', express.static('dist'));
app.use('/art', express.static('art'));
app.use('/sheets', express.static('sheets'));
app.use(express.static('.', { index: 'index.html' }));

app.listen(port, () => console.log(`Started on port ${port}`));
