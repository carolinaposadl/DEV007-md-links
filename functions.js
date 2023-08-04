const fs = require('fs');
const path = require('path');

// Función para verificar si existe la ruta y convertir de relativa a absoluta
const checkPathAndConvert = (givenPath) => {
    if (!fs.existsSync) {
        console.log('Path not found.')
    } else {
        if (!path.isAbsolute(givenPath)) {
            console.log(path.resolve(givenPath));
        } else {
            console.log('Path was already absolute.');
        }
    }
};

// Función para verificar si la ruta es un archivo o un directorio
const checkPathType = (givenPath) => {
    if (fs.statSync(givenPath).isDirectory()) {
        return 'directory';
    } else if (fs.statSync(givenPath).isFile()) {
        return 'file';
    } else {
        throw new Error('Path is not a file or directory.');
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
            files.push(newDirPath);
        }
    });
    return files;
};

// Función para leer archivos .md y extraer links
const extractLinks = (givenPath) => { // debería haber un "no links found" cuando no encuentre links
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

module.exports = {
    checkPathAndConvert,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks,
}

// En este archivo van las funciones que se encargan de verificar las acciones

