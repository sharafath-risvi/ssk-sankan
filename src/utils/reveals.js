import { gsap } from './gsap'

/**
 * Declarative scroll reveals for sections that are in normal page flow.
 * Call inside a gsap.matchMedia() callback so everything is reverted automatically.
 *
 *  [data-reveal="lines"]   -> masked line-by-line headline reveal (children: .line > .line__inner)
 *  [data-reveal="clip"]    -> clip-path image reveal, data-dir="up|left|right"; inner .js-scale zooms out
 *  [data-reveal="stagger"] -> children rise in sequence
 *  [data-reveal="fade"]    -> directional rise (data-y)
 *  [data-reveal="rule"]    -> divider draws from the left
 *  [data-parallax="0.2"]   -> scroll-linked vertical drift, trigger = parent element
 */
export function setupReveals(root) {
  const q = gsap.utils.selector(root)

  q('[data-reveal="lines"]').forEach((el) => {
    const inners = el.querySelectorAll('.line__inner')
    gsap.fromTo(
      inners,
      { yPercent: 118 },
      {
        yPercent: 0,
        duration: 1.25,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  const clipFrom = {
    up: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }
  q('[data-reveal="clip"]').forEach((el) => {
    const dir = el.dataset.dir || 'up'
    const inner = el.querySelector('.js-scale')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    })
    tl.fromTo(
      el,
      { clipPath: clipFrom[dir] },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
      0,
    )
    if (inner) {
      tl.fromTo(inner, { scale: 1.4 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0)
    }
  })

  q('[data-reveal="stagger"]').forEach((el) => {
    gsap.fromTo(
      el.children,
      { y: 56, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    )
  })

  q('[data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: Number(el.dataset.y || 40), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  q('[data-reveal="rule"]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    )
  })

  q('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.15
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })
}
