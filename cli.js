// Funciones cli (process, validate, stats)
const { mdLinks } = require('./index');
const { validateLinks, getStats, getStatsAndValidate } = require('./functions.js');

// process.argv -> para obtener los argumentos que pasemos por node.js - process, metodo de node.js lee lo de
// aquí consumo la promesa .then 
// console.log(process.argv);

let filePath = process.argv[2];
let options = process.argv.slice(3);

// mdLinks(filePath) // BUGS
//     .then(links => {
//         if (options.includes('--validate') && options.includes('--stats')) {
//             validateLinks(links).then(validatedLinks => {
//                 console.log(getStatsAndValidate(validatedLinks));
//             });
//         } else if (options.includes('--validate')) {
//             validateLinks(links).then(validatedLinks => {
//                 console.log(validatedLinks);
//             });
//         } else if (options.includes('--stats')) {
//             console.log(getStats(links));
//         } else {
//             console.log(links);
//         }
//     })
//     .catch(error => {
//         console.log(error);
//     });


mdLinks(filePath)
    .then(links => {
        if (options.includes('--validate') && options.includes('--stats')) {
            getStatsAndValidate(links).then(result => {
                console.log(result);
            });
        } else if (options.includes('--validate')) {
            validateLinks(links).then(validatedLinks => {
                console.log(validatedLinks);
            });
        } else if (options.includes('--stats')) {
            console.log(getStats(links));
        } else {
            console.log(links);
        }
    })
    .catch(error => {
        console.log(error);
    });


// // objeto vacío
// const optionsObject = {};
// // es un objeto que contiene la info. de cada link

// if (process.argv[3] === '--validate' || process.argv[4] === '--validate') {
//     optionsObject.validate = true
// } else {
//     optionsObject.validate = false
// }

// mdLinks(process.argv[2], optionsObject)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });



