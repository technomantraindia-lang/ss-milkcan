import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData, projectStats } from '../data/projectsData';

import factoryViewImg from '../assets/factory_view.png';
import blueprintImg from '../assets/vessel_blueprint.png';
import dispatchImg from '../assets/dispatch_loading.png';

gsap.registerPlugin(ScrollTrigger);

function ProjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectCategory: 'Dairy Processing Plant',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const revealElements = gsap.utils.toArray('.proj-reveal');
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const categories = ['All', 'Export Supply', 'Dairy Plants', 'Mega Kitchens', 'Custom OEM'];

  const filteredProjects = activeTab === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeTab);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! Your project inquiry regarding "${enquiryForm.projectCategory}" has been submitted. Our engineering desk will contact you within 24 hours.`);
    setEnquiryForm({ name: '', company: '', email: '', phone: '', projectCategory: 'Dairy Processing Plant', message: '' });
  };

  return (
    <div className="projects-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* 1. DARK HERO SECTION */}
      <header className="about-hero-section" style={{ minHeight: '520px', backgroundColor: '#0a0a0a', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center' }}>
        <div className="about-hero-bg">
          <img src={dispatchImg} alt="Jay AMBE Project Dispatch" className="about-hero-bg-img" style={{ opacity: 0.35 }} />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="container-centered about-hero-content" style={{ zIndex: 10, paddingTop: '110px', paddingBottom: '50px' }}>
          <div className="about-breadcrumbs" style={{ marginBottom: '16px' }}>
            <Link to="/" className="breadcrumb-link" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: '#666666', margin: '0 8px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontWeight: 600 }}>Projects & Case Studies</span>
          </div>

          <h1 className="about-hero-title" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: '880px' }}>
            Engineering Projects & International Supply Proof
          </h1>

          <p className="about-hero-desc" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#dddddd', lineHeight: 1.6, maxWidth: '750px', marginTop: '18px' }}>
            Explore our track record of completed stainless-steel dairy processing installations, institutional mega-kitchen cauldrons, regional milk chilling hubs, and OEM container dispatches across India, South Asia, Middle East, and East Africa.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a href="#projects-grid-section" className="vort-btn-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              Explore Case Studies &rarr;
            </a>
            <button onClick={() => navigate('/contact')} className="vort-btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              Discuss Your Project
            </button>
          </div>
        </div>
      </header>

      {/* 2. PROJECT METRICS TRUST BAR */}
      <section className="proj-stats-bar proj-reveal">
        <div className="container-centered">
          <div className="proj-stats-grid">
            {projectStats.map((stat, idx) => (
              <div key={idx} className="proj-stat-card">
                <span className="proj-stat-num">{stat.num}</span>
                <span className="proj-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDY SPOTLIGHT */}
      <section className="proj-featured-section proj-reveal">
        <div className="container-centered">
          <div className="featured-project-banner">
            <div className="feat-proj-img-box">
              <img src={dispatchImg} alt="Bangladesh Dairy Cooperative Project" className="feat-proj-img" />
              <span className="feat-badge">SPOTLIGHT CASE STUDY</span>
            </div>

            <div className="feat-proj-text-box">
              <span className="text-label-caps accent-red">INTERNATIONAL EXPORT SUPPLY</span>
              <h2 className="feat-proj-title">Bangladesh Regional Milk Collection & Chilling Hub Supply</h2>
              <p className="feat-proj-location">📍 Dhaka & Bogra, Bangladesh 🇧🇩 • Year 2024</p>
              <p className="feat-proj-desc">
                Supplied 165+ heavy-duty stainless steel milk cans and insulated buffer tanks to prevent raw milk spoilage across 12 rural collection routes, reducing spillage rate by 94%.
              </p>

              <div className="feat-proj-pills">
                <span>4,500L Total Capacity</span>
                <span>SS304 Food-Grade</span>
                <span>40ft Container Load</span>
              </div>

              <button
                onClick={() => setSelectedProject(projectsData[0])}
                className="vort-btn-primary"
                style={{ marginTop: '20px' }}
              >
                View Full Technical Case Study &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORY FILTER TABS & PROJECTS GRID */}
      <section className="proj-main-grid-section proj-reveal" id="projects-grid-section">
        <div className="container-centered">
          <div className="proj-section-header">
            <div>
              <span className="text-label-caps accent-red">PROVEN EXECUTION</span>
              <h2 className="text-headline-md font-strong">Commercial & Export Project Portfolio</h2>
            </div>

            {/* Filter Pills */}
            <div className="proj-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`proj-tab-btn ${activeTab === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="proj-cards-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="proj-card">
                <div className="proj-card-img-wrapper">
                  <img src={project.image} alt={project.title} className="proj-card-img" />
                  <span className="proj-card-cat-badge">{project.categoryTag}</span>
                  <span className="proj-card-spec-badge">{project.badgeText}</span>
                </div>

                <div className="proj-card-body">
                  <div className="proj-card-location">{project.location}</div>
                  <h3 className="proj-card-title">{project.title}</h3>
                  <p className="proj-card-scope">{project.scope}</p>

                  <div className="proj-card-equipment-list">
                    <strong>Key Equipment Delivered:</strong>
                    <ul>
                      {project.equipmentSupplied.slice(0, 2).map((eq, i) => (
                        <li key={i}>• {eq}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="proj-card-footer">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="product-btn-premium"
                    >
                      View Case Study & Specs &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROJECT LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="proj-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="proj-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>

            <div className="proj-modal-header">
              <span className="text-label-caps accent-red">{selectedProject.categoryTag} • YEAR {selectedProject.year}</span>
              <h2 className="modal-project-title">{selectedProject.title}</h2>
              <div className="modal-location">📍 {selectedProject.location} | Client: {selectedProject.client}</div>
            </div>

            <div className="proj-modal-grid">
              <div className="modal-left">
                <div className="modal-img-wrapper">
                  <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
                </div>
                <div className="modal-specs-box">
                  <div className="spec-row">
                    <span>CAPACITY:</span>
                    <strong>{selectedProject.capacity}</strong>
                  </div>
                  <div className="spec-row">
                    <span>MATERIAL GRADE:</span>
                    <strong>{selectedProject.material}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-right">
                <div className="modal-section">
                  <h4>The Operational Challenge</h4>
                  <p>{selectedProject.challenge}</p>
                </div>

                <div className="modal-section">
                  <h4>AMBE Engineering Solution</h4>
                  <p>{selectedProject.solution}</p>
                </div>

                <div className="modal-section">
                  <h4>Key Equipment Supplied</h4>
                  <ul className="modal-eq-list">
                    {selectedProject.equipmentSupplied.map((eq, i) => (
                      <li key={i}>✓ {eq}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section result-box">
                  <strong>Project Result:</strong>
                  <p>{selectedProject.result}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    navigate('/contact', {
                      state: {
                        category: 'Project Discussion',
                        enquiryType: 'Similar Project Requirement',
                        message: `I am interested in a requirement similar to: ${selectedProject.title}`
                      }
                    });
                  }}
                  className="vort-btn-primary"
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  Discuss a Similar Requirement &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. FINAL PROJECT DISCUSSION & CAD BLUEPRINT CTA */}
      <section className="proj-final-cta-section proj-reveal">
        <div className="container-centered">
          <div className="proj-final-grid">
            <div className="proj-final-left">
              <span className="text-label-caps accent-red">ENGINEERING DESK CONSULTATION</span>
              <h2 className="final-cta-title">Planning a Dairy, Process or Institutional Project?</h2>
              <p className="final-cta-desc">
                Whether you are setting up a new milk collection network, expanding a dairy processing plant, installing a central canteen, or looking for OEM contract fabrication, Jay AMBE Industries can execute standard and customized equipment to your specifications.
              </p>

              <div className="final-blueprint-card">
                <img src={blueprintImg} alt="CAD Drawing Engineering Review" className="blueprint-thumb" />
                <div>
                  <strong>OEM & Drawing-Based Fabrication</strong>
                  <p>Send your CAD drawing or dimensional sketch for project estimation.</p>
                </div>
              </div>
            </div>

            <div className="proj-final-right">
              <div className="proj-form-card">
                <h3>Discuss Your Project Requirement</h3>
                <p className="form-subtext">Share your capacity, location, and equipment requirements.</p>

                <form onSubmit={handleEnquirySubmit} className="proj-form">
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
                    <label>Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lanka Dairies / National Canteens"
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
                    <label>Project Type</label>
                    <select
                      value={enquiryForm.projectCategory}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, projectCategory: e.target.value })}
                    >
                      <option value="Dairy Processing Plant">Dairy Processing Plant</option>
                      <option value="Milk Collection & Chilling Hub">Milk Collection & Chilling Hub</option>
                      <option value="Institutional & Mega Kitchen">Institutional & Mega Kitchen</option>
                      <option value="Export Container Order">Export Container Order</option>
                      <option value="Custom OEM Fabrication">Custom OEM Fabrication</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Describe Capacity, Timeline & Equipment Needed</label>
                    <textarea
                      rows="3"
                      placeholder="Mention capacity (Litres / KG), destination port/city, or custom drawing details..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="vort-btn-primary" style={{ width: '100%', padding: '14px' }}>
                    Ask Engineering Desk to Review Project &rarr;
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

export default ProjectsPage;
