import React from 'react';
import ReactDOM from 'react-dom';

import Photography from './src/Photography'
import stateUtilities from './src/state-utilities';

(function () {

  function doRender(container, extras) {
    return new Promise((resolve) => {
      let props = Object.assign({}, {tap: 'untapped'}, extras),
        element = React.createElement(Photography, props);

      ReactDOM.render(element, container, resolve);
    });
  }

  window.Snappy = {
    render: doRender,
    stateUtilities: stateUtilities
  };
}());


