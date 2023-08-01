// Aquí va la lógica del proyecto

// Importando con CommonJS modulos de node.js
const fs = require('fs', 'fs/promises');
const path = require('path');
// const { checkPathType, checkExtension } = require('./functions.js');

const functions = require('./functions.js')

function mdLinks(givenPath) {
    // ------------ ¿existe la ruta? ------------
    // verificando si un archivo existe 
    const fileExists = functions.fileExists(givenPath); // no es case sensitive
    if (!fileExists) {
        console.log("Error: path not found.")
    } else {
        // ------------ ¿la ruta es absoluta? ------------
        if (!path.isAbsolute(givenPath)) { // isAbsolute método para verificar si la ruta es absoluta
            // -------- Convertir la ruta a absoluta ------------
            console.log(path.resolve(givenPath)); // resolve método para convertirla a absoluta
        } else {
            console.log("the route was already absolute.");
        }
    }

    // ------------ ¿la ruta es un archivo o es un directorio? ------------
    // isFile() & isDirectory() son métodos del módulo fs
    const checkPathType = functions.checkPathType(givenPath);
    if (checkPathType) {
        if (checkPathType.isFile()) {
            console.log(`${givenPath} is a file.`);
        } else if (checkPathType.isDirectory()) {
            console.log(`${givenPath} is a directory.`);

        } else {
            console.log(`${givenPath} is neither a file nor a directory.`);
        }
    }

    // ------------ ¿Es un archivo .md? ------------
    const extension = functions.checkExtension(givenPath);
    if (extension) {
        if (extension === '.md') {
            console.log(`File: ${givenPath} is a markdown file.`);
        } else {
            console.log(`File: ${givenPath} is not a markdown file.`);
        }
    }

    // ------------ leer directorios ------------
    const files = functions.readDirectory(givenPath);
    if (files) {
        files.forEach(file => {
            if (functions.checkExtension(file) === '.md') {
                console.log(file);
            }
        });
    } else {
        console.log('Error: no files');
    }

    // ------------ Leer archivos ------------
    // const readFiles = functions.readFiles(givenPath);
    // function processFile(content) {
    //     const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    //     const urls = content.match(urlRegex);
    //     console.log(urls);
    // }

    // readFile('test.md');


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

// usar try-catch para cachar los errores en caso de que no se encuentre un archivo o no se encuentre links en ellos o no sea md, etc
