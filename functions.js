// Aquí van las funciones que se encargan de verificar las acciones 
// Exportamos estas funciones a la lógica del proyecto (index.js)

// importando métodos del módulo fs
const fs = require('fs', 'fs/promises');
const path = require("path");

// Función para verificar si existe la ruta
const fileExists = function (filePath) {
    return fs.existsSync(filePath);
}

// Función para verificar si la ruta es un archivo asíncrono
const fileIsPath = function (filePath) {
    return fs.stat(filePath, (err, stats)); // callback
}

// Función para verificar si la ruta es un directorio síncrono
const fileIsDirectory = function (filePath) {
    // El método statSync() para guardar lo retornado
    return fs.statSync(filePath);
}

// Función para leer el contenido de un archivo de forma asíncrona
const readThisFile = function (filePath) {
    return fs.readFile().then;
}

// Función para leer el contenido de directorios de forma síncrona
const readFileSynchronously = function (filePath) {
    return readFileSync(path)
}

module.exports = {
    fileExists,
    fileIsPath,
    fileIsDirectory,
    readThisFile,
    readFileSynchronously,
}