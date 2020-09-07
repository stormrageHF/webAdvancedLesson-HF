module.exports = grunt => {
  // 配置清除的目标
  grunt.initConfig({
    clean: {
      // temp: 'temp/app.js'
      // temp: 'temp/*.txt'
      temp: 'temp/**'
    }
  })
  // 安装插件
  grunt.loadNpmTasks('grunt-contrib-clean')
}