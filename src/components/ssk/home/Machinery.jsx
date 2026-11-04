import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, MOTION, PINNED } from '../../../utils/gsap'
import { setupReveals } from '../../../utils/reveals'
import { IMG } from '../../../assets/ssk/images'
import Lines from '../../shared/Lines'

// Machine names come from the client's notes. Models / capacities are NOT verified,
// so every spec row says "To confirm" instead of inventing figures.
const MACHINES = [
  {
    key: 'beamsa',
    kicker: 'Machinery',
    lines: ['Beamsa', 'machinery'],
    text: 'Beamsa machinery is part of the SSK production floor. Exact machine type, model and capability to be confirmed with the client.',
    img: IMG.beamSaw,
    note: 'Illustrative image · Beamsa model not verified',
    specs: [['Model', 'To confirm'], ['Function', 'To confirm']],
    short: 'Beamsa machinery',
  },
  {
    key: 'throughfeed',
    kicker: 'Continuous processing',
    lines: ['Throughfeed', 'machine'],
    text: 'Panels are fed through on a conveyor and processed in one continuous pass — built for steady, repeatable output.',
    img: IMG.throughfeed,
    note: 'Illustrative image',
    specs: [['Model', 'To confirm'], ['Capacity', 'To confirm']],
    short: 'Throughfeed machine',
  },
  {
    key: 'panel-saw',
    kicker: 'Sizing',
    lines: ['Panel', 'saw'],
    text: 'Cuts large boards to size with a clean, accurate line — the starting point for every panel that follows.',
    img: IMG.panelSaw,
    note: 'Illustrative image',
    specs: [['Model', 'To confirm'], ['Cut size', 'To confirm']],
    short: 'Panel saw',
  },
  {
    key: 'press',
    kicker: 'Bonding',
    lines: ['Pressing &', 'cold press'],
    text: 'Pressure bonds layers and surfaces together without heat, keeping boards flat and stable.',
    img: IMG.coldPress,
    note: 'Illustrative image',
    specs: [['Model', 'To confirm'], ['Press size', 'To confirm']],
    short: 'Pressing / cold press',
  },
  {
    key: 'finish',
    kicker: 'The result',
    lines: ['Edge', 'banding &', 'finish'],
    text: 'A trimmed, sealed edge and a clean corner — the finish every earlier step is working towards.',
    img: IMG.finishedEdge,
    note: 'Illustrative image',
    specs: [['Machine', 'To confirm'], ['Finishes', 'To confirm']],
    short: 'Edge banding & finish',
  },
]

const TOTAL = MACHINES.length + 1 // + intro panel

