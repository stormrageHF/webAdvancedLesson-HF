自动化构建

一切重复的工作都应该自动化

源代码 ---> 自动化构建 ---> 生产代码

以上就是自动化工作流

脱离运行环境兼容带来的问题
在开发阶段使用提高效率的语法，规范和标准

很多新语法，sass等 这些浏览器都不支持，自动化构建可以转换这些不被支持的特性

**-------------------------------------------------------------------**

自动化初体验

创建一个项目 my web app，index.html 引入 sass/main.scss 文件

初始化项目 
命令行 yarn init

安装 sass
命令行 yarn add sass --dev

sass 转 css
命令行 .\node_modules\.bin\sass .\sass\main.scss .\css\style.css

缺点：命令复杂且过长；
解决方案：在 package.json中自定义通用脚本命令
npm scripts 就是为了解决这个问题
package.json 中增加
 "scripts": {
    "build": "sass sass/main.scss css/style.css"
  },
  命令行 运行 yarn build 或者 npm run build

npm scripts 是最简单的自动化构建
安装模块启用测试服务器
命令行 yarn add browser-sync --dev 

安装模块来保障任务都执行
命令行 yarn add npm-run-all --dev

修改 package.json
  "scripts": {
    "build": "sass sass/main.scss css/style.css --watch", 
    "serve": "browser-sync . --files \"css/*.css\"", 
    "start": "run-p build serve"
  },

sass sass/main.scss css/style.css --watch  自动监听scss文件编译成css

browser-sync . --files \"css/*.css\""  自动监听css目录下所有css文件，同步浏览器

配置完成
命令行 yarn start

测试：
修改sass 文件，看看web是否自动变化

**-----------------------------------------------------------------------------**
常用的自动化构建工具
Grunt Gulp FIS

webpack严格来讲是一个模块打包工具

Grunt：
最早的构建生态系统，插件完善，几乎完成任何你想做的自动化任务
工作过程基于临时文件实现，每步都有磁盘读写，在超大型项目里就会慢
比如：sass 转 css ，编译sass存入临时文件到磁盘，在从磁盘读取临时文件转css

Gulp：
基于内存实现，速度比磁盘读写快；
同时是多任务执行，速度更快了；
市面主流，生态完善，后来居上

FIS:
百度内部团队
捆绑套餐，把一些典型的需求集成在内部，比如资源加载，模块化开发，项目部署，性能优化


**--------------------------------------------------------------------------**

Grunt 的基本使用

建立项目
yarn init --yes

安装 grunt
yarn add grunt

根目录添加gruntfile.js文件
code gruntfile.js
入口文件，用于定义需要grunt自动执行的任务
需要导出一个函数
函数接受一个grunt参数，内部提供一些创建任务时可以用到的API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt~');
  })
}
**上面注册一个任务 foo**
grunt 执行这个任务
命令行 yarn grunt foo


**可以添加多个任务，还可以给任务添加描述**
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt~');
  })

  grunt.registerTask('bar', '任务描述', ()=>{
    console.log('other task~');
  })
}
命令行查看有效的任务 
yarn grunt --help

运行 bar
yarn grunt bar

**默认任务**
 grunt.registerTask('default', () => {
    console.log('default task~');
  })

运行 default
yarn grunt

我们一般用default 映射执行其他多个任务
grunt.registerTask('default', ['foo', 'bar'])

**异步任务**
 grunt.registerTask('async-task', ()=>{
    setTimeout(() => {
      console.log('async task working');
    }, 1000);
  })

运行异步任务
yarn grunt async-task
没有输出结果 async task working，需要修改写法

正确写法：
 grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working');
      done()
    }, 1000);
  })


**--------------------------------------------------------------------------**
Grunt 标记任务失败

若有任务失败，后序任务不执行
 grunt.registerTask('bad', () => {
    console.log('bad working~');
    return false // 标记失败
  })

  grunt.registerTask('foo', () => {
    console.log('hello grunt~');
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~');
  })

  grunt.registerTask('default', ['foo', 'bad', 'bar'])


后序任务可以强制执行
 yarn grunt --force

异步任务标记失败
  grunt.registerTask('bad-async', function (){
    const done = this.async()
    setTimeout(() => {
      console.log('bad async');
      done(false) // 标记失败
    }, 1000);
  })

