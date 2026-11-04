import hero from './sankan-hero.jpg'
import about from './sankan-about.jpg'
import proj1 from './sankan-proj1.jpg'
import proj2 from './sankan-proj2.jpg'
import wardrobe from './sankan-wardrobe.jpg'
import materials from './sankan-materials.jpg'
import planning from './sankan-planning.jpg'

const wide = { width: 1280, height: 720 }
const portrait = { width: 864, height: 1152 }

export const SANKAN_IMG = {
  hero: { src: hero, ...wide, alt: 'Minimalist modern residential interior with deep violet undertones' },
  about: { src: about, ...portrait, alt: 'Elegant architectural details with layered lighting' },
  proj1: { src: proj1, ...wide, alt: 'Luxurious living room interior with custom woodwork' },
  proj2: { src: proj2, ...wide, alt: 'High-end modern exterior facade at dusk' },
  wardrobe: { src: wardrobe, ...portrait, alt: 'Premium custom wardrobe interior with sleek metal hardware' },
  materials: { src: materials, ...wide, alt: 'Macro shot of marble, wood, and metal textures overlapping' },
  planning: {
    src: planning,
    ...portrait,
    alt: 'Floor plan drawings, a scale model of a living room and material swatches on a design table',
  },
}