const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { createApp } = require('../src/app');

test('health endpoint responds ok', async () => {
  const app = createApp();

  const res = await request(app).get('/api/health');

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('register, session, and logout flow works', async () => {
  const app = createApp();
  const agent = request.agent(app);
  const csrf = await agent.get('/api/csrf-token');
  const csrfToken = csrf.body.csrfToken;

  const register = await agent
    .post('/auth/register')
    .set('x-csrf-token', csrfToken)
    .send({ email: 'user@example.com', password: 'strongpass123' });

  assert.equal(register.status, 201);
  assert.equal(register.body.email, 'user@example.com');

  const me = await agent.get('/api/me');
  assert.equal(me.status, 200);
  assert.equal(me.body.email, 'user@example.com');

  const logout = await agent
    .post('/auth/logout')
    .set('x-csrf-token', csrfToken);
  assert.equal(logout.status, 204);

  const meAfterLogout = await agent.get('/api/me');
  assert.equal(meAfterLogout.status, 401);
});
