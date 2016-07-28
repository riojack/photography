import Chance from 'chance';
import encode from 'strict-uri-encode';

let chance = new Chance();

const height = 4000,
  width = 6000;

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
    height: height / 10,
    width: width / 10
  };
}

function buildCollection() {
  return {
    collection: `${chance.name()}`,
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
  return (new Array(50))
    .fill('blah')
    .map(() => {
      let group = buildGroup();
      group.collections = (new Array(20))
        .fill('blah')
        .map(() => {
          let collection = buildCollection();

          collection.items = (new Array(67))
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
console.log(session);

export {session as data};
