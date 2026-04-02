import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()

const port = Number(process.env.PORT || 5000)
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed by CORS'))
    },
  }),
)
app.use(express.json({ limit: '1mb' }))

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again in a few minutes.' },
})

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok' })
})

function validateBody(body) {
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const businessType = (body.businessType || '').trim()
  const message = (body.message || '').trim()

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!name || name.length < 2) {
    return { ok: false, message: 'Please enter a valid name.' }
  }
  if (!emailValid) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }
  if (!businessType || businessType.length < 2) {
    return { ok: false, message: 'Please enter your business type.' }
  }
  if (!message || message.length < 10) {
    return { ok: false, message: 'Please enter at least 10 characters in your message.' }
  }

  return {
    ok: true,
    data: {
      name,
      email,
      businessType,
      message,
    },
  }
}

function canSendRealEmail() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO,
  )
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

  const info = await transporter.sendMail({
    from: `${fromName} <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: payload.email,
    subject: `New portfolio inquiry from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nBusiness Type: ${payload.businessType}\n\nMessage:\n${payload.message}`,
    html: `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Business Type:</strong> ${payload.businessType}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  return info.messageId
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const parsed = validateBody(req.body)

  if (!parsed.ok) {
    res.status(400).json({ success: false, message: parsed.message })
    return
  }

  try {
    if (!canSendRealEmail()) {
      console.log('[CONTACT-MOCK]', parsed.data)
      res.status(202).json({
        success: true,
        message: 'Message received (mock mode). Add SMTP env values to send real emails.',
      })
      return
    }

    const id = await sendContactMail(parsed.data)
    res.json({ success: true, message: 'Message sent successfully.', id })
  } catch (error) {
    console.error('[CONTACT-ERROR]', error)
    res.status(500).json({ success: false, message: 'Could not send message right now. Please try again shortly.' })
  }
})

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`)
})
