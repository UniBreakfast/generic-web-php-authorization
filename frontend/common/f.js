function setCookie(name, value, days=0, hours=0, minutes=0) {
  const milliseconds = ((days*24+hours)*60+minutes)*60*1000,
        expire = new Date(Date.now()+milliseconds)
  document.cookie =
    name+'='+value+'; path=/; expires='+expire.toUTCString()
  return value
}

function getCookie(name) {
  const matches = document.cookie.match(new RegExp('(?:^|; )'+
    name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+'=([^;]*)'));
  return matches? decodeURIComponent(matches[1]) : undefined;
}

delCookie = name=> name? setCookie(name,'',-1) :
  document.cookie.split(";").forEach(c=> document.cookie = c.replace(/^ +/,'')
    .replace(/=.*/,"=;expires="+ new Date().toUTCString() +";path=/"))

mur = console.log

function recordsFrom([headers, rows]) {
  return rows.map(row => {
    let obj = {}
    row.forEach((value,i) => obj[headers[i]] = value)
    return obj
  });
}

function red(el) {
  el.style.borderColor = 'red'
  setTimeout(()=>el.style.borderColor= '', 3000)
}
function inform(msg, ok) {
  alertbox.style.display = 'flex'
  alertbox.style.background = ok? '':'#FBBFBF'
  informer.style.color = ok? '':'#C51313'
  const [key, value] = msg.split(' %')
  informer.innerHTML = line(key, value)
  informer.setAttribute('data-txt', key)
  informer.setAttribute('data-val', value)
}

function logout() {
  id = getCookie('id'); token = getCookie('token')
  if (id && token)
    fetch(`${path}/backend/logout.php?id=${id}&token=${token}&dev=${dev}`)
  delCookie()
  location.href = '.'
}