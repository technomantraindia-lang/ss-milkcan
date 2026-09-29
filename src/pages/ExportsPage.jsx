import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import dispatchImg from '../assets/dispatch_loading.png';
import factoryViewImg from '../assets/factory_view.png';
import weldingImg from '../assets/welding_close_up.png';
import blueprintImg from '../assets/vessel_blueprint.png';
import inspectionImg from '../assets/inspection_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';

// Real Jay Ambe product assets
import bulkMilkCoolerRealImg from '../assets/bulk-cooler.png';
import steamCookingVesselRealImg from '../assets/steam-cooking-vessel-jay-ambe.png';
import liquidStorageTankRealImg from '../assets/stainless-steel-liquid-storage-tank-17000-litre-jay-ambe.png';
import riceCauldronRealImg from '../assets/Rice-Cauldron-jay-ambe.png';
import gheeBoilerRealImg from '../assets/ghee-boiler.png';
import batchPasteurizerRealImg from '../assets/batch-milk-pasteurizer-dairy-jay-ambe.png';
import milkCan40LRealImg from '../assets/stainless-steel-milk-can-40-litre-jay-ambe.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */

const trustPoints = [
  { label: 'Since 2006', sub: 'Manufacturing Experience' },
  { label: 'Food-Grade SS304 / SS316', sub: 'Material Capability' },
  { label: 'Export Documentation', sub: 'Full Support' },
  { label: 'OEM Manufacturing', sub: 'Buyer-Spec Production' },
  { label: 'Custom Engineering', sub: 'Application-Based Design' },
  { label: 'International Packaging', sub: 'Seaworthy Standards' }
];

const buyerJourneySteps = [
  { num: '01', title: 'Buyer Enquiry', desc: 'Submit your application details and equipment requirements.' },
  { num: '02', title: 'Technical Discussion', desc: 'Our engineering team reviews capacity, material, and configuration needs.' },
  { num: '03', title: 'Product Selection', desc: 'Finalise equipment type, specifications, and customisations.' },
  { num: '04', title: 'Quotation & Terms', desc: 'Receive detailed commercial quotation with export terms.' },
  { num: '05', title: 'Drawing Approval', desc: 'Review and approve CAD drawings or technical specifications.' },
  { num: '06', title: 'Manufacturing & QC', desc: 'Fabrication with in-process quality inspection at every stage.' },
  { num: '07', title: 'Export Packing', desc: 'Protective wrapping, wooden crating, and moisture protection.' },
  { num: '08', title: 'Container Loading', desc: 'Space-planned container loading with lashing and securing.' },
  { num: '09', title: 'Dispatch & Support', desc: 'Shipment tracking, documentation dispatch, and buyer support.' }
];

const documentItems = [
  'Commercial Invoice',
  'Packing List',
  'Proforma Invoice',
  'Certificate of Origin',
  'HS Code & Shipment Info',
  'Bill of Lading Coordination',
  'Product Specification Records',
  'Drawing & Technical Data'
];

const commercialItems = [
  'Bank Transfer & LC Support',
  'Buyer & Freight-Forwarder Coordination',
  'Insurance Documentation',
  'Inspection Certificates',
  'FOB / CIF Quotations',
  'Container Load Planning'
];

const packagingSteps = [
  { title: 'Pre-Dispatch Inspection', desc: 'Equipment cleaning and final quality check before packing.' },
  { title: 'Surface Protection', desc: 'Anti-scratch film and bubble wrap for polished SS surfaces.' },
  { title: 'Moisture Protection', desc: 'Desiccants and moisture barriers for sea transit.' },
  { title: 'Wooden Crating', desc: 'Heavy-duty fumigated wooden crates with internal supports.' },
  { title: 'Container Loading', desc: 'Space-planned loading with lashing and movement protection.' },
  { title: 'Dispatch Records', desc: 'Loading photographs and complete dispatch documentation.' }
];

