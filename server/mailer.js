import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER || 'axion@vardaansmartsolutions.com',
    pass: process.env.SMTP_PASS || '^c7=i/4Xc!',
  },
};

const ADMIN_EMAIL = process.env.MAIL_TO || 'axion@vardaansmartsolutions.com';

const transporter = nodemailer.createTransport(SMTP_CONFIG);

/**
 * Common HTML wrapper with Axion Charge styling
 */
function wrapTemplate(title, preheader, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020403; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <div style="display: none; max-height: 0px; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #020403; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #070B08; border-radius: 16px; border: 1px solid #142817; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 30px; border-bottom: 1px solid #142817; background: linear-gradient(180deg, #0A130C 0%, #070B08 100%);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #00FF00; margin: 0;">
                      AXION<span style="color: #ffffff;"> CHARGE</span>
                    </div>
                    <div style="font-size: 11px; letter-spacing: 3px; color: #667766; text-transform: uppercase; margin-top: 4px; font-family: monospace;">
                      ENERGY : EVOLVED
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 6px 12px; background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); border-radius: 20px; font-size: 11px; color: #00FF00; font-family: monospace; font-weight: bold; text-transform: uppercase;">
                      Verified Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 30px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #050805; border-top: 1px solid #142817; text-align: center; color: #666666; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0; color: #888888; font-weight: 600;">AXION CHARGE • Next-Gen EV Infrastructure</p>
              <p style="margin: 4px 0 0 0;">Ahmedabad • Gujarat • India</p>
              <p style="margin: 8px 0 0 0; color: #444444; font-size: 11px;">Sent automatically from the official Axion Charge Web Platform.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Build Contact Form Admin Email
 */
function buildContactAdminHtml({ name, email, subject, message }) {
  const body = `
    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">New Contact Form Message</h1>
    <p style="color: #999999; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
      A new user inquiry has been submitted via the website contact form.
    </p>

    <div style="background-color: #0B130E; border: 1px solid #18331E; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="8" border="0" style="font-size: 14px;">
        <tr>
          <td width="30%" style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">From</td>
          <td style="color: #ffffff; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email</td>
          <td><a href="mailto:${email}" style="color: #00FF00; text-decoration: none; font-weight: bold;">${email}</a></td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Subject</td>
          <td style="color: #ffffff;">${subject || 'General Inquiry'}</td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Timestamp</td>
          <td style="color: #aaaaaa; font-family: monospace;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 24px;">
      <h3 style="color: #00FF00; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">Message Content</h3>
      <div style="background-color: #030604; border: 1px solid #142817; border-left: 3px solid #00FF00; border-radius: 8px; padding: 18px; color: #dddddd; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message}</div>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Axion Charge Inquiry')}" style="display: inline-block; background-color: #00FF00; color: #000000; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 30px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
        Reply to ${name}
      </a>
    </div>
  `;
  return wrapTemplate(`New Message from ${name}`, `New message received from ${name} (${email})`, body);
}

/**
 * Build Customer Auto-Reply Email
 */
function buildContactUserReplyHtml({ name }) {
  const body = `
    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">We've Received Your Inquiry</h1>
    <p style="color: #999999; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
      Hi ${name}, thank you for reaching out to <strong>Axion Charge</strong>.
    </p>

    <div style="background-color: #0B130E; border: 1px solid #18331E; border-radius: 12px; padding: 22px; margin-bottom: 24px;">
      <p style="color: #ffffff; line-height: 1.6; font-size: 14px; margin: 0;">
        Our EV infrastructure technical team has received your message and will review your specifications. One of our engineers or business specialists will contact you within <strong>24 business hours</strong>.
      </p>
    </div>

    <div style="background-color: #030604; border: 1px solid #142817; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Need immediate assistance?</p>
      <p style="margin: 6px 0 0 0; color: #00FF00; font-size: 14px; font-weight: bold;">
        Email: <a href="mailto:axion@vardaansmartsolutions.com" style="color: #00FF00; text-decoration: none;">axion@vardaansmartsolutions.com</a>
      </p>
    </div>

    <p style="color: #777777; font-size: 13px; line-height: 1.6; margin: 0;">
      Warm regards,<br>
      <strong style="color: #ffffff;">The Axion Charge Infrastructure Team</strong>
    </p>
  `;
  return wrapTemplate(`We've Received Your Inquiry - Axion Charge`, `Thank you for contacting Axion Charge, ${name}!`, body);
}

/**
 * Build Franchise / Partnership Admin Email
 */
