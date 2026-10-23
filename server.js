const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8080;
const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');
const dataDir = path.join(rootDir, 'data');
const dbPath = path.join(dataDir, 'portfolio.db');

fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
};

initializeDatabase();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API running successfully.' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
  }

  const sql = `
    INSERT INTO contacts (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [name.trim(), email.trim(), (subject || '').trim(), message.trim()], function (err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Unable to save your message. Please try again later.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. I will get back to you soon.'
    });
  });
});

app.get('/api/messages', (req, res) => {
  db.all('SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY id DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ success: false, message: 'Unable to fetch messages.' });
    }

    return res.json({ success: true, data: rows });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
