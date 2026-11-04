import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SSK_SERVICES_LIST } from '../../components/ssk/services/data';
import { IMG } from '../../assets/ssk/images';
import Lines from '../../components/shared/Lines';
import BrandShowcase from '../../components/ssk/services/BrandShowcase';
import Cta from '../../components/ssk/home/Cta';
import { gsap, ScrollTrigger, MOTION } from '../../utils/gsap';
import { setupReveals } from '../../utils/reveals';
import '../../styles/ssk/services-page.css';

/**
 * Extended editorial introductions for the five main SSK service categories
 * on the Services overview page, grounded strictly in verified SSK offerings.
 */
const SERVICE_EDITORIAL = {
  'edge-band-tape':
    'SSK’s primary business. We supply and process edge band tape across PVC, ABS, 3D acrylic, and wood-grain finishes to seal, protect, and finish exposed panel edges with a clean, durable bond.',
  adhesive:
    'Formulated for reliable bonding across automated throughfeed edgebanders, panel presses, and workshop lamination — pairing seamlessly with our edge band tapes, laminates, and board materials.',
  plywood:
    'Stable layered veneer boards selected for interior joinery, modular cabinetry, and structural furniture work — spanning commercial, moisture-resistant marine, hardwood, and calibrated grades.',
  mica:
    'Decorative surface laminates across natural timber grains, stone and marble patterns, uniform solid colours, and tactile matte textures to finish wardrobes, cabinetry, and interior panels.',
  hardware:
    'Essential architectural fittings — including cabinet hinges, drawer slide channels, and door handles — supplied alongside boards and edge materials so projects come together cleanly.',
};

