import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Lines from '../../shared/Lines'

/**
 * One editorial row. `flip` = image left / content right.
 * Reveal behaviour is declarative (data-reveal) and wired by setupReveals().
 */
export default function ServiceRow({ service, variant, index, flip }) {
  const { image } = variant
  const isMachine = Boolean(image?.isMachine)
  const num = String(index + 1).padStart(2, '0')
  const enquiry = `/contact?service=${service.slug}&variant=${encodeURIComponent(variant.name)}`

  return (
    <article
      className={`svcrow${flip ? ' svcrow--flip' : ''}${isMachine ? ' svcrow--machine' : ''}`}
      aria-label={variant.name}
    >
      <div className="svcrow__content">
        <p className="svcrow__index" data-reveal="fade" data-y="16">
          {num} — {service.name}
          {!variant.confirmed && <span className="tbc">To confirm</span>}
        </p>

        <h3 className="svcrow__title" data-reveal="lines">
          <Lines lines={[variant.name]} />
        </h3>

        <p className="svcrow__desc" data-reveal="fade">
          {variant.description}
        </p>

        {variant.details?.length > 0 && (
          <dl className="svcrow__facts" data-reveal="stagger">
            {variant.details.map((d) => (
              <div className="svcrow__fact" key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div data-reveal="fade" data-y="16">
          <Link to={enquiry} className="textlink">
            Enquire about this
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <figure className="svcrow__media">
        <div className="svcrow__frame" data-reveal="clip" data-dir={flip ? 'left' : 'right'}>
          <div className="svcrow__drift" {...(isMachine ? {} : { 'data-parallax': '0.12' })}>
            <div
              className="svcrow__crop"
              style={{
                '--focus': isMachine ? '50% 50%' : variant.focus || '50% 50%',
                '--zoom': isMachine ? 1 : variant.zoom || 1,
              }}
            >
              <img
                className={isMachine ? undefined : 'js-scale'}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </div>
        </div>
        <figcaption className="svcrow__caption">
          {variant.name}
          {variant.confirmed ? '' : ' · illustrative'}
        </figcaption>
      </figure>
    </article>
  )
}
