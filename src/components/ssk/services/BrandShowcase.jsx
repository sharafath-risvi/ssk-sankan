import { BRAND_SHOWCASE_DATA } from './brandData'
import '../../../styles/ssk/brand-showcase.css'

export default function BrandShowcase() {
  const { tagline, heading, brands } = BRAND_SHOWCASE_DATA

  return (
    <section className="ssk-brands on-light" aria-labelledby="brands-showcase-title">
      <div className="ssk-brands__inner">
        <header className="ssk-brands__head">
          <p className="eyebrow ssk-brands__tagline" data-reveal="fade" data-y="16">
            {tagline}
          </p>
          <h2 id="brands-showcase-title" className="ssk-brands__heading" data-reveal="lines">
            <span className="line">
              <span className="line__inner">{heading}</span>
            </span>
          </h2>
        </header>

        <div className="ssk-brands__track" role="list">
          {brands.map((b) => (
            <div key={b.id} className="ssk-brands__item" role="listitem">
              <div className="ssk-brands__card">
                <span className="ssk-brands__mark" aria-hidden="true">
                  <span className="ssk-brands__icon-box">
                    <span className="ssk-brands__initials">{b.initials}</span>
                  </span>
                </span>
                <span className="ssk-brands__name">{b.name}</span>
                <span className="ssk-brands__sub">{b.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