defult 映射任务执行是同步的，中间放一个异步任务，后序任务会等待它执行完

**--------------------------------------------------------------------------**
Grunt 配置方法

 grunt.initConfig({
    foo: 'bar'
  })

  grunt.registerTask('foo', ()=>{
    console.log(grunt.config('foo'));
  })

配置对象

 grunt.initConfig({
    foo: {
      bar: 123
    }
  })

  grunt.registerTask('foo', ()=>{
     两种写法都可以
    console.log(grunt.config('foo.bar'));
    console.log(grunt.config('foo').bar);
  })

**--------------------------------------------------------------------------**
Grunt 多目标任务

多目标模式，可以让任务根据配置形成多个子任务

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

yarn grunt build  全部任务 / yarn grunt build:css 某个任务

**--------------------------------------------------------------------------**
Grunt 插件的使用

1.安装插件
2.载入插件，配置插件

例子：
安装
yarn add grunt-contrib-clean

载入并配置
module.exports = grunt => {
  // 配置清除的目标
  grunt.initConfig({
    clean: {
      temp: 'temp/app.js' // 删除temp 下的 app.js 文件
      temp: 'temp/*.txt' // 删除 temp 下 所有 txt 文件
      temp: 'temp/**' // 删除 temp 和所有子目录，所有文件
    }
  })
  // 安装插件
  grunt.loadNpmTasks('grunt-contrib-clean')
}

运行
yarn grunt clean

**--------------------------------------------------------------------------**
Grunt 常用插件和总结

**处理sass**
安装 grunt-sass 和 sass
yarn add grunt-sass sass --dev

载入插件，配置插件
 grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')

  运行
  yarn grunt sass

**处理es6**
安装 grunt-babel
yarn add grunt-babel @babel/core @babel/preset-env --dev

// 多任务模块辅助加载所有grunt任务插件
yarn add load-grunt-tasks --dev

载入
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    // 配置 sass
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    // 配置 babel
    babel: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: true
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有grunt插件中的任务
}


运行
yarn grunt babel

**处理热更新，自动编译**

安装
yarn add grunt-contrib-watch --dev

配置
  // watch
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
运行
yarn grunt watch

映射后运行
  grunt.registerTask('default', ['sass', 'babel', 'watch'])

yarn grunt


**--------------------------------------------------------------------------**
Gulp 的基本使用

安装
yarn add gulp --dev

入口文件
code gulpfile.js

创建任务
exports.foo = done => {
  console.log('foo task working~');
  done() // 标识任务完成
}

运行
yarn gulp foo

**--------------------------------------------------------------------------**
Gulp 创建组合任务

两个api series和parallel

series 串行任务结构 同步
多个任务（尤其是异步）一个一个执行，上一个完成，下一个开始
部署以前需要编译完成，这就要串行
exports.foo = series(task1, task2, task3)


parallel 并行任务结构 异步
多个任务，同时开始，不必排队
sass 和 js 互不影响，可以使用并行提高效率
exports.bar = parallel(task1, task2, task3)

**--------------------------------------------------------------------------**
Gulp 异步任务的三种方式

回调
promise
stream

**--------------------------------------------------------------------------**
Gulp 构建过程核心工作原理

输入 --- 加工 --- 输出
模拟这个过程
读取流 --- 转换流 --- 写入流

**--------------------------------------------------------------------------**
Gulp 文件操作API和插件使用

用src创建读取流

用插件完成各种transform
压缩css插件： gulp-clean-css
重命名插件： gulp-rename

用dest创建写入流

**--------------------------------------------------------------------------**
Gulp 案例 - 样式编译

案例所有编译都在一个项目里演示 16-gulp-hf-demo

安装 gulp 创建gulpfile.js
安装 gulp-sass
导入 require

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' }) 
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

{ base: 'src' } 可以保证导出的目录结构与src中一致
dest('dist') 目标目录
sass() sass 转 css
sass({ outputStyle: 'expanded' }) 将结尾 } 另启一行

注意点：源路径里的 _ 开头的 scss 文件不会单独编译，而是合并到一起了

