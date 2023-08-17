const {
  checkPathAndConvert,
  checkPathType,
  checkExtension,
  readDirectory,
  extractLinks,
  validateLinks,
  getStats,
  getStatsAndValidate
} = require('../src/functions.js');

const axios = require('axios');
jest.mock('axios'); // mock de las peticiones HTTP de axios

// const { mdLinks } = require('../src/index.js');

// describe('mdLinks', () => {
//   test('should return a promise', () => {
//     const path = './example-directory';
//     const result = mdLinks(path);
//     expect(result).toBeInstanceOf(Promise); // Para verificar que el valor devuelto sea una instancia de clase "Promise"
//   });
//   // it('should reject the promise when an invalid path or non md file is provided', () => {
//   //   const invalidPath = '/invalid/path.txt';

//   //   return expect(mdLinks(invalidPath)).rejects.toThrow(Error);
//   // });
// });

// Test verificar si la ruta existe y convertir a absoluta
describe('checkPathAndConvert', () => {
  it('should return null if path does not exist', () => {
    const nonExistingPath = './path-that-does-not-exist'
    expect(checkPathAndConvert(nonExistingPath)).toBeNull();
  });

  it('should convert the path to absolute and return it', () => {
    const givenPath = './example-directory';
    const expectedAbsolutePath = 'C:\\Users\\Carolina\\OneDrive\\Documents\\Laboratoria\\DEV007-md-links\\example-directory';
    const absolutePath = checkPathAndConvert(givenPath, (givenPath) => givenPath === './example-directory');
    expect(absolutePath).toBe(expectedAbsolutePath);
  });
});

// Test verificar tipo de ruta (archivo o directorio)
describe('checkPathType', () => {
  it('should return "directory" for a directory path', () => {
    const path = './example-directory';
    const result = checkPathType(path);
    expect(result).toBe('directory');
  });

  it('should return "file" for a file path', () => {
    const path = './readme.md';
    const result = checkPathType(path);
    expect(result).toBe('file');
  });

  it('should throw an error when given path is neither a file nor a directory', () => {
    const invalidPath = './non-existent-path';
    expect(() => {
      checkPathType(invalidPath);
    }).toThrow();
  });

});

// Test extensión de archivos
describe('checkExtension', () => {
  it('should return true for .md file extension', () => {
    const givenPath = 'file.md';
    const result = checkExtension(givenPath);
    expect(result).toBe(true);
  });

  it('should return false for non .md file extension', () => {
    const givenPath = 'file.txt';
    const result = checkExtension(givenPath);
    expect(result).toBe(false);
  });

  it('should return false for empty file path', () => {
    const givenPath = '';
    const result = checkExtension(givenPath);
    expect(result).toBe(false);
  });
});

// Test lectura de directorios y extracción de archivos
describe(readDirectory, () => {
  it('should be a function', () => {
    expect(typeof readDirectory).toBe('function');
  });

  it('should add .md files to an array of files', () => {
    const dirPath = './example-directory';
    const result = readDirectory(dirPath);
    const expectedArray = [
      'example-directory\\example-subdirectory\\four.md',
      'example-directory\\one.md',
      'example-directory\\two.md'
    ];
    expect(result).toEqual(expectedArray);
  });

  it('should throw an error if no files are found', () => {
    const dirPath = './example-empty-dir';
    expect(() => {
      readDirectory(dirPath);
    }).toThrow();
  });

  // it('should throw an error if no files are found', () => {
  //   const dirPath = './example-empty-dir';
  //   expect(() => readDirectory(dirPath)).toThrow('No files found');
  // });

});

// Test para leer archivos .md y extraer links - PRUEBAS ASÍNCRONAS
describe('extractLinks', () => {
  it('should be a function', () => {
    expect(typeof extractLinks).toBe('function');
  });
  // Implementación personalizada de fs.readFile
  const mockReadFile = jest.fn((path, encoding, callback) => {
    const fileContent = `[Example](https://www.example.com)\n[Google](https://www.google.com)`;
    callback(null, fileContent);
  });

  beforeAll(() => {
    // Mock fs módulo y reemplazar fs.readFile con la implementación personalizada
    jest.mock('fs', () => ({
      readFile: mockReadFile,
    }));
  });

  test('should correctly save the links in an array', () => {
    const path = './example-directory-1/mock-file.md';

    return extractLinks(path).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links).toHaveLength(2);
      expect(links[0]).toEqual({ href: 'https://www.example.com', text: 'Example', file: path });
      expect(links[1]).toEqual({ href: 'https://www.google.com', text: 'Google', file: path });
    });
  });

  test('should correctly extract the links from the file content', () => {
    const path = './example-directory-1/mock-file.md';

    return extractLinks(path).then((links) => {
      expect(links).toEqual([
        { href: 'https://www.example.com', text: 'Example', file: path },
        { href: 'https://www.google.com', text: 'Google', file: path },
      ]);
    });
  });
});

// 1. Se define una implementación personalizada de fs.readFile llamada mockReadFile. 
// Esta implementación se utiliza para simular la lectura de un archivo y devuelve un contenido de archivo específico.
// 2. Antes de ejecutar los tests, se utiliza beforeAll para reemplazar la implementación real de fs.readFile 
// con la implementación personalizada mockReadFile. 
// Esto se hace utilizando jest.mock para simular el módulo fs y reemplazar la función readFile con mockReadFile.
// 3. A continuación, se definen los tests individuales dentro de test. 
// Cada test verifica un aspecto específico de la función extractLinks.

// Test para validar links
describe(validateLinks, () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('should return an array of objects with status and ok properties', function () {
    const links = [
      { href: 'http://example.com', text: 'Example', file: 'file1' },
      { href: 'http://nonexistent.com', text: 'Nonexistent', file: 'file2' }
    ];

    // Mock de validación
    axios.get.mockResolvedValueOnce({ status: 200 });
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    return validateLinks(links).then(result => {
      expect(result).toHaveLength(links.length);
      result.forEach(link => {
        expect(link).toHaveProperty('status');
        expect(link).toHaveProperty('ok');
      });
    });
  });
});



describe(getStats, () => {
  it('should be a function', () => {
    expect(typeof getStats).toBe('function');
  });
});

describe(getStatsAndValidate, () => {
  it('should be a function', () => {
    expect(typeof getStatsAndValidate).toBe('function');
  });
});
