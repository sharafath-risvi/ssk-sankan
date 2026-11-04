// Central registry of SSK homepage imagery.
// NOTE: these are AI-generated illustrative photographs (no verified SSK photography was supplied).
// Replace the files in this folder with real SSK photography when available - keep the keys.
import hero from './hero-factory.jpg'
import about from './about-stacked-edges.jpg'
import storyEdge from './story-edge-macro.jpg'
import storyProcessing from './story-panel-processing.jpg'
import storyWarehouse from './story-plywood-warehouse.jpg'
import expEdgeBanding from './expertise-edgebanding.jpg'
import expManufacturing from './expertise-manufacturing.jpg'
import throughfeed from './machine-throughfeed.jpg'
import panelSaw from './machine-panel-saw.jpg'
import coldPress from './machine-cold-press.jpg'
import finishedEdge from './machine-finished-edge.jpg'
import plywood from './material-plywood.jpg'
import laminates from './material-laminates.jpg'
import hardware from './material-hardware.jpg'
import adhesive from './material-adhesive.jpg'
import cta from './cta-workshop.jpg'
import modernInterior from '../sankan/sankan-hero.jpg'
import modernMaterials from '../sankan/sankan-materials.jpg'

const wide = { width: 1280, height: 720 }
const landscape = { width: 1152, height: 864 }
const portrait = { width: 864, height: 1152 }
const realPortrait = { width: 1086, height: 1448 }
const realLandscape = { width: 1448, height: 1086 }

