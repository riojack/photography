import Chance from 'chance';
import encode from 'strict-uri-encode';

const chance = new Chance(),
  composite = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="200" width="1000" viewBox="0 0 1000 200"><rect fill="#468966" height="200" width="200" x="0" y="0" /><rect fill="#FFF0A5" height="200" width="200" x="200" y="0" /><rect fill="#FFB03B" height="200" width="200" x="400" y="0" /><rect fill="#B64926" height="200" width="200" x="600" y="0" /><rect fill="#8E2800" height="200" width="200" x="800" y="0" /></svg>'),
  image1 = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="650" width="650" viewBox="0 0 650 650"><rect fill="#468966" height="650" width="650" x="0" y="0" /></svg>'),
  image2 = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="650" width="650" viewBox="0 0 650 650"><rect fill="#FFF0A5" height="650" width="650" x="0" y="0" /></svg>'),
  image3 = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="650" width="650" viewBox="0 0 650 650"><rect fill="#FFB03B" height="650" width="650" x="0" y="0" /></svg>'),
  image4 = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="650" width="650" viewBox="0 0 650 650"><rect fill="#B64926" height="650" width="650" x="0" y="0" /></svg>'),
  image5 = 'data:image/svg+xml;charset=utf-8,' + encode('<svg xmlns="http://www.w3.org/2000/svg" height="650" width="650" viewBox="0 0 650 650"><rect fill="#8E2800" height="650" width="650" x="0" y="0" /></svg>');

const data = {
  group: 'Alpha Group',
  collections: [{
    collection: chance.word(),
    items: [
      {
        name: 'alpha-image-001',
        image: image1,
        backgroundUrl: composite,
        backgroundPosition: {
          x: 0,
          y: 0
        },
        height: 200
      },
      {
        name: 'alpha-image-002',
        image: image2,
        backgroundUrl: composite,
        backgroundPosition: {
          x: 200,
          y: 0
        },
        height: 200
      },
      {
        name: 'alpha-image-003',
        image: image3,
        backgroundUrl: composite,
        backgroundPosition: {
          x: 400,
          y: 0
        },
        height: 200
      },
      {
        name: 'alpha-image-004',
        image: image4,
        backgroundUrl: composite,
        backgroundPosition: {
          x: 600,
          y: 0
        },
        height: 200
      },
      {
        name: 'alpha-image-005',
        image: image5,
        backgroundUrl: composite,
        backgroundPosition: {
          x: 800,
          y: 0
        },
        height: 200
      }
    ]
  },
    {
      collection: chance.word(),
      items: [
        {
          name: 'alpha-image-005',
          image: image5,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 800,
            y: 0
          },
          height: 200
        },
        {
          name: 'alpha-image-004',
          image: image4,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 600,
            y: 0
          },
          height: 200
        },
        {
          name: 'alpha-image-003',
          image: image3,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 400,
            y: 0
          },
          height: 200
        },
        {
          name: 'alpha-image-002',
          image: image2,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 200,
            y: 0
          },
          height: 200
        },
        {
          name: 'alpha-image-001',
          image: image1,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 0,
            y: 0
          },
          height: 200
        }
      ]
    }
  ]
};

export {data as Alpha};