const caseStudies = [
  {
    country: 'Bangladesh',
    year: '2022',
    equipment: 'Bulk Milk Coolers & Processing Line',
    capacity: '500L–2000L Units',
    material: 'SS304 Food Grade',
    requirement: 'Complete dairy collection and chilling equipment for rural cooperative expansion.',
    solution: 'Manufactured and supplied 12 BMC units with custom capacity specifications, export-packed in wooden crates.',
    image: bulkMilkCoolerRealImg,
    imgFit: 'contain',
    imgPadding: '14px',
    bg: '#ffffff'
  },
  {
    country: 'Sri Lanka',
    year: '2023',
    equipment: 'Steam Jacketed Vessels & Ghee Boilers',
    capacity: '200L–500L',
    material: 'SS316 Process Grade',
    requirement: 'Hygienic processing vessels for commercial dairy and ghee manufacturing facility.',
    solution: 'Custom-fabricated vessels with automated temperature control fittings, containerised for Colombo port.',
    image: gheeBoilerRealImg,
    imgFit: 'contain',
    imgPadding: '14px',
    bg: '#ffffff'
  },
  {
    country: 'Kenya',
    year: '2024',
    equipment: 'Milk Storage Tanks & Pasteurisers',
    capacity: '1000L–5000L',
    material: 'SS304 / SS316',
    requirement: 'Large-capacity storage and processing equipment for commercial dairy plant.',
    solution: 'Designed oversized tanks with CIP fittings, delivered via 40ft container with full export documentation.',
    image: liquidStorageTankRealImg,
    imgFit: 'contain',
    imgPadding: '14px',
    bg: '#ffffff'
  },
  {
    country: 'UAE',
    year: '2024',
    equipment: 'Institutional Kitchen Equipment',
    capacity: 'Custom Sizes',
    material: 'SS304 Commercial Grade',
    requirement: 'Commercial kitchen and food preparation equipment for hospitality sector.',
    solution: 'Fabricated and supplied complete kitchen equipment line, palletised for Dubai port delivery.',
    image: riceCauldronRealImg,
    imgFit: 'contain',
    imgPadding: '14px',
    bg: '#ffffff'
  }
];

const exportMarkets = [
  { region: 'South Asia', countries: 'Bangladesh, Sri Lanka, Nepal', status: 'active' },
  { region: 'Middle East', countries: 'UAE, Saudi Arabia, Oman', status: 'active' },
  { region: 'East Africa', countries: 'Kenya, Tanzania, Uganda', status: 'active' },
  { region: 'West Africa', countries: 'Nigeria, Ghana', status: 'opportunity' },
  { region: 'Southeast Asia', countries: 'Myanmar, Vietnam', status: 'opportunity' },
  { region: 'Eastern Europe', countries: 'Regional Importers', status: 'opportunity' }
];


function ExportsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyerName: '', companyName: '', country: '', email: '', phone: '',
    buyerType: '', product: '', capacity: '', material: '', port: '',
    timeline: '', details: ''
  });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Hero animation
    gsap.fromTo('.export-hero-title',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo('.export-hero-desc',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 0.9, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // Trust bar items
    gsap.fromTo('.exp-trust-item',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.exp-trust-bar', start: 'top 85%', toggleActions: 'play none none none' }
      }
    );

    // Section reveals
    const sections = gsap.utils.toArray('.exp-reveal');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // Journey steps stagger
    gsap.fromTo('.exp-step-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-journey-grid', start: 'top 80%', toggleActions: 'play none none none' }
      }
    );

    // Case study cards
    gsap.fromTo('.exp-case-card',
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-cases-grid', start: 'top 82%', toggleActions: 'play none none none' }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your export enquiry. Our team will respond within 24 hours.');
  };

  return (
    <div className="export-page-wrapper" style={{ backgroundColor: '#fcfcfc' }}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          SECTION 1: EXPORT HERO
      ═══════════════════════════════════════════ */}
      <header className="about-hero-section" style={{ minHeight: '560px', backgroundColor: '#0a0a0a' }}>
        <div className="about-hero-bg">
          <img src={dispatchImg} alt="Jay Ambe Export Dispatch" className="about-hero-bg-img" style={{ opacity: 0.35 }} />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="container-centered about-hero-content">
          <div className="about-breadcrumbs">
            <Link to="/" className="breadcrumb-link" style={{ textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Exports & Global Operations</span>
          </div>

          <h1 className="about-hero-title export-hero-title" style={{ maxWidth: '700px' }}>
            Manufactured in India.<br />
            <span className="text-red">Engineered for Global Markets.</span>
          </h1>

          <p className="about-hero-desc export-hero-desc" style={{ maxWidth: '600px' }}>
            Jay AMBE Industries manufactures food-grade stainless-steel equipment for dairy, food-processing, 
            and institutional applications — with complete export support from enquiry to international dispatch.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a href="#export-enquiry" className="vort-btn-primary" style={{ textDecoration: 'none' }}>
              Contact Export Team →
            </a>
            <a href="#export-capability" className="vort-btn-outline-light" style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', transition: 'all 0.3s ease' }}>
              Download Export Catalogue
            </a>
          </div>
        </div>
      </header>


      {/* ═══════════════════════════════════════════
          SECTION 2: EXPORT TRUST BAR
      ═══════════════════════════════════════════ */}
      <section className="exp-trust-bar" style={{ background: '#111111', padding: '0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-centered">
          <div className="exp-trust-strip">
            {trustPoints.map((tp, i) => (
              <React.Fragment key={i}>
                <div className="exp-trust-item">
                  <span className="exp-trust-label">{tp.label}</span>
                  <span className="exp-trust-sub">{tp.sub}</span>
                </div>
                {i < trustPoints.length - 1 && <div className="exp-trust-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 3: EXPORT CAPABILITY INTRODUCTION
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" id="export-capability" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div className="grid-2col" style={{ gap: '60px', alignItems: 'center' }}>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '440px', position: 'relative' }}>
              <img src={factoryViewImg} alt="Jay Ambe Manufacturing Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '11px', color: 'var(--color-red)', fontWeight: 700 }}>8,400 SQ. MTR FACILITY</span>
              </div>
            </div>

            <div>
              <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>EXPORT CAPABILITY</span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '10px', lineHeight: 1.2 }}>
                A Manufacturing Partner for International Equipment Requirements
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginTop: '18px' }}>
                Jay AMBE Industries supplies standard and custom stainless-steel equipment to international buyers 
                with complete technical, commercial, and logistics support from enquiry through dispatch.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '28px' }}>
                {[
                  'Dairy Collection & Processing',
                  'Institutional Kitchen Systems',
                  'Process Tanks & Vessels',
                  'Drawing-Based Fabrication',
                  'Bulk & Project Supply',
                  'Repeat Distributor Orders'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '14px' }}>✓</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 500, color: '#333' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link to="/" className="vort-btn-primary" style={{ textDecoration: 'none', fontSize: '13px' }}>
                  Explore Product Solutions →
                </Link>
                <a href="#export-enquiry" style={{ fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: 600, color: 'var(--color-red)', textDecoration: 'none', padding: '12px 0', letterSpacing: '0.02em' }}>
                  Discuss Your Requirement →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 4: INTERNATIONAL BUYER JOURNEY
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', background: '#090909', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-centered">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>HOW WE WORK</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 800, color: '#ffffff', margin: '10px 0 14px 0', lineHeight: 1.2 }}>
              From Requirement to International Dispatch
            </h2>
            <p style={{ fontSize: '15px', color: '#aaaaaa', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              A transparent 9-step process that takes your equipment requirement from initial enquiry to containerised dispatch.
            </p>
          </div>

          <div className="exp-journey-grid">
            {buyerJourneySteps.map((step, i) => (
              <div key={i} className="exp-step-card">
                <div className="exp-step-num">{step.num}</div>
                <div className="exp-step-content">
                  <h4 className="exp-step-title">{step.title}</h4>
                  <p className="exp-step-desc">{step.desc}</p>
                </div>
                {i < buyerJourneySteps.length - 1 && <div className="exp-step-connector"></div>}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="#export-enquiry" className="vort-btn-primary" style={{ textDecoration: 'none' }}>
              Start an Export Enquiry →
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 5: DOCUMENTATION & COMMERCIAL SUPPORT
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>EXPORT DOCUMENTATION</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '10px', lineHeight: 1.2 }}>
              Documentation Support for Smoother International Transactions
            </h2>
          </div>

          <div className="grid-2col" style={{ gap: '40px' }}>
            {/* Documentation List */}
            <div className="exp-doc-panel">
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#111' }}>
                Export Documentation
              </h3>
              <div className="exp-doc-list">
                {documentItems.map((item, i) => (
                  <div key={i} className="exp-doc-item">
                    <div className="exp-doc-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="12" height="14" x="2" y="1" rx="2" stroke="var(--color-red)" strokeWidth="1.5"/><line x1="5" y1="5" x2="11" y2="5" stroke="var(--color-red)" strokeWidth="1" opacity="0.6"/><line x1="5" y1="8" x2="11" y2="8" stroke="var(--color-red)" strokeWidth="1" opacity="0.6"/><line x1="5" y1="11" x2="9" y2="11" stroke="var(--color-red)" strokeWidth="1" opacity="0.6"/></svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Coordination */}
            <div className="exp-doc-panel">
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#111' }}>
                Commercial Coordination
              </h3>
              <div className="exp-doc-list">
                {commercialItems.map((item, i) => (
                  <div key={i} className="exp-doc-item">
                    <div className="exp-doc-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="var(--color-red)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="var(--color-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', padding: '18px 20px', background: 'rgba(201,28,28,0.04)', border: '1px solid rgba(201,28,28,0.12)', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#333' }}>Note:</strong> Document availability varies by destination. 
                  Certificate of Origin, insurance, and inspection documents are provided where applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 6: EXPORT PACKAGING & CONTAINER LOADING
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', background: '#090909', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-centered">
          <div style={{ marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>PACKAGING & DISPATCH</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 800, color: '#ffffff', marginTop: '10px', lineHeight: 1.2 }}>
              Packed to Protect Equipment Across Long-Distance Shipping
            </h2>
          </div>

          <div className="grid-2col" style={{ gap: '50px', alignItems: 'start' }}>
            {/* Main packaging image */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '480px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={dispatchImg} alt="Export packaging and container loading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}></div>
              <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', color: 'var(--color-red)', fontWeight: 700 }}>CONTAINER-READY DISPATCH</span>
                <p style={{ fontFamily: 'var(--font-headline)', fontSize: '15px', color: '#ffffff', margin: '4px 0 0 0' }}>Seaworthy Wooden Crate Packaging</p>
              </div>
            </div>

            {/* Packaging steps */}
            <div className="exp-packaging-steps">
              {packagingSteps.map((step, i) => (
                <div key={i} className="exp-pkg-step">
                  <div className="exp-pkg-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>{step.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#999', margin: 0, lineHeight: 1.55 }}>{step.desc}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '28px' }}>
                <a href="#export-enquiry" style={{ fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: 600, color: 'var(--color-red)', textDecoration: 'none', letterSpacing: '0.02em' }}>
                  Discuss Export Packaging →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 7: OEM & DISTRIBUTOR PARTNERSHIPS
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>PARTNERSHIP MODELS</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '10px', lineHeight: 1.2 }}>
              Manufacturing Partnerships Beyond a Single Order
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-text-secondary)', marginTop: '14px', maxWidth: '640px', lineHeight: 1.65 }}>
              We work with international buyers on long-term OEM, private-label, and distribution arrangements 
              tailored to market-specific requirements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {/* OEM */}
            <div className="exp-partner-card">
              <div className="exp-partner-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="6" width="22" height="16" rx="3" stroke="var(--color-red)" strokeWidth="1.8"/><line x1="8" y1="14" x2="20" y2="14" stroke="var(--color-red)" strokeWidth="1.2" opacity="0.5"/><line x1="14" y1="10" x2="14" y2="18" stroke="var(--color-red)" strokeWidth="1.2" opacity="0.5"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, margin: '18px 0 10px 0' }}>OEM Manufacturing</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                Fabrication based on your CAD drawings, technical specifications, and quality standards. 
                Application-specific modifications with full confidentiality.
              </p>
              <a href="#export-enquiry" className="exp-partner-cta">Discuss OEM Manufacturing →</a>
            </div>

            {/* Private Label */}
            <div className="exp-partner-card">
              <div className="exp-partner-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 4h14l3 5v15a1 1 0 01-1 1H5a1 1 0 01-1-1V9l3-5z" stroke="var(--color-red)" strokeWidth="1.8"/><circle cx="14" cy="16" r="4" stroke="var(--color-red)" strokeWidth="1.5"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, margin: '18px 0 10px 0' }}>Private Label Supply</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                Equipment manufactured under your brand identity. Custom nameplates, packaging, and product 
                identification aligned with your market requirements.
              </p>
              <a href="#export-enquiry" className="exp-partner-cta">Explore Private Label →</a>
            </div>

            {/* Distributor */}
            <div className="exp-partner-card">
              <div className="exp-partner-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="8" r="4" stroke="var(--color-red)" strokeWidth="1.8"/><path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="var(--color-red)" strokeWidth="1.8"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, margin: '18px 0 10px 0' }}>Distributor Partnership</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#666', lineHeight: 1.65, margin: 0 }}>
                Bulk production and repeat-order planning for regional equipment dealers and agricultural 
                machinery distributors in selected international markets.
              </p>
              <a href="#export-enquiry" className="exp-partner-cta">Become a Distribution Partner →</a>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 8: GLOBAL PRESENCE & EXPORT MARKETS
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', background: '#0a0a0a', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-centered">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>INTERNATIONAL REACH</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 800, color: '#ffffff', margin: '10px 0 14px 0', lineHeight: 1.2 }}>
              Supporting Buyers Across International Markets
            </h2>
            <p style={{ fontSize: '15px', color: '#aaaaaa', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Confirmed export markets and growing opportunities across multiple continents.
            </p>
          </div>

          <div className="exp-markets-grid">
            {exportMarkets.map((market, i) => (
              <div key={i} className={`exp-market-card ${market.status === 'opportunity' ? 'exp-market-opp' : ''}`}>
                <div className="exp-market-status">
                  <span className={`exp-market-dot ${market.status}`}></span>
                  <span className="exp-market-status-text">{market.status === 'active' ? 'Active Market' : 'Opportunity'}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '14px 0 8px 0' }}>{market.region}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.5 }}>{market.countries}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="#export-enquiry" className="vort-btn-primary" style={{ textDecoration: 'none' }}>
              Contact Export Team →
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 9: EXPORT CASE STUDIES
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>PROJECT EVIDENCE</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '10px', lineHeight: 1.2 }}>
              International Work That Demonstrates Capability
            </h2>
          </div>

          <div className="exp-cases-grid">
            {caseStudies.map((cs, i) => (
              <div key={i} className="exp-case-card">
                <div className="exp-case-img-wrap" style={{ backgroundColor: cs.bg || '#ffffff' }}>
                  <img 
                    src={cs.image} 
                    alt={`${cs.country} - ${cs.equipment}`} 
                    className="exp-case-img" 
                    style={{
                      objectFit: cs.imgFit || 'contain',
                      padding: cs.imgPadding || '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div className="exp-case-country-badge">
                    <span>{cs.country}</span>
                    <span className="exp-case-year">{cs.year}</span>
                  </div>
                </div>
                <div className="exp-case-body">
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', lineHeight: 1.3 }}>
                    {cs.equipment}
                  </h3>
                  <div className="exp-case-meta">
                    <div className="exp-case-meta-item">
                      <span className="exp-case-meta-label">Capacity</span>
                      <span className="exp-case-meta-val">{cs.capacity}</span>
                    </div>
                    <div className="exp-case-meta-item">
                      <span className="exp-case-meta-label">Material</span>
                      <span className="exp-case-meta-val">{cs.material}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '14px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#888', lineHeight: 1.55, margin: '0 0 6px 0' }}>
                      <strong style={{ color: '#555' }}>Requirement:</strong> {cs.requirement}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#888', lineHeight: 1.55, margin: 0 }}>
                      <strong style={{ color: '#555' }}>Solution:</strong> {cs.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
            <a href="#export-enquiry" className="vort-btn-primary" style={{ textDecoration: 'none' }}>
              Discuss a Similar Requirement →
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 10: EXPORT ENQUIRY & FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="exp-reveal" id="export-enquiry" style={{ padding: '100px 0', background: '#090909', color: '#ffffff' }}>
        <div className="container-centered">
          <div className="grid-2col" style={{ gap: '60px', alignItems: 'start' }}>
            {/* Left: Heading and context */}
            <div>
              <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>EXPORT ENQUIRY</span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 800, color: '#ffffff', margin: '12px 0 18px 0', lineHeight: 1.2 }}>
                Planning an International Equipment Requirement?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#aaaaaa', lineHeight: 1.7 }}>
                Submit your equipment enquiry with technical details. Our export team will respond 
                within 24 hours with a detailed proposal, pricing, and shipping estimate.
              </p>

              <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(201,28,28,0.1)', border: '1px solid rgba(201,28,28,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--color-red)', fontSize: '16px' }}>✉</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-headline)', fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>exports@jayambeindustries.com</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#777', marginTop: '2px' }}>Export Division Email</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(201,28,28,0.1)', border: '1px solid rgba(201,28,28,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--color-red)', fontSize: '16px' }}>☎</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-headline)', fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>+91 98250 XXXXX</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#777', marginTop: '2px' }}>WhatsApp / Phone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Export Enquiry Form */}
            <div className="exp-form-container">
              <form onSubmit={handleFormSubmit} className="exp-form">
                {/* Group 1: Buyer Details */}
                <div className="exp-form-group-label">Buyer Details</div>
                <div className="exp-form-row">
                  <input type="text" name="buyerName" placeholder="Your Name *" value={formData.buyerName} onChange={handleFormChange} className="exp-input" required />
                  <input type="text" name="companyName" placeholder="Company Name *" value={formData.companyName} onChange={handleFormChange} className="exp-input" required />
                </div>
                <div className="exp-form-row">
                  <input type="text" name="country" placeholder="Country *" value={formData.country} onChange={handleFormChange} className="exp-input" required />
                  <input type="email" name="email" placeholder="Business Email *" value={formData.email} onChange={handleFormChange} className="exp-input" required />
                </div>
                <div className="exp-form-row">
                  <input type="text" name="phone" placeholder="Phone / WhatsApp" value={formData.phone} onChange={handleFormChange} className="exp-input" />
                  <select name="buyerType" value={formData.buyerType} onChange={handleFormChange} className="exp-input">
                    <option value="">Buyer Type</option>
                    <option value="end-user">End User</option>
                    <option value="dealer">Dealer</option>
                    <option value="distributor">Distributor</option>
                    <option value="oem">OEM</option>
                    <option value="project">Project Company</option>
                  </select>
                </div>

                {/* Group 2: Requirement */}
                <div className="exp-form-group-label" style={{ marginTop: '24px' }}>Requirement</div>
                <div className="exp-form-row">
                  <input type="text" name="product" placeholder="Product / Equipment Required" value={formData.product} onChange={handleFormChange} className="exp-input" />
                  <input type="text" name="capacity" placeholder="Capacity & Quantity" value={formData.capacity} onChange={handleFormChange} className="exp-input" />
                </div>
                <div className="exp-form-row">
                  <select name="material" value={formData.material} onChange={handleFormChange} className="exp-input">
                    <option value="">Material Grade</option>
                    <option value="SS304">SS304</option>
                    <option value="SS316">SS316</option>
                    <option value="custom">Custom Specification</option>
                  </select>
                  <input type="text" name="port" placeholder="Destination Port / Country" value={formData.port} onChange={handleFormChange} className="exp-input" />
                </div>
                <div className="exp-form-row">
                  <select name="timeline" value={formData.timeline} onChange={handleFormChange} className="exp-input">
                    <option value="">Purchase Timeline</option>
                    <option value="immediate">Immediate</option>
                    <option value="1-3months">1–3 Months</option>
                    <option value="3-6months">3–6 Months</option>
                    <option value="planning">Planning Stage</option>
                  </select>
                </div>
                <textarea name="details" placeholder="Project Details / Additional Requirements" value={formData.details} onChange={handleFormChange} className="exp-input exp-textarea" rows="4"></textarea>

                <button type="submit" className="vort-btn-primary" style={{ width: '100%', marginTop: '20px', padding: '16px', fontSize: '14px', cursor: 'pointer' }}>
                  Request an Export Quote →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

export default ExportsPage;
