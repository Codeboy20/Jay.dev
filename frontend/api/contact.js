import nodemailer from 'nodemailer'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeBody(req) {
  if (!req.body) {
    return {}
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return req.body
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function validateBody(body) {
  const honeypot = (body.website || '').trim()
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const businessType = (body.businessType || '').trim()
  const payment = (body.payment || '').trim()
  const message = (body.message || '').trim()

  if (honeypot) {
    return { ok: false, status: 400, message: 'Invalid submission.' }
  }

  if (!name || name.length < 2) {
    return { ok: false, status: 400, message: 'Please enter a valid name.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, status: 400, message: 'Please enter a valid email address.' }
  }

  if (!businessType || businessType.length < 2) {
    return { ok: false, status: 400, message: 'Please enter your business type.' }
  }

  if (!message || message.length < 10) {
    return { ok: false, status: 400, message: 'Please enter at least 10 characters in your message.' }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      businessType,
      payment: payment || 'Not specified',
      message,
    },
  }
}

function getMissingEnv() {
  return ['CONTACT_TO', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter((key) => !process.env[key])
}

async function sendContactMail(payload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const fromName = process.env.SMTP_FROM_NAME || 'Jaydeep Portfolio'
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER

  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: process.env.CONTACT_TO,
    replyTo: payload.email,
    subject: `New website inquiry from ${payload.name}`,
    text:
      `Name: ${payload.name}\n` +
      `Email: ${payload.email}\n` +
      `Business Type: ${payload.businessType}\n` +
      `Budget: ${payload.payment}\n\n` +
      `Message:\n${payload.message}`,
    html: `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Business Type:</strong> ${escapeHtml(payload.businessType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(payload.payment)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(payload.message).replaceAll('\n', '<br/>')}</p>
    `,
  })

  return info.messageId
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.status(405).json({ success: false, message: 'Method not allowed.' })
    return
  }

  const parsed = validateBody(normalizeBody(req))

  if (!parsed.ok) {
    res.status(parsed.status).json({ success: false, message: parsed.message })
    return
  }

  const missingEnv = getMissingEnv()

  if (missingEnv.length) {
    console.error('[CONTACT-CONFIG] Missing env vars:', missingEnv.join(', '))
    res.status(500).json({ success: false, message: 'Contact form is not configured yet.' })
    return
  }

  try {
    const id = await sendContactMail(parsed.data)
    res.status(200).json({
      success: true,
      message: 'Message sent successfully. I will get back to you soon.',
      id,
    })
  } catch (error) {
    console.error('[CONTACT-ERROR]', error)
    res.status(500).json({ success: false, message: 'Could not send message right now. Please try again shortly.' })
  }
}
