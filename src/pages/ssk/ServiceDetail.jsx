import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SSK_SERVICES, SSK_SERVICES_LIST } from '../../components/ssk/services/data'
import ServiceHero from '../../components/ssk/services/ServiceHero'
import ServiceRow from '../../components/ssk/services/ServiceRow'
import BrandShowcase from '../../components/ssk/services/BrandShowcase'
import Cta from '../../components/ssk/home/Cta'
import { gsap, ScrollTrigger, MOTION } from '../../utils/gsap'
import { setupReveals } from '../../utils/reveals'
import '../../styles/ssk/service-detail.css'

function ServiceView({ service }) {
  const root = useRef(null)
  const headingFirst = service.typesHeading[0] || ''
  const headingRest = service.typesHeading.slice(1).join(' ')

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const mm = gsap.matchMedia()
    mm.add(MOTION, () => {
      setupReveals(el.querySelector('.svc__range'))
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <article ref={root} className="svc">
      <ServiceHero service={service} total={SSK_SERVICES_LIST.length} />

      {/* Brand Showcase: immediately after Hero and before range */}
      <BrandShowcase />

      <section id="range" className="svc__range" aria-labelledby="svc-range-title">
        <header className="svc__head">
          <p className="eyebrow" data-reveal="fade" data-y="16">
            {service.number} — Range
          </p>
          <h2 id="svc-range-title" className="svc__heading" data-reveal="lines">
            <span className="line">
              <span className="line__inner">
                {headingFirst}
                {headingRest ? (
                  <>
                    {' '}
                    <span className="is-accent">{headingRest}</span>
                  </>
                ) : null}
              </span>
            </span>
          </h2>
          <p className="svc__intro" data-reveal="fade">
            {service.typesIntro}
          </p>
        </header>

        <div className="svc__rows">
          {service.variants.map((variant, i) => (
            <ServiceRow
              key={variant.id}
              service={service}
              variant={variant}
              index={i}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <Cta />
    </article>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = SSK_SERVICES[slug]

  if (!service) {
    return (
      <div className="svc svc--missing">
        <h1>Service not found</h1>
        <p>We couldn’t find that service. Browse the full list instead.</p>
        <Link to="/services" className="btn btn--ghost">
          <ArrowLeft size={16} aria-hidden="true" /> All services
        </Link>
      </div>
    )
  }

  // keyed by slug: switching service remounts the page, so every animation is rebuilt cleanly
  return <ServiceView key={service.slug} service={service} />
}
