import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, MOTION } from '../../../utils/gsap'
import Lines from '../../shared/Lines'

/**
 * Service detail hero — same cinematic language as the SSK About hero
 * (clip-path window entrance, masked headline lines, scroll-out parallax).
 */
export default function ServiceHero({ service, total }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      gsap
        .timeline({ delay: 0.1 })
        .fromTo(
          q('.js-svch-media'),
          { clipPath: 'inset(16% 12% 16% 12%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.85, ease: 'expo.inOut' },
          0,
        )
        .fromTo(q('.js-svch-img'), { scale: 1.4 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
        .fromTo(
          q('.svch__title .line__inner'),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out' },
          0.95,
        )
        .fromTo(
          q('.js-svch-in'),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
          1.45,
        )

      // scroll-out drift
      gsap.to(q('.js-svch-bg'), {
        yPercent: 13,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('.js-svch-inner'), {
        yPercent: -8,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: '15% top', end: 'bottom top', scrub: true },
      })
    })

    return () => mm.revert()
  }, [])

  const accent = service.heroTitle.length - 1

  return (
    <header ref={root} className="svch grain">
      <div className="svch__media js-svch-media">
        <div className="svch__bg js-svch-bg">
          <img
            className="js-svch-img"
            src={service.heroImage}
            alt={service.heroAlt}
            style={{ objectPosition: service.heroFocus }}
            fetchPriority="high"
          />
        </div>
        <div className="svch__shade" aria-hidden="true" />
      </div>

      <div className="svch__inner js-svch-inner">
        <div className="svch__top js-svch-in">
          <nav aria-label="Breadcrumb" className="svch__crumbs">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>
          <p className="eyebrow svch__eyebrow">
            {service.number} / 0{total} — {service.category}
          </p>
        </div>

        <h1 className="svch__title">
          <Lines lines={service.heroTitle} accent={accent} />
        </h1>

        <div className="svch__bottom js-svch-in">
          <p className="svch__desc">{service.heroSubtitle}</p>
          <div className="svch__actions">
            <Link to={`/contact?service=${service.slug}`} className="btn btn--solid">
              Enquire Now
              <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
            </Link>
            <a href="#range" className="btn btn--ghost">
              View types
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
