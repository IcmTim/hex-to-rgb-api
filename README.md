# Hex to RGB API

A small JavaScript library that converts hex colors to RGB, an Express REST API
that exposes it, and a Jest test suite (unit + integration tests).

## Structure

```
src/hexToRgb.js        library: hexToRgb(hex)
src/app.js             Express app (routes)
src/server.js          starts the HTTP server
tests/hexToRgb.test.js unit tests for the library
tests/api.test.js      integration tests for the API route
```

## Setup

```bash
npm install
```

## Run the API

```bash
npm start            # http://localhost:3000
PORT=8080 npm start  # custom port
```

## Run the tests

```bash
npm test                  # all tests
npm run test:unit         # unit tests only
npm run test:integration  # integration tests only
npm run test:coverage     # with coverage report
```

## API

### `GET /api/hex-to-rgb?hex=<value>`

```bash
curl "http://localhost:3000/api/hex-to-rgb?hex=ff8800"
curl "http://localhost:3000/api/hex-to-rgb?hex=%23f80"   # "#" must be encoded as %23
```

Response `200`:

```json
{ "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
```

### `POST /api/hex-to-rgb`

```bash
curl -X POST http://localhost:3000/api/hex-to-rgb \
  -H "Content-Type: application/json" \
  -d '{"hex": "#ff8800"}'
```

Response `200`:

```json
{ "hex": "#ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
```

### Errors

Invalid or missing input returns `400`:

```json
{ "error": "Invalid hex color: \"zzzzzz\"" }
```

## Supported hex formats

6 digits (`#ff8800`) or 3 digits (`#f80`), with or without `#`, case-insensitive.
