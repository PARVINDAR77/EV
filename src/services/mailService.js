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

    if (res.ok) {
      const json = await res.json();
      if (json.success) return json;
      throw new Error(json.error || 'Failed to send message.');
    }

    // If 404 (e.g. static hosting on Hostinger without Node server), try PHP endpoint
    if (res.status === 404) {
      return await sendPhpFallback(payload);
    }

    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `Server responded with status ${res.status}`);
  } catch (err) {
    // If network error occurred, attempt PHP endpoint fallback as well
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      try {
        return await sendPhpFallback(payload);
      } catch (fallbackErr) {
        throw new Error(fallbackErr.message || err.message);
      }
    }
    throw err;
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
export async function sendFranchiseApplication({ name, email, phone, location, model }) {
  return sendEmailRequest('franchise', { name, email, phone, location, model });
}

/**
 * Send Newsletter Subscription
 */
export async function sendNewsletterSubscription(email) {
  return sendEmailRequest('newsletter', { email });
}
