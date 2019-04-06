id = getCookie('id'); token = getCookie('token')
if (!id || !token) location.href = 'lobby'
fetch(`${path}/backend/enter.php?id=${id}&token=${token}&dev=${dev}`)
  .then(response => response.json())
  .then(({ok,fail,err,inv}) => {
    if (ok) {
      setCookie('token',token=ok.token,3)
      if (ok.lang)
        setCookie('lang',language.value=lang=ok.lang,3) && translate()
      username.innerText = ok.login
      username.removeAttribute('data-txt')
    }
    if (err) console.error(err)
    if (fail) {
      mur(fail)
      delCookie()
      location.href = 'lobby'
    }
    if (inv) console.warn(inv[0]+': '+inv[1])
  })

function logout() {
  id = getCookie('id'); token = getCookie('token')
  if (id && token)
    fetch(`${path}/backend/logout.php?id=${id}&token=${token}&dev=${dev}`)
  delCookie()
  location.href = 'lobby'
}
