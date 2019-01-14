import * as landscapes from './categorizers/subjects/landscapes';
import * as insects from './categorizers/subjects/insects';
import * as plants from './categorizers/subjects/plants';
import * as softFocus from './categorizers/adjectives/soft_focus';
import * as darkness from './categorizers/adjectives/darkness';

const YellowBanks = {
  group: 'Yellow Banks',
  collections: [{
    collection: 'Summer Forest',
    added: 'August 12, 2018',
    time: 1534078800 * 1000,
    items: [
      {
        name: 'EHAPgBFOOgW0TqfR',
        image: './deck/yellow-banks-001/EHAPgBFOOgW0TqfR.jpg',
        backgroundUrl: './deck/yellow-banks-001/EHAPgBFOOgW0TqfR.jpg',
        backgroundPosition: {
          x: 0,
          y: 0,
        },
        height: 576,
        width: 1024,
        tags: ['retina', 'hero'],
        categories: ['shore line', 'tree line', 'reflection', 'pond', 'lake', 'sky', 'blue', 'green', 'trees', 'water']
          .concat(plants.default).concat(landscapes.default),
      },
      {
        name: 'UYMrvmWARfI00RMK',
        image: './deck/yellow-banks-001/UYMrvmWARfI00RMK.jpg',
        backgroundUrl: './deck/yellow-banks-001/UYMrvmWARfI00RMK.jpg',
        backgroundPosition: {
          x: 0,
          y: 0,
        },
        height: 576,
        width: 1024,
        tags: ['retina'],
        categories: ['shore line', 'tree line', 'reflection', 'river', 'sky', 'blue', 'green', 'trees', 'water']
          .concat(plants.default).concat(landscapes.default),
      },
      {
        name: 'FskiUTElpQbiNnbn',
        image: './deck/yellow-banks-001/FskiUTElpQbiNnbn.jpg',
        backgroundUrl: './deck/yellow-banks-001/FskiUTElpQbiNnbn.jpg',
        backgroundPosition: {
          x: 0,
          y: 0,
        },
        height: 576,
        width: 1024,
        tags: ['retina'],
        categories: ['leaf', 'green', 'orange', 'ladybug']
          .concat(insects.default).concat(plants.default).concat(softFocus.default).concat(darkness.default),
      },
    ],
  }],
};

export default YellowBanks;
