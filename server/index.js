require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { readDB, writeDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me';

app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// ---- Basic rate limiting on the contact endpoint to prevent spam ----
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' }
});

// ---- Public read-only API ----
app.get('/api/profile', (req, res) => {
  const db = readDB();
  res.json(db.profile);
});

app.get('/api/experience', (req, res) => {
  const db = readDB();
  res.json(db.experience);
});

app.get('/api/projects', (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.get('/api/skills', (req, res) => {
  const db = readDB();
  res.json(db.skills);
});

app.get('/api/education', (req, res) => {
  const db = readDB();
  res.json(db.education);
});

app.get('/api/leadership', (req, res) => {
  const db = readDB();
  res.json(db.leadership);
});

app.get('/api/certifications', (req, res) => {
  const db = readDB();
  res.json(db.certifications);
});

// One combined endpoint so the frontend can fetch everything in a single call
app.get('/api/portfolio', (req, res) => {
  const db = readDB();
  const { messages, ...publicData } = db;
  res.json(publicData);
});

// ---- Contact form ----
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post('/api/contact', contactLimiter, (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Please enter a valid name.' });
  }
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (typeof message !== 'string' || message.trim().length < 5 || message.length > 2000) {
    return res.status(400).json({ error: 'Message must be between 5 and 2000 characters.' });
  }

  const db = readDB();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };
  db.messages.push(entry);
  writeDB(db);

  res.status(201).json({ success: true, message: 'Thanks — your message has been received!' });
});

// ---- Admin route to view messages (protected by a simple key) ----
app.get('/api/messages', (req, res) => {
  const key = req.header('x-admin-key');
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const db = readDB();
  res.json(db.messages);
});

// Health check (useful for hosting platforms like Render)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Fallback to index.html for any non-API route (simple SPA-style fallback)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
