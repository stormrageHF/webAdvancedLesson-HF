module.exports = grunt => {
  // grunt.initConfig({
  //   foo: 'bar'
  // })

  // grunt.registerTask('foo', ()=>{
  //   console.log(grunt.config('foo'));
  // })

  grunt.initConfig({
    foo: {
      bar: 123
    }
  })

  grunt.registerTask('foo', ()=>{
    // console.log(grunt.config('foo.bar'));
    console.log(grunt.config('foo').bar);
  })
}