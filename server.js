const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8080;
const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Connected to PostgreSQL database.');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};

initializeDatabase();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API running successfully.' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name.trim(), email.trim(), (subject || '').trim(), message.trim()]
    );

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. I will get back to you soon.',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to save your message. Please try again later.'
    });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY id DESC'
    );

    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Database error:', err.message);
    return res.status(500).json({ success: false, message: 'Unable to fetch messages.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
