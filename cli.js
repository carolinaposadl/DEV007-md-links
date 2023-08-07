// Funciones cli (process, validate, statts)
const { mdLinks } = require('./index');

// process.argv -> para obtener los argumentos que pasemos por node.js
// aquí consumo la promesa .then !!
console.log(process.argv);

// objeto vacío
const optionsObject = {};

if (process.argv[3] === '--validate' || process.argv[4] === '--validate') {
    optionsObject.validate = true
} else {
    optionsObject.validate = false
}

mdLinks(process.argv[2], optionsObject)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


