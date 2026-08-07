import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
        <Link to="/" className="nav-brand" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <svg className="nav-brand-logo-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35,20 L100,20 L100,140 L35,140 Z" fill="#c91c1c" />
            <path d="M100,20 L165,20 L165,140 L100,140 Z" fill="#c91c1c" />
            <polygon points="100,45 30,140 170,140" fill="#ffffff" />
            <circle cx="100" cy="10" r="3" fill="#c91c1c" />
            <circle cx="100" cy="102" r="24" fill="#c91c1c" />
          </svg>
          <div className="brand-logo-text-group">
            <span className="nav-brand-title" style={{ color: '#ffffff' }}>JAY AMBE</span>
            <span className="nav-brand-subtitle" style={{ color: '#888888' }}>INDUSTRIES</span>
          </div>
        </Link>
        
        <div className="vort-menu-pill">
          <Link to="/" className={`vort-menu-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`vort-menu-item ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/products" className={`vort-menu-item ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link>
          <a href="/#divisions" className="vort-menu-item" onClick={(e) => handleSectionClick(e, '#divisions')}>Industries</a>
          <a href="/#process-section" className="vort-menu-item" onClick={(e) => handleSectionClick(e, '#process-section')}>Manufacturing</a>
          <Link to="/exports" className={`vort-menu-item ${location.pathname === '/exports' ? 'active' : ''}`}>Exports</Link>
          <a href="/#projects" className="vort-menu-item" onClick={(e) => handleSectionClick(e, '#projects')}>Projects</a>
          <a href="/#knowledge" className="vort-menu-item" onClick={(e) => handleSectionClick(e, '#knowledge')}>Knowledge Centre</a>
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
