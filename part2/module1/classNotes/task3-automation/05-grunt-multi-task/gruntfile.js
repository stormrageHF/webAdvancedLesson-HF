
module.exports = grunt => {
  grunt.initConfig({
    build: {
      options: {
        foo: 'bar'
      },
      css: {
        options: {
          foo: 'baz'
        }
      },
      js: '2'
    }
  })

  grunt.registerMultiTask('build', function () {
    console.log(this.options());
    console.log(`target: ${this.target}, data: ${this.data}`);
  })
}