// 接口

// 为数据结构做类型约束

export {}

interface Book {
  name: string;
  content: string;
  pages: number
}

function getBook(book: Book) {
  console.log(book.name)
  console.log(book.pages);
}


getBook({
  name: 'hanfei',
  content: '12123',
  pages: 100
})