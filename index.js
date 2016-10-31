import nounsAndVerbs from "./src/nouns-and-verbs";

(function () {
  var sheets = require('./sheets').default;

  sheets.forEach(group => {
    group.collections = group.collections.reduce((pv, cv) => {
      if (!cv.hidden) {
        pv.push(cv);
      }
      return pv;
    }, []);

    window.SnappyData = sheets;
  });

  window.Snappy = {
    nounsAndVerbs: nounsAndVerbs
  };
}());
