import { Outlet } from 'react-router-dom';
import SskNavbar from '../components/ssk/Navbar';
import SskFooter from '../components/ssk/Footer';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import { useLayoutEffect } from 'react';
import '../styles/ssk/base.css';

const SskLayout = () => {
  // Reset body theme to SSK immediately before paint
  useLayoutEffect(() => {
    document.body.className = 'theme-ssk';
    document.title = 'SSK | Built on Precision';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SskNavbar />
      <main id="main" className="flex-grow">
        <Outlet />
      </main>
      <SskFooter />
      <WhatsAppButton />
    </div>
  );
};

export default SskLayout;
