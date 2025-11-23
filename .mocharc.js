module.exports = {
  spec: 'test/**/*.spec.{js,jsx}',
  recursive: true,
  reporter: 'spec',
  require: ['./test/test-helper.js', '@babel/register', './test/scss-stub.js'],
  timeout: 5000,
  color: true
};
