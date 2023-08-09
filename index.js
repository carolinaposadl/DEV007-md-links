const {
    checkPathAndConvert,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks,
    // validateLinks,
    // getStats
} = require('./functions.js');

const mdLinks = (givenPath, options) => {
    return new Promise((resolve, reject) => {

        // Verificar si la ruta existe y convertir de relativa a absoluta
        checkPathAndConvert(givenPath);

        // Verificar si la ruta es un archivo o un directorio
        let mdFiles = []; // Array que contiene las rutas los archivos .md de directorios o archivos solitarios

        const pathType = checkPathType(givenPath);

        if (pathType === 'directory') { // no entiendo por qué vsc entiende 'directory'
            mdFiles = readDirectory(givenPath);
        } else if (pathType === 'file' && checkExtension(givenPath)) { // no entiendo por qué vsc entiende 'file'
            mdFiles.push(givenPath);
        } else {
            throw new Error('File must be a Markdown file.');// no entiendo throw new Error
        }

        // extractLinks() es llamado para cada archivo del array de mdFiles
        // extrayendo todos los links de los archivos .md y retornandolos como array
        // usa el método map() para crear un nuevo array con el resultado del llamadod e extractLinks en cada archivo del array mdFiles
        // el resultado de lo anterior se guarda en "promises"
        const promises = mdFiles.map(file => extractLinks(file));

        // Promise.all, método para manejar varios promesas simultaneamente
        // cada llamada a extractLinks devuelve una promesa que se resuelve con un array de enlaces.
        //  Usando Promise.all, podemos esperar a que todas estas promesas se resuelvan antes de proceder con los siguientes pasos.
        Promise.all(promises)

            .then(allLinks => { // consumo de promesa
                resolve(allLinks.flat()); // flat es para crear un solo array que contenga todos los array como objetos //AQUI IRIA EL RESOLVE!! porque tiene que devolver los links
            })
        // reject('ERRORRR!!!!'); //AQUI IRIA EL REJECT!! porque aqui termina la función PERO no funciona

        // .catch(err => {
        //     console.error(err.message);
        // });


        // -------------------- options ---------------------
        // 1. const validateLinksFromMdFiles = validateLinks(options);
        // 2. const getStatsFromLinks = getStats(options);

        // if (validateLinksFromMdFiles) {
        // return links;
        //} else if (getStatsFromLinks) {
        // return links;


        // ------ cierran la función mdLinks -------
    });
};




module.exports = {
    mdLinks
}


        // Notas
        // promise.all
        // Without Promise.all, the code would not wait for the promises to resolve, and the links would not be collected properly.
        // By using Promise.all, we ensure that all the promises are resolved before executing the subsequent code.