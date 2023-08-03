const path = require('path');
const functions = require('./functions.js')
const { } = require('./functions.js');


const mdLinks = (givenPath) => {
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
    // ------------ ¿la ruta es un archivo o es un directorio? -----------




}
module.exports = {
    mdLinks
}



