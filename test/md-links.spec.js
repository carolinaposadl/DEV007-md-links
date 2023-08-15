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

  // ESTE ARROJA UN ERROR
  it('should throw an error if no files are found', () => {
    const dirPath = './example-empty-dir';
    expect(() => {
      readDirectory(dirPath);
    }).toThrow();
  });
});


//   it('should throw an error if no files are found', () => {
//     const dirPath = './empty-directory';
//     expect(() => readDirectory(dirPath)).toThrow('No files found');
//   });
// })


// it('should throw an error when given path is neither a file nor a directory', () => {
//   const invalidPath = './non-existent-path';
//   expect(() => {
//     checkPathType(invalidPath);
//   }).toThrow();
// });












describe(extractLinks, () => {
  it('should be a function', () => {
    expect(typeof extractLinks).toBe('function');
  });
});

describe(validateLinks, () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function');
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
