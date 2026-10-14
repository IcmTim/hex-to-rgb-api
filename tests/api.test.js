/**
 * Integration tests for the Express route /api/hex-to-rgb.
 * They exercise the whole chain: HTTP request -> route -> library -> JSON response.
 * supertest calls the app directly, so no real port is opened.
 */

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/hex-to-rgb', () => {
  test('returns 200 and RGB values for a valid hex', async () => {
    const res = await request(app).get('/api/hex-to-rgb').query({ hex: 'ff8800' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({ hex: 'ff8800', rgb: { r: 255, g: 136, b: 0 } });
  });

  test('accepts an URL-encoded "#" and 3-digit shorthand', async () => {
    const res = await request(app).get('/api/hex-to-rgb?hex=%23f80');

    expect(res.status).toBe(200);
    expect(res.body.rgb).toEqual({ r: 255, g: 136, b: 0 });
  });

  test('returns 400 when "hex" is missing', async () => {
    const res = await request(app).get('/api/hex-to-rgb');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 400 for an invalid hex value', async () => {
    const res = await request(app).get('/api/hex-to-rgb').query({ hex: 'zzzzzz' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid hex color/i);
  });

  test('returns 400 when "hex" is given as an array', async () => {
    const res = await request(app).get('/api/hex-to-rgb?hex=ff0000&hex=00ff00');

    expect(res.status).toBe(400);
  });
});

describe('POST /api/hex-to-rgb', () => {
  test('returns 200 and RGB values for a valid JSON body', async () => {
    const res = await request(app).post('/api/hex-to-rgb').send({ hex: '#0a0b0c' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ hex: '#0a0b0c', rgb: { r: 10, g: 11, b: 12 } });
  });

  test('returns 400 when the body has no "hex" field', async () => {
    const res = await request(app).post('/api/hex-to-rgb').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 400 when "hex" is not a string', async () => {
    const res = await request(app).post('/api/hex-to-rgb').send({ hex: 123456 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/string/i);
  });

  test('returns 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/hex-to-rgb')
      .set('Content-Type', 'application/json')
      .send('{"hex": ');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid json/i);
  });
});

describe('unknown routes', () => {
  test('returns 404 for a route that does not exist', async () => {
    const res = await request(app).get('/api/unknown');

    expect(res.status).toBe(404);
  });
});
