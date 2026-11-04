import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../../utils/gsap'

/** Reset scroll on route changes (but leave in-page #hash navigation alone). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      // 1. Enforce manual scroll restoration so browsers do not restore previous offsets
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      // 2. Temporarily ensure smooth scrolling is disabled during route transition
      const doc = document.documentElement
      const prevRootScroll = doc.style.scrollBehavior
      const prevBodyScroll = document.body.style.scrollBehavior
      doc.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'

      // 3. Reset scroll position immediately across document and window
      window.scrollTo(0, 0)
      doc.scrollTop = 0
      document.body.scrollTop = 0

      // 4. Clear GSAP ScrollTrigger memory to prevent restoring historical pin offsets
      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.clearScrollMemory) {
        ScrollTrigger.clearScrollMemory('manual')
      }

      // 5. Restore previous inline scroll behavior if any
      doc.style.scrollBehavior = prevRootScroll
      document.body.style.scrollBehavior = prevBodyScroll
    }
  }, [pathname, hash])

  return null
}
