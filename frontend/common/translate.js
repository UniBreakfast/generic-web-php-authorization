language.innerHTML = Object.keys(lines).map(lng=>
  `<option value=${lng}>${lines[lng].langName}</option>`).join('')

function line(key, value) {
  return (lines[lang][key] || lines.en[key] || key ||
    lines[lang].noline).replace('_', value)
}

function translate() {
  lang = getCookie('lang') || 'en';
  [...document.querySelectorAll('[data-txt]')].forEach(el=>
    el.innerText = line(el.dataset.txt, el.dataset.val))
}

language.onchange =()=> {
  setCookie('lang', language.value, 9999)
  translate()
  /* if user logged in request set language php */
  if (typeof id!='undefined' && (token=getCookie('token')))
    fetch(`${path}/backend/setlang.php?id=${id}&token=${token}&lang=${lang}&dev=${dev}`)
      .then(response => response.json())
      .then(({ok,fail,err,inv}) => {
        if (ok) {
          setCookie('token',token=ok.token,3)
        }
        if (err) console.error(err)
        if (fail) {
          mur(fail)
          delCookie()
          location.href = 'lobby'
        }
        if (inv) console.warn(inv[0]+': '+inv[1])
      })

}

translate()

language.value = lang
