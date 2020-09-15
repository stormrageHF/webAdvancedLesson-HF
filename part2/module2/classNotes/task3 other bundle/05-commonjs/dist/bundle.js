(function () {
  'use strict';

  const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };

  var messages = {
    hi: 'Hey Guys, I am zce~'
  };

  var name = "05-commonjs";
  var version = "1.0.0";

  var cjsModule = {
    foo: 'bar'
  };

  // 导入模块成员


  // 使用模块成员
  const msg = messages.hi;

  log(msg);

  log(name);
  log(version);

  log(cjsModule);

}());