export const IMG = {
  hero: { src: hero, ...wide, alt: 'Edge banding production line in a dim industrial woodworking factory lit by warm work lights' },
  about: { src: about, ...portrait, alt: 'Side view of a stack of precision-cut boards with clean finished edges in light and dark wood tones' },
  storyEdge: { src: storyEdge, ...wide, alt: 'Macro view of a finished, edge-banded wood panel corner with a seamless glue line' },
  storyProcessing: { src: storyProcessing, ...wide, alt: 'CNC router cutting a clean line through a large wooden panel' },
  storyWarehouse: { src: storyWarehouse, ...wide, alt: 'Tall stacks of raw plywood sheets in a warehouse with shafts of light' },
  expEdgeBanding: { src: expEdgeBanding, ...landscape, alt: 'Edge banding machine applying and trimming edge tape on a wooden panel' },
  expManufacturing: { src: expManufacturing, ...portrait, alt: 'Manufacturing facility floor with panel machinery and racks of finished boards' },

  // Real SSK Machinery photographs (from public/machines)
  beamSaw: { src: '/machines/beamsaw.png', width: 1083, height: 712, isMachine: true, alt: 'KDT Woodtech Saw Tech KS beam saw machine on the SSK production floor' },
  throughfeed: { src: '/machines/Edge-Banding Machine.png', ...realPortrait, isMachine: true, alt: 'OKEN throughfeed edge banding machine with roller conveyor on the SSK production floor' },
  panelSaw: { src: '/machines/panelsaw.png', ...realPortrait, alt: 'Operators sizing wooden boards on the SSK sliding table panel saw' },
  coldPress: { src: '/machines/Hydraulic panel Press.png', width: 1042, height: 944, isMachine: true, alt: 'OKEN Machineries hydraulic panel press and cold press on the SSK floor' },
  finishedEdge: { src: '/machines/edgebandtape.png', ...realLandscape, alt: 'Edge band tape roll and glue applicator table in the SSK facility' },

  // Real About SSK photographs (from public/aboutssk)
  companyOne: { src: '/aboutssk/sskcompany.png', width: 1165, height: 1350, alt: 'SSK Enterprises building exterior showcasing plywood, laminates, hardware, and adhesives' },
  companyTwo: { src: '/aboutssk/sskcompany2.png', width: 852, height: 1846, alt: 'SSK Enterprises storefront signage for edge bands, adhesives, and hardware' },
  workingOne: { src: '/aboutssk/working.png', ...realPortrait, alt: 'SSK Enterprises office team working at their desks' },
  workingTwo: { src: '/aboutssk/working2.png', ...realPortrait, alt: 'SSK Enterprises showroom counter with architectural hardware displays' },
  founder: { src: '/aboutssk/founder.png', ...realPortrait, alt: 'Loganathan, Founder of SSK Enterprises seated at the office desk' },

  // Real SSK Service photographs (from public/serviceImages)
  serviceEdgeBand: { src: '/serviceImages/edgeband.png', ...realPortrait, alt: 'Rows of edge band tape rolls in wood-grain and solid colour finishes on SSK shelves' },
  serviceAdhesive: { src: '/serviceImages/Adhesive.png', ...realPortrait, alt: 'Industrial woodworking adhesives displayed on shelves at SSK Enterprises' },
  servicePlywood: { src: '/serviceImages/plywood.png', ...realPortrait, alt: 'Stacks of plywood boards inside the SSK Enterprises showroom' },
  servicePlywood2: { src: '/serviceImages/plywood2.png', ...realPortrait, alt: 'Warehouse stacks of calibrated plywood sheets on the SSK production floor' },
  serviceHardware: { src: '/serviceImages/hardware.png', ...realPortrait, alt: 'Architectural cabinet handles, pulls, and knobs display boards at SSK Enterprises' },

  // Original illustrative material images retained where required (e.g., temporary Mica & large background plates)
  plywood: { src: plywood, ...portrait, alt: 'Close-up of a plywood edge showing layered veneers' },
  laminates: { src: laminates, ...portrait, alt: 'Overlapping decorative laminate sheets in wood grain, stone and solid colour finishes' },
  hardware: { src: hardware, ...portrait, alt: 'Brushed steel hinges, drawer slides and handles on a dark slate surface' },
  adhesive: { src: adhesive, ...wide, alt: 'Edge banding hot melt EVA glue granules and cartridge beside an edgebander machine' },
  cta: { src: cta, ...wide, alt: 'Wood-grain boards leaning against a dark workshop wall in warm light' },
  factory: { src: hero, ...wide, alt: 'SSK manufacturing facility floor and panel machinery' },
  tape: { src: expEdgeBanding, ...landscape, alt: 'Edge band tape roll and throughfeed application' },
  materials: { src: laminates, ...portrait, alt: 'Woodgrain and laminate material sheets' },
  servicesHero: {
    src: modernMaterials,
    ...wide,
    alt: 'Premium architectural surface finishes, textures, and interior materials in cinematic lighting',
  },
}

// About Page specific aliases
export const ABOUT_IMG = {
  hero: {
    src: modernInterior,
    ...wide,
    alt: 'Modern architectural interior with premium woodwork, custom joinery, and cinematic ambient lighting',
  },
  storyMain: { src: '/aboutssk/sskcompany.png', width: 1165, height: 1350, alt: 'SSK Enterprises building exterior showcasing plywood, laminates, hardware, and adhesives' },
  storySub: { src: expManufacturing, ...portrait, alt: 'Manufacturing facility floor with panel machinery' },
  mission: { src: expEdgeBanding, ...landscape, alt: 'Edge banding machine applying and trimming edge tape' },
  vision: { src: throughfeed, ...landscape, alt: 'Through-feed machine with roller conveyor carrying a wooden panel' },
  timeline1: { src: coldPress, ...landscape, alt: 'Heavy steel cold press with hydraulic cylinders' },
  timeline2: { src: panelSaw, ...landscape, alt: 'Panel saw blade cutting a board with fine wood dust' },
  timeline3: { src: finishedEdge, ...landscape, alt: 'Crisp finished corner of an edge-banded laminated panel' },
  cta: { src: storyEdge, ...wide, alt: 'Macro view of a finished, edge-banded wood panel corner' }
};
