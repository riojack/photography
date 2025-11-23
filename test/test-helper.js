// Setup for React Testing Library with Mocha
const { JSDOM } = require('jsdom');

// Polyfill btoa/atob for Node.js environment
const btoaFn = function btoa(val) {
  return (Buffer.from(val, 'utf8')).toString('base64');
};

const atobFn = function atob(val) {
  return (Buffer.from(val, 'base64')).toString('utf8');
};

// Set up a DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});

// Set btoa/atob on the JSDOM window first
dom.window.btoa = btoaFn;
dom.window.atob = atobFn;

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.btoa = btoaFn;
global.atob = atobFn;

// Also set on globalThis for maximum compatibility
if (typeof globalThis !== 'undefined') {
  globalThis.btoa = btoaFn;
  globalThis.atob = atobFn;
}
