// Funciones cli (process, validate, statts)
const { mdLinks } = require('./index');

// process.argv -> para obtener los argumentos que pasemos por node.js
// aquí consumo la promesa .then !!
// process.argv lee los comandos (?)
console.log(process.argv);

// objeto vacío
const optionsObject = {};
// es un objeto que contiene la info. de cada link

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






// const { mdLinks } = require('./index');

// console.log(process.argv);

// const main = () => {
//     let filename = process.argv[1];
//     let validate = process.argv.includes('--validate');
//     let stats = process.argv.includes('--stats');

//     mdLinks(filename, validate)
//         .then(result => {
//             if (stats) {
//                 console.log(result.stats);
//             } else {
//                 console.log(result.links);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error.message);
//         });
// };

// main();