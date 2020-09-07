const { src, dest, series, parallel, watch } = require('gulp')

// 自动载入插件
const loadPlugins = require('gulp-load-plugins')

// const plugins.sass = require('gulp-sass')
// const plugins.babel = require('gulp-babel')
// const plugins.swig = require('gulp-swig')
// const plugins.imagemin = require('gulp-imagemin')

const del = require('del')
const browserSync = require('browser-sync')

const plugins = loadPlugins() // 自动载入
const bs = browserSync.create()

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clean = () => {
  return del(['dist', 'temp'])
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' }) // base 可以保证导出的目录结构与src中一致
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true })) // 可以自动刷新就不用监听files了
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true })) // 可以自动刷新就不用监听files了

}

const page = () => {
  return src('src/*.html', { base: 'src' }) // src/**/*.html --- src目录和子目录中所有html文件
    .pipe(plugins.swig({
      data: data,
      defaults: {
        cache: false
      }
    }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true })) // 可以自动刷新就不用监听files了

}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)

  // 有变动刷新浏览器
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false, // 关闭右上角提示
    port: 2080,
    // open: false, // 自动打开web
    // files: 'dist/**', // 监听dist下文件修改
    server: {
      baseDir: ['temp', 'src', 'public'],  // 指定发布项目根目录
      // 为了解决 index.html 中引入node_modules问题
      // routes 优先级高过 baseDir
      routes: {
        '/node_modules': 'node_modules' // 路由指定整体项目目录下的node_modules
      }
    }
  })
}

const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    // 根据构建注释合并文件 
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // 压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true, // 将空格，回车符去掉
      minifyCSS: true, // 将html中的style 压缩
      minifyJS: true // 将 html 中的 script 压缩
    })))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

// 上线之前
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  
  clean,
  build,
  develop,
}

