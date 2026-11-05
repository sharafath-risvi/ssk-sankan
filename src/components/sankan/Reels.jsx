import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import InstagramIcon from '../shared/InstagramIcon'
import Lines from '../shared/Lines'
import { CONTACT, REELS } from './data'

/**
 * Instagram Reels showcase.
 *
 * Each card displays the genuine cover image retrieved directly from that Reel,
 * a visible play button in the centre, an Instagram icon badge, and opens that
 * exact Reel on Instagram in a new tab when clicked.
 *
 * Edit REELS in ./data.js.
 */
export default function Reels() {
  const profile = CONTACT.instagramUrl
  const listRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const list = listRef.current
    if (!list) return
    const { scrollLeft, scrollWidth, clientWidth } = list
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    checkScroll()
    list.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      list.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollByCard = (direction) => {
    const list = listRef.current
    if (!list) return
    const card = list.querySelector('.sn-reel')
    const step = card ? card.offsetWidth + 14 : list.clientWidth * 0.8
    list.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section id="reels" className="sn-reels" aria-labelledby="sn-reels-title">
      <div className="sn-reels__inner">
        <header className="sn-reels__head">
          <div className="sn-reels__title">
            <p className="ssk-eyebrow sn-reels__eyebrow">From Instagram</p>
            <h2 id="sn-reels-title" className="ssk-h-section" data-reveal="lines">
              <Lines lines={['Spaces', 'in motion.']} />
            </h2>
          </div>
          <div className="sn-reels__aside" data-reveal="fade" data-y="28">
            <p className="ssk-body sn-prose">
              A look at Sankan&rsquo;s interiors, exteriors and fitted wardrobes as they are made and
              lived in, one short film at a time.
            </p>
            {profile ? (
              <a className="sn-btn sn-btn--ghost" href={profile} target="_blank" rel="noopener noreferrer">
                Visit Instagram
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </header>

        <ul ref={listRef} className="sn-reels__list">
          {REELS.map((reel, i) => {
            const inner = (
              <>
                <img
                  className="js-scale"
                  src={reel.cover}
                  width={reel.width || 360}
                  height={reel.height || 640}
                  alt={reel.title}
                  loading="lazy"
                />
                <span className="sn-reel__veil" aria-hidden="true" />
                <span className="sn-reel__badge" aria-hidden="true">
                  <InstagramIcon size={14} />
                </span>
                <span className="sn-reel__play" aria-hidden="true">
                  <Play size={22} fill="currentColor" />
                </span>
                <span className="sn-reel__meta">
                  <span className="sn-reel__no">{reel.tag || `Reel ${String(i + 1).padStart(2, '0')}`}</span>
                  <span className="sn-reel__name">{reel.title}</span>
                  <span className="sn-reel__cta">
                    Watch Reel on Instagram
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </span>
              </>
            )

            return (
              <li className="sn-reel js-reel" key={reel.id} data-speed={reel.speed}>
                <a
                  className="sn-reel__media"
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch Reel ${i + 1}: ${reel.title} on Instagram`}
                  data-reveal="clip"
                  data-dir="up"
                >
                  {inner}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile-only Arrow Navigation Controls */}
        <div className="sn-reels__controls" aria-label="Reels carousel navigation">
          <button
            type="button"
            className="sn-reels__arrow sn-reels__arrow--prev"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll to previous reel"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="sn-reels__arrow sn-reels__arrow--next"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Scroll to next reel"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
