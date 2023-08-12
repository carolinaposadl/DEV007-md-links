const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Función para verificar si existe la ruta y convertir de relativa a absoluta
const checkPathAndConvert = (givenPath) => { // BUGS
    if (!fs.existsSync(givenPath)) {
        return null; // La ruta no existe
    } else if (!path.isAbsolute(givenPath)) {
        // console.log('buuugs', path.resolve(givenPath))
        console.log(path.resolve(givenPath));
    } else {
        return givenPath;
    }
};


// Función para verificar si la ruta es un archivo o un directorio
const checkPathType = (givenPath) => {
    //console.log('aaaaa', fs.statSync(givenPath).isDirectory())
    if (fs.statSync(givenPath).isDirectory()) {
        return 'directory';
    } else if (fs.statSync(givenPath).isFile()) {
        return 'file';
    } else {
        throw new Error('Path is neither a file nor a directory.');
    }
};

// Función para verificar si la ruta es un archivo .md
const checkExtension = (givenPath) => {
    return path.extname(givenPath) === '.md';
};

// Función para leer directorio y obtener archivos .md
const readDirectory = (dirPath) => {
    const dirContent = fs.readdirSync(dirPath);

    let files = []; // array al que se añaden los archivos

    dirContent.forEach((dirItem) => {
        const newDirPath = path.join(dirPath, dirItem);

        if (checkPathType(newDirPath) === 'directory') {
            files = files.concat(readDirectory(newDirPath));
        } else if (checkExtension(newDirPath)) {
            files.push(newDirPath); // push añade los links al final del array, devuelve nueva longitud del array
        } else if (files.length === 0) {
            throw new Error('No files found');
        }
    });
    return files;
};

// Función para leer archivos .md y extraer links
const extractLinks = (givenPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(givenPath, 'utf8', (err, fileContent) => {
            if (err) {
                reject(err);
            } else {
                const linksRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                let match;
                const links = [];

                while ((match = linksRegex.exec(fileContent)) !== null) {
                    links.push({
                        href: match[2],
                        text: match[1],
                        file: givenPath
                    });
                }
                resolve(links);
            }
        });
    });
};

// Función para validar links
function validateLinks(links) {
    let promises = links.map(link => {
        return axios.get(link.href) // ¿cuál es la diferencia entre URL, href, HTTP?
            .then(function (response) {
                return {
                    ...link, // agrega las propiedades de link (href,text,file), crea un nuevo onjeto y copia todas las propiedades del objeto link en un nuevo objeto
                    status: response.status, // response "representa la respuesta a una petición" fetch API ?
                    ok: 'ok'
                };
            })
            .catch(function (error) {
                return {
                    ...link,
                    status: error.response ? error.response.status : '404', // 404??? o mejor No response??
                    ok: 'fail'
                };
            });
    });

    return Promise.all(promises); // esperar a que las solucitudes HTTP se completen antes de devolver validLinks
}

// Función para obtener estadísticas de links
// function getStats(links) {
//     let total = links.length;
//     let unique = [...new Set(links.map(link => link.href))].length;
//     return {
//         Total: total,
//         Unique: unique
//     };
// }

function getStats(links) {
    if (!Array.isArray(links)) {
        return {
            Total: 0,
            Unique: 0
        };
    }

    let total = links.length;
    let uniqueLinks = new Set();

    for (let i = 0; i < links.length; i++) {
        uniqueLinks.add(links[i].href);
    }

    return {
        Total: total,
        Unique: uniqueLinks.size
    };
}


// function getStatsAndValidate(links) {
//     let validLinks = validateLinks(links);
//     let stats = getStats(validLinks);
//     let broken = validLinks.filter(link => link.ok === 'fail').length;
//     return {
//         ...stats,
//         Broken: broken
//     };
// }

function getStatsAndValidate(links) {
    // Primero asegurémonos de que los links sean un array
    if (!Array.isArray(links)) {
        return Promise.resolve({
            Total: 0,
            Unique: 0,
            Broken: 0
        });
    }

    // Usaremos .then() para manejar la promesa
    return validateLinks(links).then(validLinks => {
        if (!Array.isArray(validLinks)) {
            return {
                Total: 0,
                Unique: 0,
                Broken: 0
            };
        }

        let stats = getStats(validLinks);
        let broken = validLinks.filter(link => link.ok === 'fail').length;

        return {
            ...stats,
            Broken: broken,
        };
    });
}


module.exports = {
    checkPathAndConvert,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks,
    validateLinks,
    getStats,
    getStatsAndValidate
}


// En este archivo van las funciones que se encargan de verificar las acciones



