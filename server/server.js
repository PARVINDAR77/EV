import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendEmail } from './mailer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) {
      return res.status(400).json({ success: false, error: 'Missing type or data in request' });
    }

    const result = await sendEmail({ type, data });
    return res.json({ success: true, ...result });
  } catch (err) {
    console.error('Mail API error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to send email' });
  }
});

// Serve frontend build if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ Axion Charge Mail & Web Server running on port ${PORT}`);
});
