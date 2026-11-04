import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, MOTION } from '../../../utils/gsap'
import { setupReveals } from '../../../utils/reveals'
import { IMG } from '../../../assets/ssk/images'
import Lines from '../../shared/Lines'

import '../../../styles/ssk/cta.css'

/**
 * Reusable SSK CTA component.
 * Exact same CTA as designed for the SSK Home page,
 * shared across Home, About, Services, and Contact.
 */
export default function Cta() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      setupReveals(el)

      // background drifts against the scroll direction
      gsap.fromTo(
        el.querySelector('.cta__bg'),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="cta" className="cta grain" aria-labelledby="cta-title">
      <div className="cta__bg">
        <img
          src={IMG.cta.src}
          width={IMG.cta.width}
          height={IMG.cta.height}
          alt={IMG.cta.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="cta__shade" aria-hidden="true" />

      <div className="cta__inner">
        <p className="eyebrow cta__eyebrow" data-reveal="fade" data-y="16">
          Start a conversation
        </p>
        <h2 id="cta-title" className="cta__title" data-reveal="lines">
          <Lines lines={['Let’s build', 'something', 'exceptional.']} accent={2} />
        </h2>

        <div className="cta__row" data-reveal="fade">
          <p className="cta__text">
            Tell us what you are making. We will help with edge banding, panel processing and the materials to go with it.
          </p>
          <div className="cta__buttons">
            <Link to="/contact" className="btn btn--solid">
              Contact SSK
              <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn--ghost">
              View all services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
