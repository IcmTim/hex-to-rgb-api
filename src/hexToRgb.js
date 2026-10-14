/**
 * Hex to RGB conversion library.
 *
 * Supported input formats (the leading "#" is optional, case-insensitive):
 *   - 6 digits: "#FF8800"
 *   - 3 digits: "#F80" (each digit is doubled, so it equals "#FF8800")
 *
 * @module hexToRgb
 */

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Converts a hex color string to an RGB object.
 *
 * @param {string} hex - Hex color, e.g. "#ff8800", "ff8800" or "#f80".
 * @returns {{r: number, g: number, b: number}} RGB values, each 0-255.
 * @throws {TypeError} If the input is not a string.
 * @throws {Error} If the string is not a valid 3- or 6-digit hex color.
 */
function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string');
  }

  const match = HEX_PATTERN.exec(hex.trim());
  if (!match) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  let digits = match[1];
  if (digits.length === 3) {
    // Expand shorthand: "f80" -> "ff8800"
    digits = digits
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
}

module.exports = { hexToRgb };
