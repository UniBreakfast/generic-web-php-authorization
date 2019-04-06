lines = {
  en: {
    langName: 'English',
    LogOut: 'LOG OUT',
    noline: 'line not found',
    error: 'unknown error',
  },
  ru: {
    langName: 'Русский',
    LogOut: 'ВЫХОД',
    noline: 'строка не найдена',
    error: 'какая-то ошибка',
  },
  ua: {
    langName: 'Українська',
    LogOut: 'ВИЙТИ',
    noline: 'рядок не знайдено',
    error: 'якась помилка',
  }
}

addLines = more=> Object.keys(lines).forEach(lang=>
  lines[lang]={...lines[lang],...more[lang]})