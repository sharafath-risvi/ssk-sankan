import { useLayoutEffect, useRef } from 'react';
import { gsap, PINNED } from '../../../utils/gsap';
import { ABOUT_IMG } from '../../../assets/ssk/images';

const MILESTONES = [
  {
    year: '2019',
    title: 'The Beginning',
    desc: 'SSK started with a clear focus: supplying high-quality edge banding tape and precision materials to local workshops.',
    img: ABOUT_IMG.timeline1,
  },
  {
    year: 'Growing',
    title: 'Expanding Our Range',
    desc: 'We added calibrated plywood, adhesives and laminates, helping more carpenters and interior teams finish their jobs smoothly.',
    img: ABOUT_IMG.timeline2,
  },
  {
    year: 'Today',
    title: 'Trusted Everyday Partner',
    desc: 'Supplying reliable interior materials and edge processing to furniture makers and builders across South India.',
    img: ABOUT_IMG.timeline3,
  },
];

const Timeline = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.matchMedia();

    ctx.add(PINNED, () => {
      const total = MILESTONES.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${total * 100}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1
        }
      });

      // Progress bar
      tl.to('.js-atime-progress', { scaleY: 1, ease: 'none', duration: total }, 0);

      // Milestones
      MILESTONES.forEach((_, i) => {
        if (i === 0) return; // First is already visible
        
        const start = i;
        
        // Hide previous
        tl.to(`.js-atime-item-${i-1}`, { autoAlpha: 0, yPercent: -20, duration: 0.5 }, start - 0.5);
        tl.to(`.js-atime-img-${i-1}`, { autoAlpha: 0, scale: 1.05, duration: 0.5 }, start - 0.5);
        
        // Show current
        tl.fromTo(`.js-atime-item-${i}`, { autoAlpha: 0, yPercent: 20 }, { autoAlpha: 1, yPercent: 0, duration: 0.5 }, start);
        tl.fromTo(`.js-atime-img-${i}`, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, start);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="atime bg-[color:var(--ssk-dark)] text-[color:var(--ssk-on-dark)]">
      <div className="atime__inner">
        
        <div className="atime__header">
          <p className="ssk-eyebrow text-[color:var(--ssk-muted)]" data-reveal="fade" data-dir="up">Company Milestones</p>
        </div>

        {/* Desktop Pin Layout (>= 1024px) */}
        <div className="atime__grid atime__grid--desktop">
          <div className="atime__visuals">
            <div className="atime__media-wrapper">
              {MILESTONES.map((m, i) => (
                <div key={i} className={`atime__media js-atime-img-${i}`} style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'inherit' : 'hidden' }}>
                  <img src={m.img.src} alt={m.img.alt} />
                </div>
              ))}
            </div>
          </div>

          <div className="atime__content">
            <div className="atime__track">
              <div className="atime__track-bg"></div>
              <div className="atime__track-fill js-atime-progress"></div>
            </div>
            
            <div className="atime__items">
              {MILESTONES.map((m, i) => (
                <div key={i} className={`atime__item js-atime-item-${i}`} style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'inherit' : 'hidden', position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
                  <h3 className="atime__year ssk-h-section">{m.year}</h3>
                  <h4 className="atime__title ssk-h-sub">{m.title}</h4>
                  <p className="atime__desc ssk-body">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Visual Timeline (< 1024px): Adapts full visual design with line, photos, and milestones */}
        <div className="atime__mobile">
          <div className="atime__mtrack">
            <div className="atime__mtrack-line" />
          </div>

          <div className="atime__mitems">
            {MILESTONES.map((m, i) => (
              <article key={i} className="atime__mitem">
                <div className="atime__mnode" aria-hidden="true">
                  <span className="atime__mnode-dot" />
                </div>

                <div className="atime__mcard">
                  <div className="atime__mcard-head">
                    <span className="atime__myear">{m.year}</span>
                    <h3 className="atime__mtitle">{m.title}</h3>
                  </div>

                  <div className="atime__mmedia">
                    <img src={m.img.src} alt={m.img.alt} loading="lazy" />
                  </div>

                  <p className="atime__mdesc">{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
