import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  manufacturingWorkflow,
  materialGrades,
  fabricationCapabilities,
  qualitySteps
} from '../data/manufacturingData';

import factoryViewImg from '../assets/factory_view.png';
import weldingImg from '../assets/welding_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';
import dispatchImg from '../assets/dispatch_loading.png';
import blueprintImg from '../assets/vessel_blueprint.png';

gsap.registerPlugin(ScrollTrigger);

function ManufacturingPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirementType: 'Custom Stainless Steel Fabrication',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const revealElements = gsap.utils.toArray('.mfg-reveal');
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

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! Your manufacturing inquiry regarding "${enquiryForm.requirementType}" has been received. Our engineering team will review your specifications.`);
    setEnquiryForm({ name: '', company: '', email: '', phone: '', requirementType: 'Custom Stainless Steel Fabrication', message: '' });
  };

  return (
    <div className="manufacturing-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* 1. MANUFACTURING HERO */}
      <header className="about-hero-section" style={{ minHeight: '520px', backgroundColor: '#0a0a0a', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center' }}>
        <div className="about-hero-bg">
          <img src={factoryViewImg} alt="Jay AMBE Stainless Steel Manufacturing Facility" className="about-hero-bg-img" style={{ opacity: 0.35 }} />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="container-centered about-hero-content" style={{ zIndex: 10, paddingTop: '110px', paddingBottom: '50px' }}>
          <div className="about-breadcrumbs" style={{ marginBottom: '16px' }}>
            <Link to="/" className="breadcrumb-link" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: '#666666', margin: '0 8px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontWeight: 600 }}>Manufacturing & Facility Infrastructure</span>
          </div>

          <h1 className="about-hero-title" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: '880px' }}>
            Manufacturing Stainless Steel Equipment Around Real Process Requirements
          </h1>

          <p className="about-hero-desc" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#dddddd', lineHeight: 1.6, maxWidth: '750px', marginTop: '18px' }}>
            Jay AMBE Industries manufactures food-grade stainless-steel equipment for dairy processing, food production, mega kitchens, and hygienic industrial facilities. From standard equipment to drawing-based custom fabrication, every requirement is engineered around capacity, material, and operating conditions.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/contact')} className="vort-btn-primary" style={{ cursor: 'pointer' }}>
              Discuss Your Project &rarr;
            </button>
            <a href="#mfg-workflow" className="vort-btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textDecoration: 'none' }}>
              Explore Manufacturing Process ↓
            </a>
          </div>
        </div>
      </header>

      {/* 2. PHILOSOPHY & CAPABILITY INTRODUCTION */}
      <section className="mfg-intro-section mfg-reveal">
        <div className="container-centered">
          <div className="mfg-intro-grid">
            <div className="mfg-intro-left">
              <span className="text-label-caps accent-red">MANUFACTURING PHILOSOPHY</span>
              <h2 className="mfg-intro-heading">Built for Hygiene. Engineered for Daily Industrial Use.</h2>
              <p className="mfg-intro-text">
                AMBE’s manufacturing approach starts with the operating requirement, not a fixed catalogue configuration. Equipment is developed according to the required volume, product contact conditions, hygiene expectations, heating or cooling needs, mechanical agitation, and final installation layout.
              </p>
              
              <div className="mfg-intro-check-grid">
                <div className="mfg-check-item">
                  <span className="mfg-check-icon">✓</span>
                  <div>
                    <strong>Food-Grade Stainless Steel Fabrication</strong>
                    <p>Prime SS304, SS316, and SS316L sheet and pipe materials.</p>
                  </div>
                </div>

                <div className="mfg-check-item">
                  <span className="mfg-check-icon">✓</span>
                  <div>
                    <strong>Standard & Custom Capacities</strong>
                    <p>Equipment manufactured from 5L farm cans to 25,000L process silos.</p>
                  </div>
                </div>

                <div className="mfg-check-item">
                  <span className="mfg-check-icon">✓</span>
                  <div>
                    <strong>Jacket, Insulation & Agitation Integration</strong>
                    <p>Dimple jackets, thermal oil channels, PUF insulation, and gearmotor mixers.</p>
                  </div>
                </div>

                <div className="mfg-check-item">
                  <span className="mfg-check-icon">✓</span>
                  <div>
                    <strong>Drawing-Based OEM Production</strong>
                    <p>White-label fabrication executed around client CAD drawings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mfg-intro-right">
              <div className="mfg-visual-card">
                <img src={weldingImg} alt="Precision TIG Welding at AMBE" className="mfg-card-img" />
                <div className="mfg-card-overlay">
                  <span className="overlay-title">Sanitary Argon-Purged TIG Welding</span>
                  <span className="overlay-desc">Creating uniform, crevice-free joint seams for CIP cleanability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 8-STAGE WORKFLOW TIMELINE */}
      <section className="mfg-workflow-section mfg-reveal" id="mfg-workflow">
        <div className="container-centered">
          <div className="mfg-section-header text-center">
            <span className="text-label-caps accent-red">STRUCTURED MANUFACTURING SEQUENCE</span>
            <h2 className="text-headline-md font-strong">From Requirement Analysis to Final Dispatch</h2>
            <p className="text-body-md section-sub-desc">
              Every equipment requirement moves through a defined 8-stage sequence to translate your capacity and hygiene specs into reliable machinery.
            </p>
          </div>

          {/* Step Selector Pills */}
          <div className="mfg-steps-nav">
            {manufacturingWorkflow.map((item, idx) => (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`mfg-step-nav-btn ${activeStep === idx ? 'active' : ''}`}
              >
                <span className="nav-step-num">{item.step}</span>
                <span className="nav-step-name">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Box */}
          <div className="mfg-active-step-box">
            <div className="step-showcase-grid">
              <div className="step-showcase-text">
                <div className="step-meta">
                  <span className="step-big-num">STAGE {manufacturingWorkflow[activeStep].step}</span>
                  <span className="step-icon">{manufacturingWorkflow[activeStep].icon}</span>
                </div>
                <h3 className="step-showcase-title">{manufacturingWorkflow[activeStep].title}</h3>
                <p className="step-showcase-desc">{manufacturingWorkflow[activeStep].desc}</p>
                <button onClick={() => navigate('/contact')} className="vort-btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                  Share Your Requirement &rarr;
                </button>
              </div>

              <div className="step-showcase-visual">
                <img
                  src={manufacturingWorkflow[activeStep].image}
                  alt={manufacturingWorkflow[activeStep].title}
                  className="step-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STAINLESS STEEL & MATERIAL EXPERTISE */}
      <section className="mfg-materials-section mfg-reveal alt-bg">
        <div className="container-centered">
          <div className="mfg-section-header">
            <span className="text-label-caps accent-red">METALLURGY & SELECTION</span>
            <h2 className="text-headline-md font-strong">Material Selection Based on Application</h2>
            <p className="text-body-md section-sub-desc">
              Material selection depends on product contact conditions, hygiene standards, corrosion exposure, operating temperature, and customer specifications.
            </p>
          </div>

          <div className="materials-grid-3col">
            {materialGrades.map((mat, i) => (
              <div key={i} className="material-card">
                <span className="mat-badge">{mat.badge}</span>
                <h3 className="mat-grade-title">{mat.grade}</h3>
                <p className="mat-desc">{mat.desc}</p>
                <ul className="mat-features-list">
                  {mat.features.map((feat, fIdx) => (
                    <li key={fIdx}>✓ {feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FABRICATION & ENGINEERING CAPABILITIES */}
      <section className="mfg-capabilities-section mfg-reveal">
        <div className="container-centered">
          <div className="mfg-split-grid">
            <div className="mfg-split-left">
              <span className="text-label-caps accent-red">FABRICATION SCOPE</span>
              <h2 className="text-headline-md font-strong">Fabrication Capabilities for Standard & Custom Equipment</h2>
              <p className="text-body-md">
                AMBE’s manufacturing scope extends beyond basic vessel fabrication to include thermal jacket channels, insulation cladding, motorized agitation drives, and mechanical tilting arrangements.
              </p>

              <div className="capabilities-list-grid">
                {fabricationCapabilities.map((cap, i) => (
                  <div key={i} className="cap-card">
                    <h4>{cap.title}</h4>
                    <p>{cap.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mfg-cap-actions">
                <button onClick={() => navigate('/contact')} className="vort-btn-primary">
                  Discuss Custom Fabrication &rarr;
                </button>
              </div>
            </div>

            <div className="mfg-split-right">
              <div className="mfg-blueprint-box">
                <img src={blueprintImg} alt="Vessel Engineering Blueprint" className="mfg-blueprint-img" />
                <div className="mfg-blueprint-overlay">
                  <h4>CAD Drawing Review Desk</h4>
                  <p>Our engineering team reviews client CAD drawings, dimensional limits, and nozzle schedules prior to manufacturing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MANUFACTURING FACILITY & INFRASTRUCTURE */}
      <section className="mfg-facility-section mfg-reveal alt-bg">
        <div className="container-centered">
          <div className="mfg-facility-grid">
            <div className="facility-text-box">
              <span className="text-label-caps accent-red">PRODUCTION ENVIRONMENT</span>
              <h2 className="text-headline-md font-strong">A Manufacturing Facility Built for Stainless Steel Fabrication</h2>
              <p className="text-body-md">
                Located in the industrial corridor of Kalol, Panchmahal, Gujarat, Jay AMBE Industries operates a dedicated manufacturing facility bringing fabrication, welding, finishing, assembly, inspection, and dispatch under one unified environment.
              </p>

              <div className="facility-specs-list">
                <div className="fac-spec">
                  <span className="fac-spec-label">LOCATION</span>
                  <span className="fac-spec-val">Kalol, Panchmahal, Gujarat, India</span>
                </div>
                <div className="fac-spec">
                  <span className="fac-spec-label">WORKZONES</span>
                  <span className="fac-spec-val">Fabrication, TIG Welding, Mirror Polishing, Assembly, Inspection & Dispatch</span>
                </div>
                <div className="fac-spec">
                  <span className="fac-spec-label">QUALITY ASSURANCE</span>
                  <span className="fac-spec-val">Hydrostatic Hold Testing & Internal Ra Roughness Audits</span>
                </div>
              </div>

              <div className="facility-actions">
                <button onClick={() => navigate('/contact')} className="vort-btn-primary">
                  Schedule a Factory Visit &rarr;
                </button>
              </div>
            </div>

            <div className="facility-image-box">
              <img src={polishingImg} alt="Jay AMBE Hygienic Surface Polishing" className="facility-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUALITY CONTROL THROUGH MANUFACTURING */}
      <section className="mfg-quality-section mfg-reveal">
        <div className="container-centered">
          <div className="mfg-section-header text-center">
            <span className="text-label-caps accent-red">INTEGRATED QUALITY CONTROL</span>
            <h2 className="text-headline-md font-strong">Quality Built Into Every Manufacturing Stage</h2>
            <p className="text-body-md section-sub-desc">
              Quality control is an integrated operational sequence performed from raw sheet intake through final export packing.
            </p>
          </div>

          <div className="quality-grid-6col">
            {qualitySteps.map((q) => (
              <div key={q.num} className="quality-card">
                <span className="q-num">{q.num}</span>
                <h4 className="q-title">{q.title}</h4>
                <p className="q-desc">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EXPORT-READY PACKAGING & CONTAINER LOADING */}
      <section className="mfg-export-section mfg-reveal alt-bg">
        <div className="container-centered">
          <div className="mfg-export-grid">
            <div className="export-img-box">
              <img src={dispatchImg} alt="AMBE Export Container Loading & Packing" className="export-img" />
            </div>

            <div className="export-text-box">
              <span className="text-label-caps accent-red">DESTINATION DISPATCH</span>
              <h2 className="text-headline-md font-strong">Manufactured for the Requirement. Prepared for the Destination.</h2>
              <p className="text-body-md">
                International orders require more than manufacturing the equipment. Product configuration, protective wrapping, ISPM-15 wooden crating, container space planning, and seaworthy lashing are planned around the destination and shipping method.
              </p>

              <div className="export-points-list">
                <div className="exp-point">✓ Protective foam & moisture wrapping</div>
                <div className="exp-point">✓ Fumigated ISPM-15 wooden crates</div>
                <div className="exp-point">✓ Container space planning & lashing</div>
                <div className="exp-point">✓ Full export documentation support</div>
              </div>

              <div className="export-actions">
                <Link to="/exports" className="vort-btn-primary">
                  Explore Export Capability &rarr;
                </Link>
                <Link to="/contact" className="vort-btn-secondary">
                  Contact Export Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL MANUFACTURING CONVERSION SECTION */}
      <section className="mfg-final-cta-section mfg-reveal" id="mfg-enquiry">
        <div className="container-centered">
          <div className="mfg-final-box">
            <div className="mfg-final-left">
              <span className="text-label-caps accent-red">ENGINEERING DESK SUPPORT</span>
              <h2 className="final-cta-title">Have a Stainless Steel Equipment Requirement?</h2>
              <p className="final-cta-desc">
                Share your target application, volume capacity, material preference, or existing CAD drawing. Our engineering desk will review your specifications for standard supply or custom fabrication.
              </p>

              <div className="final-blueprint-card">
                <img src={blueprintImg} alt="Engineering Blueprint Review" className="blueprint-thumb" />
                <div>
                  <strong>OEM & Drawing-Based Fabrication</strong>
                  <p>Upload CAD blueprints or dimensional sketches for an accurate quotation.</p>
                </div>
              </div>
            </div>

            <div className="mfg-final-right">
              <div className="mfg-form-card">
                <h3>Submit Manufacturing Requirement</h3>
                <p className="form-subtext">Share your specifications to connect directly with our engineering team.</p>

                <form onSubmit={handleEnquirySubmit} className="mfg-form">
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
                      placeholder="e.g. AMUL Dairy / Process Engineering Ltd"
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
                    <label>Requirement Type</label>
                    <select
                      value={enquiryForm.requirementType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, requirementType: e.target.value })}
                    >
                      <option value="Custom Stainless Steel Fabrication">Custom Stainless Steel Fabrication</option>
                      <option value="Standard Dairy Equipment">Standard Dairy Equipment</option>
                      <option value="Bulk Storage & Silos">Bulk Storage & Silos</option>
                      <option value="OEM / Drawing-Based Manufacturing">OEM / Drawing-Based Manufacturing</option>
                      <option value="Export Supply Project">Export Supply Project</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Describe Capacity / Application Specifications</label>
                    <textarea
                      rows="3"
                      placeholder="Mention required volume capacity (Litres/KG), jacket preference, heating/cooling medium..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="vort-btn-primary" style={{ width: '100%', padding: '14px' }}>
                    Submit Manufacturing Requirement &rarr;
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

export default ManufacturingPage;
