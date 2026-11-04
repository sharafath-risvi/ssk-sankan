import { IMG } from '../../../assets/ssk/images'

/**
 * SSK service content — the single place to edit what each service page shows.
 *
 * VERIFICATION STATUS
 * -------------------
 * Only the five service names and their one-line descriptions come from the
 * existing SSK site. Product types, details and photography below are
 * PLACEHOLDERS awaiting SSK confirmation:
 *   - every variant carries `confirmed: false`, which renders a "To confirm" tag
 *   - `details` values of TBC render as "To be confirmed" — replace with real data
 *   - images are the AI-generated illustrative set from src/assets/ssk/images.js
 *
 * TO UPDATE A PRODUCT
 *   1. Edit name / description / details.
 *   2. Set `confirmed: true` once SSK has verified it (the tag disappears).
 *   3. Swap `image` for a real photograph (keep the { src, width, height, alt } shape).
 *   4. `focus` ("x% y%") and `zoom` crop an illustrative image; drop them for real photos.
 *
 * Row order = array order. Row 1 is content-left / image-right, then it alternates.
 */

const TBC = 'To be confirmed'

/** Standard detail rows used for placeholder products. Replace values with real data. */
const detailsFor = (labels) => labels.map((label) => ({ label, value: TBC }))

export const SSK_SERVICES_LIST = [
  {
    id: 'edge-band-tape',
    slug: 'edge-band-tape',
    number: '01',
    num: '01',
    name: 'Edge Band Tape',
    category: 'Primary business',
    heroTitle: ['Edge Band', 'Tape'],
    heroSubtitle:
      'SSK’s primary business. Edge band tape to finish and protect the exposed edges of panels.',
    heroImage: IMG.serviceEdgeBand.src,
    heroAlt: IMG.serviceEdgeBand.alt,
    heroFocus: '50% 45%',
    typesHeading: ['Tape', 'types'],
    typesIntro: 'The edge band tape types SSK works with. Final range to be confirmed by SSK.',
    variants: [
      {
        id: 'pvc',
        name: 'PVC Edge Band Tape',
        description:
          'A common choice for finishing panel edges across furniture and interior joinery.',
        details: detailsFor(['Colours & finishes', 'Thickness', 'Widths']),
        image: IMG.serviceEdgeBand,
        focus: '50% 45%',
        confirmed: false,
      },
      {
        id: 'abs',
        name: 'ABS Edge Band Tape',
        description:
          'An alternative edge material, supplied in matching finishes for panel work.',
        details: detailsFor(['Colours & finishes', 'Thickness', 'Widths']),
        image: IMG.finishedEdge,
        focus: '45% 50%',
        confirmed: false,
      },
      {
        id: 'acrylic-3d',
        name: 'Acrylic (3D) Edge Band Tape',
        description:
          'A glossy, dimensional edge look for decorative and high-finish panels.',
        details: detailsFor(['Colours & patterns', 'Thickness', 'Widths']),
        image: IMG.storyEdge,
        focus: '50% 50%',
        confirmed: false,
      },
      {
        id: 'wood-grain',
        name: 'Wood-Grain Edge Band Tape',
        description:
          'Tape in wood-grain finishes, made to sit alongside matching boards and laminates.',
        details: detailsFor(['Grain & colours', 'Thickness', 'Widths']),
        image: IMG.throughfeed,
        focus: '50% 50%',
        confirmed: false,
      },
    ],
  },
  {
    id: 'adhesive',
    slug: 'adhesive',
    number: '02',
    num: '02',
    name: 'Adhesive',
    category: 'Bonding materials',
    heroTitle: ['Industrial', 'Adhesives'],
    heroSubtitle:
      'Adhesives for edge banding and panel bonding, supplied alongside tape and boards.',
    heroImage: IMG.serviceAdhesive.src,
    heroAlt: IMG.serviceAdhesive.alt,
    heroFocus: '55% 45%',
    typesHeading: ['Adhesive', 'types'],
    typesIntro: 'The adhesive types SSK works with. Final range to be confirmed by SSK.',
    variants: [
      {
        id: 'eva-hot-melt',
        name: 'EVA Hot Melt Adhesive',
        description:
          'Hot melt granules and cartridges used on edge banding machines to bond tape to panels.',
        details: detailsFor(['Form', 'Colour', 'Pack size']),
        image: IMG.serviceAdhesive,
        focus: '55% 50%',
        confirmed: false,
      },
      {
        id: 'pur-hot-melt',
        name: 'PUR Hot Melt Adhesive',
        description:
          'A reactive hot melt option for edge banding where a different bond is needed.',
        details: detailsFor(['Form', 'Application', 'Pack size']),
        image: IMG.throughfeed,
        focus: '50% 50%',
        confirmed: false,
      },
      {
        id: 'cold-press',
        name: 'Cold Press Adhesive',
        description:
          'Adhesive for pressing laminates and surface sheets onto panels.',
        details: detailsFor(['Form', 'Application', 'Pack size']),
        image: IMG.coldPress,
        focus: '50% 55%',
        confirmed: false,
      },
      {
        id: 'contact',
        name: 'Contact Adhesive',
        description:
          'A general-purpose bonding adhesive for hand lamination and workshop use.',
        details: detailsFor(['Form', 'Application', 'Pack size']),
        image: IMG.finishedEdge,
        focus: '50% 35%',
        confirmed: false,
      },
    ],
  },
  {
    id: 'plywood',
    slug: 'plywood',
    number: '03',
    num: '03',
    name: 'Plywood',
    category: 'Panels',
    heroTitle: ['Plywood'],
    heroSubtitle:
      'Layered veneer board — a stable base for furniture and interior work.',
    heroImage: IMG.servicePlywood.src,
    heroAlt: IMG.servicePlywood.alt,
    heroFocus: '50% 55%',
    typesHeading: ['Plywood', 'types'],
    typesIntro: 'The plywood types SSK works with. Grades and sizes to be confirmed by SSK.',
    variants: [
      {
        id: 'commercial',
        name: 'Commercial Plywood',
        description:
          'General-purpose plywood for interior furniture, cabinets and joinery.',
        details: detailsFor(['Grade', 'Thicknesses', 'Sheet sizes']),
        image: IMG.servicePlywood,
        focus: '50% 55%',
        confirmed: false,
      },
      {
        id: 'marine-bwp',
        name: 'Marine / BWP Plywood',
        description:
          'Water-resistant plywood for areas where moisture is a concern.',
        details: detailsFor(['Grade', 'Thicknesses', 'Sheet sizes']),
        image: IMG.servicePlywood2,
        focus: '50% 60%',
        confirmed: false,
      },
      {
        id: 'hardwood',
        name: 'Hardwood Plywood',
        description:
          'Plywood built from hardwood veneers for heavier-duty applications.',
        details: detailsFor(['Species', 'Thicknesses', 'Sheet sizes']),
        image: IMG.panelSaw,
        focus: '50% 55%',
        confirmed: false,
      },
      {
        id: 'calibrated',
        name: 'Calibrated Plywood',
        description:
          'Plywood sanded to a consistent thickness for precise panel processing.',
        details: detailsFor(['Grade', 'Thicknesses', 'Sheet sizes']),
        image: IMG.beamSaw,
        focus: '50% 55%',
        confirmed: false,
      },
    ],
  },
  {
    id: 'mica',
    slug: 'mica',
    number: '04',
    num: '04',
    name: 'Mica',
    category: 'Surfaces',
    heroTitle: ['Mica &', 'Laminates'],
    heroSubtitle:
      'Decorative surface sheets in wood-grain, stone and solid finishes.',
    heroImage: IMG.laminates.src,
    heroAlt: IMG.laminates.alt,
    heroFocus: '50% 40%',
    typesHeading: ['Finishes', '& surfaces'],
    typesIntro: 'The mica and laminate finishes SSK works with. Range to be confirmed by SSK.',
    variants: [
      {
        id: 'wood-grain',
        name: 'Wood-Grain Laminates',
        description:
          'Decorative sheets that carry the look of natural timber across panel surfaces.',
        details: detailsFor(['Designs & colours', 'Finish', 'Sheet sizes']),
        image: IMG.laminates,
        focus: '35% 55%',
        zoom: 1.5,
        confirmed: false,
      },
      {
        id: 'stone',
        name: 'Stone & Marble Finishes',
        description:
          'Surface sheets in stone and marble-inspired patterns.',
        details: detailsFor(['Designs & colours', 'Finish', 'Sheet sizes']),
        image: IMG.laminates,
        focus: '80% 15%',
        zoom: 1.6,
        confirmed: false,
      },
      {
        id: 'solid',
        name: 'Solid-Colour Laminates',
        description:
          'Plain colour sheets for clean, uniform surfaces.',
        details: detailsFor(['Colours', 'Finish', 'Sheet sizes']),
        image: IMG.laminates,
        focus: '70% 70%',
        zoom: 1.6,
        confirmed: false,
      },
      {
        id: 'textured',
        name: 'Matte & Textured Surfaces',
        description:
          'Surface finishes with a matte or textured feel.',
        details: detailsFor(['Textures', 'Colours', 'Sheet sizes']),
        image: IMG.storyProcessing,
        focus: '50% 50%',
        confirmed: false,
      },
    ],
  },
  {
    id: 'hardware',
    slug: 'hardware',
    number: '05',
    num: '05',
    name: 'Hardware',
    category: 'Fittings',
    heroTitle: ['Hardware'],
    heroSubtitle:
      'The fittings that complete a finished piece, supplied alongside the boards.',
    heroImage: IMG.serviceHardware.src,
    heroAlt: IMG.serviceHardware.alt,
    heroFocus: '50% 45%',
    typesHeading: ['Hardware', 'categories'],
    typesIntro: 'The hardware categories SSK works with. Products to be confirmed by SSK.',
    variants: [
      {
        id: 'hinges',
        name: 'Hinges',
        description:
          'Hinges for cabinet doors, wardrobes and furniture.',
        details: detailsFor(['Types', 'Finishes', 'Sizes']),
        image: IMG.serviceHardware,
        focus: '50% 22%',
        zoom: 1.15,
        confirmed: false,
      },
      {
        id: 'drawer-slides',
        name: 'Drawer Slides',
        description:
          'Slides and channels for drawers and pull-out units.',
        details: detailsFor(['Types', 'Finishes', 'Lengths']),
        image: IMG.serviceHardware,
        focus: '68% 72%',
        zoom: 1.2,
        confirmed: false,
      },
      {
        id: 'handles',
        name: 'Handles & Pulls',
        description:
          'Handles and pulls to finish doors and drawer fronts.',
        details: detailsFor(['Styles', 'Finishes', 'Sizes']),
        image: IMG.serviceHardware,
        focus: '22% 72%',
        zoom: 1.2,
        confirmed: false,
      },
    ],
  },
]

export const SSK_SERVICES = Object.fromEntries(
  SSK_SERVICES_LIST.map((service) => [service.slug, service]),
)
