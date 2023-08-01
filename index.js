// Aquí va la lógica del proyecto

// Importando con CommonJS modulos de node.js
const fs = require('fs', 'fs/promises');
const path = require('path');
const { checkPathType, checkExtension } = require('./functions.js');

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
    // ------------ Si es un archivo ¿es .md? ------------
    // isFile() & isDirectory() son métodos del módulo fs
    functions.checkPathType(givenPath)
        .then(checkPathType => {
            if (checkPathType.isFile()) {
                console.log(`${givenPath} is a file.`);
                if (checkExtension(givenPath) === '.md') {
                    console.log(`File: ${givenPath} is a markdown file.`);
                } else {
                    console.log(`File: ${givenPath} is not a markdown file.`);
                }
            } else if (checkPathType.isDirectory()) {
                console.log(`${givenPath} is a directory.`);

                // if 
            } else {
                console.log(`${givenPath} is neither a file nor a directory.`);
            }
        })
        .catch(error => {
            console.log(error);
        });


    // ------------ Leer archivos ------------
    // const readThisFile = functions.readThisFile(givenPath);
    // ya lee lo que hay dentro del archivo, pero la lógica debería estar implementada acá

    // Leer directorios





    // traer la función
    // en una constante guardar la importación de la función, esa es la constante que se recorrerá
    // crear el ciclo forEach que filtre los archivos .md

    // leer el directorio (NUEVO!!!!)
    // verificar si tiene archivos (solo verificar) --- si no tiene ERROR (NUEVO!!!!)
    // escoger los archivos .md (checkExtension)
    // agregar esos archivos a un array (NUEVO!!!!)
    // leer cada archivo (readFile)
    // crear condición de recursividad



    // pathsArray.forEach(filePath => {
    //     if (path.extname(filePath) == ".md") {
    //         console.log(filePath);
    //     } else if (!path.extname(filePath) == ".md") {
    //         console.log("Error: path must contain .md files.")
    //     }
    // });




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
