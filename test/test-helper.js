const enzyme = require('enzyme'),
  Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

global.btoa = function(val) {
  return (new Buffer(val, 'utf8')).toString('base64');
}

global.atob = function(val) {
  return (new Buffer(val, 'base64')).toString('utf8');
}
