
// 1.
{
  setTimeout(() => {
    var a = 'hello'
    setTimeout(() => {
      var b = 'lagou'
      setTimeout(() => {
        var c = 'I ❤ U'
        console.log(a + b + c);
      }, 10);
    }, 10);
  }, 10);

  // promise

  function p(str) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        var s = str
        resolve(s)
      }, 10);
    })
  }

  var a = 'hello'
  p(a)
    .then(r => {
      var b = 'lagou'
      const s = r + b
      return p(s)
    })
    .then(r => {
      var c = 'I ❤ U'
      const s = r + c
      console.log(s);
    })
}