// Funciones cli (process, validate, stats)
const { mdLinks } = require('./src/index.js');
const { validateLinks, getStats, getStatsAndValidate } = require('./src/functions.js');

let filePath = process.argv[2]; // para obtener los argumentos que se pasen por node.js
let options = process.argv.slice(3); // retorna un nuevo array empezando por el índice 3

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
