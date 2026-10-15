import { sendEmail } from './mailer.js';

/**
 * Handle incoming API request to /api/send-email
 * Works with Connect/Express/Node http
 */
export async function handleEmailRequest(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const { type, data } = parsed;

      if (!type || !data) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Missing type or data in request body' }));
        return;
      }

      const result = await sendEmail({ type, data });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, ...result }));
    } catch (error) {
      console.error('Mail delivery error:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: error.message || 'Failed to send email' }));
    }
  });
}
