import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, PINNED } from '../../../utils/gsap'
import { IMG } from '../../../assets/ssk/images'
import Lines from '../../shared/Lines'

const SCENES = [
  {
    key: 'edge-band-tape',
    kicker: 'Primary business',
    lines: ['Edge Band', 'Tape'],
    text: 'Engineered PVC, ABS, and acrylic edge band tape providing seamless durability, impact resistance, and flawless edge protection.',
    link: 'Explore Edge Band Tape',
    path: '/services/edge-band-tape',
    bg: IMG.serviceEdgeBand,
    inset: IMG.serviceEdgeBand,
  },
  {
    key: 'adhesive',
    kicker: 'Industrial bonding',
    lines: ['Industrial', 'Adhesives'],
    text: 'High-performance hot melt and structural bonding formulations calibrated for throughfeed edgebanders and heavy-duty panel lamination.',
    link: 'Explore Adhesives',
    path: '/services/adhesive',
    bg: IMG.serviceAdhesive,
    inset: IMG.serviceAdhesive,
  },
  {
    key: 'plywood',
    kicker: 'Structural core',
    lines: ['Calibrated', 'Plywood'],
    text: 'Precision calibrated commercial, marine, and hardwood plywood engineered for dimensional accuracy, high density, and zero core voids.',
    link: 'Explore Plywood',
    path: '/services/plywood',
    bg: IMG.servicePlywood,
    inset: IMG.servicePlywood,
  },
  {
    key: 'mica',
    kicker: 'Decorative surfaces',
    lines: ['Mica &', 'Laminates'],
    text: 'High-pressure decorative laminates in authentic woodgrains, stone textures, metallic accents, and ultra-matte solid finishes.',
    link: 'Explore Mica',
    path: '/services/mica',
    bg: IMG.laminates,
    inset: IMG.laminates,
  },
  {
    key: 'hardware',
    kicker: 'Architectural fittings',
    lines: ['Precision', 'Hardware'],
    text: 'Heavy-duty soft-close hinges, synchronized drawer systems, and architectural joinery fittings tested for smooth operation.',
    link: 'Explore Hardware',
    path: '/services/hardware',
    bg: IMG.serviceHardware,
    inset: IMG.serviceHardware,
  },
]

export default function Expertise() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(PINNED, () => {
      const stage = q('.js-exp-stage')[0]
      const scenes = q('.scene')
      const n = scenes.length

      const parts = scenes.map((s) => ({
        bg: s.querySelector('.scene__bg'),
        img: s.querySelector('.scene__bg img'),
        content: s.querySelector('.scene__content'),
        lines: s.querySelectorAll('.scene__content .line__inner'),
        fades: s.querySelectorAll('.js-fade'),
        inset: s.querySelector('.scene__inset'),
        insetImg: s.querySelector('.scene__inset img'),
      }))

      // Initial state: only scene 1 is visible; later scenes wait behind a clip mask.
      parts.forEach((p, i) => {
        if (i === 0) return
        gsap.set(p.bg, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(p.img, { scale: 1.4 })
        gsap.set(p.content, { autoAlpha: 0 })
        gsap.set(p.lines, { yPercent: 120 })
        gsap.set(p.fades, { y: 30, opacity: 0 })
        if (p.inset) {
          gsap.set(p.inset, { clipPath: 'inset(100% 0% 0% 0%)' })
          gsap.set(p.insetImg, { scale: 1.35 })
        }
      })
      gsap.set(q('.js-exp-bar'), { scaleY: 1 / n })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      for (let i = 0; i < n - 1; i += 1) {
        const a = parts[i]
        const b = parts[i + 1]
        const t = i * 2 + 0.5 // each step = 0.5 hold + 1 transition + 0.5 hold

        // outgoing scene
        tl.to(a.lines, { yPercent: -120, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, t)
        tl.to(a.fades, { y: -24, opacity: 0, duration: 0.35, ease: 'power2.in' }, t)
        tl.to(a.content, { autoAlpha: 0, duration: 0.01 }, t + 0.5)
        tl.to(a.img, { scale: 1.14, duration: 1.2 }, t)
        if (a.inset) {
          tl.to(a.inset, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'power2.in' }, t)
        }

        // incoming scene: image wipes up over the previous one
        tl.to(b.bg, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, t)
        tl.to(b.img, { scale: 1, duration: 1.3, ease: 'power2.out' }, t)
        tl.to(b.content, { autoAlpha: 1, duration: 0.01 }, t + 0.4)
        tl.to(b.lines, { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' }, t + 0.4)
        tl.to(b.fades, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out' }, t + 0.65)
        if (b.inset) {
          tl.to(b.inset, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' }, t + 0.35)
          tl.to(b.insetImg, { scale: 1, duration: 1, ease: 'power2.out' }, t + 0.35)
        }

        // HUD: counter + progress follow the story
        tl.to(q('.js-exp-count'), { yPercent: -(100 / n) * (i + 1), duration: 0.6, ease: 'power2.inOut' }, t + 0.2)
        tl.to(q('.js-exp-bar'), { scaleY: (i + 2) / n, duration: 1 }, t)
      }
      tl.to({}, { duration: 0 }, (n - 1) * 2) // pad the timeline to its full length

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight * (n - 1) * 1.5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="expertise" className="exp grain" aria-labelledby="exp-heading">
      <h2 id="exp-heading" className="sr-only">
        Our Services
      </h2>

      <div className="exp__stage js-exp-stage">
        <div className="exp__hud">
          <div className="exp__label">
            <p className="eyebrow">Our Services</p>
            <p className="exp__label-sub">What SSK does, from precision edge band tape to structural materials and fittings.</p>
          </div>
          <div className="exp__meter" aria-hidden="true">
            <div className="exp__count">
              <span className="exp__count-track js-exp-count">
                {SCENES.map((s, i) => (
                  <span key={s.key}>0{i + 1}</span>
                ))}
              </span>
            </div>
            <span className="exp__of">/ 0{SCENES.length}</span>
            <span className="exp__bar">
              <span className="exp__bar-fill js-exp-bar" />
            </span>
          </div>
        </div>

        {SCENES.map((s, i) => (
          <article key={s.key} className={`scene scene--${i + 1}`}>
            <div className="scene__bg">
              <img
                src={s.bg.src}
                width={s.bg.width}
                height={s.bg.height}
                alt={s.bg.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="scene__shade" aria-hidden="true" />
            </div>

            {s.inset && (
              <figure className={`scene__inset${s.insetWide ? ' scene__inset--wide' : ''}`}>
                <img
                  src={s.inset.src}
                  width={s.inset.width}
                  height={s.inset.height}
                  alt={s.inset.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}

            <div className="scene__content">
              <p className="scene__index js-fade">
                0{i + 1} — {s.kicker}
              </p>
              <h3 className="scene__title">
                <Lines lines={s.lines} />
              </h3>
              <p className="scene__text js-fade">{s.text}</p>
              <Link to={s.path} className="textlink scene__link js-fade">
                {s.link}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
