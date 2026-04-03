import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronLeft, ExternalLink, LoaderCircle, MessageCircleMore } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from '../components/MagneticButton'
import SectionReveal from '../components/SectionReveal'
import LazyThreeBackground from '../components/LazyThreeBackground'
import HeroBackdropElements from '../components/HeroBackdropElements'
import TiltCard from '../components/TiltCard'
import { demoProjects, pricingPlans, processSteps, servicesList, serviceTestimonials } from '../data/content'

const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '')

const initialForm = {
  name: '',
  email: '',
  businessType: '',
  payment: '',
  message: '',
  website: '',
}

export default function ServicesPage() {
  const [formData, setFormData] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [planNotice, setPlanNotice] = useState('')
  const [result, setResult] = useState({ type: '', text: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.tier)
    setPlanNotice(`Congrats! Your ${plan.tier} service is added in contact form. You can head towards contact form.`)
    setFormData((prev) => ({
      ...prev,
      businessType: `${plan.tier} Plan`,
      payment: plan.price,
      message: prev.message.trim() ? prev.message : `Hi, I want to select the ${plan.tier} plan. Please share the next steps.`,
    }))
  }

  const scrollToPricing = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (sending) {
      return
    }

    setSending(true)
    setResult({ type: '', text: '' })

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send message right now.')
      }

      setFormData(initialForm)
      setResult({
        type: 'success',
        text: data.message || 'Message sent successfully. I will get back to you soon.',
      })
    } catch (error) {
      setResult({
        type: 'error',
        text: error.message || 'Unable to send message right now.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="relative overflow-hidden pb-20">
      <header className="relative min-h-[100svh] px-5 pb-16 pt-16 md:px-10 md:pt-20">
        <LazyThreeBackground variant="services" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(6,182,212,0.3),transparent_40%),radial-gradient(circle_at_82%_34%,rgba(34,197,94,0.22),transparent_38%),#0B0F1A]" />
        <HeroBackdropElements variant="services" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Switch Experience
            </Link>
            <Link to="/portfolio" className="text-sm text-brand-blue underline-offset-4 hover:underline">
              View developer portfolio
            </Link>
          </div>

          <div className="mt-10 flex flex-1 flex-col justify-between">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.26em] text-brand-neon">Business Services</p>
              <h1 className="max-w-5xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
                Helping brands establish a powerful digital presence with modern, scalable web solutions.
              </h1>
              <p className="mt-6 max-w-3xl text-sm text-slate-300 md:text-lg">
                I design and develop websites that enhance user experience, build trust, and accelerate business growth.
              </p>

              <div className="mt-9">
                <MagneticButton
                  type="button"
                  onClick={scrollToPricing}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-neon/70 bg-brand-neon/20 px-6 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>

            <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
              {[
                { label: 'Launch Speed', value: '7-14 days average' },
                { label: 'Mobile Ready', value: 'Optimized on every screen' },
                { label: 'Conversion Focus', value: 'Lead-first page strategy' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-blue">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pt-8 md:px-10">
        <SectionReveal>
          <p className="section-kicker">Services</p>
          <h2 className="section-title">Tailored solutions for ambitious brands</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {servicesList.map((service, index) => (
              <TiltCard key={service.title} className="group rounded-3xl" glowClass="bg-gradient-to-br from-brand-blue/20 via-brand-neon/20 to-transparent">
                <motion.article
                  className="glass-panel rounded-3xl p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{service.text}</p>
                </motion.article>
              </TiltCard>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Demo Projects</p>
          <h2 className="section-title">Interactive previews your business can launch with</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {demoProjects.map((demo, index) => (
              <motion.article
                key={demo.title}
                className="glass-panel group rounded-3xl p-6"
                whileHover={{ y: -8, scale: 1.01 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="font-display text-xl font-semibold text-white">{demo.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{demo.summary}</p>
                <a
                  href={demo.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition hover:text-white"
                >
                  Interactive Preview
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title">What clients say after launch</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {serviceTestimonials.map((item, index) => (
              <motion.article
                key={item.name}
                className="glass-panel rounded-3xl p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img src={item.avatar} alt={`${item.name} avatar`} loading="lazy" className="h-12 w-12 object-cover" />
                <p className="mt-4 text-sm leading-relaxed text-slate-200">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-5 font-semibold text-white">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-brand-blue">{item.role}</p>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <div id="pricing-section">
          <SectionReveal>
            <p className="section-kicker">Pricing</p>
            <h2 className="section-title">Flexible plans for every growth stage</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.article
                  key={plan.tier}
                  className={`glass-panel rounded-3xl p-6 ${plan.featured ? 'ring-2 ring-brand-blue/50' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.62, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-blue">{plan.tier}</p>
                  <h3 className="mt-3 whitespace-nowrap font-display text-3xl font-semibold text-white">{plan.price}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-slate-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 text-brand-neon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`mt-6 inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                      selectedPlan === plan.tier
                        ? 'border-brand-neon/80 bg-brand-neon/25 text-white'
                        : 'border-white/20 bg-white/10 text-slate-100'
                    }`}
                  >
                    {selectedPlan === plan.tier ? 'Selected' : 'Select'}
                  </MagneticButton>
                </motion.article>
              ))}
            </div>
            {planNotice ? <p className="mt-5 text-sm text-brand-neon">{planNotice}</p> : null}
          </SectionReveal>
        </div>

        <SectionReveal className="glass-panel rounded-3xl p-6 sm:p-10">
          <p className="section-kicker">Process</p>
          <h2 className="section-title">How your website turns customers into business</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            After launch, your website works like an automated growth system: it attracts visitors, captures intent, and sends qualified leads directly to you.
          </p>

          <div className="relative mt-8">
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:block">
              <svg viewBox="0 0 1200 270" className="h-48 w-full">
                <defs>
                  <linearGradient id="business-flow-link" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(34,197,94,0.8)" />
                    <stop offset="100%" stopColor="rgba(6,182,212,0.8)" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M250 130 L345 130"
                  stroke="url(#business-flow-link)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M515 130 L610 82"
                  stroke="url(#business-flow-link)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M515 130 L610 178"
                  stroke="url(#business-flow-link)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M780 82 L900 130"
                  stroke="url(#business-flow-link)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M780 178 L900 130"
                  stroke="url(#business-flow-link)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 8"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />

                <rect x="70" y="98" width="180" height="64" rx="14" fill="rgba(15,23,42,0.74)" stroke="rgba(148,163,184,0.5)" />
                <rect x="345" y="98" width="170" height="64" rx="14" fill="rgba(15,23,42,0.74)" stroke="rgba(6,182,212,0.6)" />
                <rect x="610" y="50" width="170" height="64" rx="14" fill="rgba(15,23,42,0.74)" stroke="rgba(34,197,94,0.6)" />
                <rect x="610" y="146" width="170" height="64" rx="14" fill="rgba(15,23,42,0.74)" stroke="rgba(6,182,212,0.6)" />
                <rect x="900" y="98" width="210" height="64" rx="14" fill="rgba(15,23,42,0.74)" stroke="rgba(34,197,94,0.6)" />

                <text x="88" y="122" fill="rgba(226,232,240,0.92)" fontSize="14" fontFamily="sans-serif">Customer</text>
                <text x="88" y="142" fill="rgba(148,163,184,0.95)" fontSize="12" fontFamily="sans-serif">Search / ads / social click</text>

                <text x="363" y="122" fill="rgba(226,232,240,0.92)" fontSize="14" fontFamily="sans-serif">Your Website</text>
                <text x="363" y="142" fill="rgba(148,163,184,0.95)" fontSize="12" fontFamily="sans-serif">Fast pages + trust proof</text>

                <text x="628" y="74" fill="rgba(226,232,240,0.92)" fontSize="14" fontFamily="sans-serif">Lead Capture</text>
                <text x="628" y="94" fill="rgba(148,163,184,0.95)" fontSize="12" fontFamily="sans-serif">Form / WhatsApp / Call</text>

                <text x="628" y="170" fill="rgba(226,232,240,0.92)" fontSize="14" fontFamily="sans-serif">Smart Follow-Up</text>
                <text x="628" y="190" fill="rgba(148,163,184,0.95)" fontSize="12" fontFamily="sans-serif">Auto reply + reminders</text>

                <text x="918" y="122" fill="rgba(226,232,240,0.92)" fontSize="14" fontFamily="sans-serif">Business Owner</text>
                <text x="918" y="142" fill="rgba(148,163,184,0.95)" fontSize="12" fontFamily="sans-serif">Gets qualified enquiries</text>

                <motion.circle
                  r="4"
                  fill="rgba(34,197,94,0.95)"
                  animate={{ cx: [250, 345], cy: [130, 130] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="rgba(6,182,212,0.95)"
                  animate={{ cx: [515, 610], cy: [130, 82] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="rgba(6,182,212,0.95)"
                  animate={{ cx: [515, 610], cy: [130, 178] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="rgba(34,197,94,0.95)"
                  animate={{ cx: [780, 900], cy: [82, 130] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle
                  r="4"
                  fill="rgba(34,197,94,0.95)"
                  animate={{ cx: [780, 900], cy: [178, 130] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            </div>

            <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step}
                  className="rounded-2xl border border-white/20 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-blue">Step {index + 1}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <div id="contact-form-section">
          <SectionReveal className="glass-panel rounded-3xl p-6 sm:p-10">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Start your website project</h2>
            <form className="mt-7 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <input className="input-style" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input
                className="input-style"
                type="email"
                name="email"
                placeholder="Business Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="input-style md:col-span-2"
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                required
              />
              <input
                className="input-style md:col-span-2"
                type="text"
                name="payment"
                placeholder="Budget / Payment Range (optional)"
                value={formData.payment}
                onChange={handleChange}
              />
              <textarea
                className="input-style md:col-span-2"
                rows="4"
                name="message"
                placeholder="Tell me about your project goals"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <input
                className="pointer-events-none absolute left-[-9999px] opacity-0"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />

              <MagneticButton
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-blue/50 bg-brand-blue/20 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                disabled={sending}
              >
                {sending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                {sending ? 'Sending...' : 'Send Inquiry'}
              </MagneticButton>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-neon/60 bg-brand-neon/20 px-5 py-3 text-sm font-semibold text-white"
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircleMore className="h-4 w-4" />
                WhatsApp
              </a>

              {result.text ? (
                <p className={`md:col-span-2 text-sm ${result.type === 'success' ? 'text-brand-neon' : 'text-rose-300'}`}>{result.text}</p>
              ) : null}
            </form>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}

