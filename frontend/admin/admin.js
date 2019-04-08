admin_enter()

function admin_enter() {
  id = getCookie('id'); token = getCookie('token')
  if (!id || !token) show_admin_login_form()

  else fetch(`${path}/backend/enter.php?id=${id}&token=${token}&dev=${dev}`)
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
        show_admin_login_form()
      }
      if (inv) console.warn(inv[0]+': '+inv[1])
    })
}

function show_admin_login_form() {
  form.style.display = 'grid'

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
          admin_enter()
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
  show_admin_login_form()
}