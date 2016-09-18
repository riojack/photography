import nounsAndVerbs from './src/nouns-and-verbs';

(function () {
  window.SnappyData = require('./sheets').default;

  window.Snappy = {
    nounsAndVerbs: nounsAndVerbs
  };
}());
