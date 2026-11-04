import { SANKAN_IMG } from '../../assets/sankan/images'

/* ==========================================================================
   SANKAN CONTENT
   Everything editable on the Sankan page lives here.
   ========================================================================== */

/* ---- Contact details -----------------------------------------------------
   TODO(client): none of these are confirmed yet. Leave a value as '' and the
   page shows "To be confirmed" instead of inventing anything. Fill them in
   here and the Contact section (and nothing else) updates.
   -------------------------------------------------------------------------- */
export const CONTACT = {
  email: '', // e.g. 'hello@example.com'
  phone: '+91 98400 41750', // Sankan studio phone
  address: '191 Kundrathur Main Road, Kovur, Chennai 600128', // Sankan studio address
  instagramUrl: 'https://www.instagram.com/sankanply_homedecor/',
  instagramHandle: '@sankanply_homedecor',
}

/* ---- Services ------------------------------------------------------------
   Exactly five clear, straightforward service offerings.
   -------------------------------------------------------------------------- */
export const SERVICES = [
  {
    img: SANKAN_IMG.proj1,
    aside: SANKAN_IMG.hero,
    index: '01',
    title: 'Interior Design',
    text: 'Thoughtful room layouts, lighting and finishes designed for comfortable everyday living.',
  },
  {
    img: SANKAN_IMG.proj2,
    aside: SANKAN_IMG.about,
    index: '02',
    title: 'Exterior Design',
    text: 'Attractive outdoor spaces and facades that connect naturally with the rooms inside.',
  },
  {
    img: SANKAN_IMG.wardrobe,
    aside: SANKAN_IMG.materials,
    index: '03',
    title: 'Custom Wardrobes',
    text: 'Fitted storage built to your room, with smooth hardware, durable edges and smart organization.',
  },
  {
    provisional: true,
    img: SANKAN_IMG.planning,
    aside: SANKAN_IMG.hero,
    index: '04',
    title: 'Space Planning',
    text: 'Smart floor plans arranged on paper first, ensuring every room feels open and easy to use.',
  },
  {
    provisional: true,
    img: SANKAN_IMG.materials,
    aside: SANKAN_IMG.about,
    index: '05',
    title: 'Materials & Finishes',
    text: 'Quality wood, laminates and hardware handpicked for durability and clean looks.',
  },
]

/* ---- Process (Simple & clear steps) -------------------------------------- */
export const STEPS = [
  {
    img: SANKAN_IMG.about,
    aside: SANKAN_IMG.hero,
    index: '01',
    title: 'Discover',
    text: 'A friendly conversation about your space, how you live, and what you want to change.',
  },
  {
    img: SANKAN_IMG.materials,
    aside: SANKAN_IMG.proj2,
    index: '02',
    title: 'Design',
    text: 'Clear 3D layouts and material directions, so you see your space before work begins.',
  },
  {
    img: SANKAN_IMG.wardrobe,
    aside: SANKAN_IMG.materials,
    index: '03',
    title: 'Create',
    text: 'Precision woodworking, edge banding, and careful crafting in our factory.',
  },
  {
    img: SANKAN_IMG.proj1,
    aside: SANKAN_IMG.about,
    index: '04',
    title: 'Deliver',
    text: 'Careful on-site installation, thorough checking of every detail, and peaceful handover.',
  },
]

/* ---- Story: Hero → About ---------------------------------------------------
   The three storytelling stages sharing the right-side video frame.
   Stage 01: The original relationship between SSK and Sankan.
   Stage 02: What Sankan does (services, custom wardrobes, space planning).
   Stage 03: What makes Sankan different (built for real use, backed by SSK materials).
   -------------------------------------------------------------------------- */
