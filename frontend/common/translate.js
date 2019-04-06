language.innerHTML = Object.keys(lines).map(lng=>
  `<option value=${lng}>${lines[lng].langName}</option>`).join('')

function line(key, value) {
  return (lines[lang][key] || lines.en[key] ||
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
}

translate()

language.value = lang