export default function Machinery() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    // Stacked layout (mobile / tablet / reduced-motion off): simple scroll reveals
    mm.add(`${MOTION} and (max-width: 1023.98px)`, () => {
      setupReveals(el)
    })

    // Desktop: vertical scroll drives the horizontal track while the section is pinned
    mm.add(PINNED, () => {
      const pin = q('.js-mach-pin')[0]
      const track = q('.js-mach-track')[0]
      const fill = q('.js-mach-fill')[0]
      const counter = q('.js-mach-count')[0]
      const name = q('.js-mach-name')[0]
      const panels = q('.mpanel')
      const setFill = gsap.quickSetter(fill, 'scaleX')

      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth)

      let shown = -1
      const track$ = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setFill(self.progress)
            const idx = Math.min(TOTAL - 1, Math.round(self.progress * (TOTAL - 1)))
            if (idx !== shown) {
              shown = idx
              counter.textContent = `0${idx + 1} / 0${TOTAL}`
              name.textContent = idx === 0 ? 'Machinery & technology' : MACHINES[idx - 1].short
            }
          },
        },
      })

      panels.forEach((panel, i) => {
        const frame = panel.querySelector('.mpanel__frame')
        const drift = panel.querySelector('.mpanel__drift')
        const img = panel.querySelector('.mpanel__drift img')
        const lines = panel.querySelectorAll('.line__inner')
        const fades = panel.querySelectorAll('.js-fade')
        const num = panel.querySelector('.mpanel__num')
        const flip = panel.classList.contains('is-flip')
        const isContain = panel.classList.contains('mpanel--contain')

        // initial hidden state for the panel's reveal
        if (frame) gsap.set(frame, { clipPath: flip ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' })
        if (img) gsap.set(img, { scale: isContain ? 1.06 : 1.35 })
        gsap.set(lines, { yPercent: 120 })
        gsap.set(fades, { y: 28, opacity: 0 })
        if (num) gsap.set(num, { opacity: 0, scale: 0.92 })

        // The intro and first machine are already on screen when the pin starts,
        // so they use the pin as trigger; later panels use the horizontal motion itself.
        const early = i <= 1
        const reveal = gsap.timeline({
          delay: early ? i * 0.25 : 0,
          scrollTrigger: early
            ? { trigger: pin, start: 'top 62%', toggleActions: 'play none none none' }
            : {
                trigger: panel,
                containerAnimation: track$,
                start: 'left 78%',
                toggleActions: 'play none none reverse',
              },
        })
        if (frame) reveal.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }, 0)
        if (img) reveal.to(img, { scale: 1, duration: 1.9, ease: 'expo.out' }, 0)
        reveal.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 0.35)
        reveal.to(fades, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out' }, 0.6)
        if (num) reveal.to(num, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, 0.2)

        // image drifts against the track direction for depth (skip on full-machine contain frames to prevent edge clipping)
        if (drift && !isContain) {
          gsap.fromTo(
            drift,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: track$,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="machinery" className="mach" aria-labelledby="mach-heading">
      <div className="mach__pin js-mach-pin">
        <div className="mach__track js-mach-track">
          <div className="mpanel mpanel--intro">
            <p className="eyebrow js-fade" data-reveal="fade">Machinery &amp; Technology</p>
            <h2 id="mach-heading" className="mach__intro-title" data-reveal="lines">
              <Lines lines={['The tools', 'behind the', 'finish.']} accent={2} />
            </h2>
            <p className="mach__intro-text js-fade" data-reveal="fade">
              Beamsa machinery, a throughfeed machine, panel saw, pressing and cold press — the
              equipment named in SSK’s brief. Exact models and capabilities are marked for
              confirmation.
            </p>
            <p className="mach__hint js-fade" aria-hidden="true">
              Keep scrolling <ArrowRight size={16} />
            </p>
          </div>

          {MACHINES.map((m, i) => (
            <article
              key={m.key}
              className={`mpanel mpanel--machine mpanel--${m.key}${i % 2 === 1 ? ' is-flip' : ''}${m.img.isMachine ? ' mpanel--contain' : ''}`}
              aria-label={m.short}
            >
              <span className="mpanel__num" aria-hidden="true">
                0{i + 1}
              </span>

              <figure className="mpanel__media">
                <div className="mpanel__frame" data-reveal="clip" data-dir="left">
                  <div className="mpanel__drift">
                    <img
                      src={m.img.src}
                      width={m.img.width}
                      height={m.img.height}
                      alt={m.img.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <figcaption className="mpanel__note js-fade" data-reveal="fade" data-y="16">
                  {m.note}
                </figcaption>
              </figure>

              <div className="mpanel__body">
                <p className="mpanel__kicker js-fade" data-reveal="fade" data-y="16">
                  0{i + 1} — {m.kicker}
                </p>
                <h3 className="mpanel__title" data-reveal="lines">
                  <Lines lines={m.lines} />
                </h3>
                <p className="mpanel__text js-fade" data-reveal="fade">
                  {m.text}
                </p>
                <dl className="mpanel__specs js-fade" data-reveal="fade">
                  {m.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}

          <div className="mpanel mpanel--end" aria-hidden="true" />
        </div>

        <div className="mach__hud" aria-hidden="true">
          <span className="js-mach-count">01 / 0{TOTAL}</span>
          <span className="mach__bar">
            <span className="mach__bar-fill js-mach-fill" />
          </span>
          <span className="mach__name js-mach-name">Machinery &amp; technology</span>
        </div>
      </div>
    </section>
  )
}