export const STORY = [
  {
    no: '01',
    label: 'The relationship',
    title: ['One company,', 'two experiences.'],
    text: 'SSK is the main company, working in edge banding, panel manufacturing and materials. Sankan is its distinct, design-focused experience: the place to explore the interior, exterior and wardrobe work.',
    kind: 'relationship',
  },
  {
    no: '02',
    label: 'WHAT WE DO',
    title: ['Spaces Designed', 'For Everyday Life.'],
    kind: 'services',
    text: 'Sankan creates beautiful, practical living and work spaces. We handle complete interior design, room layouts, custom-fitted wardrobes and exterior concepts — from first 3D plan to final installation.',
    tags: [
      'Interior Design & Layouts',
      'Custom Fitted Wardrobes',
      'Exterior & Facade Concepts',
      'Complete Turnkey Execution',
    ],
  },
  {
    no: '03',
    label: 'THE SANKAN WAY',
    title: ['Crafted With Care.', 'Built to Last.'],
    kind: 'principles',
    text: 'We design around how you actually live and use your space. Backed by SSK’s material expertise and factory precision, our joinery, edges, and fittings are built stronger and made to last for years.',
    tags: [
      'Built for real daily use',
      'Precision factory joinery',
      'Direct material quality from SSK',
      'Dedicated care from start to finish',
    ],
  },
]

/* ---- Instagram Reels -------------------------------------------------------
   Genuine showcase Reels from the official Sankan Instagram account:
   https://www.instagram.com/sankanply_homedecor/

   EACH entry contains:
   - exact Instagram Reel permalink URL
   - genuine cover image retrieved directly from that specific Reel
   - unique reel identifier and verified title/description
   -------------------------------------------------------------------------- */
export const REELS = [
  {
    id: 'reel-1',
    shortcode: 'DfCcJVATsz7',
    url: 'https://www.instagram.com/reel/DfCcJVATsz7/',
    cover: '/reels/reel-1.jpg',
    width: 361,
    height: 640,
    title: 'Crafting Beautiful Spaces',
    desc: 'Bespoke woodwork and precision interior installation in Kovur, Chennai',
    tag: 'Craftsmanship',
    speed: 0.06,
  },
  {
    id: 'reel-2',
    shortcode: 'De1j2aLTduf',
    url: 'https://www.instagram.com/reel/De1j2aLTduf/',
    cover: '/reels/reel-2.jpg',
    width: 361,
    height: 640,
    title: 'Transform Your Dream Home',
    desc: 'From stylish living rooms to elegant bedrooms, every detail designed to perfection',
    tag: 'Living & Bedroom',
    speed: -0.05,
  },
  {
    id: 'reel-3',
    shortcode: 'DeeggErz9BK',
    url: 'https://www.instagram.com/reel/DeeggErz9BK/',
    cover: '/reels/reel-3.jpg',
    width: 361,
    height: 640,
    title: 'Modern Interiors for Kovur & Kundrathur',
    desc: 'Contemporary turnkey design and complete space execution',
    tag: 'Turnkey Execution',
    speed: 0.07,
  },
  {
    id: 'reel-4',
    shortcode: 'DeweX3pzhUn',
    url: 'https://www.instagram.com/reel/DeweX3pzhUn/',
    cover: '/reels/reel-4.jpg',
    width: 360,
    height: 640,
    title: 'Small Space, Big Dreams!',
    desc: 'Space-saving storage ideas and compact modern interior styling',
    tag: 'Space Saving',
    speed: -0.06,
  },
  {
    id: 'reel-5',
    shortcode: 'Deg-AhCz-o0',
    url: 'https://www.instagram.com/reel/Deg-AhCz-o0/',
    cover: '/reels/reel-5.jpg',
    width: 361,
    height: 640,
    title: 'Design Your Dream Space',
    desc: 'Tailored modular layouts, custom joinery, and home decor inspiration',
    tag: 'Modular Layouts',
    speed: 0.05,
  },
  {
    id: 'reel-6',
    shortcode: 'DejnJaQTJT7',
    url: 'https://www.instagram.com/reel/DejnJaQTJT7/',
    cover: '/reels/reel-6.jpg',
    width: 360,
    height: 640,
    title: 'Your Dream Home Starts Here',
    desc: 'Bespoke cabinetry, elegant finishes, and dedicated craftsmanship in Chennai',
    tag: 'Home Decor',
    speed: -0.07,
  },
]
