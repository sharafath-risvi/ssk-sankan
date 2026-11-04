import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Lines from '../shared/Lines'
import Hero from './Hero'
import { SANKAN_IMG } from '../../assets/sankan/images'
import { STORY } from './data'

const VIDEO_01 = '/sankanvideos/video1.mp4'

/**
 * Sankan Story Component
 *
 *  - Chapter 1: Sankan Hero (50% left white + 50% right Video 02 + centre floating Video 02).
 *  - Chapter 2: About Sankan (#about):
 *      - Full-Screen Cinematic Intro ("ABOUT SANKAN" + Architectural Image).
 *      - Pinned Scroll Transformation: Image smoothly shrinks and moves towards the LEFT,
 *        crossfading seamlessly into Video 01.
 *      - Video 01 stays FIXED on the LEFT side across all 3 storytelling stages:
 *          1. The relationship (SSK & Sankan)
 *          2. What Sankan Does
 *          3. What Makes Sankan Different
 *      - The 3 stages appear and transition on the RIGHT side as the user scrolls.
 */
export default function Story() {
  const videoRef = useRef(null)

  return (
    <>
      {/* Chapter 1 — Hero Section */}
      <Hero />

      {/* Chapter 2 — About Sankan */}
      <section className="sn-story" id="about" aria-label="About Sankan">
        <div className="sn-story__scene js-story-scene">
          {/* ===============================================================
              MOVING VISUAL STAGE (DESKTOP PINNED)
              - Initial: Full-screen intro with architectural image + "ABOUT SANKAN".
              - Pinned Scroll: Shrinks, glides to the LEFT slot, crossfades to Video 01.
              - Remains fixed on the left throughout Stages 01, 02, and 03.
              =============================================================== */}
          <div className="sn-about__stage js-about-stage">
            {/* Background Image Layer (Crossfades to Video 01) */}
            <div className="sn-about__intro-bg js-about-intro-bg">
              <img
                src={SANKAN_IMG.hero.src}
                width={SANKAN_IMG.hero.width}
                height={SANKAN_IMG.hero.height}
                alt="Sankan modern architectural interior"
                fetchPriority="high"
              />
              <div className="sn-about__intro-shade" />
            </div>

            {/* Video 01 Layer (Crossfades in as stage moves to left slot) */}
            <div className="sn-about__video-wrap js-about-video-wrap">
              <video
                ref={videoRef}
                className="sn-about__video js-about-video"
                src={VIDEO_01}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="sn-hero__video-glare" aria-hidden="true" />
            </div>

            {/* Full-Screen Cinematic Intro Overlay */}
            <div className="sn-about__intro-overlay js-about-intro-overlay">
              <h2 className="sn-about__intro-title">
                <Lines lines={['ABOUT', 'SANKAN']} />
              </h2>
            </div>
          </div>

          {/* Geometry slot for the left-side video frame on desktop */}
          <div className="sn-about__slot-left js-about-slot-left" aria-hidden="true" />

          {/* ===============================================================
              MOBILE-ONLY VISUAL (< 1024px)
              =============================================================== */}
          <div className="sn-about__mobile-intro">
            <div className="sn-about__mobile-intro-bg">
              <img
                src={SANKAN_IMG.hero.src}
                alt="Sankan modern architectural interior"
              />
              <div className="sn-about__intro-shade" />
            </div>
            <div className="sn-about__mobile-intro-content">
              <h2 className="sn-about__intro-title">
                <Lines lines={['ABOUT', 'SANKAN']} />
              </h2>
            </div>
          </div>

          <div className="sn-about__mobile-media">
            <div className="sn-about__mobile-frame">
              <video
                className="sn-about__mobile-video"
                src={VIDEO_01}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="sn-hero__video-glare" aria-hidden="true" />
            </div>
          </div>

          {/* ===============================================================
              RIGHT-SIDE THREE-STAGE CONTENT CONTAINER
              =============================================================== */}
          <div className="sn-about__copy js-about-copy">
            <p className="ssk-eyebrow sn-kicker sn-about__label">About Sankan</p>

            <div className="sn-about__stages">
              {STORY.map((stage) => (
                <article className="sn-stage" key={stage.no} data-stage={stage.no}>
                  <div className="sn-stage__body">
                    <p className="ssk-eyebrow sn-kicker sn-stage__label js-stage-rest">
                      {stage.label}
                    </p>
                    <h3 className="sn-stage__title">
                      <Lines lines={stage.title} />
                    </h3>
                    <p className="ssk-body sn-prose sn-stage__text js-stage-rest">{stage.text}</p>

                    {/* Stage 01: The relationship */}
                    {stage.kind === 'relationship' && (
                      <div className="sn-relation js-stage-rest">
                        <p className="sn-relation__row">
                          <b>SSK</b>
                          <span>The main company</span>
                        </p>
                        <i className="sn-relation__link" aria-hidden="true" />
                        <p className="sn-relation__row is-active">
                          <b>Sankan</b>
                          <span>The design experience</span>
                        </p>
                        <Link
                          to="/"
                          state={{ fromSankan: true }}
                          onClick={() => {
                            document.documentElement.style.scrollBehavior = 'auto'
                            document.body.style.scrollBehavior = 'auto'
                            window.scrollTo(0, 0)
                            document.documentElement.scrollTop = 0
                            document.body.scrollTop = 0
                          }}
                          className="sn-back sn-relation__visit"
                        >
                          Visit SSK
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    )}

                    {/* Stages 02 & 03: What Sankan Does & What Makes Sankan Different */}
                    {stage.kind !== 'relationship' && (
                      <div className="sn-stage__content js-stage-rest">
                        <ul className={`sn-tags${stage.kind === 'principles' ? ' is-principles' : ''}`}>
                          {stage.tags.map((tag) => (
                            <li key={tag}>
                              <span
                                className={`sn-tag__dot${stage.kind === 'principles' ? ' is-accent' : ''}`}
                                aria-hidden="true"
                              />
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <ol className="sn-about__meter" aria-hidden="true">
              {STORY.map((stage) => (
                <li key={stage.no} className="js-story-dot" />
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
