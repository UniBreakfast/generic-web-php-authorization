lines = {
  langName: {
    en: "English",
    ru: "Русский",
    ua: "Українська",
  },
  LogOut: {
    en: "LOG OUT",
    ru: "ВЫХОД",
    ua: "ВИЙТИ",
  },
  noline: {
    en: "line not found",
    ru: "строка не найдена",
    ua: "рядок не знайдено",
  },
  error: {
    en: "unknown error",
    ru: "какая-то ошибка",
    ua: "якась помилка",
  },
}

addLines = more=> lines={...lines,...more}

addLinesR = more=> Object.keys(lines).forEach(lang=>
  lines[lang]={...lines[lang],...more[lang]})

restructure = lines=> Object.keys(lines).reduce((obj,lang)=>{
	Object.keys(lines[lang]).forEach(key=>{
		if (!obj[key]) obj[key] = {}
    obj[key][lang]=lines[lang][key]
	})
	return obj
}, {})

literal =(obj, indent='')=> '{\n'+Object.entries(obj).reduce(
  (lines, [key,value])=>lines+indent+'  '+key+': '+(typeof value=='object'?
   literal(value, indent+'  '):'"'+value+'"')+',\n', ''
)+indent+'}'