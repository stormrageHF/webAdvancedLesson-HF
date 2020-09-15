// 导入模块成员
import { log } from './logger'
import messages from './messages'

import { name,version } from '../package.json'

import cjs from './cjs-module.js'


// 使用模块成员
const msg = messages.hi

log(msg)

log(name)
log(version)

log(cjs)

