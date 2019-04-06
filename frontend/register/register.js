checks = [{ sub: 'login',
            is: /\W/,
            err: 'alphanumeric' },
          { sub: 'login',
            not: /^.{3,16}$/,
            err: '3 to 16 long' },
          { sub: 'pass',
            not: /.{6}/,
            err: 'at least 6 long' }]

function register() {
  const fields = {login: login.value, pass: pass.value},
        inv = validate(fields, checks)
  if (inv) {
    // console.log(inv[0]+inv[1].replace(/ |,/g,''))
    inform(inv[0]+inv[1].replace(/ |,/g,''))
    red(document.getElementById(inv[0]))
  }
  else fetch(`${path}/backend/register.php?login=${login.value}&pass=${pass.value}&dev=${dev}`)
    .then(response => response.json())
    .then(({ok,fail,err,inv}) => {
      if (ok) inform('registered %'+login.value, 1)
      if (fail) inform('occupied %'+login.value)
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