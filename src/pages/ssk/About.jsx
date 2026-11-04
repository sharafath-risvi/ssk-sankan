import { useEffect } from 'react';
import { ScrollTrigger } from '../../utils/gsap';
import { setupReveals } from '../../utils/reveals';

import Hero from '../../components/ssk/about/Hero';
import Story from '../../components/ssk/about/Story';
import Founder from '../../components/ssk/about/Founder';
import MissionVision from '../../components/ssk/about/MissionVision';
import Timeline from '../../components/ssk/about/Timeline';
import Cta from '../../components/ssk/home/Cta';

import '../../styles/ssk/about-page.css';

const SskAbout = () => {
  // Re-run setupReveals and ScrollTrigger.refresh on mount
  useEffect(() => {
    const root = document.querySelector('.ssk-about');
    if (root) {
      setupReveals(root);
    }
    
    // Refresh ScrollTrigger after fonts/images load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    const onImageLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onImageLoad);
    return () => window.removeEventListener('load', onImageLoad);
  }, []);

  return (
    <div className="ssk-about">
      <Hero />
      <Story />
      <Founder />
      <MissionVision />
      <Timeline />
      <Cta />
    </div>
  );
};

export default SskAbout;
