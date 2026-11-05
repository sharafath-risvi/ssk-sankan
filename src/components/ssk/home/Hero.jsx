import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, MOTION, PINNED } from '../../../utils/gsap'
import Lines from '../../shared/Lines'

const VIDEO_01 = '/sskvideos/sskvideo1.mp4' // Inauguration Pooja (Beginning & Continuous Background)

const safePlay = (vid) => {
  if (!vid) return
  if (vid.paused) {
    const p = vid.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }
}

const safePause = (vid) => {
  if (!vid) return
  if (!vid.paused) vid.pause()
}

export default function Hero() {
  const root = useRef(null)

  // Foreground video ref (Single video)
  const v1Ref = useRef(null)

  // Continuous ambient background video ref (Video 01)
  const bgV1Ref = useRef(null)

  // Mobile video ref (Video 01 only on mobile)
  const mobV1Ref = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    const v1 = v1Ref.current
    const bgV1 = bgV1Ref.current
    const mobV1 = mobV1Ref.current

    // Ensure viewport is strictly at top (0, 0) before Hero measurements
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // -------------------------------------------------------------------------
    // Reduced Motion Fallback
    // -------------------------------------------------------------------------
    mm.add('(prefers-reduced-motion: reduce)', () => {
      safePause(v1)
      safePause(bgV1)
      safePause(mobV1)
    })

    // -------------------------------------------------------------------------
    // Desktop (>= 1024px, motion allowed): Single Video Choreography
    // Phase 1: Left Chapter 01 copy + Right Video 01
    // Scroll: Left copy exits, Video 01 glides to Left, Chapter 02 enters on Right
    // -------------------------------------------------------------------------
    mm.add(PINNED, () => {
      const stage = q('.js-hero-stage')[0]
      const frameV1 = q('.js-hero-frame-v1')[0]

      const intro = q('.js-hero-intro')[0]
      const introLines = q('.js-hero-intro .line__inner')
      const introFades = q('.js-hero-intro-fade')
      const scrollCue = q('.js-hero-scroll')[0]

      const dominant = q('.js-hero-dominant')[0]
      const dominantLines = q('.js-hero-dominant .line__inner')
      const dominantFades = q('.js-hero-dominant-fade')

      // Ensure mobile video is paused on desktop
      safePause(mobV1)

      // Start foreground Video 01 and continuous background Video 01 immediately
      if (v1) v1.currentTime = 0
      if (bgV1) bgV1.currentTime = 0
      safePlay(v1)
      safePlay(bgV1)

      // Initial visual states for Desktop
      // Video 01 starts prominent and centered on the right half (left: 74vw)
      gsap.set(frameV1, { left: '74vw', scale: 1, opacity: 1 })

      gsap.set(intro, { autoAlpha: 1 })
      gsap.set(introLines, { yPercent: 120 })
      gsap.set(introFades, { y: 24, opacity: 0 })
      gsap.set(scrollCue, { opacity: 0 })

      gsap.set(dominant, { autoAlpha: 0 })
      gsap.set(dominantLines, { yPercent: 120 })
      gsap.set(dominantFades, { y: 24, opacity: 0 })

      // Initial entrance reveal on page load
      gsap
        .timeline({ delay: 0.1 })
        .to(introLines, { yPercent: 0, duration: 1.25, stagger: 0.1, ease: 'power4.out' }, 0)
        .to(introFades, { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: 'power3.out' }, 0.4)
        .fromTo(
          frameV1,
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' },
          0.2,
        )
        .to(scrollCue, { opacity: 1, duration: 0.8 }, 1.2)

      // Pinned Scroll-Driven Timeline:
      // 1. Chapter 01 exits as user starts scrolling
      // 2. Video 01 travels from right to LEFT (74vw -> 26vw)
      // 3. Chapter 02 reveals on the RIGHT side
      // 4. Hold state for reading Chapter 02 before unpinning into About SSK
      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      // 1. Initial Chapter 01 Hero copy exits as scroll begins
      tl.to(
        introLines,
        { y: -70, duration: 0.75, stagger: 0.05, ease: 'power2.in' },
        0.1,
      )
      tl.to(
        introFades,
        { y: -20, opacity: 0, duration: 0.65, stagger: 0.05, ease: 'power2.in' },
        0.1,
      )
      tl.to(
        scrollCue,
        { opacity: 0, duration: 0.4, ease: 'power2.in' },
        0.1,
      )
      tl.to(intro, { autoAlpha: 0, duration: 0.01 }, 0.85)

      // 2. Video 01 moves smoothly from right to LEFT (74vw -> 26vw)
      tl.to(
        frameV1,
        {
          left: '26vw',
          scale: 1,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        0.3,
      )

      // 3. Reveal Chapter 02 statement on the RIGHT side
      tl.to(dominant, { autoAlpha: 1, duration: 0.01 }, 1.25)
      tl.to(
        dominantLines,
        { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'power3.out' },
        1.3,
      )
      tl.to(
        dominantFades,
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power2.out' },
        1.55,
      )

      // 4. Hold state for comfortable reading of Chapter 02 before unpinning cleanly into About SSK
      tl.to({}, { duration: 0.9 }, 2.4)

      let inView = true
      const syncPlayback = () => {
        if (!inView) {
          safePause(v1)
          safePause(bgV1)
          return
        }
        safePlay(v1)
        safePlay(bgV1)
      }

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: () => syncPlayback(),
      })

      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting
          syncPlayback()
        },
        { threshold: 0.02 },
      )
      io.observe(el)

      return () => {
        io.disconnect()
      }
    })

    // -------------------------------------------------------------------------
    // Mobile / Tablet (< 1024px, motion allowed): Video 01 Autoplay/Pause
    // -------------------------------------------------------------------------
    mm.add(`${MOTION} and (max-width: 1023.98px)`, () => {
      safePause(v1)
      safePlay(bgV1)

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!mobV1) return
          if (entry.isIntersecting) {
            safePlay(mobV1)
          } else {
            safePause(mobV1)
          }
        },
        { threshold: 0.15 },
      )
      if (mobV1) io.observe(mobV1)

      return () => io.disconnect()
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="hero grain" aria-labelledby="hero-title">
      {/* =====================================================================
          DESKTOP PINNED STAGE (Single Video Dynamic Story Choreography)
          ===================================================================== */}
      <div className="hero__stage js-hero-stage">
        {/* Continuous Full-Screen Ambient Blurred Video 01 Background */}
        <div className="hero__ambient" aria-hidden="true">
          <video
            ref={bgV1Ref}
            className="hero__ambient-video js-hero-bg-v1"
            src={VIDEO_01}
            poster="/aboutssk/founder.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => safePlay(bgV1Ref.current)}
            onCanPlay={() => safePlay(bgV1Ref.current)}
          />
          <div className="hero__ambient-scrim" />
        </div>

        {/* Foreground Single Video Canvas */}
        <div className="hero__canvas js-hero-canvas">
          {/* SINGLE FOREGROUND VIDEO (Starts on right, moves to left on scroll) */}
          <div className="hero__frame hero__frame--v1 js-hero-frame-v1">
            <div className="hero__frame-inner">
              <div className="hero__screen">
                <video
                  ref={v1Ref}
                  className="hero__video"
                  src={VIDEO_01}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() => safePlay(v1Ref.current)}
                  onCanPlay={() => safePlay(v1Ref.current)}
                />
                <div className="hero__screen-glare" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Initial Hero Editorial Typography (Chapter 01 Main Hero Title — Left Side) */}
        <div className="hero__intro js-hero-intro">
          <div className="hero__intro-content">
            <p className="eyebrow hero__eyebrow js-hero-intro-fade">
              SSK ENTERPRISES
            </p>
            <h1 id="hero-title" className="hero__title">
              <Lines
                lines={['Quality Materials.', 'Better Spaces.']}
                accent={1}
              />
            </h1>
            <p className="hero__lede js-hero-intro-fade">
              We provide quality materials for interior and furniture work, helping people create beautiful and lasting spaces.
            </p>
          </div>
        </div>

        {/* Chapter 02 Editorial Typography (Revealed on Right Side as Video Moves to Left) */}
        <div className="hero__dominant js-hero-dominant">
          <p className="eyebrow hero__eyebrow js-hero-dominant-fade">
            MATERIALS &amp; PRECISION
          </p>
          <h2 className="hero__dominant-title">
            <Lines
              lines={['Built For Quality.', 'Made To Last.']}
              accent={1}
            />
          </h2>
          <p className="hero__dominant-desc js-hero-dominant-fade">
            From edge banding tapes and strong adhesives to calibrated plywood and laminates, we supply the reliable products makers trust every day.
          </p>
        </div>

        {/* Minimal Scroll Cue */}
        <a
          href="#about"
          className="hero__scroll js-hero-scroll"
          aria-label="Scroll to discover our story"
        >
          <span>Scroll</span>
          <span className="hero__scroll-track">
            <span className="hero__scroll-thumb" />
          </span>
        </a>
      </div>

      {/* =====================================================================
          MOBILE & TABLET PRESENTATION (< 1024px)
          - Single Video 01 opening experience
          - Content: Chapter 01 ("Quality Materials. Better Spaces.")
          - Clean scroll cue directly to #about
          ===================================================================== */}
      <div className="hero__mobile">
        <section className="hero__mscene" aria-label="SSK Enterprises">
          <div className="hero__mscene-media" aria-hidden="true">
            <video
              ref={mobV1Ref}
              className="hero__mscene-video"
              src={VIDEO_01}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="hero__mscene-scrim" />
          </div>

          <div className="hero__mscene-content">
            <div className="hero__mscene-header">
              <p className="eyebrow hero__eyebrow">SSK ENTERPRISES</p>
              <h1 id="hero-title-mobile" className="hero__mtitle">
                Quality Materials.<br />Better Spaces.
              </h1>
              <p className="hero__mlede">
                We provide quality materials for interior and furniture work, helping people create beautiful and lasting spaces.
              </p>
            </div>

            <div className="hero__mscene-footer">
              <a
                href="#about"
                className="hero__mscroll-cue"
                aria-label="Scroll to discover our story"
              >
                <span className="hero__mscroll-label">Scroll to Explore</span>
                <span className="hero__mscroll-track">
                  <span className="hero__mscroll-pip" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
