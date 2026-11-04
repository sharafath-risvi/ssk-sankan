import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, PINNED } from '../../../utils/gsap'
import { setupReveals } from '../../../utils/reveals'
import { IMG } from '../../../assets/ssk/images'
import Lines from '../../shared/Lines'

/* Tablet / mobile: natural scroll, simplified depth, same story. */
const STACKED_MOTION = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)'

/* ---------------------------------------------------------------------------
   Three images are used in this section:
   - MAIN (IMG.companyOne) is the single large company image shown during the
     initial scroll animation, centered, and reduced into the middle slot.
   - TOP (IMG.workingOne) and BOTTOM (IMG.workingTwo) are revealed once the
     main company image becomes smaller in the center.
   ------------------------------------------------------------------------ */
const MAIN = IMG.companyOne
const TOP = IMG.workingOne
const BOTTOM = IMG.workingTwo

/* Desktop timeline layout, in timeline units (scrubbed directly by scroll ticker):
   Phase 01  0.00 → 0.20  Tagline, heading, and description are all visible together from the start
   Phase 02  0.20 → 0.46  Intro text disappears cleanly before the rising image reaches it
   Phase 03  0.20 → 1.75  Large company image rises from the bottom of the screen to the center
   Phase 04  1.75 → 2.60  Large company image holds at the center with full building visibility
   Phase 05  2.60 → 7.20  Large company image smoothly reduces into the center slot
             3.29 → 6.97  Top and bottom images reveal in 3D perspective
             6.65 → 8.80  Left heading and right copy settle alongside the final 3-image stack */
