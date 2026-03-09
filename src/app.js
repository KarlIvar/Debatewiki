const crypto = require('node:crypto');
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const session = require('express-session');

const users = new Map();

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');

  if (!salt || !hash) {
    return false;
  }

  const derived = crypto.scryptSync(password, salt, 64).toString('hex');

  return crypto.timingSafeEqual(
    Buffer.from(derived, 'hex'),
    Buffer.from(hash, 'hex')
  );
}

function requireAuth(req, res, next) {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  return next();
}

function requireCsrf(req, res, next) {
  if (
    req.method === 'GET' ||
    req.method === 'HEAD' ||
    req.method === 'OPTIONS'
  ) {
    return next();
  }

  const token = req.get('x-csrf-token') || req.body.csrfToken;

  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  return next();
}

function createApp() {
  const app = express();
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts' }
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'debatewiki-dev-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    })
  );
  app.use((req, _res, next) => {
    if (!req.session.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }

    return next();
  });
  app.use(requireCsrf);

  app.get('/', (req, res) => {
    const email = req.session.userEmail;
    const csrfInput = `<input type="hidden" name="csrfToken" value="${req.session.csrfToken}" />`;
    const authBlock = email
      ? `<p>Logged in as <strong>${email}</strong></p>
         <form method="post" action="/auth/logout">${csrfInput}<button type="submit">Log out</button></form>`
      : `<form method="post" action="/auth/register">
            <h2>Create account</h2>
            ${csrfInput}
            <input name="email" type="email" placeholder="email" autocomplete="email" required />
            <input name="password" type="password" placeholder="password" autocomplete="new-password" minlength="8" required />
            <button type="submit">Register</button>
         </form>
         <form method="post" action="/auth/login">
            <h2>Log in</h2>
            ${csrfInput}
            <input name="email" type="email" placeholder="email" autocomplete="email" required />
            <input name="password" type="password" placeholder="password" autocomplete="current-password" required />
            <button type="submit">Log in</button>
         </form>`;

    res.type('html').send(`<!doctype html>
      <html>
        <head><title>DebateWiki Draft</title></head>
        <body>
          <h1>DebateWiki Stage 1 Draft</h1>
          <p>A minimal frontend + backend skeleton with account and session support.</p>
          ${authBlock}
          <p><a href="/api/health">API health</a></p>
        </body>
      </html>`);
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.session.csrfToken });
  });

  app.post('/auth/register', authLimiter, (req, res) => {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    if (!email || password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Email and password (min 8 chars) are required' });
    }

    if (users.has(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    users.set(email, { email, passwordHash: hashPassword(password) });
    req.session.userEmail = email;

    return res.status(201).json({ email });
  });

  app.post('/auth/login', authLimiter, (req, res) => {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');
    const user = users.get(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userEmail = email;

    return res.json({ email });
  });

  app.post('/auth/logout', (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ error: 'Logout failed' });
      }

      return res.status(204).send();
    });

    return undefined;
  });

  app.get('/api/me', requireAuth, (req, res) => {
    res.json({ email: req.session.userEmail });
  });

  return app;
}

module.exports = { createApp };
