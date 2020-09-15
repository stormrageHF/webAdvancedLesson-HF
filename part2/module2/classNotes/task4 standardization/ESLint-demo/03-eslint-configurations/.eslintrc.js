module.exports = {
  env: {
    // 根据环境判断全局变量是否可用
    browser: true,
    es2021: true,
  },
  extends: [
    // 共享配置
    "standard",
  ],
  parserOptions: {
    // 控制 es 的语法版本
    ecmaVersion: 12,
  },
  rules: {
    // 定义规则查看官网 值： off  warn  error
    "no-alert": "warn", // 不允许用 alert，否则报警告
  },
  globals: {
    // 配置全局成员
    jQuery: "readonly",
  },
};
