import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger, MOTION, PINNED } from '../../utils/gsap'
import { setupReveals } from '../../utils/reveals'
import Lines from '../../components/shared/Lines'
import Story from '../../components/sankan/Story'
import Reels from '../../components/sankan/Reels'
import Contact from '../../components/sankan/Contact'
import { CONTACT, SERVICES, STEPS } from '../../components/sankan/data'
import { setupStoryPinned, setupStoryStacked } from '../../components/sankan/storyMotion'
import '../../styles/ssk/base.css'
import '../../styles/sankan/sankan.css'
import '../../styles/sankan/story.css'
import '../../styles/sankan/reels.css'
import '../../styles/sankan/contact.css'

const MOBILE_MOTION = '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
const STACKED_MOTION = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'
const TABLET_UP_MOTION = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/* Toggle to true to restore the Process section ("Discover, Design, Create, Deliver") on the Sankan page. */
const SHOW_PROCESS = false

/* Page order: Hero → About (one connected scene) → Services → Process → Reels → Contact → Footer.
   Content for each chapter lives in src/components/sankan/data.js */

export default function Sankan() {
  const root = useRef(null)
  const location = useLocation()
  const fromSSK = useRef(location.state?.fromSSK === true)
  const introDone = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [activeService, setActiveService] = useState(null)
  const lastScrollY = useRef(0)
  const serviceOpener = useRef(null)
  const serviceClose = useRef(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const prev = lastScrollY.current
      const nextScrolled = y > 36
      setNavScrolled((curr) => (curr !== nextScrolled ? nextScrolled : curr))

      if (y <= 60) {
        setNavHidden(false)
      } else if (y > prev + 2) {
        setNavHidden(true)
      } else if (y < prev - 6) {
        setNavHidden(false)
      }
      lastScrollY.current = y

      const el = root.current
      if (!el) return
      const probe = window.innerHeight * 0.38
      const ids = ['contact', 'reels', ...(SHOW_PROCESS ? ['process'] : []), 'services', 'about']
      let current = ''
      for (const id of ids) {
        const node = el.querySelector(`#${id}`)
        if (node) {
          const rect = node.getBoundingClientRect()
          if (rect.top <= probe) {
            current = id
            break
          }
        }
      }
      if (!current && y > window.innerHeight * 0.45) {
        current = 'about'
      }
      setActiveSection((curr) => (curr !== current ? current : curr))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const intro = q('.sn-intro')[0]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alive = true

    const clearEntry = () => {
      introDone.current = true
      if (!alive) return
      fromSSK.current = false
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      if (introDone.current) {
        if (intro) gsap.set(intro, { display: 'none' })
      } else if (reduced) {
        gsap.set(intro, { display: 'flex' })
        gsap
          .timeline({ onComplete: clearEntry })
          .to(intro, { opacity: 0, duration: 0.35, ease: 'power1.out' })
          .set(intro, { display: 'none' })
      } else {
        const logoWrap = q('.js-sn-intro-logo')[0]
        const line = q('.js-sn-intro-line')[0]
        const tag = q('.js-sn-intro-tag span')[0]

        gsap.set(intro, { display: 'flex', clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(logoWrap, { scale: 0.82, autoAlpha: 0, y: 24 })
        gsap.set(line, { scaleX: 0, transformOrigin: 'center center' })
        gsap.set(tag, { yPercent: 120, autoAlpha: 0 })

        gsap
          .timeline({ onComplete: clearEntry })
          .to(logoWrap, {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            duration: 1.15,
            ease: 'expo.out',
          })
          .to(line, { scaleX: 1, duration: 0.75, ease: 'power3.out' }, 0.42)
          .to(tag, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, 0.52)
          .to({}, { duration: 0.45 })
          .to([logoWrap, line, tag], { scale: 1.05, opacity: 0.85, duration: 0.65, ease: 'power2.in' }, '>-0.05')
          .to(intro, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.8,
            ease: 'expo.inOut',
          }, '<0.1')
          .set(intro, { display: 'none' })
      }

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      q('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true })
      })
      document.fonts?.ready.then(() => alive && refresh())

      /* Desktop pinned scenes. Registered FIRST and in page order so every pin spacer
         exists before the triggers that sit below it measure their start positions. */
      mm.add(PINNED, () => {
        /* 1. Hero → About: one pinned, scrubbed story */
        const story = setupStoryPinned(q, q('.sn-story__scene')[0])
        const onAnchor = (event) => {
          const link = event.target.closest?.('a[href="#about"]')
          if (!link) return
          event.preventDefault()
          window.scrollTo({ top: story.aboutY(), behavior: 'smooth' })
        }
        el.addEventListener('click', onAnchor)

        /* 2. Services: vertical scroll drives the horizontal track (all five panels) */
        const svcTrack = q('.sn-services__track')[0]
        const svcViewport = q('.sn-services__viewport')[0]
        const svcDistance = () => Math.max(svcTrack.scrollWidth - svcViewport.clientWidth, 0)
        gsap.timeline({
          scrollTrigger: {
            trigger: q('.sn-services__pin')[0],
            start: 'top top',
            end: () => `+=${svcDistance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }).to(svcTrack, { x: () => -svcDistance(), ease: 'none', duration: 1 }, 0)

        /* 3. Process: unchanged step-by-step pinned sequence (preserved for future re-enabling) */
        const processPin = q('.sn-process__pin')[0]
        if (SHOW_PROCESS && processPin) {
          const indexes = q('.js-step-index')
          const titles = q('.js-step-title')
          const notes = q('.js-step-note')
          const mains = q('.js-step-main')
          const mainImgs = q('.js-step-main img')
          const asides = q('.js-step-aside')
          const asideImgs = q('.js-step-aside img')
          const dots = q('.js-step-dot')
          const lead = 0.4
          const process = gsap.timeline({
            scrollTrigger: {
              trigger: processPin,
              start: 'top top',
              end: '+=360%',
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          indexes.forEach((_, i) => {
            if (i === 0) return
            const at = lead + i
            process
              .to(indexes[i - 1], { opacity: 0, y: -28, duration: 0.45 }, at)
              .to(titles[i - 1], { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5 }, at)
              .to(notes[i - 1], { opacity: 0, y: -14, duration: 0.4 }, at)
              .to(mains[i - 1], { opacity: 0, duration: 0.55 }, at)
              .to(mainImgs[i - 1], { scale: 1.14, duration: 0.55 }, at)
              .to(asides[i - 1], { opacity: 0, duration: 0.45 }, at)
              .to(asideImgs[i - 1], { scale: 1.12, duration: 0.45 }, at)
              .to(dots[i - 1], { scaleX: 1, opacity: 0.3, duration: 0.35 }, at)
              .fromTo(indexes[i], { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.45 }, at)
              .fromTo(
                titles[i],
                { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 },
                at,
              )
              .fromTo(notes[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, at)
              .fromTo(
                mains[i],
                { opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' },
                { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 },
                at,
              )
              .fromTo(mainImgs[i], { scale: 1.18 }, { scale: 1.04, duration: 0.6 }, at)
              .fromTo(
                asides[i],
                { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 },
                at,
              )
              .fromTo(asideImgs[i], { scale: 1.16 }, { scale: 1, duration: 0.55 }, at)
              .to(dots[i], { scaleX: 2.4, opacity: 1, duration: 0.35 }, at)
          })
          process.to({}, { duration: 0.4 })
        }

        return () => {
          el.removeEventListener('click', onAnchor)
          story.cleanup()
        }
      })

      mm.add(MOTION, () => {
        setupReveals(el)

        gsap.fromTo(
          q('.js-contact-copy'),
          { y: 40 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: q('.sn-contact')[0],
              start: 'top 90%',
              end: 'top 55%',
              scrub: true,
            },
          },
        )

        gsap.fromTo(
          q('.sn-footer__mark'),
          { y: 28 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: q('.sn-footer')[0],
              start: 'top 96%',
              end: 'top 72%',
              scrub: true,
            },
          },
        )
      })

      /* Stacked story (tablet / mobile) */
      mm.add(STACKED_MOTION, () => {
        setupStoryStacked(q)
      })

      /* Reels: each panel drifts at its own speed (tablet and up; mobile uses a swipe row) */
      mm.add(TABLET_UP_MOTION, () => {
        q('.js-reel').forEach((reel) => {
          const speed = Number(reel.dataset.speed) || 0.12
          gsap.fromTo(
            reel,
            { yPercent: speed * 40 },
            {
              yPercent: -speed * 40,
              ease: 'none',
              scrollTrigger: {
                trigger: q('.sn-reels__list')[0],
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      })

      mm.add(MOBILE_MOTION, () => {
        q('.js-svc-card, .js-step-stack').forEach((plane) => {
          gsap.fromTo(
            plane,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.15,
              ease: 'expo.out',
              scrollTrigger: { trigger: plane, start: 'top 86%', once: true },
            },
          )
        })
      })

      return () => window.removeEventListener('load', refresh)
    }, el)

    return () => {
      alive = false
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (activeService === null) return undefined
    const previousOverflow = document.body.style.overflow
    const previousPad = document.body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    serviceClose.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') setActiveService(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPad
      window.removeEventListener('keydown', onKey)
      serviceOpener.current?.focus()
    }
  }, [activeService])

  const closeMenu = () => setMenuOpen(false)

  const handleToSsk = () => {
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const openService = (index, event) => {
    serviceOpener.current = event.currentTarget
    setActiveService(index)
  }

  const selected = activeService === null ? null : SERVICES[activeService]
  const serviceNames = SERVICES.map((service) => service.title.toLowerCase())
  const serviceSentence = `${serviceNames.slice(0, -1).join(', ')}, and ${serviceNames[serviceNames.length - 1]}.`

  return (
    <div ref={root} className="sn">
      <div className="sn-intro js-sn-intro" aria-hidden="true">
        <div className="sn-intro__backdrop" aria-hidden="true" />
        <div className="sn-intro__content">
          <div className="sn-intro__logo-wrap js-sn-intro-logo">
            <img
              src="/logos/sankan.png"
              alt="Sankan"
              className="sn-intro__logo-img"
              width="800"
              height="396"
            />
          </div>
          <div className="sn-intro__line js-sn-intro-line" aria-hidden="true" />
          <p className="sn-intro__tagline js-sn-intro-tag">
            <span>Interiors &amp; Architecture</span>
          </p>
        </div>
      </div>

      <header
        className="sn-nav"
        data-scrolled={navScrolled ? 'true' : 'false'}
        data-hidden={navHidden && !menuOpen ? 'true' : 'false'}
        data-menu-open={menuOpen ? 'true' : 'false'}
      >
        <div className="sn-nav__inner">
          <Link to="/sankan" className="sn-nav__logo" aria-label="Sankan Interiors" onClick={closeMenu}>
            <img
              src="/logos/sankan.png"
              alt="Sankan Interiors &amp; Architecture"
              className="sn-nav__logo-img"
              width="320"
              height="158"
            />
          </Link>

          <nav className="sn-nav__links" aria-label="Sankan">
            <a
              href="#about"
              className={`sn-nav__link${activeSection === 'about' ? ' is-active' : ''}`}
            >
              <span className="sn-nav__link-mask">
                <span className="sn-nav__link-label">About</span>
                <span className="sn-nav__link-clone" aria-hidden="true">About</span>
              </span>
            </a>
            <a
              href="#services"
              className={`sn-nav__link${activeSection === 'services' ? ' is-active' : ''}`}
            >
              <span className="sn-nav__link-mask">
                <span className="sn-nav__link-label">Services</span>
                <span className="sn-nav__link-clone" aria-hidden="true">Services</span>
              </span>
            </a>
            {SHOW_PROCESS && (
              <a
                href="#process"
                className={`sn-nav__link${activeSection === 'process' ? ' is-active' : ''}`}
              >
                <span className="sn-nav__link-mask">
                  <span className="sn-nav__link-label">Process</span>
                  <span className="sn-nav__link-clone" aria-hidden="true">Process</span>
                </span>
              </a>
            )}
            <a
              href="#reels"
              className={`sn-nav__link${activeSection === 'reels' ? ' is-active' : ''}`}
            >
              <span className="sn-nav__link-mask">
                <span className="sn-nav__link-label">Media</span>
                <span className="sn-nav__link-clone" aria-hidden="true">Media</span>
              </span>
            </a>
            <a
              href="#contact"
              className={`sn-nav__link${activeSection === 'contact' ? ' is-active' : ''}`}
            >
              <span className="sn-nav__link-mask">
                <span className="sn-nav__link-label">Enquire</span>
                <span className="sn-nav__link-clone" aria-hidden="true">Enquire</span>
              </span>
            </a>
            <Link
              to="/"
              state={{ fromSankan: true }}
              onClick={handleToSsk}
              className="sn-nav__ssk-pill"
            >
              <span className="sn-nav__ssk-dot" aria-hidden="true" />
              <span>SSK</span>
              <ArrowUpRight size={16} className="sn-nav__ssk-icon" aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            className="sn-nav__menu"
            aria-expanded={menuOpen}
            aria-controls="sn-drawer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sn-nav__menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav id="sn-drawer" className="sn-drawer" aria-label="Sankan">
          <div className="sn-drawer__head">
            <p className="sn-drawer__kicker">Sankan Navigation</p>
            <p className="sn-drawer__sub">Interior, exterior &amp; custom wardrobe design</p>
          </div>
          <div className="sn-drawer__links">
            <a href="#about" onClick={closeMenu} className={activeSection === 'about' ? 'is-active' : undefined}>
              <span>About</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#services" onClick={closeMenu} className={activeSection === 'services' ? 'is-active' : undefined}>
              <span>Services</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {SHOW_PROCESS && (
              <a href="#process" onClick={closeMenu} className={activeSection === 'process' ? 'is-active' : undefined}>
                <span>Process</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
            <a href="#reels" onClick={closeMenu} className={activeSection === 'reels' ? 'is-active' : undefined}>
              <span>Media</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" onClick={closeMenu} className={activeSection === 'contact' ? 'is-active' : undefined}>
              <span>Enquire</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {CONTACT.instagramUrl && (
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <span>Instagram ({CONTACT.instagramHandle})</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
          <Link
            to="/"
            state={{ fromSankan: true }}
            onClick={() => {
              closeMenu()
              handleToSsk()
            }}
            className="sn-drawer__ssk"
          >
            <div>
              <span className="sn-drawer__ssk-eyebrow">Parent Company</span>
              <span className="sn-drawer__ssk-title">Back to SSK Enterprises</span>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </nav>
      )}

      <main>
        <Story />

        <section id="services" className="sn-services">
          <div className="sn-services__pin">
            <aside className="sn-services__side">
              <p className="sn-services__mark">Sankan</p>
              <div className="sn-services__intro">
                <h2 className="sn-services__heading">Services</h2>
                <p className="sn-services__sub">What the work covers.</p>
                <p className="ssk-body sn-prose">
                  {serviceSentence.charAt(0).toUpperCase() + serviceSentence.slice(1)}
                </p>
              </div>
              <div className="sn-services__contact">
                <p>Phone and email will be published once they are confirmed.</p>
                <a href="#contact" className="sn-btn">
                  Start an enquiry
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </aside>
            <div className="sn-services__viewport">
              <div className="sn-services__track">
                {SERVICES.map((service, i) => (
                  <button
                    key={service.index}
                    type="button"
                    className="sn-services__panel"
                    aria-haspopup="dialog"
                    aria-label={`${service.index}. ${service.title}`}
                    data-provisional={service.provisional ? 'true' : undefined}
                    onClick={(event) => openService(i, event)}
                  >
                    <span className="sn-services__frame">
                      <img src={service.img.src} alt={service.img.alt} />
                      <span className="sn-services__shade">
                        <span className="sn-services__num">{service.index}</span>
                        <span>
                          <span className="sn-services__tag">Service</span>
                          <span className="sn-services__name">{service.title}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sn-services__stack">
            <header className="sn-services__head">
              <p className="sn-services__mark">Sankan</p>
              <p className="ssk-eyebrow sn-kicker">Services</p>
              <h2 className="ssk-h-section" data-reveal="lines">
                <Lines lines={['What the work', 'covers.']} />
              </h2>
              <p className="ssk-body sn-prose">
                {serviceSentence.charAt(0).toUpperCase() + serviceSentence.slice(1)}
              </p>
            </header>
            <div className="sn-services__cards">
              {SERVICES.map((service, i) => (
                <button
                  key={service.index}
                  type="button"
                  className="sn-services__card"
                  aria-haspopup="dialog"
                  aria-label={`${service.index}. ${service.title}`}
                  data-provisional={service.provisional ? 'true' : undefined}
                  onClick={(event) => openService(i, event)}
                >
                  <span className="sn-services__card-media js-svc-card">
                    <img src={service.img.src} alt={service.img.alt} />
                  </span>
                  <span className="ssk-eyebrow sn-kicker">{service.index}</span>
                  <span className="sn-services__card-title">{service.title}</span>
                  <span className="ssk-body sn-prose">{service.text}</span>
                </button>
              ))}
            </div>
          </div>
          {selected && (
            <div
              className="sn-service-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sn-service-title"
            >
              <button
                ref={serviceClose}
                type="button"
                className="sn-service-dialog__close"
                onClick={() => setActiveService(null)}
              >
                <X size={16} aria-hidden="true" />
                Close
              </button>
              <figure className="sn-service-dialog__figure">
                <img src={selected.img.src} alt={selected.img.alt} />
              </figure>
              <div className="sn-service-dialog__copy">
                <p className="sn-service-dialog__index">{selected.index}</p>
                <h3 id="sn-service-title">{selected.title}</h3>
                <p className="ssk-body sn-prose">{selected.text}</p>
              </div>
            </div>
          )}
        </section>

        {SHOW_PROCESS && (
          <section id="process" className="sn-process">
            <div className="sn-process__pin">
              <p className="sn-process__mark">Sankan</p>
              <p className="ssk-eyebrow sn-kicker sn-process__kicker">Process</p>
              <h2 className="sn-process__cover">Discover to handover.</h2>
              <div className="sn-process__index">
                {STEPS.map((step, i) => (
                  <p key={step.index} className={`js-step-index${i === 0 ? ' is-on' : ''}`}>
                    {step.index}
                  </p>
                ))}
              </div>
              <div className="sn-process__titles">
                {STEPS.map((step, i) => (
                  <h3 key={step.title} className={`sn-process__title js-step-title${i === 0 ? ' is-on' : ''}`}>
                    {step.title}
                  </h3>
                ))}
              </div>
              <figure className="sn-process__aside">
                {STEPS.map((step, i) => (
                  <div key={step.index} className={`js-step-aside${i === 0 ? ' is-on' : ''}`}>
                    <img src={step.aside.src} alt="" />
                  </div>
                ))}
              </figure>
              <div className="sn-process__main">
                {STEPS.map((step, i) => (
                  <div key={step.index} className={`js-step-main${i === 0 ? ' is-on' : ''}`}>
                    <img src={step.img.src} alt={step.img.alt} />
                  </div>
                ))}
              </div>
              <div className="sn-process__note">
                {STEPS.map((step, i) => (
                  <p key={step.index} className={`js-step-note${i === 0 ? ' is-on' : ''}`}>
                    {step.text}
                  </p>
                ))}
              </div>
              <div className="sn-process__meter" aria-hidden="true">
                {STEPS.map((step, i) => (
                  <span key={step.index} className={`js-step-dot${i === 0 ? ' is-on' : ''}`} />
                ))}
              </div>
            </div>
            <div className="sn-process__stack">
              <header className="sn-process__head">
                <p className="ssk-eyebrow sn-kicker">Process</p>
                <h2 className="ssk-h-section" data-reveal="lines">
                  <Lines lines={['Discover', 'to handover.']} />
                </h2>
              </header>
              <ol>
                {STEPS.map((step) => (
                  <li key={step.title}>
                    <figure className="js-step-stack">
                      <img src={step.img.src} alt={step.img.alt} />
                    </figure>
                    <p className="ssk-eyebrow sn-kicker">{step.index}</p>
                    <h3 className="ssk-h-sub">{step.title}</h3>
                    <p className="ssk-body sn-prose">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <Reels />

        <Contact />
      </main>

      <footer className="sn-footer">
        <div className="sn-footer__ambient" aria-hidden="true" />
        <div className="sn-footer__frame" aria-hidden="true" />

        <div className="sn-footer__inner">
          {/* Editorial Opening & Final CTA */}
          <div className="sn-footer__hero">
            <div className="sn-footer__hero-copy">
              <p className="sn-footer__eyebrow">
                <span className="sn-footer__eyebrow-line" aria-hidden="true" />
                Sankan · Interior, Exterior &amp; Wardrobe Design
              </p>
              <h2 className="sn-footer__headline">
                Spaces shaped around <span>how you live.</span>
              </h2>
            </div>

            <div className="sn-footer__hero-actions">
              <a href="#contact" className="sn-footer__cta-primary">
                <span>Begin an Enquiry</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link
                to="/"
                state={{ fromSankan: true }}
                onClick={handleToSsk}
                className="sn-footer__cta-secondary"
              >
                <span>Visit SSK Enterprises</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 3-Column Architectural Directory */}
          <div className="sn-footer__grid">
            <div className="sn-footer__brand-col">
              <div className="sn-footer__brand-head">
                <span className="sn-footer__brand-diamond" aria-hidden="true" />
                <span className="sn-footer__brand-name">Sankan</span>
              </div>
              <p className="sn-footer__brand-desc">
                The design-focused architectural experience of SSK — bringing layout clarity,
                material care and crafted joinery to interiors, exteriors and custom wardrobes.
              </p>
              <div className="sn-footer__tags" aria-label="Design pillars">
                <span>Space</span>
                <span>Function</span>
                <span>Materials</span>
                <span>Experience</span>
              </div>
            </div>

            <nav aria-label="Footer" className="sn-footer__col">
              <p className="sn-footer__col-label">
                <span>01</span> Chapters
              </p>
              <ul className="sn-footer__list">
                <li>
                  <a href="#about">
                    <span>About Sankan</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#services">
                    <span>Services</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                {SHOW_PROCESS && (
                  <li>
                    <a href="#process">
                      <span>Process</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                )}
                <li>
                  <a href="#reels">
                    <span>Reels &amp; Previews</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <span>Start an Enquiry</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link
                    to="/"
                    state={{ fromSankan: true }}
                    onClick={handleToSsk}
                    className="is-ssk"
                  >
                    <span>SSK Main Website</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="sn-footer__col">
              <p className="sn-footer__col-label">
                <span>02</span> Disciplines
              </p>
              <ul className="sn-footer__list">
                {SERVICES.map((svc) => (
                  <li key={svc.index}>
                    <a href="#services">
                      <span>{svc.title}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sn-footer__col">
              <p className="sn-footer__col-label">
                <span>03</span> Studio &amp; Enquiries
              </p>

              <div className="sn-footer__contact-list">
                {CONTACT.email || CONTACT.phone || CONTACT.address ? (
                  <>
                    {CONTACT.email && (
                      <a href={`mailto:${CONTACT.email}`} className="sn-footer__contact-item">
                        {CONTACT.email}
                      </a>
                    )}
                    {CONTACT.phone && (
                      <a
                        href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                        className="sn-footer__contact-item"
                      >
                        {CONTACT.phone}
                      </a>
                    )}
                    {CONTACT.address && (
                      <p className="sn-footer__contact-note">{CONTACT.address}</p>
                    )}
                  </>
                ) : (
                  <p className="sn-footer__contact-note">
                    Direct phone, email and studio address will be published once confirmed. Use the{' '}
                    <a href="#contact">enquiry form above</a> to tell us about your project.
                  </p>
                )}

                {CONTACT.instagramUrl ? (
                  <a
                    href={CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sn-footer__social-pill"
                  >
                    <span>Instagram · {CONTACT.instagramHandle || '@sankan'}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <a href="#reels" className="sn-footer__social-pill">
                    <span>Explore Visual Reels</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Monumental Sankan Signature */}
          <div className="sn-footer__signature">
            <div className="sn-footer__signature-meta" aria-hidden="true">
              <span>ARCHITECTURAL &amp; INTERIOR DESIGN</span>
              <span>AN SSK EXPERIENCE</span>
            </div>
            <p className="sn-footer__mark">Sankan</p>
          </div>

          {/* Bottom Colophon */}
          <div className="sn-footer__bottom">
            <p>© {new Date().getFullYear()} Sankan. All rights reserved.</p>
            <div className="sn-footer__bottom-actions">
              <Link
                to="/"
                state={{ fromSankan: true }}
                onClick={handleToSsk}
                className="sn-footer__parent-link"
              >
                SSK — Panel Manufacturing &amp; Edge Banding
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="sn-footer__top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span>Top of page</span>
                <ArrowUp size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
