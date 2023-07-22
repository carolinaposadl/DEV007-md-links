// Aquí va la lógica (las acciones del diagrama de flujo y las condiciones)

// importando con CommonJS modulos que nos da node.js
// const fs = require("fs", "fs/promises");
const path = require("path");
const functions = require('./functions.js')

function mdLinks(filePath) {
    // ------------ ¿existe la ruta? ------------
    // verificando si un archivo existe asincrónamente 
    const fileExists = functions.fileExists(filePath); // no es case sensitive
    //console.log(fs.existsSync(path));
    // mensaje error, si no encuentra la ruta
    if (!fileExists) {
        console.log("Error: path not found")
    } else {
        // ------------ ¿la ruta es absoluta? ------------
        // método de node para verificar si la ruta es absoluta
        if (!path.isAbsolute(filePath)) {
            // console.log(path.isAbsolute(filePath));
            // -------- Convertir la ruta a absoluta ------------
            console.log(path.resolve(filePath));
        } else {
            console.log("The route was already absolute");
        }
    }
    // ------------ ¿la ruta es un archivo? ------------
    // Verificando si la ruta es un archivo
    const fileIsPath = functions.fileIsPath(filePath);
    if (fileIsPath) {
        console.log('is file ? ' + stats.isFile()); // TAREA: definir callback
    } else {
        const fileIsDirectory = functions.fileIsDirectory(filePath);
        // Verificando si la ruta es un directorio
        console.log('is directory ? ' + stats.isDirectory());
    }

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
