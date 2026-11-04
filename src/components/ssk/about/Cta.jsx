import { Link } from 'react-router-dom';
import Lines from '../../shared/Lines';
import { ABOUT_IMG } from '../../../assets/ssk/images';

const Cta = () => {
  return (
    <section className="acta bg-[color:var(--ssk-dark)] text-[color:var(--ssk-on-dark)]">
      <div className="acta__bg js-cta-bg" data-parallax="0.2">
        <img src={ABOUT_IMG.cta.src} alt={ABOUT_IMG.cta.alt} loading="lazy" />
        <div className="acta__overlay"></div>
      </div>
      
      <div className="acta__inner">
        <div className="acta__content">
          <h2 className="acta__title ssk-h-hero" data-reveal="lines">
            <Lines lines={["Let's Build", 'What Comes', 'Next.']} accent={2} />
          </h2>
          
          <p className="acta__desc ssk-body" data-reveal="fade" data-dir="up">
            Discover our comprehensive range of services and machinery.
          </p>
          
          <div className="acta__actions" data-reveal="fade" data-dir="up">
            <Link to="/contact" className="btn btn--solid">
              Get in Touch
            </Link>
            <Link to="/services" className="btn btn--ghost">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
