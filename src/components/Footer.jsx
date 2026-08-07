import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Footer() {
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
    <footer className="footer-reveal-container">
      <div className="container-centered">
        <div className="footer-grid-5">
          
          <div className="footer-col">
            <span className="footer-col-title">Company</span>
            <ul className="footer-col-links">
              <li><Link to="/about" className="footer-col-link">About Us</Link></li>
              <li><a href="#process-section" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#process-section')}>Manufacturing</a></li>
              <li><a href="#quality-philosophy-section" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#quality-philosophy-section')}>Quality Standards</a></li>
              <li><Link to="/exports" className="footer-col-link">Export Markets</Link></li>
              <li><Link to="/contact" className="footer-col-link">Contact Desk</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Products</span>
            <ul className="footer-col-links">
              <li><Link to="/products#milk-collection-handling" className="footer-col-link">Milk Collection & Handling</Link></li>
              <li><Link to="/products#dairy-processing-equipment" className="footer-col-link">Dairy Processing Equipment</Link></li>
              <li><Link to="/products#institutional-mega-kitchen-equipment" className="footer-col-link">Institutional Kitchens</Link></li>
              <li><Link to="/products#process-storage-equipment" className="footer-col-link">Process & Storage Equipment</Link></li>
              <li><Link to="/products#custom-stainless-steel-fabrication" className="footer-col-link">Custom Fabrication</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Industries</span>
            <ul className="footer-col-links">
              <li><a href="#divisions" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#divisions')}>Dairy Processing</a></li>
              <li><a href="#divisions" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#divisions')}>Food Processing</a></li>
              <li><a href="#divisions" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#divisions')}>Institutional Kitchens</a></li>
              <li><a href="#divisions" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#divisions')}>Beverage Industry</a></li>
              <li><a href="#divisions" className="footer-col-link" onClick={(e) => handleSectionClick(e, '#divisions')}>Hygienic Storage</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Resources</span>
            <ul className="footer-col-links">
              <li><Link to="/exports" className="footer-col-link">Product Catalogue</Link></li>
              <li><Link to="/exports" className="footer-col-link">Technical Articles</Link></li>
              <li><Link to="/contact" className="footer-col-link">Technical FAQs</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Contact</span>
            <div className="footer-col-links">
              <div className="footer-contact-row">
                <span className="footer-contact-label">FACTORY SITE</span>
                <span className="footer-contact-val">Plot No. 42-A, GIDC Industrial Estate, Gujarat, India</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-label">TELEPHONE</span>
                <span className="footer-contact-val">+91 9904X XXXXX</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-label">CORRESPONDENCE EMAIL</span>
                <span className="footer-contact-val">info@jayambeindustries.example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <span className="footer-bottom-copy">© 2026 JAY AMBE INDUSTRIES. REGISTERED MANUFACTURING DIVISION.</span>
          </div>
          <div>
            <span className="footer-bottom-meta">STITCH: projects/5092170491196303714 // REV. 05.02</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
