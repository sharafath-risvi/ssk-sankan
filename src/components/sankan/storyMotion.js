import { gsap } from '../../utils/gsap'

/* ==========================================================================
   About Sankan Motion:
   1. Initial Full-Screen Cinematic Intro ("ABOUT SANKAN" + Architectural Image).
   2. Pinned Scroll Transformation: Image smoothly shrinks and moves towards the
      LEFT, crossfading into Video 01.
   3. Video 01 stays FIXED on the LEFT side across all 3 storytelling stages:
      - Stage 01: The relationship (SSK & Sankan)
      - Stage 02: What Sankan Does
      - Stage 03: What Makes Sankan Different
   4. The 3 stages appear and transition on the RIGHT side.
   5. Cleanly unpins into #services.
   ========================================================================== */

const HOLD_INTRO = 0.8
const MORPH_DURATION = 1.6
const STAGE_1_START = 2.4
const SWAP_1 = 4.8
const SWAP_2 = 7.4
const TOTAL = 10.6

export const STORY_PIN = '+=380%'

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

/* Desktop: pinned, scrubbed story. Call inside a PINNED gsap.matchMedia callback. */
export function setupStoryPinned(q, scene) {
  if (!scene) return { aboutY: () => 0, cleanup: () => {} }

  const stage = q('.js-about-stage')[0]
  const slot = q('.js-about-slot-left')[0]
  const introBg = q('.js-about-intro-bg')[0]
  const videoWrap = q('.js-about-video-wrap')[0]
  const videoEl = q('.js-about-video')[0]
  const introOverlay = q('.js-about-intro-overlay')[0]
  const label = q('.sn-about__label')[0]
  const meter = q('.sn-about__meter')[0]
  const dots = q('.js-story-dot')
  const stages = q('.sn-stage')

  const parts = (el) => ({
    lines: el.querySelectorAll('.line__inner'),
    rest: el.querySelectorAll('.js-stage-rest'),
  })

  // Start Video 01 immediately on desktop
  if (videoEl) {
    videoEl.currentTime = 0
    safePlay(videoEl)
  }

  // Initial visual states for Pinned Scene
  if (stage) gsap.set(stage, { transformPerspective: 1800, transformOrigin: '50% 50%' })
  if (videoWrap) gsap.set(videoWrap, { opacity: 0 })
  if (introBg) gsap.set(introBg, { opacity: 1 })
  if (introOverlay) gsap.set(introOverlay, { autoAlpha: 1, y: 0 })
  if (label) gsap.set(label, { autoAlpha: 0 })
  if (meter) gsap.set(meter, { autoAlpha: 0 })

  // All 3 stages start hidden; Stage 01 reveals after the stage glides left
  stages.forEach((stg) => {
    gsap.set(stg, { autoAlpha: 0 })
    const p = parts(stg)
    gsap.set(p.lines, { yPercent: 118 })
    gsap.set(p.rest, { autoAlpha: 0, y: 24 })
  })

  dots.forEach((d) => gsap.set(d, { scaleX: 1, opacity: 0.28 }))

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: STORY_PIN,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: () => {
        if (videoEl && videoEl.paused) safePlay(videoEl)
      },
    },
  })

  /* ---- 1. Hold on Full-Screen Intro, then Move Stage to Left & Crossfade to Video 01 ---- */
  tl.to({}, { duration: HOLD_INTRO }, 0)

  // Intro text overlay rises and fades out
  tl.to(
    introOverlay,
    { autoAlpha: 0, y: -50, duration: 0.85, ease: 'power2.in' },
    HOLD_INTRO,
  )

  // Stage shrinks and moves into the LEFT slot
  tl.fromTo(
    stage,
    {
      left: 0,
      top: 0,
      width: () => scene.clientWidth,
      height: () => scene.clientHeight,
      borderRadius: '0px',
    },
    {
      left: () => (slot ? slot.offsetLeft : 0),
      top: () => (slot ? slot.offsetTop : 0),
      width: () => (slot ? slot.offsetWidth : scene.clientWidth * 0.44),
      height: () => (slot ? slot.offsetHeight : scene.clientHeight * 0.88),
      borderRadius: '16px',
      duration: MORPH_DURATION,
      ease: 'power3.inOut',
    },
    HOLD_INTRO,
  )

  // Architectural background image crossfades into Video 01
  tl.to(introBg, { opacity: 0, duration: 1.1, ease: 'power2.inOut' }, HOLD_INTRO + 0.35)
  tl.fromTo(videoWrap, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.inOut' }, HOLD_INTRO + 0.35)

  // Subtle 3D perspective depth
  tl.fromTo(stage, { rotateY: 0 }, { rotateY: 4, duration: 0.9, ease: 'power2.out' }, HOLD_INTRO)
  tl.to(stage, { rotateY: 0, duration: 0.7, ease: 'power2.inOut' }, HOLD_INTRO + 0.9)

  /* ---- 2. Reveal Stage 01 on the Right Side (Video 01 is now fixed on the Left) ---- */
  // Meter and Label on the right
  tl.fromTo([label, meter], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 2.1)
  tl.to(dots[0], { scaleX: 2.4, opacity: 1, duration: 0.6 }, 2.2)

  // Stage 01 writes in on the right
  if (stages[0]) {
    const p0 = parts(stages[0])
    tl.fromTo(stages[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, STAGE_1_START)
    tl.fromTo(
      p0.lines,
      { yPercent: 118 },
      { yPercent: 0, duration: 0.95, stagger: 0.1, ease: 'power3.out' },
      STAGE_1_START,
    )
    tl.fromTo(
      p0.rest,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
      STAGE_1_START + 0.2,
    )
  }

  /* ---- 3. Transitions between Stages 01, 02, and 03 on the Right Side ----
        (Video 01 remains completely fixed on the left and playing) */
  const SWAP_TIMES = [SWAP_1, SWAP_2]
  SWAP_TIMES.forEach((at, n) => {
    const from = n
    const to = n + 1
    if (!stages[from] || !stages[to]) return
    const out = parts(stages[from])
    const incoming = parts(stages[to])
    const textOut = at
    const textIn = at + 0.65

    // Outgoing stage lines rise up and out
    tl.to(out.lines, { yPercent: -118, duration: 0.65, stagger: 0.08, ease: 'power2.in' }, textOut)
    tl.to(out.rest, { autoAlpha: 0, y: -20, duration: 0.5, stagger: 0.05, ease: 'power1.in' }, textOut)
    tl.to(stages[from], { autoAlpha: 0, duration: 0.01 }, textOut + 0.65)

    // Incoming stage lines rise up and in
    tl.fromTo(stages[to], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, textIn - 0.05)
    tl.fromTo(
      incoming.lines,
      { yPercent: 118 },
      { yPercent: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' },
      textIn,
    )
    tl.fromTo(
      incoming.rest,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power2.out' },
      textIn + 0.18,
    )

    // Progress dot
    if (dots[from]) tl.to(dots[from], { scaleX: 1, opacity: 0.28, duration: 0.4 }, textOut + 0.2)
    if (dots[to]) tl.to(dots[to], { scaleX: 2.4, opacity: 1, duration: 0.4 }, textIn)
  })

  // Hold on Stage 03 before unpinning cleanly into #services
  tl.to({}, { duration: 0.001 }, TOTAL)

  const st = tl.scrollTrigger
  return {
    aboutY: () => (st ? st.start : 0),
    cleanup: () => {
      safePause(videoEl)
    },
  }
}

/* Mobile storytelling: pinned 3-stage vertical sequence (< 1024px)
   - Stage 1: Full-Screen Architectural Intro Image & "ABOUT SANKAN"
   - Stage 2: Intro smoothly animates out, Video 01 enters from bottom and settles at top
   - Stage 3: Video 01 remains pinned and playing while Chapters 01, 02, and 03 appear
              individually in sequence below it
   - Unpins cleanly into #services */
export function setupStoryStacked(q) {
  const scene = q('.js-mstory-scene')[0]
  if (!scene) return

  const intro = q('.js-mstory-intro')[0]
  const introContent = q('.js-mstory-intro-content')[0]
  const showcase = q('.js-mstory-showcase')[0]
  const mobVideo = q('.js-mstory-video')[0]
  const dots = q('.js-mstory-dot')
  const stages = [
    q('.js-mstage-0')[0],
    q('.js-mstage-1')[0],
    q('.js-mstage-2')[0],
  ]

  if (mobVideo) {
    mobVideo.currentTime = 0
    safePlay(mobVideo)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay(mobVideo)
        } else {
          safePause(mobVideo)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(mobVideo)
  }

  // Initial states
  if (intro) gsap.set(intro, { autoAlpha: 1 })
  if (introContent) gsap.set(introContent, { autoAlpha: 1, y: 0 })
  if (showcase) gsap.set(showcase, { autoAlpha: 0, yPercent: 42 })

  // Stage 01 visible initially inside showcase; Stages 02 and 03 hidden
  if (stages[0]) gsap.set(stages[0], { autoAlpha: 1, y: 0 })
  if (stages[1]) gsap.set(stages[1], { autoAlpha: 0, y: 22 })
  if (stages[2]) gsap.set(stages[2], { autoAlpha: 0, y: 22 })

  if (dots.length) {
    gsap.set(dots[0], { opacity: 1, scaleX: 1.45 })
    if (dots[1]) gsap.set(dots[1], { opacity: 0.25, scaleX: 1 })
    if (dots[2]) gsap.set(dots[2], { opacity: 0.25, scaleX: 1 })
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: () => {
        if (mobVideo && mobVideo.paused) safePlay(mobVideo)
      },
    },
  })

  // 1. Stage 1 -> Stage 2: Intro slides/fades out, Showcase (Video 01 + Chapter 01) enters smoothly
  // 0.0 to 1.6: Intro content and background smoothly fade & glide out
  tl.to({}, { duration: 0.4 }, 0)
  if (introContent) {
    tl.to(introContent, { autoAlpha: 0, y: -36, duration: 1.1, ease: 'power2.in' }, 0.4)
  }
  if (intro) {
    tl.to(intro, { autoAlpha: 0, duration: 1.35, ease: 'power2.inOut' }, 0.55)
  }

  // Video 01 + showcase rises smoothly from bottom into place
  if (showcase) {
    tl.fromTo(
      showcase,
      { autoAlpha: 0, yPercent: 42 },
      { autoAlpha: 1, yPercent: 0, duration: 1.5, ease: 'power3.out' },
      0.75,
    )
  }

  // Hold on Chapter 01 (Relationship)
  tl.to({}, { duration: 1.8 }, 2.3)

  // 2. Transition Chapter 01 -> Chapter 02 (What We Do)
  if (stages[0]) {
    tl.to(stages[0], { autoAlpha: 0, y: -20, duration: 0.65, ease: 'power2.in' }, 4.1)
  }
  if (stages[1]) {
    tl.fromTo(
      stages[1],
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      4.6,
    )
  }
  if (dots[0] && dots[1]) {
    tl.to(dots[0], { opacity: 0.25, scaleX: 1, duration: 0.35 }, 4.3)
    tl.to(dots[1], { opacity: 1, scaleX: 1.45, duration: 0.35 }, 4.6)
  }

  // Hold on Chapter 02
  tl.to({}, { duration: 1.8 }, 5.4)

  // 3. Transition Chapter 02 -> Chapter 03 (The Sankan Way)
  if (stages[1]) {
    tl.to(stages[1], { autoAlpha: 0, y: -20, duration: 0.65, ease: 'power2.in' }, 7.2)
  }
  if (stages[2]) {
    tl.fromTo(
      stages[2],
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      7.7,
    )
  }
  if (dots[1] && dots[2]) {
    tl.to(dots[1], { opacity: 0.25, scaleX: 1, duration: 0.35 }, 7.4)
    tl.to(dots[2], { opacity: 1, scaleX: 1.45, duration: 0.35 }, 7.7)
  }

  // Hold on Chapter 03 before unpinning cleanly into #services
  tl.to({}, { duration: 1.8 }, 8.5)
}
