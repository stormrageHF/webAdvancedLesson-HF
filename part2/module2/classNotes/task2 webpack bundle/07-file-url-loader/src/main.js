import icon from './timg.jpg'

import footer from './footer.html' // 会当成字符串导出

const img = new Image()
img.src = icon

document.body.append(img)

document.write(footer)
