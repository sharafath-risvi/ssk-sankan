import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import InstagramIcon from '../shared/InstagramIcon'
import { gsap, MOTION } from '../../utils/gsap'
import '../../styles/ssk/footer.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About SSK' },
  { to: '/services', label: 'Services Overview' },
  { to: '/contact', label: 'Contact & Enquiry' },
]

const SERVICE_LINKS = [
  { to: '/services/edge-band-tape', label: 'Edge Band Tape' },
  { to: '/services/adhesive', label: 'Industrial Adhesives' },
  { to: '/services/plywood', label: 'Calibrated Plywood' },
  { to: '/services/mica', label: 'Mica & Laminates' },
  { to: '/services/hardware', label: 'Precision Hardware' },
]

const REGIONS = ['Tamil Nadu', 'Kerala', 'Karnataka']

const SskFooter = () => {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      gsap.fromTo(
        q('.js-ssk-footer-reveal'),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        q('.ssk-footer__mark-text'),
        { yPercent: 18 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    })

    return () => mm.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={root} className="ssk-footer grain">
      <div className="ssk-footer__glow" aria-hidden="true" />

      <div className="ssk-footer__inner">
        {/* Tier 1: Cinematic Final Statement & CTA Band */}
        <div className="ssk-footer__cta-band js-ssk-footer-reveal">
          <div className="ssk-footer__cta-copy">
            <p className="eyebrow ssk-footer__eyebrow">Built on Precision · South India</p>
            <h2 className="ssk-footer__headline">
              Precision at <span className="is-accent">every edge.</span>
            </h2>
          </div>

          <div className="ssk-footer__cta-actions">
            <Link to="/contact" className="ssk-footer__primary-btn">
              <span>Start an Enquiry</span>
              <ArrowUpRight size={18} className="ssk-footer__btn-icon" aria-hidden="true" />
            </Link>
            <Link to="/sankan" state={{ fromSSK: true }} className="ssk-footer__secondary-btn">
              <span>Explore Sankan</span>
              <ArrowUpRight size={16} className="ssk-footer__btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Tier 2: Editorial 4-Column Directory */}
        <div className="ssk-footer__top">
          <div className="ssk-footer__intro js-ssk-footer-reveal">
            <div className="ssk-footer__brand-lockup">
              <Link to="/" aria-label="SSK Enterprises home" className="ssk-footer__logo-link">
                <img
                  src="/logos/ssk.PNG"
                  alt="SSK Enterprises"
                  className="ssk-footer__logo-img"
                  width="260"
                  height="40"
                />
              </Link>
            </div>

            <p className="ssk-footer__tag">
              Edge banding, panel manufacturing and materials — engineered to the millimetre for
              furniture makers, panel processors and interior contractors.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="ssk-footer__col js-ssk-footer-reveal">
            <h3 className="ssk-footer__col-title">
              <span>01</span> Navigate
            </h3>
            <ul className="ssk-footer__list">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="ssk-footer__link">
                    <span className="ssk-footer__link-label">{item.label}</span>
                    <ArrowUpRight size={14} className="ssk-footer__link-arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sankan" state={{ fromSSK: true }} className="ssk-footer__link is-sankan">
                  <span className="ssk-footer__link-label">Sankan Experience</span>
                  <ArrowUpRight size={14} className="ssk-footer__link-arrow" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services directory" className="ssk-footer__col js-ssk-footer-reveal">
            <h3 className="ssk-footer__col-title">
              <span>02</span> Capabilities
            </h3>
            <ul className="ssk-footer__list">
              {SERVICE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="ssk-footer__link">
                    <span className="ssk-footer__link-label">{item.label}</span>
                    <ArrowUpRight size={14} className="ssk-footer__link-arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ssk-footer__col js-ssk-footer-reveal">
            <h3 className="ssk-footer__col-title">
              <span>03</span> Presence
            </h3>

            <ul className="ssk-footer__regions" aria-label="Service regions">
              {REGIONS.map((region) => (
                <li key={region} className="ssk-footer__region-tag">
                  <span className="ssk-footer__region-dot" aria-hidden="true" />
                  {region}
                </li>
              ))}
            </ul>

            <div className="ssk-footer__social-wrap">
              <a
                href="https://www.instagram.com/sankanply_homedecor/"
                target="_blank"
                rel="noopener noreferrer"
                className="ssk-footer__instagram-btn"
                aria-label="Official Instagram"
              >
                <InstagramIcon size={20} aria-hidden="true" />
              </a>
            </div>

            <Link to="/contact" className="ssk-footer__enquire">
              <span>Send an enquiry</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Tier 3: Monumental Wordmark Stage */}
        <div className="ssk-footer__stage" aria-hidden="true">
          <div className="ssk-footer__stage-meta">
            <span>PANEL PROCESSING &amp; EDGE BANDING</span>
            <span>TAMIL NADU · KERALA · KARNATAKA</span>
          </div>
          <p className="ssk-footer__mark">
            <span className="ssk-footer__mark-text">SSK</span>
          </p>
        </div>

        {/* Tier 4: Bottom Colophon */}
        <div className="ssk-footer__bottom">
          <p className="ssk-footer__copy">
            &copy; {new Date().getFullYear()} SSK Enterprises. All rights reserved.
          </p>

          <div className="ssk-footer__bottom-links">
            <Link to="/sankan" state={{ fromSSK: true }} className="ssk-footer__sister-link">
              Sankan — Architectural &amp; Interior Experience
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>

            <button type="button" onClick={scrollToTop} className="ssk-footer__top-btn">
              <span>Back to top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SskFooter
