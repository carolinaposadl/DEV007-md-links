// Aquí va la lógica del proyecto

// Importando con CommonJS modulos de node.js
const fs = require('fs', 'fs/promises');
const path = require('path');
const functions = require('./functions.js')

function mdLinks(givenPath) {
    // ------------ ¿existe la ruta? ------------
    // verificando si un archivo existe asincrónamente 
    const fileExists = functions.fileExists(givenPath); // no es case sensitive
    //console.log(fs.existsSync(path));
    // mensaje error, si no encuentra la ruta
    if (!fileExists) {
        console.log("Error: path not found.")
    } else {
        // ------------ ¿la ruta es absoluta? ------------
        // método de node para verificar si la ruta es absoluta
        if (!path.isAbsolute(givenPath)) {
            // console.log(path.isAbsolute(filePath));
            // -------- Convertir la ruta a absoluta ------------
            console.log(path.resolve(givenPath));
        } else {
            console.log("the route was already absolute.");
        }
    }
    // ------------ ¿la ruta es un archivo o es un directorio? ------------
    const checkPathType = functions.checkPathType(givenPath);
    try {
        if (checkPathType.isFile()) {
            console.log(`${givenPath} is a file.`);
        } else if (checkPathType.isDirectory()) {
            console.log(`${givenPath} is a directory.`);
        } else {
            console.log(`${givenPath} is neither a file nor a directory.`);
        }
    } catch (error) {
        console.log('Error: path must contain files or directories'); // tal vez esto vaya en "leer directorios"?
    }
    // ------------ Leer archivos y directorios ------------
    const readThisFile = functions.readThisFile(givenPath);
    const readDirSynchronously = functions.readDirSynchronously(givenPath);



    // ------------ ¿Es un archivo .md? ------------


}

module.exports = {
    mdLinks
}

// notes
// * "In Node.js, file handling is handled by the fs module."
// un callback es lo que se ejecuta después de completada la función
// la función se debe completar antes del callback
// un callback se ejecuta después de que la primera función se haya ejecutado
// se usa para lo asíncrono

// usar try-catch para cachar los errores en caso de que no se encuentre un archivo o no se encuentre links en ellos o no sea md, etc...
