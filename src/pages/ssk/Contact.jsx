import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import InstagramIcon from '../../components/shared/InstagramIcon';
import { gsap, MOTION, ScrollTrigger } from '../../utils/gsap';
import { setupReveals } from '../../utils/reveals';
import { IMG } from '../../assets/ssk/images';
import Lines from '../../components/shared/Lines';
import Cta from '../../components/ssk/home/Cta';
import '../../styles/ssk/contact-page.css';

/* Optional form backend endpoint (e.g. Formspree / custom mail API).
   When empty, the form validates all inputs and displays a truthful notice
   rather than faking a sent submission. */
const ENDPOINT = import.meta.env.VITE_SSK_ENQUIRY_URL || '';

/**
 * Editable Contact Information Cards configuration.
 * Real, verified business contact details shared by SSK & Sankan.
 */
const CONTACT_CARDS = [
  {
    id: 'address',
    num: '01',
    icon: MapPin,
    label: 'Address / Location',
    value: '191 Kundrathur Main Road, Kovur, Chennai 600128',
    subvalue: 'Serving Tamil Nadu, Kerala & Karnataka',
    note: 'Official headquarters and interior materials distribution facility.',
    href: 'https://www.google.com/maps/search/?api=1&query=191+Kundrathur+Main+Road%2C+Kovur%2C+Chennai+600128',
    confirmed: true,
    external: true,
  },
  {
    id: 'phone',
    num: '02',
    icon: Phone,
    label: 'Phone Number',
    value: '+91 98400 41750',
    subvalue: 'Direct Commercial & Dispatch Desk',
    note: 'Call or WhatsApp for orders, material availability & dispatch.',
    href: 'tel:+919840041750',
    confirmed: true,
  },
  {
    id: 'instagram',
    num: '03',
    icon: InstagramIcon,
    label: 'Official Instagram',
    value: '@sankanply_homedecor',
    subvalue: 'Design & Materials Visual Showcase',
    note: 'Follow for site executions, product reels & decor updates.',
    href: 'https://www.instagram.com/sankanply_homedecor/',
    confirmed: true,
    external: true,
  },
  {
    id: 'hours',
    num: '04',
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM',
    subvalue: 'Sunday: Closed',
    note: 'Active facility hours for visits, order dispatches & consultations.',
    confirmed: true,
  },
];

/**
 * Google Maps configuration pointing to the exact business location in Kovur, Chennai.
 */
const MAP_LOCATION = '191 Kundrathur Main Road, Kovur, Chennai 600128, Tamil Nadu, India';

