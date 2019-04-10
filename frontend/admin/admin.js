admIn()

function admIn() {
  id = getCookie('id'); token = getCookie('token')
  if (!id || !token) form.style.display = 'grid'

  else fetch(`${path}/backend/admin.php?id=${id}&token=${token}&dev=${dev}`)
    .then(response => response.json())
    .then(({ok,fail,err,inv}) => {
      if (ok) {
        setCookie('token',token=ok.token,3)
        if (ok.lang)
          setCookie('lang',language.value=lang=ok.lang,3) && translate()
        username.innerText = ok.login
        username.removeAttribute('data-txt')
        console.table(recordsFrom(ok.users))
      }
      if (err) console.error(err)
      if (fail) {
        mur(fail)
        form.style.display = 'grid'
      }
      if (inv) console.warn(inv[0]+': '+inv[1])
    })
}


checks = [{ sub: 'login', is: /\W/,
            err: 'alphanumeric' },
          { sub: 'login', not: /./, err: 'enter login' }]

function logIn() {
  const fields = {login: login.value, pass: pass.value},
        inv = validate(fields, checks)
  if (inv) {
    // console.log(inv[0]+inv[1].replace(/ |,/g,''))
    inform(inv[0]+inv[1].replace(/ |,/g,''))
    red(document.getElementById(inv[0]))
  }
  else
    fetch(`${path}/backend/login.php?login=${login.value}&pass=${pass.value}&dev=${dev}`)
      .then(response => response.json())
      .then(({ok,fail,err,inv}) => {
        if (ok) {
          setCookie('id',   ok.id,   3)
          setCookie('token',ok.token,3)
          form.style.display = 'none'
          if (!ok.a) location.href = '..'
          login.value = ''
          pass.value = ''
          alertbox.style.display = 'none'
          admIn()
        }
        if (fail) inform(fail.replace(/ /g,'')+' %'+login.value)
        if (err) {
          inform('error')
          console.error(err)
        }
        if (inv) {
          inform(inv[0]+inv[1].replace(/ |,/g,''))
          red(document.getElementById(inv[0]))
        }
      })
}

function logout() {
  id = getCookie('id'); token = getCookie('token')
  if (id && token)
    fetch(`${path}/backend/logout.php?id=${id}&token=${token}&dev=${dev}`)
  delCookie()
  form.style.display = 'grid'
}