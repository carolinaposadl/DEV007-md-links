// Aquí van las funciones que se encargan de verificar las acciones 
// Exportamos estas funciones a la lógica del proyecto (index.js)
const fs = require('fs')

const fileExists = function (filePath) {
    return fs.existsSync(filePath);
}

module.exports = {
    fileExists
}