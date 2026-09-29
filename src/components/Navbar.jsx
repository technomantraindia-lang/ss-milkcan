import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mainLogo from '../assets/main logo.png';

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Industries', path: '/industries' },
    { label: 'Manufacturing', path: '/manufacturing' },
    { label: 'Exports', path: '/exports' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className="navbar-overlay vort-nav">
        <div className="vort-nav-inner">
          <Link to="/" className="nav-brand" aria-label="Jay AMBE Industries Home">
            <img src={mainLogo} alt="Jay AMBE Industries" className="nav-brand-logo-img" />
          </Link>
          
          <div className="vort-menu-pill">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`vort-menu-item ${
                  link.path === '/' 
                    ? location.pathname === '/' ? 'active' : ''
                    : location.pathname.startsWith(link.path) ? 'active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="nav-right-actions">
            <Link to="/contact" className="vort-cta-pill">
              Request a Quote &rarr;
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line top"></span>
              <span className="hamburger-line middle"></span>
              <span className="hamburger-line bottom"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop & Drawer */}
      <div 
        className={`mobile-menu-drawer-wrapper ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className="mobile-menu-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-header">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="nav-brand">
              <img src={mainLogo} alt="Jay AMBE Industries" className="nav-brand-logo-img" style={{ height: '42px' }} />
            </Link>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mobile-drawer-links">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="mobile-link-arrow">&rarr;</span>
                </Link>
              );
            })}
          </div>

          <div className="mobile-drawer-footer">
            <Link 
              to="/contact" 
              className="vort-btn-primary mobile-quote-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Fast Quote &rarr;
            </Link>
            <div className="mobile-contact-snippet">
              <p>📞 <a href="tel:+919426360756">+91 94263 60756</a></p>
              <p>✉️ <a href="mailto:jayambeindustries111@gmail.com">jayambeindustries111@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
