import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { industriesData } from '../data/industriesData';

import heroBg from '../assets/hero_bg_1.png';
import factoryViewImg from '../assets/factory_view.png';
import blueprintImg from '../assets/vessel_blueprint.png';

gsap.registerPlugin(ScrollTrigger);

function IndustriesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSector, setActiveSector] = useState('dairy-farms');
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Dairy Processing Plants',
    message: ''
  });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          setActiveSector(targetId);
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // GSAP reveal animations
    const revealElements = gsap.utils.toArray('.industries-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const sectorSections = industriesData.map(s => document.getElementById(s.id)).filter(Boolean);
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sectorSections.length - 1; i >= 0; i--) {
        const sec = sectorSections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSector(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [location]);

  const handleNavClick = (e, sectorId) => {
    e.preventDefault();
    setActiveSector(sectorId);
    const el = document.getElementById(sectorId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! Your industry equipment requirement for ${enquiryForm.industry} has been received. Our engineering desk will connect with you within 24 hours.`);
    setEnquiryForm({ name: '', company: '', email: '', phone: '', industry: 'Dairy Processing Plants', message: '' });
  };

  const handleCustomQuote = (industryName) => {
    navigate('/contact', {
      state: {
        category: 'Industry Application Requirement',
        enquiryType: 'Project Discussion',
        message: `I would like to discuss an equipment requirement for the ${industryName} sector.`
      }
    });
  };

  return (
    <div className="industries-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* 1. INDUSTRIES HERO */}
      <header className="about-hero-section" style={{ minHeight: '520px', backgroundColor: '#0a0a0a', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center' }}>
        <div className="about-hero-bg">
          <img src={factoryViewImg} alt="Jay AMBE Stainless Steel Manufacturing Facility" className="about-hero-bg-img" style={{ opacity: 0.35 }} />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="container-centered about-hero-content" style={{ zIndex: 10, paddingTop: '110px', paddingBottom: '50px' }}>
          <div className="about-breadcrumbs" style={{ marginBottom: '16px' }}>
            <Link to="/" className="breadcrumb-link" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: '#666666', margin: '0 8px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontWeight: 600 }}>Industries & Applications</span>
          </div>

          <h1 className="about-hero-title" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: '880px' }}>
            Engineering Stainless Steel Equipment Across Critical Processing Industries
          </h1>

          <p className="about-hero-desc" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#dddddd', lineHeight: 1.6, maxWidth: '750px', marginTop: '18px' }}>
            Jay AMBE Industries manufactures food-grade stainless-steel process machinery, sanitary storage vessels, mega-kitchen cauldrons, and custom equipment built around the operational hygiene and capacity demands of key sectors.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a href="#dairy-farms" onClick={(e) => handleNavClick(e, 'dairy-farms')} className="vort-btn-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              Explore Industries Served &rarr;
            </a>
            <button onClick={() => navigate('/contact')} className="vort-btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              Discuss Your Industry Requirement
            </button>
          </div>
        </div>
      </header>

      {/* 2. TEXT-FIRST STICKY QUICK INDEX NAVIGATION */}
      <nav className="industries-sticky-nav" aria-label="Industries Sector Index">
        <div className="container-centered">
          <div className="ind-nav-inner">
            <span className="ind-nav-label">JUMP TO SECTOR:</span>
            <div className="ind-nav-links">
              {industriesData.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => handleNavClick(e, sec.id)}
                  className={`ind-nav-link ${activeSector === sec.id ? 'active' : ''}`}
                >
                  {sec.name}
                </a>
              ))}
            </div>
            <select
              className="ind-nav-mobile-select"
              value={activeSector}
              onChange={(e) => handleNavClick(e, e.target.value)}
              aria-label="Select Target Sector"
            >
              {industriesData.map((sec) => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* 3. SECTOR-BY-SECTOR DETAILED SECTIONS */}
      {industriesData.map((sector, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={sector.id}
            id={sector.id}
            className={`industry-sector-section industries-reveal ${isEven ? 'alt-bg' : ''}`}
          >
            <div className="container-centered">
              <div className={`sector-grid ${isEven ? 'layout-normal' : 'layout-reverse'}`}>
                {/* Text Content Block */}
                <div className="sector-text-box">
                  <div className="sector-meta-header">
                    <span className="sector-step-num">{sector.num}</span>
                    <span className="sector-badge-tag">{sector.badgeText}</span>
                  </div>
                  
                  <h2 className="sector-title">{sector.heading}</h2>
                  <p className="sector-desc">{sector.description}</p>

                  <div className="sector-solutions-block">
                    <h3 className="solutions-title">Relevant AMBE Solutions & Equipment:</h3>
                    <ul className="solutions-list">
                      {sector.solutions.map((sol, i) => (
                        <li key={i} className="solution-item">
                          <span className="sol-check">✓</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sector-app-target">
                    <strong>Target Applications:</strong> {sector.primaryApp}
                  </div>

                  <div className="sector-actions">
                    <Link to={sector.ctaPath} className="vort-btn-primary">
                      {sector.ctaText} &rarr;
                    </Link>
                    <button
                      onClick={() => handleCustomQuote(sector.name)}
                      className="vort-btn-secondary"
                    >
                      {sector.secondaryCtaText}
                    </button>
                  </div>
                </div>

                {/* Visual Image Block */}
                <div className="sector-image-box">
                  <div className="sector-image-wrapper">
                    <img src={sector.image} alt={`${sector.name} Stainless Steel Equipment`} className="sector-img" />
                    <div className="sector-image-overlay">
                      <span className="overlay-sector-name">{sector.name}</span>
                      <span className="overlay-sub">Jay AMBE Sanitary Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 4. HYGIENIC ENGINEERING & MATERIAL CAPABILITY HIGHLIGHT BAND */}
      <section className="hygienic-engineering-band industries-reveal">
        <div className="container-centered">
          <div className="hygienic-band-header">
            <span className="text-label-caps accent-red">HYGIENE & METALLURGY STANDARDS</span>
            <h2 className="text-headline-md">Engineered Around Sanitary & Thermal Operating Requirements</h2>
            <p className="text-body-md">
              Whether supplying high-volume raw milk intake cans or custom limpet-jacketed process vessels, Jay AMBE Industries enforces rigorous metallurgy and surface finish protocols.
            </p>
          </div>

          <div className="hygienic-grid-4col">
            <div className="hygienic-card">
              <span className="hygienic-num">01</span>
              <h4>SS304 & SS316L Prime Material</h4>
              <p>Certified prime stainless steel sheets, pipes, and fittings accompanied by mill test reports.</p>
            </div>

            <div className="hygienic-card">
              <span className="hygienic-num">02</span>
              <h4>Sanitary Internal Polish (Ra &lt; 0.4 µm)</h4>
              <p>Mechanical internal polishing ensuring crevice-free surfaces that resist bacterial growth.</p>
            </div>

            <div className="hygienic-card">
              <span className="hygienic-num">03</span>
              <h4>Purged TIG Welded Seams</h4>
              <p>Argon-purged TIG welding creating smooth, uniform joints capable of continuous CIP cleaning.</p>
            </div>

            <div className="hygienic-card">
              <span className="hygienic-num">04</span>
              <h4>Hydrostatic Hold Testing</h4>
              <p>Pre-dispatch pressure and leak testing for jacketed vessels, cooling tanks, and boilers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL INDUSTRY TECHNICAL ENQUIRY CTA SECTION */}
      <section className="industry-final-cta-section industries-reveal" id="industry-enquiry">
        <div className="container-centered">
          <div className="ind-final-grid">
            <div className="ind-final-left">
              <span className="text-label-caps accent-red">ENGINEERING DESK SUPPORT</span>
              <h2 className="ind-final-heading">Need Equipment Built Around Your Specific Sector?</h2>
              <p className="ind-final-desc">
                Share your operational capacity, thermal process, or drawing specifications. Our engineering team will review your application requirements and recommend standard or custom-built stainless steel equipment.
              </p>
              
              <div className="ind-blueprint-card">
                <img src={blueprintImg} alt="Engineering Blueprint Review" className="blueprint-thumb" />
                <div>
                  <strong>OEM & Drawing-Based Fabrication</strong>
                  <p>Send CAD drawings or application sketches for OEM quote estimation.</p>
                </div>
              </div>
            </div>

            <div className="ind-final-right">
              <div className="ind-form-card">
                <h3>Discuss Your Industry Requirement</h3>
                <p className="form-subtext">Fill out your details to connect directly with our engineering desk.</p>
                
                <form onSubmit={handleEnquirySubmit} className="ind-form">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Company / Unit Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AMUL Dairy / National Kitchens"
                      value={enquiryForm.company}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Target Industry Sector</label>
                    <select
                      value={enquiryForm.industry}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, industry: e.target.value })}
                    >
                      {industriesData.map(sec => <option key={sec.id} value={sec.name}>{sec.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Describe Application / Capacity Need</label>
                    <textarea
                      rows="3"
                      placeholder="Mention capacity (Liters / KG), heating medium, or custom specifications..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="vort-btn-primary" style={{ width: '100%', padding: '14px' }}>
                    Connect With Engineering Desk &rarr;
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default IndustriesPage;
