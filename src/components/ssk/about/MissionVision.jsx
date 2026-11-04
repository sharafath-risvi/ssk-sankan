import { useLayoutEffect, useRef } from 'react';
import { gsap, PINNED } from '../../../utils/gsap';
import { ABOUT_IMG } from '../../../assets/ssk/images';

const MissionVision = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.matchMedia();

    ctx.add(PINNED, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Instead of simple fade/translate, we clip the text exactly like the image,
      // and add a subtle inner drift so the text feels like it's being "revealed" organically.
      tl.to('.js-mv-mission-content', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1 })
        .to('.js-mv-mission-inner', { yPercent: -15, duration: 1 }, '<')
        .fromTo('.js-mv-vision-content', 
          { clipPath: 'inset(0% 0% 100% 0%)' }, 
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, '<')
        .fromTo('.js-mv-vision-inner', 
          { yPercent: 15 }, 
          { yPercent: 0, duration: 1 }, '<')
        // Image transitions (same timing)
        .to('.js-mv-mission-img', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1 }, '<')
        .fromTo('.js-mv-vision-img', { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.1 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1 }, '<');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="amv bg-[color:var(--ssk-light)] text-[color:var(--ssk-dark)]">
      <div className="amv__inner">
        <div className="amv__grid">
          
          <div className="amv__content-col">
            <div className="amv__content-wrapper">
              
              <div className="amv__block js-mv-mission-content">
                <div className="js-mv-mission-inner">
                  <p className="ssk-eyebrow amv__eyebrow">Our Mission</p>
                  <p className="amv__text ssk-h-sub">
                    To supply top-quality materials and precise edge banding that make interior work easier, stronger, and more beautiful for our customers.
                  </p>
                </div>
              </div>

              <div className="amv__block amv__block--vision js-mv-vision-content">
                <div className="js-mv-vision-inner">
                  <p className="ssk-eyebrow amv__eyebrow">Our Vision</p>
                  <p className="amv__text ssk-h-sub">
                    To be South India's most trusted name for interior materials, known by every woodworker and homeowner for honest quality and helpful service.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="amv__media-col">
            <div className="amv__media-wrapper">
              
              <div className="amv__media js-mv-vision-img">
                <img src={ABOUT_IMG.vision.src} alt={ABOUT_IMG.vision.alt} />
              </div>

              <div className="amv__media amv__media--top js-mv-mission-img">
                <img src={ABOUT_IMG.mission.src} alt={ABOUT_IMG.mission.alt} />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
