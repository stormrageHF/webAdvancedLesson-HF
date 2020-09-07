// Grunt 入口文件
// 定义需要 Grunt 自动执行的任务
// 导出一个函数
// 此函数接受一个grunt参数，内部提供一些创建任务时可以用到的API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt~');
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  })

  // grunt.registerTask('default', () => {
  //   console.log('default task~');
  // })

  grunt.registerTask('default', ['foo', 'bar'])

  // grunt.registerTask('async-task', ()=>{
  //   setTimeout(() => {
  //     console.log('async task working');
  //   }, 1000);
  // })

  grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working');
      done()
    }, 1000);
  })
}


