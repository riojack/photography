import Chance from 'chance';

const chance = new Chance(),
  composite = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="200" width="1000" viewBox="0 0 1000 200"><rect fill="#7D8A2E" height="200" width="200" x="0" y="0" /><rect fill="#C9D787" height="200" width="200" x="200" y="0" /><rect fill="#FFFFFF" height="200" width="200" x="400" y="0" /><rect fill="#FFC0A9" height="200" width="200" x="600" y="0" /><rect fill="#FF8598" height="200" width="200" x="800" y="0" /></svg>',
  image1 = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"650\" width=\"650\" viewBox=\"0 0 650 650\"><rect fill=\"#7D8A2E\" height=\"650\" width=\"650\" x=\"0\" y=\"0\" /></svg>',
  image2 = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"650\" width=\"650\" viewBox=\"0 0 650 650\"><rect fill=\"#C9D787\" height=\"650\" width=\"650\" x=\"0\" y=\"0\" /></svg>',
  image3 = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"650\" width=\"650\" viewBox=\"0 0 650 650\"><rect fill=\"#FFFFFF\" height=\"650\" width=\"650\" x=\"0\" y=\"0\" /></svg>',
  image4 = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"650\" width=\"650\" viewBox=\"0 0 650 650\"><rect fill=\"#FFC0A9\" height=\"650\" width=\"650\" x=\"0\" y=\"0\" /></svg>',
  image5 = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"650\" width=\"650\" viewBox=\"0 0 650 650\"><rect fill=\"#FF8598\" height=\"650\" width=\"650\" x=\"0\" y=\"0\" /></svg>';

const data = {
  group: 'Bravo Group',
  collections: [
    {
      collection: chance.sentence(),
      items: [
        {
          name: 'bravo-image-001',
          image: image1,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 0,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-002',
          image: image2,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 200,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-003',
          image: image3,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 400,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-004',
          image: image4,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 600,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-005',
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
      collection: chance.sentence(),
      items: [
        {
          name: 'bravo-image-005',
          image: image5,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 800,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-004',
          image: image4,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 600,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-003',
          image: image3,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 400,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-002',
          image: image2,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 200,
            y: 0
          },
          height: 200
        },
        {
          name: 'bravo-image-001',
          image: image1,
          backgroundUrl: composite,
          backgroundPosition: {
            x: 0,
            y: 0
          },
          height: 200
        }
      ]
    },
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []},
    {collection: chance.sentence(), items: []}
  ]
};

export {data as Bravo};