**--------------------------------------------------------------------------**
Gulp 案例 - 脚本编译

安装 gulp-babel @babel/core @babel/preset-env --dev
导入 require

babel 只是一个环境，真正发挥转换作用的是 preset-env 里的插件们
所以一般都要配置 preset-env
babel({ presets: ['@babel/preset-env'] })

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}

**--------------------------------------------------------------------------**
Gulp 案例 - 页面模板编译

处理html

安装 gulp-swig
导入 require

const page = ()=>{
  return src('src/*.html', { base: 'src' }) // src/**/*.html --- src目录和子目录中所有html文件
  .pipe(swig({ data }))
  .pipe(dest('dist'))
}

swig({data}) 模板中需要数据

注意点：src/*.html 只是 src 下的html文件，如果要子目录里的所有html文件 src/**/*.html

组合任务
const compile = parallel(style, script, page)
三个相互独立所以用异步方法

**--------------------------------------------------------------------------**
Gulp 案例 - 图片和字体静态资源

安装 gulp-imagemin
导入

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}
const compile = parallel(style, script, page, image, font)

**--------------------------------------------------------------------------**
Gulp案例 - 其他文件及文件清除

public 也要拷贝过去，dist目录每次都可以清空一下

安装 del
导入

const clean = () => {
  return del(['dist'])
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

// 这里清空要用同步
const build = series(clean, parallel(compile, extra))

module.exports = {
  build
}

**--------------------------------------------------------------------------**
Gulp 案例 - 自动加载插件

安装 gulp-load-plugins
导入 
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// const plugins.sass = require('gulp-sass')
// const plugins.babel = require('gulp-babel')
// const plugins.swig = require('gulp-swig')
// const plugins.imagemin = require('gulp-imagemin')

将所有需要自动加载的插件都改成 plugins.xxxx

可以用vscode 右键 rename symbol 修改

自动加载 sass js html 图片等资源的处理插件

**--------------------------------------------------------------------------**
Gulp - 案例 - 热更新开发服务器

安装 browser-sync 
导入

const serve = () => {
  bs.init({
    notify: false, // 关闭右上角提示
    port: 2080,
    // open: false, // 自动打开web
    files: 'dist/**', // 监听dist下文件修改
    server: {
      baseDir: 'dist',  // 指定发布项目根目录
      // 为了解决 index.html 中引入node_modules问题
      // routes 优先级高过 baseDir
      routes: {
        '/node_modules': 'node_modules' // 路由指定整体项目目录下的node_modules
      }
    }
  })
}

**--------------------------------------------------------------------------**
Gulp - 案例 - 监视变化及构建构成的优化

watch 监视变化
在 serve 中加载
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch('src/assets/images/**', image)
  watch('src/assets/fonts/**', font)
  watch('public/**', extra)

优化：
css js 和 html 时刻监听是对的，但是image和font并不会总是变化，没有必要在开发阶段就时刻监听

baseDir: ['dist', 'src', 'public'], 请求的资源按目录顺序查找顺序查找 dist不存在就往后找

将图片等静态资源处理的任务放到build中
const compile = parallel(style, script, page)

// 上线之前
const build = series(clean, parallel(compile,image, font, extra))

开发阶段不编译静态资源
const develop = series(compile, serve)

 // 有变动就刷新浏览器
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ],bs.reload())

.pipe(bs.reload({ stream: true })) // 可以自动刷新就不用监听files了

**--------------------------------------------------------------------------**
Gulp 案例 useref 文件引用处理

安装 gulp-useref

作用：按照构建注释，合并生成资源
因为有一些第三方资源是node_modules里的，发布版本中是不会有这个目录的
比如：
  <!-- build:css assets/styles/vendor.css -->
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
  <!-- endbuild -->
  
  <!-- build:css assets/styles/main.css -->
  <link rel="stylesheet" href="assets/styles/main.css">
  <!-- endbuild -->

  <!-- build:js assets/scripts/vendor.js -->
  <script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/popper.js/dist/umd/popper.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
  <!-- endbuild -->

  <!-- build:js assets/scripts/main.js -->
  <script src="assets/scripts/main.js"></script>
  <!-- endbuild -->

按照构建注释合并生成新文件
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(dest('dist'))
}

