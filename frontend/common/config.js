vscode_php = 'http://localhost:3000'
acoras_php = 'http://p.acoras.in.ua'
neighbor_php = '..'

dev = location.hostname!="p.acoras.in.ua"? 1:''

path = dev? vscode_php : acoras_php