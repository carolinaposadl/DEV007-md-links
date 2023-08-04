const functions = require('./functions.js')
const {
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks
} = require('./functions.js');

const mdLinks = (givenPath) => {

    // Verificar si la ruta existe y convertir de relativa a absoluta
    functions.checkPathAndConvert(givenPath);

    // Verificar si la ruta es un archivo o un directorio
    let mdFiles = [];
    try {
        const pathType = checkPathType(givenPath);

        if (pathType === 'directory') { // no entiendo por qué vsc entiende 'directory'
            mdFiles = readDirectory(givenPath);
        } else if (pathType === 'file' && checkExtension(givenPath)) { // no entiendo por qué vsc entiende 'file'
            mdFiles.push(givenPath);
        } else {
            throw new Error('File must be a Markdown file');// no entiendo throw new Error
        }

        const promises = mdFiles.map(file => extractLinks(file)); // no entiendo
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
};


module.exports = {
    mdLinks
}


