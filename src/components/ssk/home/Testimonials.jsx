import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { gsap } from '../../../utils/gsap'
import Lines from '../../shared/Lines'
import { SSK_TESTIMONIALS } from './testimonialsData'
import '../../../styles/ssk/testimonials.css'

const AUTO_ROTATE_MS = 5500

export default function Testimonials() {
  const root = useRef(null)
  const quoteRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const isReducedMotion = useRef(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const current = SSK_TESTIMONIALS[activeIndex]
  const total = SSK_TESTIMONIALS.length

  const goTo = useCallback(
    (index) => {
      if (isAnimating || index === activeIndex) return
      setIsAnimating(true)

      const el = quoteRef.current
      if (el) {
        gsap.to(el, {
          y: -14,
          opacity: 0,
          duration: 0.28,
          ease: 'power2.in',
          onComplete: () => {
            setActiveIndex(index)
            gsap.fromTo(
              el,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                ease: 'power3.out',
                onComplete: () => setIsAnimating(false),
              },
            )
          },
        })
      } else {
        setActiveIndex(index)
        setIsAnimating(false)
      }
    },
    [activeIndex, isAnimating],
  )

  const prev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + total) % total
    goTo(prevIdx)
  }, [activeIndex, total, goTo])

  const next = useCallback(() => {
    const nextIdx = (activeIndex + 1) % total
    goTo(nextIdx)
  }, [activeIndex, total, goTo])

  // Check reduced motion
  useEffect(() => {
    isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Automatic testimonial rotation every 5.5 seconds (paused on hover / focus / tab hidden)
  useEffect(() => {
    if (isPaused || isReducedMotion.current) return undefined

    const timer = setInterval(() => {
      if (document.hidden) return
      next()
    }, AUTO_ROTATE_MS)

    return () => clearInterval(timer)
  }, [activeIndex, isPaused, next])

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 48) {
      if (diff > 0) next()
      else prev()
    }
  }

  // GSAP scroll entrance animation
  useEffect(() => {
    const el = root.current
    if (!el) return undefined

    const q = gsap.utils.selector(el)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        q('.js-test-fade'),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="testimonials on-light"
      aria-labelledby="testimonials-heading"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="testimonials__inner">
        {/* Left Column: Tagline, Editorial Heading, Description & Controls */}
        <div className="testimonials__col-left js-test-fade">
          <div className="testimonials__header">
            <p className="eyebrow testimonials__eyebrow">
              <span className="testimonials__eyebrow-dot" aria-hidden="true" />
              VOICES OF TRUST
            </p>
            <h2 id="testimonials-heading" className="testimonials__title">
              <Lines
                lines={['Built on Quality.', 'Remembered Through Trust.']}
                accent={1}
              />
            </h2>
            <p className="testimonials__desc">
              Discover the experiences and relationships that shape our commitment to quality and
              craftsmanship.
            </p>
          </div>

          {/* Navigation Controls & Pagination */}
          <div className="testimonials__controls">
            <div className="testimonials__nav-buttons">
              <button
                type="button"
                className="testimonials__nav-btn"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="testimonials__nav-btn"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="testimonials__counter" aria-live="polite">
              <span className="testimonials__counter-active">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="testimonials__counter-sep">/</span>
              <span className="testimonials__counter-total">
                {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="testimonials__indicators" role="tablist" aria-label="Testimonial slides">
              {SSK_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to slide ${idx + 1}: ${t.category}`}
                  className={`testimonials__indicator ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Featured Testimonial Card with Automatic Transition */}
        <div className="testimonials__col-right js-test-fade">
          <div className="testimonials__card">
            {/* Oversized Decorative Quotation Mark */}
            <div className="testimonials__quote-mark" aria-hidden="true">
              <Quote size={88} strokeWidth={1.2} />
            </div>

            <div ref={quoteRef} className="testimonials__card-content">
              {/* Category Pill & Verification Status */}
              <div className="testimonials__meta-top">
                <span className="testimonials__category">{current.category}</span>
                {!current.confirmed && (
                  <span className="testimonials__badge">
                    <span className="testimonials__badge-dot" aria-hidden="true" />
                    Sample Placeholder · To Confirm
                  </span>
                )}
              </div>

              {/* Large Editorial Quote */}
              <blockquote className="testimonials__quote">
                <p>"{current.quote}"</p>
              </blockquote>

              {/* Client Information (Shown only when available / confirmed) */}
              <div className="testimonials__author-wrap">
                {current.confirmed && current.author ? (
                  <div className="testimonials__author-info">
                    <cite className="testimonials__author-name">{current.author}</cite>
                    {current.role && <p className="testimonials__author-role">{current.role}</p>}
                  </div>
                ) : (
                  <div className="testimonials__placeholder-info">
                    <p className="testimonials__placeholder-role">{current.role}</p>
                    <p className="testimonials__placeholder-note">
                      Trade relationship partner · Verified client quote to be updated
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