function buildFranchiseAdminHtml({ name, email, phone, location, model }) {
  const body = `
    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">New Partner Application 🤝</h1>
    <p style="color: #999999; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
      A prospective partner has submitted an application for the Axion Charge B2B Program.
    </p>

    <div style="background-color: #0B130E; border: 1px solid #18331E; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="8" border="0" style="font-size: 14px;">
        <tr>
          <td width="35%" style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Applicant Name</td>
          <td style="color: #ffffff; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email Address</td>
          <td><a href="mailto:${email}" style="color: #00FF00; text-decoration: none; font-weight: bold;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Phone</td>
          <td style="color: #ffffff;">${phone}</td>
        </tr>` : ''}
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Partnership Tier</td>
          <td>
            <span style="display: inline-block; padding: 4px 10px; background: rgba(0, 255, 0, 0.15); border: 1px solid #00FF00; border-radius: 6px; color: #00FF00; font-weight: bold; font-size: 12px;">
              ${model || 'Partner'}
            </span>
          </td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Property Location</td>
          <td style="color: #ffffff; font-weight: 500;">${location}</td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Submission Date</td>
          <td style="color: #aaaaaa; font-family: monospace;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="mailto:${email}?subject=Axion%20Charge%20Partnership%20Application%20-%20${encodeURIComponent(name)}" style="display: inline-block; background-color: #00FF00; color: #000000; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 30px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
        Contact Partner Candidate
      </a>
    </div>
  `;
  return wrapTemplate(`Partner Application: ${name}`, `New partnership lead from ${name} for ${model} model`, body);
}

/**
 * Build Newsletter Admin Notification
 */
function buildNewsletterAdminHtml({ email }) {
  const body = `
    <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">New Newsletter Subscriber 📬</h1>
    <p style="color: #999999; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
      A new user has subscribed to the Axion Charge newsletter.
    </p>

    <div style="background-color: #0B130E; border: 1px solid #18331E; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="8" border="0" style="font-size: 14px;">
        <tr>
          <td width="30%" style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Subscriber</td>
          <td><a href="mailto:${email}" style="color: #00FF00; text-decoration: none; font-weight: bold;">${email}</a></td>
        </tr>
        <tr>
          <td style="color: #668866; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Timestamp</td>
          <td style="color: #aaaaaa; font-family: monospace;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
        </tr>
      </table>
    </div>
  `;
  return wrapTemplate(`New Newsletter Subscriber`, `New subscription: ${email}`, body);
}

/**
 * Core dispatch function
 */
export async function sendEmail({ type, data }) {
  if (!data || !data.email) {
    throw new Error('Email address is required.');
  }

  let adminSubject = '';
  let adminHtml = '';
  let userSubject = '';
  let userHtml = '';
  let userReplyTo = data.email;

  if (type === 'contact') {
    adminSubject = `⚡ [Contact Form] ${data.subject || 'General Inquiry'} - ${data.name || 'Anonymous'}`;
    adminHtml = buildContactAdminHtml(data);
    userSubject = `We've Received Your Message • Axion Charge`;
    userHtml = buildContactUserReplyHtml(data);
  } else if (type === 'franchise') {
    adminSubject = `⚡ [Partner Application] ${data.name || 'Applicant'} (${data.model || 'Partner'})`;
    adminHtml = buildFranchiseAdminHtml(data);
    userSubject = `Partnership Application Received • Axion Charge`;
    userHtml = buildContactUserReplyHtml({ name: data.name });
  } else if (type === 'newsletter') {
    adminSubject = `⚡ [Newsletter] New subscriber: ${data.email}`;
    adminHtml = buildNewsletterAdminHtml(data);
  } else {
    throw new Error(`Unsupported email type: ${type}`);
  }

  // 1. Send notification to site administrator
  const adminResult = await transporter.sendMail({
    from: `"Axion Charge Platform" <${SMTP_CONFIG.auth.user}>`,
    to: ADMIN_EMAIL,
    replyTo: userReplyTo,
    subject: adminSubject,
    html: adminHtml,
  });

  // 2. Send auto-reply to user if applicable (non-blocking)
  let userResult = null;
  if (userHtml && data.email && type !== 'newsletter') {
    try {
      userResult = await transporter.sendMail({
        from: `"Axion Charge" <${SMTP_CONFIG.auth.user}>`,
        to: data.email,
        subject: userSubject,
        html: userHtml,
      });
    } catch (err) {
      console.warn('Auto-reply warning (admin email succeeded):', err.message);
    }
  }

  return {
    success: true,
    adminMessageId: adminResult.messageId,
    userMessageId: userResult ? userResult.messageId : null,
  };
}
