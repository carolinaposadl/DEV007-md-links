// Aquí van las funciones que se encargan de verificar las acciones

// Importando módulo fs
const fs = require('fs');
// const fsPromises = require('fs').promises;
const path = require('path');

// Función para verificar si existe la ruta
const fileExists = function (givenPath) {
    return fs.existsSync(givenPath);
};

// Función para verificar si la ruta es un archivo o un directorio
const checkPathType = function (givenPath) {
    try {
        return fs.statSync(givenPath);
    } catch (error) {
        console.log('Error: path is neither a file nor a directory.');
        return null;
    }
};

// Función para leer la extensión de los archivos
const checkExtension = function (givenPath) {
    return path.extname(givenPath);
}

// Función para leer directorios
const readDirectory = function (givenPath) {
    try {
        return fs.readdirSync(givenPath);
    } catch (error) {
        console.log('Error: Unable to read directory');
        return null;
    }
};

// Función para leer archivos
const readFilesFromDirectory = function (givenPath) {
    return fs.readFile(givenPath, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading file`);
        } else {
            readFiles(data);
        }
    })
}






// Función para extraer los links




// Exportando funciones a la lógica del proyecto (index.js)
module.exports = {
    fileExists,
    checkPathType,
    checkExtension,
    readDirectory,
    readFilesFromDirectory,

}
