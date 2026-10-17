/**
 * Axion Charge - Client Mail Service
 * Sends contact requests, partnership applications, and newsletter subscriptions.
 * Supports automatic fallback between Node.js API endpoint and PHP endpoint.
 */

export async function sendEmailRequest(type, data) {
  const payload = { type, data };

  // Primary endpoint: Node.js API (Vite Dev Server, Express, or Serverless)
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    // If the server returned HTML (e.g. Apache rewrite returned index.html) or 404,
    // don't try to parse HTML as JSON; immediately fall back to the PHP endpoint.
    if (!isJson || res.status === 404) {
      return await sendPhpFallback(payload);
    }

    if (res.ok) {
      const json = await res.json();
      if (json.success) return json;
      throw new Error(json.error || 'Failed to send message.');
    }

    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `Server responded with status ${res.status}`);
  } catch (err) {
    // If any error occurs on the primary endpoint (network error, syntax error from HTML, etc.),
    // attempt the PHP fallback endpoint
    try {
      return await sendPhpFallback(payload);
    } catch (fallbackErr) {
      // Return a clean, human-friendly message instead of raw JSON parse errors
      const msg = fallbackErr.message || err.message || '';
      if (msg.includes('Unexpected token') || msg.includes('JSON')) {
        throw new Error('Unable to deliver message. Please contact axion@vardaansmartsolutions.com directly.');
      }
      throw new Error(msg || 'Unable to deliver message. Please contact axion@vardaansmartsolutions.com directly.');
    }
  }
}

async function sendPhpFallback(payload) {
  const res = await fetch('/api/send-email.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Email service is temporarily unavailable. Please email axion@vardaansmartsolutions.com directly.');
  }

  const json = await res.json().catch(() => ({}));
  if (res.ok && json.success) {
    return json;
  }
  throw new Error(json.error || 'Unable to deliver message at this time.');
}

/**
 * Send Contact Message or Quote Request
 */
export async function sendContactMessage({ name, email, subject, message }) {
  return sendEmailRequest('contact', { name, email, subject, message });
}

/**
 * Send Franchise / Partner Application
 */
export async function sendFranchiseApplication(data) {
  return sendEmailRequest('franchise', data);
}

/**
 * Send Newsletter Subscription
 */
export async function sendNewsletterSubscription(email) {
  return sendEmailRequest('newsletter', { email });
}
