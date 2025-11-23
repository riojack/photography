// Setup for React Testing Library with Mocha
const { JSDOM } = require('jsdom');

// Set up a DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

global.btoa = function btoa(val) {
  return (Buffer.from(val, 'utf8')).toString('base64');
};

global.atob = function atob(val) {
  return (Buffer.from(val, 'base64')).toString('utf8');
};
