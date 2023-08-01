// Aquí van las funciones que se encargan de verificar las acciones

// Importando módulo fs
const fs = require('fs');
// const fsPromises = require('fs').promises;
const path = require('path');

// Función para verificar si existe la ruta
const fileExists = function (givenPath) {
    return fs.existsSync(givenPath);
};
// Función para verificar si la ruta es un archivo o un directorio, debe retornar una promesa
const checkPathType = function (givenPath) {
    return new Promise((resolve, reject) => {
        fs.stat(givenPath, (err, stats) => {
            if (err) {
                reject('Error: path must contain files or directories');
            } else {
                resolve(stats);
            }
        });
    });
};

// Función para leer la extensión de los archivos
const checkExtension = function (givenPath) {
    return path.extname(givenPath);
}

// Función para leer directorios
function readMdFiles(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const mdFiles = files.filter(file => path.extname(file) === '.md');
                resolve(mdFiles);
            }
        });
    });
}
readMdFiles('./example-directory')
    .then(mdFiles => {
        console.log(mdFiles); // this will log an array of filenames with the ".md" extension
    })
    .catch(err => {
        console.error(err);
    });





// --------------------ME ADELANTÉ!!!!! <<para leer el contenido de los archivos>>--------------
// Función para leer archivos  

// fsPromises.readFile() para leer el archivo
// const readThisFile = function (givenPath) {
//     return fs.promises.readFile(givenPath, 'utf8')
//         .then((data) => {
//             console.log("Data read from the file:", data);
//             return data;
//         })
//         .catch((err) => {
//             console.error("Got an error while reading the file:", err);
//             throw err;
//         })
// }

// Función para extraer los links



// Exportando funciones a la lógica del proyecto (index.js)
module.exports = {
    fileExists,
    checkPathType,
    checkExtension,
    // readDirectories,
    // readThisFile,

}