const MAP_CONFIG = {
  locationQuery: MAP_LOCATION,
  embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(MAP_LOCATION)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  directUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_LOCATION)}`,
  title: 'SSK Location Map — 191 Kundrathur Main Road, Kovur, Chennai 600128',
  primaryRegion: '191 Kundrathur Main Road, Kovur, Chennai 600128',
  coverageAreas: ['Tamil Nadu (Primary Base)', 'Kerala (Active Region)', 'Karnataka (Active Region)'],
  pendingNotice: 'Official facility location in Kovur, Chennai.',
};

const SERVICE_OPTIONS = [
  { value: 'edge-band-tape', label: 'Edge Band Tape (PVC, ABS, Acrylic 3D, Wood-Grain)' },
  { value: 'adhesive', label: 'Adhesive (EVA Hot Melt, PUR, Cold Press, Contact)' },
  { value: 'plywood', label: 'Plywood (Commercial, Marine / BWP, Hardwood, Calibrated)' },
  { value: 'mica', label: 'Mica & Laminates (Wood-Grain, Stone, Solid, Textured)' },
  { value: 'hardware', label: 'Hardware (Hinges, Drawer Slides, Handles & Pulls)' },
  { value: 'panel-processing', label: 'Panel Processing & Turnkey Manufacturing' },
  { value: 'general-enquiry', label: 'General / Commercial Enquiry' },
];

const SskContact = () => {
  const root = useRef(null);
  const formRef = useRef(null);
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialVariant = searchParams.get('variant') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: initialVariant ? `Enquiry regarding: ${initialVariant}\n\n` : '',
  });

  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    status: 'idle', // idle | loading | success | error | notice
    message: '',
  });

  // Hero animations (exact ServiceHero language) & declarative scroll reveals for body sections
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const heroEl = el.querySelector('.chero');
    const bodyEl = el.querySelector('.js-contact-body');
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      // Exact ServiceHero entrance timeline
      gsap
        .timeline({ delay: 0.1 })
        .fromTo(
          q('.js-chero-media'),
          { clipPath: 'inset(16% 12% 16% 12%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.85, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          q('.js-chero-img'),
          { scale: 1.4 },
          { scale: 1, duration: 2.6, ease: 'expo.out' },
          0,
        )
        .fromTo(
          q('.chero__title .line__inner'),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out' },
          0.95,
        )
        .fromTo(
          q('.js-chero-in'),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
          1.45,
        );

      // Exact ServiceHero scroll-out drift
      if (heroEl) {
        gsap.to(q('.js-chero-bg'), {
          yPercent: 13,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('.js-chero-inner'), {
          yPercent: -8,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: '15% top', end: 'bottom top', scrub: true },
        });
      }

      // Declarative scroll reveals scoped to Contact body sections (CTA manages its own reveals)
      if (bodyEl) {
        setupReveals(bodyEl);
      }
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (formState.status !== 'idle') {
      setFormState({ status: 'idle', message: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address (e.g. name@company.com).';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[+()\d\s-]{7,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (!formData.service) {
      newErrors.service = 'Please select a subject or service category.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message or requirement details.';
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate();
    const firstErrorKey = Object.keys(foundErrors)[0];
    if (firstErrorKey) {
      setFormState({ status: 'idle', message: '' });
      formRef.current?.querySelector(`#contact-${firstErrorKey}`)?.focus();
      return;
    }

    setFormState({ status: 'loading', message: '' });

    // If no backend endpoint is configured, report truthfully without faking success
    if (!ENDPOINT) {
      setTimeout(() => {
        setFormState({
          status: 'notice',
          message:
            'Form backend integration is currently pending client mail server setup. Your details have been validated locally, but no message has been transmitted yet.',
        });
      }, 600);
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, source: 'ssk-contact' }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setFormState({
        status: 'success',
        message: 'Thank you. Your enquiry has been sent and our team will get back to you shortly.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch {
      setFormState({
        status: 'error',
        message:
          'Something went wrong while sending your enquiry. Please try again in a moment.',
      });
    }
  };

  return (
    <div ref={root} className="ssk-contact-page">
      {/* ====================================================================
          1. CONTACT HERO — Exact same visual design language as ServiceHero
          ==================================================================== */}
      <header className="chero grain" aria-labelledby="contact-hero-title">
        <div className="chero__media js-chero-media">
          <div className="chero__bg js-chero-bg">
            <img
              className="js-chero-img"
              src={IMG.factory.src}
              width={IMG.factory.width}
              height={IMG.factory.height}
              alt={IMG.factory.alt}
              style={{ objectPosition: '50% 55%' }}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="chero__shade" aria-hidden="true" />
        </div>

        <div className="chero__inner js-chero-inner">
          <div className="chero__top js-chero-in">
            <nav aria-label="Breadcrumb" className="chero__crumbs">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <p className="eyebrow chero__eyebrow">
              Tamil Nadu · Kerala · Karnataka
            </p>
          </div>

          <h1 id="contact-hero-title" className="chero__title">
            <Lines lines={['Contact', 'SSK']} accent={1} />
          </h1>

          <div className="chero__bottom js-chero-in">
            <p className="chero__desc">
              Connect with SSK for edge band tape, panel processing, industrial adhesives,
              plywood, laminates, and architectural hardware.
            </p>
            <div className="chero__actions">
              <a href="#contact-form" className="btn btn--solid">
                Send an Enquiry
                <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
              </a>
              <a href="#contact-cards" className="btn btn--ghost">
                Contact Details
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="js-contact-body">
        {/* ==================================================================
            2. CONTACT INFORMATION CARDS — Four Architectural Cards
            ================================================================== */}
        <section
          id="contact-cards"
          className="ccards on-light"
          aria-labelledby="ccards-title"
        >
          <div className="ccards__inner">
            <header className="ccards__head">
              <p className="eyebrow" data-reveal="fade" data-y="16">
                01 — Direct Channels
              </p>
              <div className="ccards__head-row">
                <h2 id="ccards-title" className="ccards__title" data-reveal="lines">
                  <Lines lines={['Contact', 'Information']} accent={1} />
                </h2>
                <p className="ccards__subtitle" data-reveal="fade">
                  Verified regional coverage and editable communication placeholders awaiting
                  final client publication.
                </p>
              </div>
            </header>

            <div className="ccards__grid" data-reveal="stagger">
              {CONTACT_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <article key={card.id} className="ccard" aria-label={card.label}>
                    <div className="ccard__top">
                      <span className="ccard__num">
                        {card.num}
                        {!card.confirmed && <span className="tbc">To confirm</span>}
                      </span>
                      <span className="ccard__icon" aria-hidden="true">
                        <IconComponent size={18} strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="ccard__body">
                      <h3 className="ccard__label">{card.label}</h3>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="ccard__value ccard__value--link"
                          {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="ccard__value">{card.value}</p>
                      )}
                      {card.subvalue && (
                        <p className="ccard__subvalue">{card.subvalue}</p>
                      )}
                    </div>

                    <p className="ccard__note">{card.note}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. GET IN TOUCH + CONTACT FORM — Two-Column Section
            ================================================================== */}
        <section
          id="contact-form"
          className="cmain on-light"
          aria-labelledby="cmain-title"
        >
          <div className="cmain__inner">
            {/* LEFT COLUMN — Get in Touch */}
            <div className="cmain__info">
              <p className="eyebrow" data-reveal="fade" data-y="16">
                02 — Enquiry Desk
              </p>

              <h2 id="cmain-title" className="cmain__title" data-reveal="lines">
                <Lines lines={['Get in', 'Touch']} accent={1} />
              </h2>

              <p className="cmain__intro" data-reveal="fade">
                Tell us what you are making or sourcing. Whether you need edge band tape matched
                to a board finish, industrial adhesives, calibrated plywood, decorative laminates,
                or architectural hardware, our team will help you with specifications and supply.
              </p>

              <dl className="cmain__facts" data-reveal="stagger">
                <div className="cmain__fact">
                  <dt>Primary Business</dt>
                  <dd>Edge Band Tape &amp; Panel Processing</dd>
                </div>
                <div className="cmain__fact">
                  <dt>Allied Materials</dt>
                  <dd>Adhesives, Plywood, Mica &amp; Hardware</dd>
                </div>
                <div className="cmain__fact">
                  <dt>Active Regions</dt>
                  <dd>Tamil Nadu · Kerala · Karnataka</dd>
                </div>
                <div className="cmain__fact">
                  <dt>Direct Contact</dt>
                  <dd>
                    Phone &amp; email placeholders above
                    <span className="tbc">To confirm</span>
                  </dd>
                </div>
              </dl>

              <div className="cmain__links" data-reveal="fade" data-y="16">
                <Link to="/services" className="textlink">
                  Explore all five service categories
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN — Contact Form */}
            <div className="cform-card" data-reveal="fade">
              <div className="cform-card__head">
                <p className="eyebrow">Direct Enquiry</p>
                <h3 className="cform-card__title">Send a Message</h3>
                <p className="cform-card__desc">
                  Share your material or processing requirements below. Fields marked with{' '}
                  <span className="cform__req" aria-hidden="true">*</span> are required.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="cform"
                aria-busy={formState.status === 'loading'}
              >
                <div className="cform__row cform__row--two">
                  <div className="cform__field">
                    <label htmlFor="contact-name" className="cform__label">
                      Full Name <span className="cform__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`cform__input${errors.name ? ' is-error' : ''}`}
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="cform__error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="cform__field">
                    <label htmlFor="contact-email" className="cform__label">
                      Email Address <span className="cform__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`cform__input${errors.email ? ' is-error' : ''}`}
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="cform__error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="cform__row cform__row--two">
                  <div className="cform__field">
                    <label htmlFor="contact-phone" className="cform__label">
                      Phone Number <span className="cform__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98400 41750"
                      className={`cform__input${errors.phone ? ' is-error' : ''}`}
                      aria-required="true"
                      aria-invalid={errors.phone ? 'true' : undefined}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" className="cform__error">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="cform__field">
                    <label htmlFor="contact-service" className="cform__label">
                      Subject / Service <span className="cform__req" aria-hidden="true">*</span>
                    </label>
                    <div className="cform__select-wrap">
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`cform__select${errors.service ? ' is-error' : ''}`}
                        aria-required="true"
                        aria-invalid={errors.service ? 'true' : undefined}
                        aria-describedby={errors.service ? 'contact-service-error' : undefined}
                      >
                        <option value="">Select a service or subject</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.service && (
                      <p id="contact-service-error" className="cform__error">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div className="cform__field">
                  <label htmlFor="contact-message" className="cform__label">
                    Message <span className="cform__req" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the materials, thicknesses, quantities, or panel processing you require..."
                    className={`cform__textarea${errors.message ? ' is-error' : ''}`}
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="cform__error">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="cform__actions">
                  <button
                    type="submit"
                    disabled={formState.status === 'loading'}
                    className="btn btn--dark cform__submit"
                  >
                    <span>
                      {formState.status === 'loading' ? 'Processing…' : 'Submit Enquiry'}
                    </span>
                    <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
                  </button>
                </div>

                {formState.message && (
                  <div
                    className={`cform__status cform__status--${formState.status}`}
                    role={formState.status === 'error' ? 'alert' : 'status'}
                  >
                    {formState.status === 'success' ? (
                      <CheckCircle2 size={18} className="cform__status-icon" aria-hidden="true" />
                    ) : (
                      <AlertCircle size={18} className="cform__status-icon" aria-hidden="true" />
                    )}
                    <p>{formState.message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. GOOGLE MAPS SECTION — Full-Width Responsive Container
            ================================================================== */}
        <section id="contact-map" className="cmap" aria-labelledby="cmap-title">
          <div className="cmap__head">
            <div className="cmap__head-copy">
              <p className="eyebrow cmap__eyebrow" data-reveal="fade" data-y="16">
                03 — Regional Footprint
              </p>
              <h2 id="cmap-title" className="cmap__title" data-reveal="lines">
                <Lines lines={['Operating Across', 'South India']} accent={1} />
              </h2>
            </div>

            <div className="cmap__head-aside" data-reveal="fade">
              <p className="cmap__desc">
                Supplying edge band tape, panel processing, and allied materials to furniture
                manufacturers and interior contractors across Tamil Nadu, Kerala, and Karnataka.
              </p>
              <ul className="cmap__tags" aria-label="Operating regions">
                {MAP_CONFIG.coverageAreas.map((area) => (
                  <li key={area} className="cmap__tag">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cmap__frame-wrap" data-reveal="fade">
            <div className="cmap__canvas">
              <iframe
                title={MAP_CONFIG.title}
                src={MAP_CONFIG.embedUrl}
                className="cmap__iframe"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={MAP_CONFIG.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cmap__click-overlay"
                aria-label={`Open ${MAP_CONFIG.primaryRegion} in Google Maps`}
              >
                <span className="cmap__click-pill">
                  Open in Google Maps
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </a>
            </div>

            <div className="cmap__card">
              <div className="cmap__card-top">
                <span className="cmap__card-pin" aria-hidden="true">
                  <MapPin size={16} />
                </span>
                <p className="cmap__card-region">{MAP_CONFIG.primaryRegion}</p>
              </div>
              <p className="cmap__card-text">
                Manufacturing operations and regional supply network active across Southern India.
              </p>
              <a
                href={MAP_CONFIG.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cmap__card-link"
              >
                Open Location in Google Maps
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <p className="cmap__card-notice">
                {MAP_CONFIG.pendingNotice}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================================
          5. REUSED EXACT SSK CTA COMPONENT (Shared with Home & About)
          ==================================================================== */}
      <Cta />
    </div>
  );
};

export default SskContact;
