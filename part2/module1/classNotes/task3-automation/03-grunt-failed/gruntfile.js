module.exports = grunt => {
  grunt.registerTask('bad', () => {
    console.log('bad working~');
    return false
  })

  grunt.registerTask('foo', () => {
    console.log('hello grunt~');
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  })

  grunt.registerTask('default', ['foo', 'bad', 'bar'])

  grunt.registerTask('bad-async', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('bad async');
      done(false) // 标记失败
    }, 1000);
  })
}