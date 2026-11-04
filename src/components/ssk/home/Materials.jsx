import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, MOTION, PINNED } from '../../../utils/gsap'
import { setupReveals } from '../../../utils/reveals'
import { IMG } from '../../../assets/ssk/images'
import Lines from '../../shared/Lines'

// Product names come from the client's notes (plywood, hardware, mica).
// Grades, sizes and ranges are unverified and flagged for confirmation.
const MATERIALS = [
  {
    key: 'plywood',
    label: 'Plywood',
    lines: ['Plywood'],
    kicker: 'Panels',
    text: 'Layered veneer board — a stable base for furniture and interior work.',
    meta: 'Grades & thicknesses — to confirm',
    img: IMG.plywood,
    focus: '30% 40%',
    caption: 'Edge detail',
  },
  {
    key: 'mica',
    label: 'Mica',
    lines: ['Mica &', 'laminates'],
    kicker: 'Surfaces',
    text: 'Decorative surface sheets in wood-grain, stone and solid finishes.',
    meta: 'Range & finishes — to confirm',
    img: IMG.laminates,
    focus: '70% 30%',
    caption: 'Surface range',
  },
  {
    key: 'hardware',
    label: 'Hardware',
    lines: ['Hardware'],
    kicker: 'Fittings',
    text: 'The fittings that complete a finished piece, supplied alongside the boards.',
    meta: 'Product range — to confirm',
    img: IMG.hardware,
    focus: '20% 25%',
    caption: 'Fittings',
  },
]

export default function Materials() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(`${MOTION} and (max-width: 1023.98px)`, () => {
      setupReveals(el)
    })

    mm.add(PINNED, () => {
      const stage = q('.js-mat-stage')[0]
      const items = q('.material')
      const n = items.length
      const fills = q('.js-mat-fill')
      const labels = q('.mat__rail li')

      const parts = items.map((m) => ({
        frame: m.querySelector('.material__frame'),
        img: m.querySelector('.material__frame img'),
        detail: m.querySelector('.material__detail'),
        detailImg: m.querySelector('.material__detail img'),
        caption: m.querySelector('.material__caption'),
        text: m.querySelector('.material__text'),
        lines: m.querySelectorAll('.material__title .line__inner'),
        fades: m.querySelectorAll('.js-fade'),
      }))

      parts.forEach((p, i) => {
        if (i === 0) return
        gsap.set(p.frame, { clipPath: 'inset(0% 0% 0% 100%)' })
        gsap.set(p.img, { scale: 1.35, xPercent: 8 })
        gsap.set(p.detail, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(p.caption, { opacity: 0 })
        gsap.set(p.text, { autoAlpha: 0 })
        gsap.set(p.lines, { yPercent: 120 })
        gsap.set(p.fades, { y: 26, opacity: 0 })
      })
      gsap.set(fills, { scaleX: (i) => (i === 0 ? 1 : 0) })
      gsap.set(labels, { opacity: (i) => (i === 0 ? 1 : 0.4) })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      for (let i = 0; i < n - 1; i += 1) {
        const a = parts[i]
        const b = parts[i + 1]
        const t = i * 2 + 0.5

        // outgoing: copy lifts away, image shifts slightly as it is covered
        tl.to(a.lines, { yPercent: -120, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, t)
        tl.to(a.fades, { y: -22, opacity: 0, duration: 0.35, ease: 'power2.in' }, t)
        tl.to(a.text, { autoAlpha: 0, duration: 0.01 }, t + 0.5)
        tl.to(a.img, { xPercent: -6, scale: 1.08, duration: 1.1 }, t)
        tl.to(a.caption, { opacity: 0, duration: 0.3 }, t)
        tl.to(a.detail, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power2.in' }, t)

        // incoming: next image wipes in from the right over the pinned frame
        tl.to(b.frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, t)
        tl.to(b.img, { scale: 1, xPercent: 0, duration: 1.3, ease: 'power2.out' }, t)
        tl.to(b.detail, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.out' }, t + 0.55)
        tl.to(b.caption, { opacity: 1, duration: 0.4 }, t + 0.9)
        tl.to(b.text, { autoAlpha: 1, duration: 0.01 }, t + 0.4)
        tl.to(b.lines, { yPercent: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, t + 0.4)
        tl.to(b.fades, { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power2.out' }, t + 0.65)

        // rail
        tl.to(fills[i + 1], { scaleX: 1, duration: 1 }, t)
        tl.to(labels[i], { opacity: 0.4, duration: 0.4 }, t)
        tl.to(labels[i + 1], { opacity: 1, duration: 0.4 }, t + 0.3)
      }
      tl.to({}, { duration: 0 }, (n - 1) * 2)

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight * (n - 1) * 1.3}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="materials" className="mat on-light" aria-labelledby="mat-heading">
      <h2 id="mat-heading" className="sr-only">
        Products &amp; Materials
      </h2>

      <div className="mat__stage js-mat-stage">
        <div className="mat__hud">
          <p className="eyebrow">Products &amp; Materials</p>
          <ul className="mat__rail" aria-hidden="true">
            {MATERIALS.map((m) => (
              <li key={m.key}>
                {m.label}
                <span className="mat__rail-fill js-mat-fill" />
              </li>
            ))}
          </ul>
        </div>

        {MATERIALS.map((m, i) => (
          <article key={m.key} className="material" aria-label={m.label}>
            <div className="material__text">
              <p className="material__index js-fade" data-reveal="fade" data-y="16">
                0{i + 1} — {m.kicker}
              </p>
              <h3 className="material__title" data-reveal="lines">
                <Lines lines={m.lines} />
              </h3>
              <p className="material__desc js-fade" data-reveal="fade">
                {m.text}
              </p>
              <p className="material__meta js-fade" data-reveal="fade" data-y="16">
                {m.meta}
              </p>
              <div className="js-fade" data-reveal="fade" data-y="16">
                <Link to="/services" className="textlink">
                  View products
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="material__media" style={{ '--focus': m.focus }}>
              <div className="material__frame" data-reveal="clip" data-dir="right">
                <img
                  className="js-scale"
                  src={m.img.src}
                  width={m.img.width}
                  height={m.img.height}
                  alt={m.img.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="material__detail" aria-hidden="true">
                <img src={m.img.src} alt="" loading="lazy" decoding="async" />
              </div>
              <span className="material__caption">{m.caption} · illustrative</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
