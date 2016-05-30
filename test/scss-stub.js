var hook = require('css-modules-require-hook');

hook({
  extensions: ['.scss'],
  preprocessCss: function (css) {
    return '';
  }
});
