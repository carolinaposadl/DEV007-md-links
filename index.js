const fs = require('fs', 'fs/promises');
const path = require('path');
const functions = require('./functions.js')
const { checkPathType, checkExtension, readDirectory } = require('./functions.js');


function mdLinks(givenPath) {
    // ------------ ¿existe la ruta? ------------
    const fileExists = functions.fileExists(givenPath); // no es case sensitive
    if (!fileExists) {
        console.log("Error: path not found.")
    } else {
        // ------------ ¿la ruta es absoluta? ------------
        if (!path.isAbsolute(givenPath)) {
            console.log(path.resolve(givenPath)); // resolve método para convertirla a absoluta
        } else {
            console.log("the route was already absolute.");
        }
    }
    // ------------ ¿la ruta es un archivo o es un directorio? ------------
    const checkPathType = functions.checkPathType(givenPath);
    if (checkPathType) {
        if (checkPathType.isFile()) {
            // console.log(`${givenPath} is a file.`);
            if (checkExtension(givenPath) === '.md') {
                console.log(`File: ${givenPath} is a markdown file.`);
            } else {
                console.log(`File: ${givenPath} is not a markdown file.`);
            }
        } else if (checkPathType.isDirectory()) {
            console.log(`${givenPath} is a directory.`);
            const files = readDirectory(givenPath);
            if (files) {
                files.forEach(file => {
                    const filePath = path.join(givenPath, file);
                    if (checkExtension(filePath) === '.md') {
                        console.log(`Markdown file: ${filePath}`);
                    }
                });
            }
        }
        // ------------ Leer archivos y recursividad ------------
        // const readFilesFromDirectory = functions.readFilesFromDirectory (content, givenPath);
        // if (readFilesFromDirectory) {


        // }

    };



    // function processFile(content, filename) {
    //     const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    //     let match;
    //     let links = [];

    //     while ((match = linkRegex.exec(content)) !== null) {
    //         links.push({
    //             href: match[2],
    //             text: match[1],
    //             file: filename,
    //         });
    //     }

    //     console.log(links);
    // }

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



// // ----------------------------------------------------------------------------------
// const checkPathType = functions.checkPathType(givenPath);
//     if (checkPathType) {
//         if (checkPathType.isFile()) {
//             console.log(`${givenPath} is a file.`);
//         } else if (checkPathType.isDirectory()) {
//             console.log(`${givenPath} is a directory.`);

//         } else {
//             console.log(`${givenPath} is neither a file nor a directory.`);
//         }
//     }

//     // ------------ ¿Es un archivo .md? ------------
//     const extension = functions.checkExtension(givenPath);
//     if (extension) {
//         if (extension === '.md') {
//             console.log(`File: ${givenPath} is a markdown file.`);
//         } else {
//             console.log(`File: ${givenPath} is not a markdown file.`);
//         }
//     }

//     // ------------ leer directorios ------------
//     const files = functions.readDirectory(givenPath);
//     if (files) {
//         files.forEach(file => {
//             if (functions.checkExtension(file) === '.md') {
//                 console.log(file);
//             }
//         });
//     } else {
//         console.log('Error: no files');
//     }