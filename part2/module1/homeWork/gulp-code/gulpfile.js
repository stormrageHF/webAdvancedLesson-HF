// 实现这个项目的构建任务

const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')
const argv = require('minimist')(process.argv.slice(2))


const plugins = loadPlugins()
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

const config = {
  src: 'src',
  dist: 'dist',
  public: 'public',
  temp: 'temp',
  paths: {
    styles: 'assets/styles/*.scss',
    scripts: 'assets/scripts/*.js',
    pages: '*.html',
    images: 'assets/images/**',
    fonts: 'assets/fonts/**'
  }
}

// clean
const clean = () => {
  return del([config.dist, config.temp])
}
// style
const style = () => {
  return src(config.paths.styles, { base: config.src, cwd: config.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.temp))
}
// script
const script = () => {
  return src(config.paths.scripts, { base: config.src, cwd: config.src })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest(config.temp))
}
// page
const page = () => {
  return src(config.paths.pages, { base: config.src, cwd: config.src })
    .pipe(plugins.swig({
      data: data,
      defaults: {
        cache: false // cache 不关，temp 里 html 不是最新版
      }
    }))
    .pipe(dest(config.temp))
    .pipe(bs.reload({
      stream: true
    }))
}
// image
const image = () => {
  return src(config.paths.images, { base: config.src, cwd: config.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.dist))
}
// font
const font = () => {
  return src(config.paths.fonts, { base: config.src, cwd: config.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.dist))
}
// extra
const extra = () => {
  return src('**', { base: config.public, cwd: config.public })
    .pipe(dest(config.dist))
}

// devServe
const devServe = () => {
  watch(config.paths.styles, { cwd: config.src }, style)
  watch(config.paths.scripts, { cwd: config.src }, script)
  watch(config.paths.pages, { cwd: config.src }, page)

  watch([
    config.paths.images,
    config.paths.fonts,
  ], { cwd: config.src }, bs.reload)
  watch('**', { cwd: config.public }, bs.reload)

  bs.init({
    notify: false,
    port: argv.port === undefined ? '2080' : argv.port,
    open: argv.open === undefined ? false : argv.open,
    // files: 'temp/**',
    server: {
      baseDir: [config.temp, config.src, config.public],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// useref
const useref = () => {
  return src('temp/*.html', { base: config.temp })
    .pipe(plugins.useref({ searchPath: [config.temp, '.'] }))
    // 压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(config.dist))
}

// proServe
const proServe = () => {
  bs.init({
    notify: false,
    port: argv.port === undefined ? '2080' : argv.port,
    open: argv.open === undefined ? false : argv.open,
    // files: 'dist/**',
    server: {
      baseDir: config.dist
    }
  })
}

// publish
const publish = () => {
  return src('**', { base: config.dist })
    .pipe(plugins.ghPages({
      branch: argv.branch === 'undefined' ? 'gh-pages' : argv.branch
    }))
}

const compile = parallel(style, script, page)
const serve = series(compile, devServe)
const build = series(clean, parallel(series(compile, useref), image, font, extra))
const start = series(build, proServe)
const deploy = series(build, publish)

module.exports = {
  clean,
  style,
  script,
  compile,
  devServe,
  serve,
  build,
  start,
  deploy
}