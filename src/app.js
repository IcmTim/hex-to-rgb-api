/**
 * Express application exposing the hex-to-RGB library as a REST API.
 *
 * The app is created and exported without starting a server so that it can be
 * used directly in integration tests (see tests/api.test.js).
 *
 * @module app
 */

const express = require('express');
const { hexToRgb } = require('./hexToRgb');

const app = express();
app.use(express.json());

/**
 * GET /api/hex-to-rgb?hex=ff8800
 *
 * Query parameter "hex": hex color with or without "#" (3 or 6 digits).
 * Note: when sending "#" in a URL, encode it as %23.
 *
 * 200 -> { "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
 * 400 -> { "error": "<message>" }
 */
app.get('/api/hex-to-rgb', (req, res) => {
  const { hex } = req.query;

  if (hex === undefined) {
    return res.status(400).json({ error: 'Query parameter "hex" is required' });
  }

  try {
    const rgb = hexToRgb(hex);
    return res.status(200).json({ hex, rgb });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/**
 * POST /api/hex-to-rgb
 *
 * Body (JSON): { "hex": "#ff8800" }
 *
 * 200 -> { "hex": "#ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
 * 400 -> { "error": "<message>" }
 */
app.post('/api/hex-to-rgb', (req, res) => {
  const hex = req.body ? req.body.hex : undefined;

  if (hex === undefined) {
    return res.status(400).json({ error: 'Field "hex" is required in the request body' });
  }

  try {
    const rgb = hexToRgb(hex);
    return res.status(200).json({ hex, rgb });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/**
 * Handles malformed JSON bodies and any other unexpected errors.
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
