// importando con ESModules modulo fs que nos da node.js
const fs = require("fs");
const path = require("path");

// cómo sé qué ruta se le está pasando?
// R: se pasa la ruta por la terminal

// ------------ ingreso de ruta ------------
// comando: node index.js readme.md (su output son los argumentos que se le pasan-> 
// en este caso, sería ingresar a readme.md) (?)
// "This property returns an array containing the arguments passed to the process when 
// run it in the command line. The first element is the process execution path 
// and the second element is the path for the js file."
// para obtener los argumentos que le pasemos por node.js
const filePath = process.argv[2];
// console.log(path);

// ------------ ¿existe la ruta? ------------
// verificando si un archivo existe asincrónamente 
// revisar si existe otro método que sea case sensitive 
const fileExists = fs.existsSync(filePath);
//console.log(fs.existsSync(path));
// mensaje error, si no encuentra la ruta
if (fileExists === false) {
    console.log("Error: path not found")
} else {
    // ------------ ¿la ruta es absoluta? ------------
    // método de node para verifica si la ruta es absoluta
    if (path.isAbsolute(filePath) === false) {
        // console.log(path.isAbsolute(filePath));
        // método de node (resolve) para convertir la ruta a absoluta
        console.log(path.resolve(filePath));
    } else {
        console.log("The route was already absolute");
    }
}
// esto debe devolver un boolean para saber si es relativa o absoluta

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------ LA FUNCIÓN ------------------------
// lo mismo de arriba pero dentro de una función!
// const mdLinks = () => {
//     // Obtener la ruta
//     const relativePath = process.argv[2];
//     // Verificar si la ruta es absoluta
//     if (!path.isAbsolute(relativePath)) {
//         // !path.isAbsolute está negando el método, pq queremos que ejecute 'false', si quisieramos que ejecutara 'true' le quitariamos este signo '!'
//         // Convertir la ruta a absoluta
//         const absolutePath = path.resolve(relativePath);
//     }
// };
// mdLinks();