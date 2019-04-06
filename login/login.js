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
          inform('loggingin', 1)
          setTimeout(()=>location.href='..', 1000)
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