import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/main logo.png';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar-overlay vort-nav" style={{ position: 'absolute', top: '24px', left: 0, width: '100%', zIndex: 100 }}>
      <div className="vort-nav-inner">
        <Link to="/" className="nav-brand" style={{ cursor: 'pointer', textDecoration: 'none' }} aria-label="Jay AMBE Industries Home">
          <img src={mainLogo} alt="Jay AMBE Industries" className="nav-brand-logo-img" />
        </Link>
        
        <div className="vort-menu-pill">
          <Link to="/" className={`vort-menu-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`vort-menu-item ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/products" className={`vort-menu-item ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link>
          <Link to="/industries" className={`vort-menu-item ${location.pathname.startsWith('/industries') ? 'active' : ''}`}>Industries</Link>
          <Link to="/manufacturing" className={`vort-menu-item ${location.pathname.startsWith('/manufacturing') ? 'active' : ''}`}>Manufacturing</Link>
          <Link to="/exports" className={`vort-menu-item ${location.pathname === '/exports' ? 'active' : ''}`}>Exports</Link>
          <Link to="/projects" className={`vort-menu-item ${location.pathname.startsWith('/projects') ? 'active' : ''}`}>Projects</Link>
          <Link to="/contact" className={`vort-menu-item ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </div>
        
        <Link to="/contact" className="vort-cta-pill" style={{ textDecoration: 'none' }}>
          Request a Quote &rarr;
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