执行以后变成
<link rel="stylesheet" href="assets/styles/vendor.css">
  <link rel="stylesheet" href="assets/styles/main.css">

 <script src="assets/scripts/vendor.js"></script>
  <script src="assets/scripts/main.js"></script>
**--------------------------------------------------------------------------**
Gulp 案例 - 文件压缩

分别压缩 html css script
安装 gulp-htmlmin gulp-uglify gulp-clean-css gulp-if 
插件可以自动载入

const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    // 根据构建注释合并文件 
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    // 压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true, // 将空格，回车符去掉
      minifyCSS: true, // 将html中的style 压缩
      minifyJS: true // 将 html 中的 script 压缩
    })))
    .pipe(dest('release'))
}

**--------------------------------------------------------------------------**
Gulp 案例 - 重新规划构建过程

整理目录结构
dist 正式上线文件 包含所有压缩编译过的文件
temp 临时目录只包含编译后的 html js css 给useref处理用的

const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

**--------------------------------------------------------------------------**
Gulp 案例 - 补充

module.exports = {
  
  clean,
  build,
  develop,
}
在package.json 中添加 scripts 自定义命令

 "scripts": {
    "clean": "gulp clean",
    "build": "gulp build",
    "develop": "gulp develop"
  },

.gitignore 中忽略 dist 和 temp 目录

**--------------------------------------------------------------------------**
封装自动化创建工作流 - 准备

复用 gulpfile

gulpfile + gulp = 构建工作流

gulpfile + gulp CLI = zce-pages 模块

其实就是把 gulpfile 封装到一个模块中，发布模块到npm以后，
想用的时候直接下载这个模块到项目里，就可以直接使用了。

封装的意义：不封装的话，可以直接拷贝到每个项目中，这样做的话每个项目都有一个自己的gulpfile文件，维护起来成本太大了

1.github上创建要给新的repository 叫 hf-pages 拿到地址ssh
2.本地命令行安装 zce-cli 
yarn global add zce-cli 
安装完成后初始化项目
zce init nm hf-pages
3.进入hf-pages，git init
git remote add origin git@github.com:stormrageHF/hf-pages.git
git status 查看状态
git add . 全部文件
git commit -m "feat: initial commit"
git push -u origin master
刷新github仓库，可以看到上传的目录
code . 打开项目

**--------------------------------------------------------------------------**
封装工作流 - 提取 gulpfile

拓展 code . -a 可以在当前项目中用vscode再打开一个新的项目 hf-pages
要将 gulpfile 提取到 hf-pages

1. 拷贝 gulpfile.js 的内容到 hf-pages/lib/index.js
2. 拷贝依赖： 拷贝 package.json 中的 devDependencies 内容到 hf-pages/package.json的 dependencies
3. 命令 yarn 安装一下所有的依赖
4. 删除原项目目录中的node_modules,清空gulpfile.js 清空 devDependencies
5. 正常来讲应该是把 hf-pages 发布到 npm ，安装到原项目中，目前还在开发阶段，所以要用link的方式，先在 hf-pages 中 yarn link，然后在 17-gulp-hf-demo 中 yarn link 'hf-pages' 这个时候，原项目下就出现了 hf-pages 的软连接，然后在 gulpfile 文件中导入模块
module.exports = require('hf-pages)
6. yarn 安装缺少的依赖
7. 运行命令 yarn build，会报错说找不到 gulp，因为 gulp 正常是在本项目中 node_modules/bin 中的，可以临时处理一下，先安装一下 gulp， yarn add gulp gulp-cli --dev，正常发布模块以后是不需要安装 gulp 的，因为发布以后的模块导入项目后，会自动安装 gulp
8. 运行命令 yarn build ，报错：Error: Cannot find module './package.json' , 在 hf-pages 中的index.js中 data 引入了这句代码，其实是不合理的，这个data 实际上应该是实际项目中的数据，而不应该出现在模块中，所以后面我们要处理类似的问题

**--------------------------------------------------------------------------**
封装工作流 - 解决模块中的问题

这一部分要解决的是，公共模块中不应该存在的内容

处理 data ，在实际项目中创建文件 pages.config.js ，把data 放进去
module.exports = {
  data: {
    //
  }
}
那模块中就要添加读取实际项目中数据的代码
index.js 中添加如下：

一 读取命令行所在的工作目录
const cwd = process.cwd()

二 读取 pages.config.js
let config = {
  // defult config
}

try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (e) {}

三 config 就是data ，修改 data --> config.data

运行 yarn build 
报另一个错误 error: PluginError: Cannot find module '@babel/preset-env'

此处代码需要修改，因为查找资源的路径不准
.pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
改成 
.pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
这样就可以自动查找到自带的库

运行 yarn build
ok 成功
到此基本完成
后序有优化

**--------------------------------------------------------------------------**
封装工作流 - 抽象路径配置

将写死的路径抽象成配置文件，使路径更灵活

config 默认添加内容
let config = {
  // defult config
  build: {
    src:'src',
    dist: 'dist',
    temp: 'temp',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}

将所有涉及的目录都修改成配置中的，比如

return del(['dist', 'temp'])
修改
return del([config.build.dist, config.build.temp])

src('src/assets/styles/*.scss', { base: 'src' })
修改
src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })

