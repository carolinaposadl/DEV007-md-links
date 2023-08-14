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


// describe(checkPathAndConvert, () => {
//   it('should be a function', () => {
//     expect(typeof checkPathAndConvert).toBe('function');
//   });
// });


describe('checkPathAndConvert', () => {
  test('returns null when given path does not exist', () => {
    const nonExistentPath = '/path/that/does/not/exist';
    expect(checkPathAndConvert(nonExistentPath)).toBe(null);
  });

  test('prints absolute path when given path is relative', () => {
    const relativePath = './relative/path';
    const consoleSpy = jest.spyOn(console, 'log');
    checkPathAndConvert(relativePath);
    expect(consoleSpy).toHaveBeenCalledWith(path.resolve(relativePath));
  });

  test('returns given path when it is absolute', () => {
    const absolutePath = '/absolute/path';
    expect(checkPathAndConvert(absolutePath)).toBe(absolutePath);
  });
});


describe(checkPathType, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(checkExtension, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(readDirectory, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(extractLinks, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(validateLinks, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(getStats, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});

describe(getStatsAndValidate, () => {
  it('should be a function', () => {
    expect(typeof checkPathAndConvert).toBe('function');
  });
});


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
