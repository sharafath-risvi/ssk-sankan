import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION } from '../../../utils/gsap';
import { IMG } from '../../../assets/ssk/images';
import Lines from '../../shared/Lines';

/**
 * Editable Founder Content Configuration.
 * Update `nameLines`, `designation`, `quote`, `bioParagraphs`, and `portrait`
 * once verified founder details are supplied by SSK.
 */
const FOUNDER_DATA = {
  eyebrow: 'Leadership & Vision',
  nameLines: ['Loganathan'],
  designation: 'Founder & Managing Director — SSK Enterprises',
  quote:
    '“Our goal is simple: provide dependable materials and careful craftsmanship so that every customer gets furniture and spaces built to last.”',
  bioParagraphs: [
    'Founded by Loganathan, SSK Enterprises was built on hard work, deep material knowledge, and an unwavering commitment to honest customer relationships. What began with a clear focus on dependable edge banding and quality materials has grown into a trusted manufacturing foundation for furniture makers, interior contractors, and commercial workshops across Tamil Nadu, Kerala, and Karnataka.',
    'Under Loganathan’s leadership and vision, precision is never compromised. By combining heavy machinery capabilities with careful material selection, SSK ensures every panel, tape, and joint delivered to a project stands up to daily use and the test of time.',
  ],
  portrait: {
    src: IMG.founder.src,
    width: IMG.founder.width,
    height: IMG.founder.height,
    alt: 'Loganathan, Founder of SSK Enterprises seated at the office desk',
  },
};

const Founder = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      // Initial states for coordinated storytelling reveal
      gsap.set(q('.js-founder-kicker'), { y: 20, autoAlpha: 0 });
      gsap.set(q('.afounder__name .line__inner'), { yPercent: 118 });
      gsap.set(q('.js-founder-role'), { y: 20, autoAlpha: 0 });
      gsap.set(q('.js-founder-rule'), { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(q('.js-founder-copy'), { y: 28, autoAlpha: 0 });
      gsap.set(q('.js-founder-mask'), { clipPath: 'inset(16% 12% 16% 12%)' });
      gsap.set(q('.js-founder-img'), { scale: 1.24 });
      gsap.set(q('.js-founder-frame-decor'), { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 74%',
          once: true,
        },
      });

      // 1. Eyebrow & portrait mask begin opening in coordination
      tl.to(
        q('.js-founder-kicker'),
        { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' },
        0,
      )
        .to(
          q('.js-founder-mask'),
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.65, ease: 'expo.inOut' },
          0.08,
        )
        .to(
          q('.js-founder-img'),
          { scale: 1, duration: 2.15, ease: 'expo.out' },
          0.08,
        )
        // 2. Founder Name lines rise into view
        .to(
          q('.afounder__name .line__inner'),
          { yPercent: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
          0.3,
        )
        // 3. Designation & divider rule draw in
        .to(
          q('.js-founder-role'),
          { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' },
          0.62,
        )
        .to(
          q('.js-founder-rule'),
          { scaleX: 1, duration: 1.1, ease: 'expo.out' },
          0.7,
        )
        // 4. Quote, biography paragraphs, and portrait frame details settle progressively
        .to(
          q('.js-founder-copy'),
          { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.14, ease: 'power3.out' },
          0.82,
        )
        .to(
          q('.js-founder-frame-decor'),
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
          0.95,
        );

      // 5. Subtle scroll-linked parallax depth on portrait image
      gsap.fromTo(
        q('.js-founder-parallax'),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="afounder bg-[color:var(--ssk-dark)] text-[color:var(--ssk-on-dark)]"
      aria-labelledby="founder-heading"
    >
      <div className="afounder__inner">
        <div className="afounder__grid">
          {/* LEFT COLUMN — Founder Details & Biography */}
          <div className="afounder__content">
            <div className="afounder__header">
              <p className="eyebrow afounder__eyebrow js-founder-kicker">
                {FOUNDER_DATA.eyebrow}
              </p>

              <h2 id="founder-heading" className="afounder__name ssk-h-section">
                <Lines lines={FOUNDER_DATA.nameLines} />
              </h2>

              <p className="afounder__role js-founder-role">{FOUNDER_DATA.designation}</p>
            </div>

            <div className="afounder__body">
              <div className="afounder__rule js-founder-rule" aria-hidden="true" />

              <blockquote className="afounder__quote js-founder-copy">
                <p>{FOUNDER_DATA.quote}</p>
              </blockquote>

              <div className="afounder__bio">
                {FOUNDER_DATA.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="afounder__bio-p js-founder-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Founder Portrait Container */}
          <div className="afounder__portrait-col">
            <figure className="afounder__figure">
              <div className="afounder__frame-offset js-founder-frame-decor" aria-hidden="true" />

              <div className="afounder__portrait js-founder-mask">
                <div className="afounder__parallax js-founder-parallax">
                  <img
                    src={FOUNDER_DATA.portrait.src}
                    width={FOUNDER_DATA.portrait.width}
                    height={FOUNDER_DATA.portrait.height}
                    alt={FOUNDER_DATA.portrait.alt}
                    className="afounder__img js-founder-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="afounder__portrait-shade" aria-hidden="true" />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
