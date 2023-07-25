// Aquí van las funciones que se encargan de verificar las acciones

// Importando métodos del módulo fs
const fs = require('fs', 'fs/promises');
// const path = require("path");

// Función para verificar si existe la ruta
const fileExists = function (givenPath) {
    return fs.existsSync(givenPath);
}
// Función para verificar si la ruta es un archivo o un directorio
const checkPathType = function (givenPath) {
    return fs.statSync(givenPath);
}

// Función para leer archivos de forma asíncrona 
const readThisFile = function (givenPath) {
    return fs.readFile(givenPath).then;
}

// Función para leer directorios de forma síncrona
const readDirSynchronously = function (givenPath) {
    return fs.readDirSync(givenPath)
}

// Función para leer la extensión de los archivos



// Exportando funciones a la lógica del proyecto (index.js)
module.exports = {
    fileExists,
    checkPathType,
    readThisFile,
    readDirSynchronously,
}