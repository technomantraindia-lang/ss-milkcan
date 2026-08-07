import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import weldingImg from '../assets/welding_close_up.png';
import factoryViewImg from '../assets/factory_view.png';
import dispatchImg from '../assets/dispatch_loading.png';

gsap.registerPlugin(ScrollTrigger);

function ContactPage() {
  const location = useLocation();
  const formRef = useRef(null);
  const [enquiryType, setEnquiryType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    category: '',
    capacity: '',
    message: '',
    destinationPort: '',
    timeline: '',
    material: '',
    confidentiality: false
  });

  useEffect(() => {
    if (location.state) {
      const { category, productName, enquiryType: reqType, message } = location.state;
      setFormData(prev => ({
        ...prev,
        category: category || prev.category,
        message: message || (productName ? `Inquiry regarding ${productName}` : prev.message)
      }));
      if (reqType) {
        setEnquiryType(reqType);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Fade-in animations
    gsap.fromTo('.contact-hero-content', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo('.contact-hero-img-box', 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // Scroll trigger reveals
    const sections = gsap.utils.toArray('.contact-reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleEnquiryTypeChange = (e) => {
    setEnquiryType(e.target.value);
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false);
      alert('Thank you! Your B2B inquiry has been registered under reference #JA-' + Math.floor(100000 + Math.random() * 900000) + '. Our commercial desk will contact you within 24 hours.');
      setFormData({
        name: '', company: '', email: '', phone: '', country: '',
        category: '', capacity: '', message: '', destinationPort: '',
        timeline: '', material: '', confidentiality: false
      });
      setFileName('');
      setEnquiryType('');
    }, 600);
  };

  return (
    <div className="contact-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* 1. COMPACT CONTACT HERO */}
      <section className="contact-hero-section" style={{ paddingTop: '150px', paddingBottom: '90px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'linear-gradient(180deg, #090909 0%, #0d0d0d 100%)', color: '#ffffff' }}>
        <div className="container-centered">
          
          {/* Breadcrumbs */}
          <div className="about-breadcrumbs" style={{ marginBottom: '24px' }}>
            <Link to="/" className="breadcrumb-link" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px', fontSize: '13px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>Contact Operations</span>
          </div>

          <div className="grid-2col" style={{ gap: '60px', alignItems: 'center' }}>
            <div className="contact-hero-content">
              
              {/* Supporting Trust Line Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201, 28, 28, 0.12)', border: '1px solid rgba(201, 28, 28, 0.3)', padding: '6px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-red)', boxShadow: '0 0 8px var(--color-red)' }}></span>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Manufactured in India. Engineered for Global Markets.
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '42px', fontWeight: 800, color: '#ffffff', margin: '0 0 18px 0', lineHeight: 1.2 }}>
                Global B2B Procurement, OEM & Custom Engineering
              </h1>
              
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#cccccc', lineHeight: 1.7, marginBottom: '28px', maxWidth: '540px' }}>
                Jay AMBE Industries exports food-grade stainless-steel dairy processing machinery, sanitary process vessels, and custom institutional equipment to commercial buyers and distribution networks across 15+ countries.
              </p>

              {/* B2B Export Credentials List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '16px' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#e5e5e5' }}>IEC Certified & Full Export Documentation Support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '16px' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#e5e5e5' }}>SS304 & SS316L Food-Grade Materials Compliance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '16px' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#e5e5e5' }}>Heavy-Duty Seaworthy Wood-Crate Packaging & Lashing</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#form-target" onClick={scrollToForm} className="vort-btn-primary" style={{ textDecoration: 'none' }}>
                  Request an Export Quote
                </a>
                <Link to="/exports" className="vort-btn-outline-light" style={{ textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', transition: 'all 0.3s ease' }}>
                  Explore Global Coverage
                </Link>
              </div>
            </div>

            {/* Right Side: Proves actual export/logistics actions */}
            <div className="contact-hero-img-box" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', height: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative' }}>
              <img src={dispatchImg} alt="Jay Ambe Export Dispatch & Loading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 18px', borderRadius: '10px' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '9px', color: 'var(--color-red)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>B2B Logistics Desk</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-headline)', fontSize: '13px', color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>Containerised Sea-Freight Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN ENQUIRY FORM */}
      <section ref={formRef} id="form-target" className="contact-reveal-section" style={{ padding: '90px 0', backgroundColor: '#ffffff', color: '#111111', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>TECHNICAL INQUIRY REGISTER</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '32px', fontWeight: 700, color: '#111111', marginTop: '10px' }}>
              Share Your Specifications
            </h2>
            <p style={{ fontSize: '14.5px', color: '#555555', marginTop: '8px' }}>
              Specify your project parameters below to route your inquiry to the correct technical department.
            </p>
          </div>

          <div className="contact-form-card" style={{ background: '#fafafa', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '22px', padding: '40px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Field Group 1: General Info */}
              <div className="form-group-section">
                <span className="form-group-tag" style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.12em', marginBottom: '14px', textTransform: 'uppercase' }}>1. Basic Information</span>
                <div className="grid-2col" style={{ gap: '16px' }}>
                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Full Name *</label>
                    <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="contact-input light-field" required />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Company Name *</label>
                    <input type="text" name="company" placeholder="Enterprise Co." value={formData.company} onChange={handleInputChange} className="contact-input light-field" required />
                  </div>
                </div>

                <div className="grid-2col" style={{ gap: '16px', marginTop: '16px' }}>
                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Business Email *</label>
                    <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleInputChange} className="contact-input light-field" required />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Phone / WhatsApp (With Country Code) *</label>
                    <input type="text" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} className="contact-input light-field" required />
                  </div>
                </div>

                <div className="form-field" style={{ marginTop: '16px' }}>
                  <label className="form-field-label" style={{ color: '#333333' }}>Country *</label>
                  <input type="text" name="country" placeholder="United States" value={formData.country} onChange={handleInputChange} className="contact-input light-field" required />
                </div>
              </div>

              {/* Field Group 2: Enquiry Type (Dynamic Controller) */}
              <div className="form-group-section" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                <span className="form-group-tag" style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.12em', marginBottom: '14px', textTransform: 'uppercase' }}>2. Inquiry & Equipment Scope</span>
                <div className="grid-2col" style={{ gap: '16px' }}>
                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Inquiry Type *</label>
                    <select name="enquiryType" value={enquiryType} onChange={handleEnquiryTypeChange} className="contact-select light-field" required>
                      <option value="">-- Select Inquiry Type --</option>
                      <option value="Product">Standard Product Order</option>
                      <option value="Custom Project">Custom Project Fabrication</option>
                      <option value="Export">Export Supply</option>
                      <option value="OEM">OEM Partnership</option>
                      <option value="Distributor">Become a Distributor</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-field-label" style={{ color: '#333333' }}>Equipment Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="contact-select light-field">
                      <option value="">-- Select Category --</option>
                      <option value="Dairy Machinery">Dairy Processing Equipment</option>
                      <option value="Bulk Milk Cooler">Bulk Milk Coolers (BMC)</option>
                      <option value="Sanitary Vessels">Hygienic Storage / Process Tanks</option>
                      <option value="Kitchen Equipment">Institutional Kitchen Line</option>
                      <option value="Custom SS Fabrication">Other Custom SS Fabrication</option>
                    </select>
                  </div>
                </div>

                <div className="form-field" style={{ marginTop: '16px' }}>
                  <label className="form-field-label" style={{ color: '#333333' }}>Required Capacity / Size / Dimensions</label>
                  <input type="text" name="capacity" placeholder="e.g. 2,000 Litres, SS316, Steam Jacketed" value={formData.capacity} onChange={handleInputChange} className="contact-input light-field" />
                </div>
              </div>

              {/* Dynamic Form Sections based on selected inquiry type */}
              {enquiryType === 'Export' && (
                <div className="form-group-section dynamic-section" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                  <span className="form-group-tag" style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.12em', marginBottom: '14px', textTransform: 'uppercase' }}>Export Details</span>
                  <div className="grid-2col" style={{ gap: '16px' }}>
                    <div className="form-field">
                      <label className="form-field-label" style={{ color: '#333333' }}>Destination Port *</label>
                      <input type="text" name="destinationPort" placeholder="e.g. Port of Rotterdam" value={formData.destinationPort} onChange={handleInputChange} className="contact-input light-field" required />
                    </div>
                    <div className="form-field">
                      <label className="form-field-label" style={{ color: '#333333' }}>Timeline *</label>
                      <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="contact-select light-field" required>
                        <option value="">Select Timeline</option>
                        <option value="Immediate">Immediate (Within 30 Days)</option>
                        <option value="1-3 Months">1 to 3 Months</option>
                        <option value="3-6 Months">3 to 6 Months</option>
                        <option value="Planning">Planning / Tender Stage</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(enquiryType === 'Custom Project' || enquiryType === 'OEM') && (
                <div className="form-group-section dynamic-section" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                  <span className="form-group-tag" style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.12em', marginBottom: '14px', textTransform: 'uppercase' }}>Technical Specifications</span>
                  <div className="grid-2col" style={{ gap: '16px' }}>
                    <div className="form-field">
                      <label className="form-field-label" style={{ color: '#333333' }}>Material Grade Preference</label>
                      <select name="material" value={formData.material} onChange={handleInputChange} className="contact-select light-field">
                        <option value="">Select Material Grade</option>
                        <option value="SS304">SS304 Food Grade</option>
                        <option value="SS316">SS316 Acid / High Hygienic Grade</option>
                        <option value="SS316L">SS316L Low Carbon Grade</option>
                        <option value="Custom">Custom Compound Specification</option>
                      </select>
                    </div>
                    <div className="form-field" style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', userSelect: 'none', color: '#333333' }}>
                        <input type="checkbox" name="confidentiality" checked={formData.confidentiality} onChange={handleInputChange} style={{ accentColor: 'var(--color-red)', width: '16px', height: '16px' }} />
                        Require NDA / Confidentiality Agreement
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Field Group 3: Message & File Upload */}
              <div className="form-group-section" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                <span className="form-group-tag" style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '10px', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.12em', marginBottom: '14px', textTransform: 'uppercase' }}>3. Requirements & Design Upload</span>
                <div className="form-field">
                  <label className="form-field-label" style={{ color: '#333333' }}>Requirement details / Technical specs</label>
                  <textarea name="message" rows="4" placeholder="Detail any pressure requirements, surface finishes (e.g. Ra < 0.4 microns), agitators, or jacket heating preferences..." value={formData.message} onChange={handleInputChange} className="contact-input contact-textarea light-field"></textarea>
                </div>

                <div className="form-field" style={{ marginTop: '16px' }}>
                  <label className="form-field-label" style={{ color: '#333333' }}>Upload Reference Design / CAD / Specification Sheet</label>
                  <div className="contact-file-upload-wrapper light-upload">
                    <label className="contact-file-upload-btn light-btn">
                      Choose Document / Drawing
                      <input type="file" onChange={handleFileChange} accept=".pdf,.dwg,.dxf,.zip,.jpg,.png,.docx" style={{ display: 'none' }} />
                    </label>
                    <span className="contact-file-upload-status" style={{ color: '#666666' }}>
                      {fileName ? fileName : 'No file chosen (PDF, DWG, ZIP, images up to 15MB)'}
                    </span>
                  </div>
                </div>
              </div>

              <button type="submit" className="vort-btn-primary" style={{ width: '100%', padding: '16px', marginTop: '10px', fontSize: '14px', cursor: 'pointer' }} disabled={submitted}>
                {submitted ? 'Registering Inquiry...' : 'Submit Requirement →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. DIRECT CONTACT & EXPORT TEAM */}
      <section className="contact-reveal-section" style={{ padding: '80px 0', backgroundColor: '#0e0e0e', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-centered">
          <div className="grid-2col" style={{ gap: '60px' }}>
            
            {/* General Domestic Sales */}
            <div className="contact-direct-card" style={{ background: '#171717', border: '1px solid rgba(255,255,255,0.08)', padding: '36px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>🏢</span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>General Sales Desk</h3>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#999999', lineHeight: 1.6, marginBottom: '24px' }}>
                For domestic projects, standard milk cans, pasteurisers, and institutional kitchen supplies inside India.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>PHONE CALL DIRECT</span>
                  <a href="tel:+919904000000" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '16px', display: 'block', marginTop: '3px' }}>+91 9904X XXXXX</a>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>EMAIL COMMUNICATIONS</span>
                  <a href="mailto:info@jayambeindustries.example.com" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700, display: 'block', marginTop: '3px' }}>info@jayambeindustries.example.com</a>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>WORKING TIMES</span>
                  <span style={{ color: '#cccccc', display: 'block', marginTop: '3px' }}>Monday – Saturday: 9:00 AM – 6:00 PM (IST)</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <a href="tel:+919904000000" className="vort-btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', padding: '10px 20px' }}>
                  Call Sales Team
                </a>
              </div>
            </div>

            {/* Export & International Desk */}
            <div className="contact-direct-card" style={{ background: '#171717', border: '1px solid rgba(255,255,255,0.08)', padding: '36px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>🌐</span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Export & OEM Support</h3>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#999999', lineHeight: 1.6, marginBottom: '24px' }}>
                Dedicated desk for international shipping, customs documentation, container logistics (FOB/CIF), and global distributor partnerships.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>EXPORT WHATSAPP & PHONE</span>
                  <a href="https://wa.me/919825000000" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '16px', display: 'block', marginTop: '3px' }}>+91 9825X XXXXX</a>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>EXPORT INQUIRIES</span>
                  <a href="mailto:exports@jayambeindustries.com" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 700, display: 'block', marginTop: '3px' }}>exports@jayambeindustries.com</a>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-tech)', letterSpacing: '0.05em' }}>INTERNATIONAL DISPATCH REGIONS</span>
                  <span style={{ color: '#cccccc', display: 'block', marginTop: '3px' }}>Global Shipping with full packing list, MTC & Certificate of Origin coordination.</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <a href="https://wa.me/919825000000" target="_blank" rel="noopener noreferrer" className="vort-btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', padding: '10px 20px', background: '#25D366', borderColor: '#25D366' }}>
                  Message on WhatsApp
                </a>
                <a href="mailto:exports@jayambeindustries.com" className="vort-btn-outline-light" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Email Export Team
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FACTORY LOCATION */}
      <section className="contact-reveal-section" style={{ padding: '80px 0', backgroundColor: '#ffffff', color: '#111111', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div className="grid-2col" style={{ gap: '60px', alignItems: 'center' }}>
            
            <div className="contact-map-container" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', height: '400px', width: '100%' }}>
              <iframe 
                title="Jay Ambe Industries Factory Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3323049186676!2d72.8687313!3d22.6786851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5ad161bcfc23%3A0xea8de54f686c0c28!2sJAY%20AMBE%20INDUSTRIES!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div>
              <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>MANUFACTURING HEADQUARTERS</span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '32px', fontWeight: 700, color: '#111111', marginTop: '10px' }}>
                Visit Our Manufacturing Facility
              </h2>
              
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: '#111111', margin: '0 0 4px 0' }}>Factory Address</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#444444', lineHeight: 1.6, margin: 0 }}>
                    Plot No. 42-A, GIDC Industrial Estate,<br />
                    Nadiad, Gujarat - 387001, India
                  </p>
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: '#111111', margin: '0 0 4px 0' }}>Scheduling a Visit</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666666', lineHeight: 1.6, margin: 0 }}>
                    Factory tours and drawing audits are available strictly by appointment. Contact our general sales line to coordinate your visit.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                  <a href="https://maps.google.com/?q=JAY+AMBE+INDUSTRIES+Nadiad+GIDC" target="_blank" rel="noopener noreferrer" className="vort-btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px' }}>
                    Get Directions
                  </a>
                  <a href="tel:+919904000000" className="vort-btn-outline-light" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '13px', border: '1px solid rgba(0,0,0,0.15)', color: '#111111' }}>
                    Schedule a Visit
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TRUST STRIP & FINAL CTA */}
      <section className="contact-reveal-section" style={{ padding: '80px 0 100px 0', background: 'linear-gradient(0deg, #050505 0%, #090909 100%)', color: '#ffffff' }}>
        <div className="container-centered" style={{ textAlign: 'center' }}>
          
          {/* Trust Strip */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '60px', opacity: 0.85 }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--color-red)', fontWeight: 700, letterSpacing: '0.05em' }}>SINCE 2006</span>
              <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>Proven Track Record</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '36px' }} className="trust-strip-sep"></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--color-red)', fontWeight: 700, letterSpacing: '0.05em' }}>MATERIALS</span>
              <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>Food-Grade SS304/SS316</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '36px' }} className="trust-strip-sep"></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--color-red)', fontWeight: 700, letterSpacing: '0.05em' }}>CUSTOMISATION</span>
              <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>Full CAD drawing control</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '36px' }} className="trust-strip-sep"></div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--color-red)', fontWeight: 700, letterSpacing: '0.05em' }}>LOGISTICS</span>
              <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>Seaworthy Crate Protection</span>
            </div>
          </div>

          {/* Final CTA */}
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>
              Ready to Discuss Your Next Project?
            </h2>
            <p style={{ fontSize: '15px', color: '#aaaaaa', lineHeight: 1.6, margin: '14px 0 28px 0' }}>
              Download our full catalog of dairy processing equipment, sanitisation vessels, and institutional solutions, or send us your blueprint immediately.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#form-target" onClick={scrollToForm} className="vort-btn-primary" style={{ textDecoration: 'none' }}>
                Request a Quote
              </a>
              <Link to="/exports" className="vort-btn-outline-light" style={{ textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', transition: 'all 0.3s ease' }}>
                Download Product Catalogue
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
