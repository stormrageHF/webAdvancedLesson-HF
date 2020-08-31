// 接口补充

export { }

interface Book {
  name: string;
  desc?: string // 可选 string | undefined
  readonly pages: number // 只读 
}

const obj: Book = {
  name: 'hanfei',
  pages: 100
}

// obj.pages = 50 // 报错


// -----------------------------------------------

// 定义任意多的属性都是string 值也都是 string

interface Cach {
  [key: string]: string
}

const cach: Cach = {}
cach.name = 'hanfei'
cach.title = 'title'