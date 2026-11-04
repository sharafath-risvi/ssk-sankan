import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SskLayout from './layouts/SskLayout';
import SankanLayout from './layouts/SankanLayout';
import SskHome from './pages/ssk/Home';
import SskAbout from './pages/ssk/About';
import SskServices from './pages/ssk/Services';
import SskServiceDetail from './pages/ssk/ServiceDetail';
import SskContact from './pages/ssk/Contact';
import Sankan from './pages/sankan/Sankan';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SskLayout />}>
          <Route index element={<SskHome />} />
          <Route path="about" element={<SskAbout />} />
          <Route path="services" element={<SskServices />} />
          <Route path="services/:slug" element={<SskServiceDetail />} />
          <Route path="contact" element={<SskContact />} />
        </Route>
  
        <Route path="/sankan" element={<SankanLayout />}>
          <Route index element={<Sankan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