const GATE = 2.6
const SHRINK_DUR = 4.6
const DURATION = 9.4
const WIN_Y = 0.28 // mirrors --win-y: 28% in about.css
const PIN_VH = 3.4
const SCRUB_LAG = 0.45

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    /* ===================================================================
       Desktop: pinned, scroll-driven sequence
       =================================================================== */
    mm.add(PINNED, () => {
      const stage = q('.js-a3-stage')[0]
      const slot = q('.js-a3-slot')[0]
      const intro = q('.js-a3-intro')[0]
      const world = q('.js-a3-world')[0]
      const main = q('.a3__card--main')[0]
      const mainClip = q('.a3__card--main .a3__clip')[0]
      const reel = q('.js-a3-reel')[0]
      const top = q('.a3__card--top')[0]
      const bottom = q('.a3__card--bottom')[0]
      const introLines = q('.js-a3-intro .line__inner')
      const introFades = q('.js-a3-intro-fade')
      const headLines = q('.js-a3-head .line__inner')
      const headFades = q('.js-a3-head-fade')
      const bodyItems = q('.js-a3-body > *')

      // The intro is duplicated by the final heading; keep assistive tech on one.
      intro.setAttribute('aria-hidden', 'true')

      /* ---- Phase 01: Tagline, main heading, and description are all visible
              together immediately upon entering the About SSK section. ----- */
      gsap.set(intro, { autoAlpha: 1, y: 0 })
      gsap.set(introLines, { yPercent: 0, y: 0 })
      gsap.set(introFades, { opacity: 1, y: 0 })

      // Large company image starts below the viewport until Phase 02
      gsap.set(main, { yPercent: 100, rotateX: 9 })
      gsap.set(top, { yPercent: 60, z: -650, rotateX: 70, scale: 0.7, autoAlpha: 0 })
      gsap.set(bottom, { yPercent: -60, z: -520, rotateX: -62, scale: 0.75, autoAlpha: 0 })

      gsap.set(headLines, { yPercent: 120 })
      gsap.set([headFades, bodyItems], { y: 32, opacity: 0 })

      /* ---- Main window geometry ---------------------------------------
         The main card is stage-sized; a clip-path window frames the entire
         company image (1165 / 1350 aspect ratio, centered and fully visible
         without any cropping or distortion) and smoothly shrinks to exactly
         the centre slot, with the image scaling and positioning to fit. */
      const dims = {
        W: 1,
        H: 1,
        l: 0,
        r: 0,
        initTop: 0,
        initBottom: 0,
        initLeft: 0,
        initRight: 0,
        initW: 1,
        initH: 1,
      }
      const win = { k: 0 }
      const lerp = gsap.utils.interpolate
      const applyWin = () => {
        const { W, H, l, r, initTop, initBottom, initLeft, initRight, initW, initH } = dims
        if (!initW || !initH) return
        const k = win.k
        const t = lerp(initTop, H * WIN_Y, k)
        const b = lerp(initBottom, H * WIN_Y, k)
        const left = lerp(initLeft, l, k)
        const right = lerp(initRight, r, k)
        mainClip.style.clipPath = `inset(${t}px ${right}px ${b}px ${left}px round ${lerp(12, 6, k)}px)`

        const currentWinW = Math.max(1, W - left - right)
        const currentWinH = Math.max(1, H - t - b)
        const scale = Math.max(currentWinW / initW, currentWinH / initH)
        const curCenterX = left + currentWinW / 2
        const curCenterY = t + currentWinH / 2
        const dX = curCenterX - W / 2
        const dY = curCenterY - H / 2

        gsap.set(reel, {
          x: dX,
          y: dY,
          scale,
          transformOrigin: '50% 50%',
        })
      }
      const measure = () => {
        const s = stage.getBoundingClientRect()
        const c = slot.getBoundingClientRect()
        dims.W = s.width
        dims.H = s.height
        dims.l = c.left - s.left
        dims.r = s.right - c.right

        // Calculate initial centered window matching the image's exact 1165/1350 aspect ratio
        const imgAspect = 1165 / 1350
        const maxH = s.height * 0.82
        const maxW = s.width * 0.70
        let initH = maxH
        let initW = initH * imgAspect
        if (initW > maxW) {
          initW = maxW
          initH = initW / imgAspect
        }

        dims.initW = initW
        dims.initH = initH
        dims.initTop = (s.height - initH) / 2
        dims.initBottom = dims.initTop
        dims.initLeft = (s.width - initW) / 2
        dims.initRight = dims.initLeft

        reel.style.width = `${initW}px`
        reel.style.height = `${initH}px`
        reel.style.left = `${(s.width - initW) / 2}px`
        reel.style.top = `${(s.height - initH) / 2}px`

        applyWin()
      }
      measure()
      ScrollTrigger.addEventListener('refresh', measure)

      /* ---- Master scroll timeline (paused: true, driven by scrub ticker) ---- */
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

      // PHASE 02 & 03: Intro text group disappears cleanly as the large image begins rising from the bottom
      tl.fromTo(
        intro,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -24, duration: 0.26, ease: 'power2.in' },
        0.20,
      )

      // Large company image enters from the bottom of the section and moves towards the centre
      tl.fromTo(
        main,
        { yPercent: 100, rotateX: 9 },
        { yPercent: 0, rotateX: 0, duration: 1.55, ease: 'power3.out' },
        0.20,
      )

      // PHASE 04 & 05: At GATE (2.6), smoothly reduce the large company image into the centre slot
      tl.fromTo(
        win,
        { k: 0 },
        { k: 1, duration: SHRINK_DUR, ease: 'power1.inOut', onUpdate: applyWin },
        GATE,
      )
      tl.fromTo(
        '.js-a3-shadow',
        { opacity: 0 },
        { opacity: 1, duration: 2.2, ease: 'power1.out' },
        GATE + SHRINK_DUR * 0.5,
      )
      tl.fromTo(
        world,
        { rotateX: 0 },
        { rotateX: 4, duration: SHRINK_DUR, ease: 'power1.inOut' },
        GATE,
      )

      // Surrounding panels (top = Working One, bottom = Working Two) reveal in 3D perspective
      tl.fromTo(
        top,
        { yPercent: 60, z: -650, rotateX: 70, scale: 0.7, autoAlpha: 0 },
        {
          yPercent: 0,
          z: -240,
          rotateX: 38,
          scale: 0.9,
          autoAlpha: 1,
          duration: SHRINK_DUR * 0.8,
          ease: 'power1.out',
        },
        GATE + SHRINK_DUR * 0.15,
      )
      tl.fromTo(
        bottom,
        { yPercent: -60, z: -520, rotateX: -62, scale: 0.75, autoAlpha: 0 },
        {
          yPercent: 0,
          z: -110,
          rotateX: -24,
          scale: 0.95,
          autoAlpha: 1,
          duration: SHRINK_DUR * 0.8,
          ease: 'power1.out',
        },
        GATE + SHRINK_DUR * 0.32,
      )

      // Left heading and right copy settle alongside the final 3-image stack
      const copyAt = GATE + SHRINK_DUR * 0.88
      tl.to(headLines, { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'power2.out' }, copyAt)
      tl.to(headFades, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, copyAt - 0.1)
      tl.to(
        bodyItems,
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power2.out' },
        copyAt + 0.3,
      )
      tl.to({}, { duration: 0 }, DURATION)

      tl.progress(0)
      applyWin()

      /* ---- Scroll scrub ticker ----------------------------------------- */
      let goal = 0
      const proxy = { p: 0 }

      const onTick = (time, deltaTime) => {
        const d = goal - proxy.p
        if (Math.abs(d) > 0.00005) {
          const dt = deltaTime || 16.666
          const k = 1 - Math.exp(-(dt / 1000) / SCRUB_LAG)
          proxy.p += d * k
          tl.progress(proxy.p)
        }
      }
      gsap.ticker.add(onTick)

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * PIN_VH)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          goal = self.progress
          proxy.p = self.progress
          tl.progress(self.progress)
          applyWin()
        },
        onUpdate: (self) => {
          goal = self.progress
        },
      })

      return () => {
        gsap.ticker.remove(onTick)
        ScrollTrigger.removeEventListener('refresh', measure)
        intro.removeAttribute('aria-hidden')
      }
    })

    /* ===================================================================
       Tablet / mobile: natural scroll. Intro text is visible together
       immediately; single company image and surrounding cards reveal on scroll.
       =================================================================== */
    mm.add(STACKED_MOTION, () => {
      setupReveals(el)

      const main = q('.a3__card--main')[0]

      gsap.fromTo(
        main,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: main, start: 'top 86%', once: true },
        },
      )

      ;['top', 'bottom'].forEach((k) => {
        gsap.fromTo(
          q(`.a3__card--${k}`)[0],
          { y: k === 'top' ? 40 : -40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: main, start: 'top 64%', once: true },
          },
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="about" className="a3 on-light" aria-labelledby="about-title">
      <div className="a3__stage js-a3-stage">
        {/* Phase 01 — clean white intro: tagline, heading, and description visible together */}
        <div className="a3__intro js-a3-intro">
          <p className="eyebrow js-a3-intro-fade">About SSK</p>
          <p className="a3__intro-title">
            <Lines lines={['A manufacturer', 'built around', 'the edge.']} accent={2} />
          </p>
          <p className="a3__intro-text js-a3-intro-fade">
            Edge banding, panel processing and the materials that go with it.
          </p>
        </div>

        {/* Left column (desktop final composition) */}
        <header className="a3__head js-a3-head">
          <p className="eyebrow js-a3-head-fade">About SSK</p>
          <h2 id="about-title" className="a3__title">
            <Lines lines={['Built', 'around', 'the edge.']} accent={2} />
          </h2>
        </header>

        {/* Centre column placeholder: reserves the stack's width in the grid and is
            measured by GSAP, so the 3D stack can never drift into the text. */}
        <div className="a3__slot js-a3-slot" aria-hidden="true" />

        {/* Right column */}
        <div className="a3__body js-a3-body">
          <p className="a3__lede" data-reveal="fade">
            SSK is a manufacturing business with edge banding at its core — supported by panel
            processing and the materials that go with it. We work to the millimetre because the
            edge is where quality shows.
          </p>

          <dl className="a3__facts" data-reveal="stagger">
            <div className="a3__fact">
              <dt>Regions</dt>
              <dd>Tamil Nadu, Kerala, Karnataka</dd>
            </div>
          </dl>

          <div className="a3__cta" data-reveal="fade" data-y="24">
            <Link to="/about" className="textlink">
              Discover our story
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* The 3D stack: three panels — top, main (single company image), bottom */}
        <div className="a3__scene">
          <div className="a3__world js-a3-world">
            <figure className="a3__card a3__card--top">
              <div className="a3__clip">
                <img src={TOP.src} width={TOP.width} height={TOP.height} alt={TOP.alt} loading="lazy" decoding="async" />
                <span className="a3__shade" aria-hidden="true" />
              </div>
            </figure>

            <figure className="a3__card a3__card--main">
              <span className="a3__shadow js-a3-shadow" aria-hidden="true" />
              <div className="a3__clip">
                <div className="a3__reel js-a3-reel">
                  <div className="a3__frame js-a3-frame">
                    <img
                      className="js-a3-main-img"
                      src={MAIN.src}
                      width={MAIN.width}
                      height={MAIN.height}
                      alt={MAIN.alt}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </figure>

            <figure className="a3__card a3__card--bottom">
              <div className="a3__clip">
                <img src={BOTTOM.src} width={BOTTOM.width} height={BOTTOM.height} alt={BOTTOM.alt} loading="lazy" decoding="async" />
                <span className="a3__shade" aria-hidden="true" />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
