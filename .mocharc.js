module.exports = {
  recursive: true,
  reporter: 'progress',
  require: ['./test/test-helper.js', '@babel/register', './test/scss-stub.js']
};
