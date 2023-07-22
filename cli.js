// Funciones cli (process, validate, statts)
const mdLinks = require('./index')

// ingreso de ruta
// comando para obtener los argumentos que pasemos por node.js
const filePath = process.argv[2];

mdLinks.mdLinks(filePath);