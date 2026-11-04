import { useEffect, useLayoutEffect } from 'react'
import { ScrollTrigger } from '../../utils/gsap'
import Hero from '../../components/ssk/home/Hero'
import About from '../../components/ssk/home/About'
import Expertise from '../../components/ssk/home/Expertise'
import Machinery from '../../components/ssk/home/Machinery'
import Testimonials from '../../components/ssk/home/Testimonials'
import Cta from '../../components/ssk/home/Cta'
import '../../styles/ssk/home.css'

/**
 * SSK homepage — exactly six content sections (footer is rendered by SskLayout):
 *  1 Hero · 2 About · 3 Expertise (pinned vertical story) · 4 Machinery (pinned horizontal)
 *  5 Testimonials (editorial voices of trust) · 6 CTA
 * Each section owns its GSAP context and reverts it on unmount.
 */
const SskHome = () => {
  useLayoutEffect(() => {
    // Ensure homepage always starts from the hero section
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.clearScrollMemory) {
      ScrollTrigger.clearScrollMemory('manual')
    }

    ScrollTrigger.refresh()

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    // Layout shifts after web fonts load change pin distances: recalculate once.
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div className="ssk-home">
      <Hero />
      <About />
      <Expertise />
      <Machinery />
      <Testimonials />
      <Cta />
    </div>
  )
}

export default SskHome
