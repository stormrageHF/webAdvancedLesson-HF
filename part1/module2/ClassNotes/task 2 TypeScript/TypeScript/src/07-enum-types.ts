// 枚举
export {}

enum status {
  pending, // 默认是 0 后面的默认递增
  finish,
  error
}

enum pstatus {
  pending = 3,
  finish, // 递增所以是 4
  error  // 5
}

enum mstatus {
  pending = '111', // 若第一个是string 那剩下的必须定义字符串
  finish = '222',
  error = '333'
}

const enum ssstatus {
  pending,
  start,
  end
}

const obj = {
  status: ssstatus.pending
}

/*
编译的时候不一样，非const和const
用tsc 试试就知道了
非const 都是 双向键值对 会入侵js 意思是生成新的js代码
const 直接就是值
*/ 