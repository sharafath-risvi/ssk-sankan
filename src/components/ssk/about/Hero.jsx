import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION } from '../../../utils/gsap';
import Lines from '../../shared/Lines';
import { ABOUT_IMG } from '../../../assets/ssk/images';

const Hero = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.matchMedia();
    
    ctx.add(MOTION, () => {
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });

      tl.fromTo('.js-ahero-media', 
        { clipPath: 'inset(20% 10% 20% 10%)', scale: 1.1 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 2, ease: 'power4.inOut' }
      )
      .fromTo('.js-ahero-img',
        { scale: 1.3 },
        { scale: 1, duration: 2, ease: 'power4.inOut' },
        0
      )
      .fromTo('.js-ahero-line .line__inner',
        { yPercent: 120 },
        { yPercent: 0, duration: 1.6, stagger: 0.1 },
        0.5
      )
      .fromTo('.js-ahero-fade',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1 },
        1.2
      );

      // Scroll out parallax
      gsap.to('.js-ahero-bg', {
        yPercent: 20,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to('.js-ahero-content', {
        yPercent: -15,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="ahero grain">
      <div className="ahero__media js-ahero-media">
        <div className="ahero__bg js-ahero-bg">
          <img src={ABOUT_IMG.hero.src} alt={ABOUT_IMG.hero.alt} className="js-ahero-img" fetchPriority="high" />
          <div className="ahero__overlay"></div>
        </div>
      </div>
      
      <div className="ahero__inner js-ahero-content">
        <div className="ahero__top js-ahero-fade">
          <p className="ssk-eyebrow">About SSK</p>
        </div>
        
        <h1 className="ahero__title ssk-h-hero js-ahero-line">
          <Lines lines={['Built on Quality.', 'Driven by Trust.']} />
        </h1>
        
        <div className="ahero__bottom js-ahero-fade">
          <p className="ahero__desc ssk-body">
            We supply quality edge banding, calibrated plywood and interior materials for furniture makers and builders across South India.
          </p>
          <a href="#story" className="ahero__scroll">
            <span className="ahero__scroll-text">Explore our story</span>
            <span className="sr-only">Scroll down</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
