import Chance from 'chance';
import encode from 'strict-uri-encode';

let chance = new Chance(),
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const height = 1152,
  width = 2048;

function buildFakeImage() {
  let color = chance.color();

  return 'data:image/svg+xml;charset=utf-8,' +
    encode(`<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}" viewBox="0 0 ${width} ${height}">
              <rect fill="${color}" height="${height}" width="${width}" x="0" y="0" />
            </svg>`);
}

function buildItem() {
  var image = buildFakeImage();
  return {
    name: chance.word(),
    image: image,
    backgroundUrl: image,
    backgroundPosition: {x: 0, y: 0},
    height: height / 2,
    width: width / 2
  };
}

function buildCollection() {
  var timestamp = 1451628000000 + chance.integer({min: 1, max: 31536000000}),
    dt = new Date(timestamp),
    mo = months[dt.getMonth()],
    da = dt.getDate(),
    yr = dt.getFullYear();

  return {
    collection: `${chance.name()}`,
    added: `${mo} ${da}, ${yr}`,
    time: timestamp,
    items: []
  };
}

function buildGroup() {
  return {
    group: `${chance.name()} Group`,
    collections: []
  };
}

function buildData() {
  return (new Array(10))
    .fill('blah')
    .map(() => {
      let group = buildGroup();
      group.collections = (new Array(15))
        .fill('blah')
        .map(() => {
          let collection = buildCollection();

          collection.items = (new Array(20))
            .fill('blah')
            .map((t, index) => {
              let item = buildItem();
              item.backgroundPosition.x = item.width * index;
              item.backgroundPosition.y = 0;

              return item;
            });

          return collection;
        });

      return group;
    });
}

const session = buildData();

export {session as data};
