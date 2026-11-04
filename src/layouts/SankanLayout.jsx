import { Outlet } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import WhatsAppButton from '../components/shared/WhatsAppButton';

const SankanLayout = () => {
  // Set body theme to Sankan, and clean it up immediately on unmount
  useLayoutEffect(() => {
    document.body.className = 'theme-sankan';
    document.title = 'Sankan';
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Outlet />
      <WhatsAppButton />
    </div>
  );
};

export default SankanLayout;
