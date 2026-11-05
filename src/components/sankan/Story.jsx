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
  const mobVideoRef = useRef(null)

  return (
    <>
      {/* Chapter 1 — Hero Section */}
      <Hero />

      {/* Chapter 2 — About Sankan */}
      <section className="sn-story" id="about" aria-label="About Sankan">
        {/* ===============================================================
            DESKTOP PINNED PRESENTATION (>= 1024px)
            100% UNTOUCHED AND PRESERVED EXACTLY AS APPROVED
            =============================================================== */}
        <div className="sn-story__desktop">
          <div className="sn-story__scene js-story-scene">
            <div className="sn-about__stage js-about-stage">
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

              <div className="sn-about__intro-overlay js-about-intro-overlay">
                <h2 className="sn-about__intro-title">
                  <Lines lines={['ABOUT', 'SANKAN']} />
                </h2>
              </div>
            </div>

            <div className="sn-about__slot-left js-about-slot-left" aria-hidden="true" />

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
        </div>

        {/* ===============================================================
            MOBILE PINNED PRESENTATION (< 1024px)
            Sequential 3-Stage Vertical Storytelling:
            - Stage 1: Full-Screen Architectural Intro Image & "ABOUT SANKAN"
            - Stage 2: Intro smoothly animates out, Video 01 enters from bottom and settles at top
            - Stage 3: Video 01 remains pinned and playing while Chapters 01, 02, and 03 appear
                       individually in sequence below it
            =============================================================== */}
        <div className="sn-story__mobile">
          <div className="sn-mstory__scene js-mstory-scene">
            {/* Stage 1: Intro Layer with architectural image & bold title */}
            <div className="sn-mstory__intro js-mstory-intro">
              <div className="sn-mstory__intro-bg">
                <img
                  src={SANKAN_IMG.hero.src}
                  alt="Sankan modern architectural interior"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="sn-about__intro-shade" />
              </div>
              <div className="sn-mstory__intro-content js-mstory-intro-content">
                <h2 className="sn-mstory__intro-title">
                  <Lines lines={['ABOUT', 'SANKAN']} />
                </h2>
              </div>
            </div>

            {/* Stage 2 & 3: Showcase Layer (Pinned Video 01 + Sequential Chapters) */}
            <div className="sn-mstory__showcase js-mstory-showcase">
              {/* Top Video 01 Frame */}
              <div className="sn-mstory__video-wrap js-mstory-video-wrap">
                <video
                  ref={mobVideoRef}
                  className="sn-mstory__video js-mstory-video"
                  src={VIDEO_01}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="sn-hero__video-glare" aria-hidden="true" />
              </div>

              {/* Progress meter */}
              <div className="sn-mstory__meter" aria-hidden="true">
                <span className="sn-mstory__dot js-mstory-dot" />
                <span className="sn-mstory__dot js-mstory-dot" />
                <span className="sn-mstory__dot js-mstory-dot" />
              </div>

              {/* Chapters Stage Container: displays 3 individual chapters in sequence */}
              <div className="sn-mstory__stage-wrap js-mstory-stage-wrap">
                {STORY.map((stage, idx) => (
                  <article
                    className={`sn-mstage js-mstage js-mstage-${idx}`}
                    key={stage.no}
                    data-stage={stage.no}
                  >
                    <p className="ssk-eyebrow sn-kicker sn-mstage__label">
                      {stage.label}
                    </p>
                    <h3 className="sn-mstage__title">
                      <Lines lines={stage.title} />
                    </h3>
                    <p className="ssk-body sn-prose sn-mstage__text">{stage.text}</p>

                    {/* Chapter 01: The relationship */}
                    {stage.kind === 'relationship' && (
                      <div className="sn-relation sn-mstage__relation">
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

                    {/* Chapters 02 & 03: Service & Principle tags */}
                    {stage.kind !== 'relationship' && (
                      <div className="sn-mstage__content">
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
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
