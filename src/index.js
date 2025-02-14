const {
    checkPathAndConvert,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks,
} = require('./functions.js');

const mdLinks = (givenPath) => {
    return new Promise((resolve, reject) => {

        try {
            // Verificar si la ruta existe y convertir de relativa a absoluta
            const absolutePath = checkPathAndConvert(givenPath);
            if (absolutePath === null) {
                console.log('Path does not exist.');
                reject(new Error('Path does not exist.'));
                process.exit(0); // terminar la ejecución de la función, después de rechazada la promesa.
            }

            // Verificar si la ruta es un archivo o un directorio
            let mdFiles = []; // Array que contiene las rutas de los archivos .md de directorios o archivos solitarios.

            const pathType = checkPathType(givenPath);

            if (pathType === 'directory') {
                mdFiles = readDirectory(givenPath);
            } else if (pathType === 'file' && checkExtension(givenPath)) {
                mdFiles.push(givenPath);
            } else {
                //throw new Error('File must be a Markdown file.');
                console.log('File must be a Markdown file.');
            }

            // extractLinks() es llamado para cada archivo del array de mdFiles
            // extrayendo todos los links de los archivos .md y retornandolos como array
            // usa el método map() para crear un nuevo array con el resultado del llamado de extractLinks en cada archivo del array mdFiles
            // el resultado de lo anterior se guarda en "promises".
            const promises = mdFiles.map(file => extractLinks(file));

            // Promise.all, método para manejar varios promesas simultaneamente
            // cada llamada a extractLinks devuelve una promesa que se resuelve con un array de enlaces.
            //  Usando Promise.all, podemos esperar a que todas estas promesas se resuelvan antes de proceder con los siguientes pasos.
            Promise.all(promises)

                .then(allLinks => { // consumo de promesa
                    // resolve, se devuelven los links 
                    resolve(allLinks.flat()); // flat es para crear un solo array que contenga todos los array como objetos 
                })

        } catch (error) {
            reject(error); // capturar y manejar errores de mdLinks
        }

    });
};

module.exports = {
    mdLinks
}
