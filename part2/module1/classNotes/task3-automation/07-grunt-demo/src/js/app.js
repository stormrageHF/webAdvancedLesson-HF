
$(($) => {
  const $body = $('html,body')
  $('#scroll_top').on('click', () => {
    $body.animate({ acrollTop: 0 }, 600)
    return false
    //
  })
})


