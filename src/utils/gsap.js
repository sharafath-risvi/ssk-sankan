import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Media queries shared by JS (gsap.matchMedia) and mirrored in CSS.
// Pinned scenes only run on desktop with motion allowed; everything else gets
// the stacked, fully readable CSS layout.
export const MOTION = '(prefers-reduced-motion: no-preference)'
export const PINNED = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

if (typeof window !== 'undefined') {
  window.gsap = gsap
  window.ScrollTrigger = ScrollTrigger
}

export { gsap, ScrollTrigger }
