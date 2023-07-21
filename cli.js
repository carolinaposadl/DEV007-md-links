// Funciones cli (process, validate, statts)
const mdLinks = require('./index')
const filePath = process.argv[2];

mdLinks.mdLinks(filePath);