const hook = require('css-modules-require-hook');

hook({
  extensions: ['.scss'],
  preprocessCss() {
    return '';
  },
});