const SskServices = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const heroEl = el.querySelector('.svcp-hero');
    const bodyEl = el.querySelector('.js-svcp-body');
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      // 1. Hero window-expand entrance matching Home, About, Contact & ServiceHero
      gsap
        .timeline({ delay: 0.1 })
        .fromTo(
          q('.js-svcp-media'),
          { clipPath: 'inset(16% 12% 16% 12%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.85, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          q('.js-svcp-img'),
          { scale: 1.4 },
          { scale: 1, duration: 2.6, ease: 'expo.out' },
          0,
        )
        .fromTo(
          q('.svcp-hero__title .line__inner'),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out' },
          0.95,
        )
        .fromTo(
          q('.js-svcp-in'),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
          1.45,
        );

      // 2. Hero scroll-out parallax drift
      if (heroEl) {
        gsap.to(q('.js-svcp-bg'), {
          yPercent: 13,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('.js-svcp-inner'), {
          yPercent: -8,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: heroEl, start: '15% top', end: 'bottom top', scrub: true },
        });
      }

      // 3. Declarative scroll reveals for intro & five alternating service sections
      if (bodyEl) {
        setupReveals(bodyEl);
      }
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const totalServices = SSK_SERVICES_LIST.length;

  return (
    <div ref={root} className="svcp">
      {/* ====================================================================
          SECTION 1 — SERVICES HERO
          ==================================================================== */}
      <header className="svcp-hero grain" aria-labelledby="svcp-hero-title">
        <div className="svcp-hero__media js-svcp-media">
          <div className="svcp-hero__bg js-svcp-bg">
            <img
              className="js-svcp-img"
              src={IMG.servicesHero.src}
              width={IMG.servicesHero.width}
              height={IMG.servicesHero.height}
              alt={IMG.servicesHero.alt}
              style={{ objectPosition: '50% 50%' }}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="svcp-hero__shade" aria-hidden="true" />
        </div>

        <div className="svcp-hero__inner js-svcp-inner">
          <div className="svcp-hero__top js-svcp-in">
            <nav aria-label="Breadcrumb" className="svcp-hero__crumbs">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="eyebrow svcp-hero__eyebrow">
              0{totalServices} Core Categories — SSK
            </p>
          </div>

          <h1 id="svcp-hero-title" className="svcp-hero__title">
            <Lines lines={['Solutions That Shape', 'Better Spaces']} accent={1} />
          </h1>

          <div className="svcp-hero__bottom js-svcp-in">
            <p className="svcp-hero__desc">
              Explore our carefully selected range of materials and solutions, bringing together
              quality, functionality, and design for every space.
            </p>
            <div className="svcp-hero__actions">
              <a href="#services-showcase" className="btn btn--solid">
                Explore Services
                <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
              </a>
              <Link to="/contact" className="btn btn--ghost">
                Start an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Brand Showcase: immediately after Hero and before main services content */}
      <BrandShowcase />

      <div className="js-svcp-body">
        {/* ==================================================================
            SECTION 2 — SERVICES INTRODUCTION
            ================================================================== */}
        <section className="svcp-intro on-light" aria-labelledby="svcp-intro-title">
          <div className="svcp-intro__inner">
            <p className="eyebrow" data-reveal="fade" data-y="16">
              Our Capabilities
            </p>
            <h2 id="svcp-intro-title" className="svcp-intro__title" data-reveal="lines">
              <span className="line">
                <span className="line__inner">
                  Explore Our <span className="is-accent">Expertise</span>
                </span>
              </span>
            </h2>
            <p className="svcp-intro__desc" data-reveal="fade">
              From surface materials to essential fittings, discover the products and solutions
              that support every stage of creating functional and refined spaces.
            </p>

            <nav
              aria-label="Service categories directory"
              className="svcp-intro__rail"
              data-reveal="fade"
              data-y="16"
            >
              {SSK_SERVICES_LIST.map((service) => (
                <a
                  key={service.slug}
                  href={`#service-${service.slug}`}
                  className="svcp-intro__rail-link"
                >
                  <span>{service.number}</span>
                  {service.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ==================================================================
            SECTION 3 — FIVE MAIN SERVICES (Alternating Editorial Layout)
            Service 01 (index 0): Image left, text right
            Service 02 (index 1): Text left, image right
            Service 03 (index 2): Image left, text right
            Service 04 (index 3): Text left, image right
            Service 05 (index 4): Image left, text right
            ================================================================== */}
        <section
          id="services-showcase"
          className="svcp-list on-light"
          aria-label="SSK Main Service Categories"
        >
          <div className="svcp-list__inner">
            {SSK_SERVICES_LIST.map((service, index) => {
              const isImageLeft = index % 2 === 0;
              const layoutClass = isImageLeft
                ? 'svcp-item--img-left'
                : 'svcp-item--txt-left';
              const clipDir = isImageLeft ? 'left' : 'right';
              const detailPath = `/services/${service.slug}`;
              const enquiryPath = `/contact?service=${service.slug}`;
              const editorialText =
                SERVICE_EDITORIAL[service.slug] || service.heroSubtitle;

              return (
                <article
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className={`svcp-item ${layoutClass}`}
                  aria-labelledby={`svcp-title-${service.slug}`}
                >
                  {/* CONTENT COLUMN */}
                  <div className="svcp-item__content">
                    <div className="svcp-item__meta" data-reveal="fade" data-y="16">
                      <p className="svcp-item__index">
                        {service.number} / 0{totalServices} — {service.category}
                      </p>
                      <span className="svcp-item__ghost-num" aria-hidden="true">
                        {service.number}
                      </span>
                    </div>

                    <h3
                      id={`svcp-title-${service.slug}`}
                      className="svcp-item__title"
                      data-reveal="lines"
                    >
                      <Lines
                        lines={service.heroTitle}
                        accent={service.heroTitle.length - 1}
                      />
                    </h3>

                    <p className="svcp-item__desc" data-reveal="fade">
                      {editorialText}
                    </p>

                    <div
                      className="svcp-item__variants"
                      data-reveal="stagger"
                      aria-label={`${service.name} range overview`}
                    >
                      {service.variants.map((variant, vIndex) => (
                        <div key={variant.id} className="svcp-item__variant">
                          <span className="svcp-item__variant-num">
                            {String(vIndex + 1).padStart(2, '0')}
                          </span>
                          <div className="svcp-item__variant-body">
                            <span className="svcp-item__variant-name">
                              {variant.name}
                            </span>
                            <span className="svcp-item__variant-summary">
                              {variant.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="svcp-item__actions" data-reveal="fade" data-y="16">
                      <Link to={detailPath} className="btn btn--dark">
                        <span>Explore {service.name}</span>
                        <ArrowRight className="btn__arrow" size={16} aria-hidden="true" />
                      </Link>
                      <Link to={enquiryPath} className="textlink">
                        Enquire about {service.name}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* MEDIA COLUMN */}
                  <figure className="svcp-item__media">
                    <div
                      className="svcp-item__frame"
                      data-reveal="clip"
                      data-dir={clipDir}
                    >
                      <div className="svcp-item__drift" data-parallax="0.12">
                        <Link
                          to={detailPath}
                          className="svcp-item__img-link"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <img
                            className="js-scale"
                            src={service.heroImage}
                            alt={service.heroAlt}
                            style={{ objectPosition: service.heroFocus || '50% 50%' }}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                        </Link>
                      </div>
                    </div>
                    <figcaption className="svcp-item__caption">
                      <span>
                        {service.number} — {service.name}
                      </span>
                      <span>{service.variants.length} Product Categories</span>
                    </figcaption>
                  </figure>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* ====================================================================
          SECTION 4 — REUSED SHARED SSK CTA COMPONENT
          ==================================================================== */}
      <Cta />
    </div>
  );
};

export default SskServices;
