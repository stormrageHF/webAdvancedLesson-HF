import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'

export default  {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins:[
    json(),
    commonjs()
  ]
}