import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Lines from '../shared/Lines'
import { gsap, MOTION } from '../../utils/gsap'
import '../../styles/sankan/hero.css'

const VIDEO_02 = '/sankanvideos/video2.mp4'

const safePlay = (vid) => {
  if (!vid) return
  if (vid.paused) {
    const p = vid.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }
}

/**
 * Sankan Homepage Hero Section
 *
 * Exact 50/50 Split Layout:
 *  - 50% Left: Clean white background (#FFFFFF), Sankan typography, approved tagline,
 *              headline, description, Let's Talk & Explore Our Work CTAs, and bottom-left scroll cue.
 *  - 50% Right: Full-height visual presentation of Main Video 02.
 *  - Centre Floating Video: Second display of the SAME Video 02 in a smaller floating
 *              card overlapping the 50/50 boundary, with subtle border, shadow, caption,
 *              and circular arrow button.
 */
export default function Hero() {
  const root = useRef(null)
  const mainVideoRef = useRef(null)
  const floatVideoRef = useRef(null)
  const location = useLocation()
  const fromSSK = location.state?.fromSSK === true

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const q = gsap.utils.selector(el)

    // Ensure both Video 02 instances autoplay smoothly
    safePlay(mainVideoRef.current)
    safePlay(floatVideoRef.current)

    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      const leftPanel = q('.js-hero-left')[0]
      const rightPanel = q('.js-hero-right')[0]
      const floatCard = q('.js-hero-float')[0]
      const headlineLines = q('.js-hero-heading .line__inner')
      const ctaButtons = q('.js-hero-btn')
      const scrollIndicator = q('.js-hero-scroll')[0]

      // Set initial states for coordinated entrance
      gsap.set(leftPanel, { opacity: 0, x: -36 })
      gsap.set(rightPanel, { clipPath: 'inset(0% 0% 0% 100%)' })
      gsap.set(floatCard, { scale: 0.86, opacity: 0, y: 32 })
      gsap.set(headlineLines, { yPercent: 115 })
      gsap.set(ctaButtons, { opacity: 0, y: 18 })
      gsap.set(scrollIndicator, { opacity: 0, y: 14 })

      /* 5-Step Smooth Entrance Sequence:
         1. White left panel appears.
         2. Main Video 02 reveals on the right.
         3. Floating Video 02 card enters from the centre.
         4. Headline reveals smoothly.
         5. CTA buttons appear.
         6. Scroll indicator appears. */
      const tl = gsap.timeline({
        delay: 1.85,
        defaults: { ease: 'power3.out' },
      })

      // 1. White left panel appears
      tl.to(leftPanel, { opacity: 1, x: 0, duration: 1.05, ease: 'power3.out' }, 0)

      // 2. Main Video 02 reveals on the right
      tl.to(
        rightPanel,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.inOut' },
        0.18,
      )

      // 3. Floating Video 02 card enters from the centre
      tl.to(
        floatCard,
        { scale: 1, opacity: 1, y: 0, duration: 1.15, ease: 'back.out(1.15)' },
        0.58,
      )

      // 4. Headline reveals smoothly
      tl.to(
        headlineLines,
        { yPercent: 0, duration: 1.05, stagger: 0.1, ease: 'power4.out' },
        0.82,
      )

      // 5. CTA buttons appear
      tl.to(
        ctaButtons,
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
        1.05,
      )

      // 6. Scroll indicator appears
      tl.to(scrollIndicator, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.28)
    })

    return () => mm.revert()
  }, [fromSSK])

  return (
    <section ref={root} className="sn-hero-split" id="hero" aria-label="Sankan Introduction">
      {/* 50% LEFT: White Background Panel */}
      <div className="sn-hero__left js-hero-left">
        <div className="sn-hero__content">
          <h1 className="sn-hero__heading js-hero-heading">
            <Lines lines={['Spaces that', 'feel like you.']} />
          </h1>

          <div className="sn-hero__actions">
            <a href="#contact" className="sn-btn sn-hero__btn-primary js-hero-btn">
              Let&rsquo;s Talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Small scroll indicator near bottom-left */}
        <a href="#about" className="sn-hero__scroll js-hero-scroll" aria-label="Scroll to About Sankan">
          <span className="sn-hero__scroll-label">Scroll</span>
          <div className="sn-hero__scroll-line" aria-hidden="true">
            <span className="sn-hero__scroll-pip" />
          </div>
        </a>
      </div>

      {/* 50% RIGHT: Main Video 02 */}
      <div className="sn-hero__right js-hero-right">
        <div className="sn-hero__video-container">
          <video
            ref={mainVideoRef}
            className="sn-hero__video sn-hero__video--main"
            src={VIDEO_02}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="sn-hero__video-glare" aria-hidden="true" />
          <div className="sn-hero__video-shade" aria-hidden="true" />
        </div>
      </div>

      {/* CENTRE FLOATING VIDEO: ALSO VIDEO 02 (NOMA Inspired) */}
      <div className="sn-hero__float js-hero-float">
        <div className="sn-hero__float-card">
          <a
            href="#about"
            className="sn-hero__float-card-link"
            aria-label="Discover About Sankan"
          >
            <span className="sn-hero__sr-only">Discover About Sankan</span>
          </a>
          <div className="sn-hero__float-frame">
            <video
              ref={floatVideoRef}
              className="sn-hero__video sn-hero__video--float"
              src={VIDEO_02}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="sn-hero__float-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
