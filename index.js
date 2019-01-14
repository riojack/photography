import nounsAndVerbs from './src/nouns-and-verbs';
import sheets from './sheets';

(function fn() {
  sheets.forEach((group) => {
    // eslint-disable-next-line no-param-reassign
    group.collections = group.collections.reduce((pv, cv) => {
      if (!cv.hidden) {
        pv.push(cv);
      }
      return pv;
    }, []);

    window.SnappyData = sheets;
  });

  window.Snappy = {
    nounsAndVerbs,
  };
}());
