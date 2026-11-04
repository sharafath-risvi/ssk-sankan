import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, AtSign, Mail, MapPin, Phone } from 'lucide-react'
import Lines from '../shared/Lines'
import { CONTACT, SERVICES } from './data'

/* Optional: set VITE_SANKAN_ENQUIRY_URL to a form endpoint that accepts a JSON POST
   (e.g. a Formspree / Getform URL). While it is empty the form validates, but it does
   NOT claim to have sent anything. "Sent" is only shown when the endpoint answers 2xx. */
const ENDPOINT = import.meta.env.VITE_SANKAN_ENQUIRY_URL || ''

const EMPTY = { name: '', email: '', phone: '', service: '', details: '' }

const MESSAGES = {
  unavailable:
    'This form is not connected to a mailbox yet, so your enquiry has not been sent. Please try again once contact details are published.',
  success: 'Thank you. Your enquiry has been sent and we will get back to you.',
  error: 'Something went wrong and your enquiry has not been sent. Please try again in a moment.',
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
    e.email = 'Enter a valid email address, like name@example.com.'
  }
  if (v.phone.trim() && !/^[+()\d\s-]{7,}$/.test(v.phone.trim())) {
    e.phone = 'Enter a valid phone number, or leave this blank.'
  }
  if (!v.service) e.service = 'Choose a service, or “Not sure yet”.'
  if (v.details.trim().length < 10) e.details = 'Tell us a little about the project (at least 10 characters).'
  return e
}

function Detail({ icon: Icon, label, value, href, external }) {
  return (
    <div className="sn-detail">
      <span className="sn-detail__icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div>
        <p className="sn-detail__label">{label}</p>
        {value ? (
          href ? (
            <a
              className="sn-detail__value"
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {value}
            </a>
          ) : (
            <p className="sn-detail__value">{value}</p>
          )
        ) : (
          <p className="sn-detail__value is-tbc">To be confirmed</p>
        )}
      </div>
    </div>
  )
}

function Field({ id, label, error, children, wide }) {
  return (
    <div className={`sn-field${wide ? ' is-wide' : ''}${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="sn-field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | pending | unavailable | success | error

  const set = (name) => (event) => {
    const value = event.target.value
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const aria = (name) => ({
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `sn-${name}-error` : undefined,
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      setStatus('idle')
      formRef.current?.querySelector(`#sn-${first}`)?.focus()
      return
    }

    if (!ENDPOINT) {
      setStatus('unavailable')
      return
    }

    setStatus('pending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'sankan' }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('success')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'pending'

  return (
    <section id="contact" className="sn-contact" aria-labelledby="sn-contact-title">
      <div className="sn-contact__inner">
        <div className="sn-contact__intro js-contact-copy">
          <p className="ssk-eyebrow sn-kicker">Enquire</p>
          <h2 id="sn-contact-title" className="ssk-h-section" data-reveal="lines">
            <Lines lines={['Get in', 'touch.']} />
          </h2>
          <p className="ssk-body sn-prose">
            Planning a room, a facade or a wardrobe? Tell us a little about it and we will take it from
            there.
          </p>

          <div className="sn-details">
            <Detail
              icon={Mail}
              label="Email"
              value={CONTACT.email}
              href={CONTACT.email ? `mailto:${CONTACT.email}` : undefined}
            />
            <Detail
              icon={Phone}
              label="Phone"
              value={CONTACT.phone}
              href={CONTACT.phone ? `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}` : undefined}
            />
            <Detail icon={MapPin} label="Location" value={CONTACT.address} />
            <Detail
              icon={AtSign}
              label="Instagram"
              value={CONTACT.instagramUrl ? CONTACT.instagramHandle || 'Instagram' : ''}
              href={CONTACT.instagramUrl || undefined}
              external
            />
          </div>

          <Link
            to="/"
            state={{ fromSankan: true }}
            onClick={() => {
              document.documentElement.style.scrollBehavior = 'auto'
              document.body.style.scrollBehavior = 'auto'
              window.scrollTo(0, 0)
              document.documentElement.scrollTop = 0
              document.body.scrollTop = 0
            }}
            className="sn-back"
          >
            Return to SSK
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <form ref={formRef} className="sn-form" onSubmit={onSubmit} noValidate aria-busy={sending}>
          <div className="sn-form__head">
            <h3>Send an enquiry</h3>
            <p>All fields are required unless marked optional.</p>
          </div>

          <div className="sn-form__grid">
            <Field id="sn-name" label="Full name" error={errors.name}>
              <input
                id="sn-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={set('name')}
                {...aria('name')}
              />
            </Field>
            <Field id="sn-email" label="Email address" error={errors.email}>
              <input
                id="sn-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={set('email')}
                {...aria('email')}
              />
            </Field>
            <Field id="sn-phone" label="Phone number (optional)" error={errors.phone}>
              <input
                id="sn-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={set('phone')}
                {...aria('phone')}
              />
            </Field>
            <Field id="sn-service" label="Service of interest" error={errors.service}>
              <select id="sn-service" name="service" value={values.service} onChange={set('service')} {...aria('service')}>
                <option value="">Select a service</option>
                {SERVICES.map((service) => (
                  <option key={service.index} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </Field>
            <Field id="sn-details" label="Project details" error={errors.details} wide>
              <textarea
                id="sn-details"
                name="details"
                rows={5}
                value={values.details}
                onChange={set('details')}
                {...aria('details')}
              />
            </Field>
          </div>

          <div className="sn-form__foot">
            <button type="submit" className="sn-btn" disabled={sending}>
              {sending ? 'Sending…' : 'Send enquiry'}
              {!sending && <ArrowUpRight size={16} aria-hidden="true" />}
            </button>
            {(status === 'unavailable' || status === 'success' || status === 'error') && (
              <p
                className={`sn-form__status is-${status}`}
                role={status === 'success' ? 'status' : 'alert'}
              >
                {MESSAGES[status]}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
