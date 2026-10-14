/**
 * Entry point: starts the HTTP server.
 * The port can be set with the PORT environment variable (default 3000).
 */

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Hex to RGB API listening on http://localhost:${PORT}`);
});
