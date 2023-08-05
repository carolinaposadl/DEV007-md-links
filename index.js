const {
    checkPathAndConvert,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks
} = require('./functions.js');

const mdLinks = (givenPath) => {
    // return new Promise((resolve, reject) => {

    // Verificar si la ruta existe y convertir de relativa a absoluta
    checkPathAndConvert(givenPath);

    // Verificar si la ruta es un archivo o un directorio
    let mdFiles = []; // Array que contiene las rutas los archivos .md de directorios o archivos solitarios


    try {
        const pathType = checkPathType(givenPath);

        if (pathType === 'directory') { // no entiendo por qué vsc entiende 'directory'
            mdFiles = readDirectory(givenPath);
        } else if (pathType === 'file' && checkExtension(givenPath)) { // no entiendo por qué vsc entiende 'file'
            mdFiles.push(givenPath);
        } else {
            throw new Error('File must be a Markdown file');// no entiendo throw new Error
        }

        // extractLinks() es llamado para cada archivo del array de mdFiles
        // extrayendo todos los links de los archivos .md y retornandolos como array
        // usa el método map() para crear un nuevo array con el resultado del llamadod e extractLinks en cada archivo del array mdFiles
        const promises = mdFiles.map(file => extractLinks(file));

        Promise.all(promises) // no entiendo

            .then(allLinks => { // no entiendo
                console.log(allLinks.flat()); // no entiendo
            })
            .catch(err => { // no entiendo
                console.error(err.message); // no entiendo
            });

    } catch (err) { // no entiendo
        console.error(err.message); // no entiendo
    }
    //});
};

module.exports = {
    mdLinks
}




// const mdLinks = (givenPath) => {

//     // Verificar si la ruta existe y convertir de relativa a absoluta
//     functions.checkPathAndConvert(givenPath);

//     // Verificar si la ruta es un archivo o un directorio
//     let mdFiles = [];
//     try {
//         const pathType = checkPathType(givenPath);

//         if (pathType === 'directory') { // no entiendo por qué vsc entiende 'directory'
//             mdFiles = readDirectory(givenPath);
//         } else if (pathType === 'file' && checkExtension(givenPath)) { // no entiendo por qué vsc entiende 'file'
//             mdFiles.push(givenPath);
//         } else {
//             throw new Error('File must be a Markdown file');// no entiendo throw new Error
//         }

//         const promises = mdFiles.map(file => extractLinks(file)); // no entiendo
//         Promise.all(promises) // no entiendo
//             .then(allLinks => { // no entiendo
//                 console.log(allLinks.flat()); // no entiendo
//             })
//             .catch(err => { // no entiendo
//                 console.error(err.message); // no entiendo
//             });

//     } catch (err) { // no entiendo
//         console.error(err.message); // no entiendo
//     }
// };


// module.exports = {
//     mdLinks
// }