const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

global.btoa = function btoa(val) {
  return (Buffer.from(val, 'utf8')).toString('base64');
};

global.atob = function atob(val) {
  return (Buffer.from(val, 'base64')).toString('utf8');
};
