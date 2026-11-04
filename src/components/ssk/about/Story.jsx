import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, PINNED } from '../../../utils/gsap'
import { ABOUT_IMG, IMG } from '../../../assets/ssk/images'

/* Same pin as before. The factory image travels one viewport left.
   The story column stays on the right and is visible from the first frame. */
const PIN_VH = 2.4

const GALLERY = [
  { img: IMG.companyTwo, className: 'astory__tile--main' },
  { img: IMG.workingOne, className: 'astory__tile--detail' },
]

const Story = () => {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(PINNED, () => {
      const stage = q('.js-story-stage')[0]
      const track = q('.js-story-track')[0]
      const scenes = q('.astory__scene')
      const photo = q('.astory__photo--a img')[0]

      const fit = () => {
        const w = stage.clientWidth
        scenes.forEach((scene) => {
          scene.style.flex = `0 0 ${w}px`
          scene.style.width = `${w}px`
        })
      }
      fit()
      ScrollTrigger.addEventListener('refreshInit', fit)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * PIN_VH)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, { x: () => -stage.clientWidth, duration: 1 }, 0)
      tl.fromTo(photo, { scale: 1.08 }, { scale: 1, duration: 1 }, 0)

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', fit)
        scenes.forEach((scene) => {
          scene.style.flex = ''
          scene.style.width = ''
        })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="story" className="astory on-light" aria-labelledby="story-title">
      <div className="astory__stage js-story-stage">
        <div className="astory__track js-story-track">
          <div className="astory__scene astory__scene--intro">
            <figure className="astory__photo astory__photo--a">
              <img
                src={ABOUT_IMG.storyMain.src}
                width={ABOUT_IMG.storyMain.width}
                height={ABOUT_IMG.storyMain.height}
                alt={ABOUT_IMG.storyMain.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>

        <div className="astory__copy">
          <div className="astory__head">
            <p className="astory__kicker ssk-eyebrow">The story behind SSK</p>
            <h2 id="story-title" className="astory__display ssk-h-section">
              <span>Our</span>
              <span className="is-accent">Story</span>
            </h2>
          </div>
          <div className="astory__body-group">
            <p className="astory__body">
              SSK is a trusted supplier and manufacturer of interior materials, with edge banding and panel processing at our core. We focus on the essential details that make finished furniture strong, clean, and durable.
            </p>
            <p className="astory__body">
              From precision-finished panels to the materials that complete them, we help carpenters, interior teams and homeowners turn good plans into lasting spaces.
            </p>
          </div>
          <Link to="/services" className="textlink">
            Explore our materials &amp; services
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="astory__gallery">
          {GALLERY.map(({ img, className }) => (
            <figure key={img.src} className={`astory__tile ${className}`}>
              <img
                src={img.src}
                width={img.width}
                height={img.height}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Story
