import JSDom from 'jsdom';

let window = JSDom.jsdom('<!DOCTYPE html><html><head><title></title></head><body></body></html>').defaultView;
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