......

修改完以后，yarn build 测试

最后将 build 配置拷贝一份到 pages.config.js 中，以后就可以用实际项目覆盖了
module.exports = {
  build: {
    src: 'src',
    dist: 'release',
    temp: ".tmp",
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  },
  data :{}
}

**--------------------------------------------------------------------------**
封装工作流 - 包装 gulp-cli

删除 gulpfile.js
运行命令 yarn gulp build --gulpfile ./node_modules/hf-pages/lib/index.js
但是工作目录会改变
改命令
运行命令 yarn gulp build --gulpfile ./node_modules/hf-pages/lib/index.js --cwd .

命令如此长，那不如包装成cli，自动来调
1. hf-pages 创建执行入口文件 bin/hf-pages.js 内容写上 console.log('hf=pages');
2. 修改 package.json  添加字段 "bin": "bin/hf-pages.js"
3. 进入 hf-pages 先 unlink 再 link, 命令 hf-pages 看看是否有输出
4. 修改 hf-pages.js 内容 require('gulp/bin/gulp') 导入 gulp 的cli
5. 用process.argv 来记录命令内容
process.argv.push('--cwd')
process.argv.push(process.cwd())
process.argv.push('--gulpfile')
process.argv.push(require.resolve('..'))
6. 测试 回到实际项目中 运行 hf-pages build
Using gulpfile D:\Learn\bigFrontend\webAdvancedLessonHF\part2\module1\classNotes\task3-automation\hf-pages\lib\index.js
自动找到模块中的 gulpfile 文件了

**--------------------------------------------------------------------------**
封装工作流 - 发布并使用模块

修改 package 中 files 多加个 bin
 "files": [
    "lib",
    "bin"
  ],

进入模块目录
git add .
git commit -m 'feat: update package'
git push
yarn publish

发布完成以后，
打开一个新项目测试

安装模块 yarn add hf-pages --dev

注意点：我们发布的位置使官方网站，但是国内下载大多都是淘宝镜像，这时可能会有时间差问题，比如不存在或者版本太旧，这时候 进入 npm.taobao.org 搜索 hf-pages 点击 sync

这时候demo项目下 node_modules/bin/ 有 hf-pages.cmd

运行 yarn hf-pages build

package 添加命令
  "scripts": {
    "clean": "hf-pages clean",
    "build": "hf-pages build",
    "develop": "hf-pages develop"
  },

yarn clean

**--------------------------------------------------------------------------**
FIS 特点高度集成

yarn global add fis3 

打开测试工程
code hp-fis-sample -r

构建项目命令 构建项目到output
fis3 release -d output

添加配置文件 fis-conf.js
fis.match('*.{js,scss,png}', {
  release: '/assets/$0'
})
将匹配到的文件放到 assets 下的源目录中
再运行构建命令

**--------------------------------------------------------------------------**
编译和压缩

yarn global add fis-parser-node-sass

fis.match('**/*.scss', {
  parser: fis.plugin('node-sass')
})

yarn global add fis-parser-babel-6.x

fis.match('**/*.js', {
  parser: fis.plugin('babel-6.x)
})

真是各种错误啊


