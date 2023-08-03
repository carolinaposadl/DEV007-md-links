const fs = require('fs');
const path = require('path');

// Función para verificar si existe la ruta
const fileExists = function (givenPath) {
    return fs.existsSync(givenPath);
};

// Función para verificar si la ruta es un archivo o un directorio
const checkPathType = (givenPath) => {
    if (fs.statSync(givenPath).isDirectory()) {
        return 'directory';
    } else if (fs.statSync(givenPath).isFile()) {
        return 'file';
    } else {
        throw new Error('Path is not a file or directory');
    }
};

// Función para verificar si la ruta es un archivo .md
const checkExtension = (givenPath) => {
    return path.extname(givenPath) === '.md';
};

const readDirectory = (dirPath) => {
    let files = [];
    const dirContent = fs.readdirSync(dirPath);

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
                        file: filePath
                    });
                }
                resolve(links);
            }
        });
    });
};

module.exports = {
    fileExists,
    checkPathType,
    checkExtension,
    readDirectory,
    extractLinks,

}
// Aquí van las funciones que se encargan de verificar las acciones