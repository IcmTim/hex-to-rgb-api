/**
 * Unit tests for the hexToRgb library function.
 * They test the function in isolation: no HTTP, no Express.
 */

const { hexToRgb } = require('../src/hexToRgb');

describe('hexToRgb', () => {
  describe('valid input', () => {
    test('converts a 6-digit hex with "#"', () => {
      expect(hexToRgb('#ff8800')).toEqual({ r: 255, g: 136, b: 0 });
    });

    test('converts a 6-digit hex without "#"', () => {
      expect(hexToRgb('ff8800')).toEqual({ r: 255, g: 136, b: 0 });
    });

    test('is case-insensitive', () => {
      expect(hexToRgb('#FF8800')).toEqual(hexToRgb('#ff8800'));
    });

    test('expands 3-digit shorthand', () => {
      expect(hexToRgb('#f80')).toEqual({ r: 255, g: 136, b: 0 });
    });

    test('handles black and white (boundary values)', () => {
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    });

    test('ignores surrounding whitespace', () => {
      expect(hexToRgb('  #0a0b0c ')).toEqual({ r: 10, g: 11, b: 12 });
    });
  });

  describe('invalid input', () => {
    test.each([
      ['empty string', ''],
      ['wrong length (4 digits)', '#abcd'],
      ['wrong length (7 digits)', '#abcdef1'],
      ['non-hex characters', '#gg0000'],
      ['only "#"', '#'],
      ['double "#"', '##ff8800'],
    ])('throws an Error for %s', (_name, value) => {
      expect(() => hexToRgb(value)).toThrow(Error);
    });

    test.each([
      ['number', 123456],
      ['null', null],
      ['undefined', undefined],
      ['object', {}],
    ])('throws a TypeError for %s', (_name, value) => {
      expect(() => hexToRgb(value)).toThrow(TypeError);
    });
  });
});
