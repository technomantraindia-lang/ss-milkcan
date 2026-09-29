import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import assets
import aboutHeroBg from '../assets/herosection/hero-3.png';
import weldingImg from '../assets/welding_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';
import dispatchImg from '../assets/dispatch_loading.png';
import blueprintImg from '../assets/vessel_blueprint.png';

// Original Jay Ambe Product & Facility Images
import milkCan40LRealImg from '../assets/stainless-steel-milk-can-40-litre-jay-ambe.png';
import bulkMilkCoolerRealImg from '../assets/bulk-cooler.png';
import steamCookingVesselRealImg from '../assets/steam-cooking-vessel-jay-ambe.png';
import liquidStorageTankRealImg from '../assets/stainless-steel-liquid-storage-tank-17000-litre-jay-ambe.png';
import brewingKettleRealImg from '../assets/SS-Brewing-Kettle-jay-ambe.png';
import batchPasteurizerRealImg from '../assets/batch-milk-pasteurizer-dairy-jay-ambe.png';
import khoyaMachineRealImg from '../assets/Khoya-Making-Machine-200-Ltr-jay-ambe.png';
import milkProcessingPlantRealImg from '../assets/milk-processing-plant-jay-ambe.png';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const navigate = useNavigate();

  const milestones = [
    {
      year: '2006',
      title: 'Manufacturing Operations Began',
      subtitle: 'Foundation & SS Milk Cans',
      desc: 'Inaugurated manufacturing operations in Gujarat dedicated to sanitary stainless-steel milk collection cans, milking buckets, and transport vessels.',
      image: milkCan40LRealImg,
      imgPosition: 'center 20%',
      stat: '1st Production Unit',
      tag: 'FOUNDATION ERA'
    },
    {
      year: '2012',
      title: 'Dairy Machinery Expansion',
      subtitle: 'BMCs & Pasteurizers',
      desc: 'Expanded production line to direct expansion bulk milk cooling systems (DX models), automated pasteurizers, paneer presses, and motorized butter churners.',
      image: bulkMilkCoolerRealImg,
      imgPosition: 'center center',
      stat: '1,000L+ BMC Range',
      tag: 'PROCESSING ERA'
    },
    {
      year: '2016',
      title: 'Institutional Kitchen Range',
      subtitle: 'Steam Cauldrons & Mass Cooking',
      desc: 'Engineered high-capacity steam-jacketed tilting rice cauldrons, dal cookers, and insulated distribution vessels for institutional mega kitchens.',
      image: steamCookingVesselRealImg,
      imgPosition: 'center 20%',
      stat: '500L Steam Cauldrons',
      tag: 'INSTITUTIONAL ERA'
    },
    {
      year: '2019',
      title: 'Export Division & OEM Contracts',
      subtitle: 'Containerized Sea Freight',
      desc: 'Formed dedicated Export Division. Initiated containerized sea-freight shipments and drawing-based OEM private label contract manufacturing for international buyers.',
      image: dispatchImg,
      imgPosition: 'center center',
      stat: '15+ Nations Reached',
      tag: 'GLOBAL EXPORT ERA'
    },
    {
      year: 'PRESENT',
      title: 'Full Scale & Automation',
      subtitle: '8,400 Sq. Mtr GIDC Complex',
      desc: 'Operating from an 8,400 sq. metre modern manufacturing facility with CAD drafting automation, argon TIG welding bays, and Ra < 0.4 µm mirror finishing.',
      image: milkProcessingPlantRealImg,
      imgPosition: 'center center',
      stat: '8,400 Sq. Mtr Base',
      tag: 'MODERN POWERHOUSE'
    }
  ];

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    gsap.fromTo('.about-hero-title', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo('.about-hero-desc', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 0.9, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // ─── Scroll-synced vertical timeline ───
    // Uses a direct scroll listener (GSAP ticker) instead of ScrollTrigger
    // so the red line grows in real pixels from dot 1 to each subsequent dot
    // exactly when each dot reaches the viewport center.
    const lineFill = document.querySelector('.v-line-fill');
    const allDots = document.querySelectorAll('.v-node-inner-dot');
    const allBlocks = document.querySelectorAll('.v-milestone-block');
    const lineTrack = document.querySelector('.v-line-track');

    // Set the fill line to use height instead of scaleY
    if (lineFill) {
      lineFill.style.height = '0px';
      lineFill.style.transform = 'none';
    }

    const onScrollTick = () => {
      if (!lineTrack || !lineFill || allDots.length === 0) return;

      const viewportCenter = window.innerHeight * 0.5;
      const trackRect = lineTrack.getBoundingClientRect();
      const trackTopInViewport = trackRect.top;

      // How far into the track is the viewport center?
      // (viewport center position relative to the track's top edge)
      const centerInTrack = viewportCenter - trackTopInViewport;

      // Clamp: line can't be negative or taller than the track
      const clampedHeight = Math.max(0, Math.min(centerInTrack, trackRect.height));

      // Apply with a smooth tween
      gsap.to(lineFill, {
        height: clampedHeight + 'px',
        duration: 0.15,
        ease: 'none',
        overwrite: 'auto'
      });

      // Light up each dot whose center is above the viewport center
      allDots.forEach((dot, idx) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenterY = dotRect.top + dotRect.height / 2;

        if (dotCenterY <= viewportCenter) {
          dot.classList.add('v-dot-active');
          if (allBlocks[idx]) allBlocks[idx].classList.add('v-block-revealed');
        } else {
          dot.classList.remove('v-dot-active');
          if (allBlocks[idx]) allBlocks[idx].classList.remove('v-block-revealed');
        }
      });
    };

    // Attach to GSAP's ticker (fires every frame, ~60fps) for buttery smooth sync
    gsap.ticker.add(onScrollTick);

    // Animate each vertical milestone block on scroll — staggered reveal
    const items = gsap.utils.toArray('.v-milestone-block');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const sections = gsap.utils.toArray('.about-reveal-section:not(.vertical-journey-section)');
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
      gsap.ticker.remove(onScrollTick);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleQuoteClick = (e) => {
    e.preventDefault();
    navigate('/#inquiry');
  };

  const handleManufacturingClick = (e) => {
    e.preventDefault();
    const el = document.querySelector('#capability-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="about-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111' }}>
      <Navbar />

      {/* 1. About Page Hero */}
      <header className="about-hero-section" style={{ minHeight: '520px', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center' }}>
        <div className="about-hero-bg">
          <img src={aboutHeroBg} alt="Jay Ambe Manufacturing Plant" className="about-hero-bg-img" style={{ opacity: 0.45 }} />
          <div className="about-hero-overlay"></div>
        </div>
        
        <div className="container-centered about-hero-content" style={{ zIndex: 10, paddingTop: '100px', paddingBottom: '40px' }}>
          <div className="about-breadcrumbs" style={{ marginBottom: '16px' }}>
            <Link to="/" className="breadcrumb-link" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: '#666666', margin: '0 8px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontWeight: 600 }}>About Jay AMBE Industries</span>
          </div>
          
          <h1 className="about-hero-title" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: '850px' }}>
            Engineering Stainless Steel Solutions Since 2006
          </h1>
          
          <p className="about-hero-desc" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#dddddd', lineHeight: 1.6, maxWidth: '720px', marginTop: '18px' }}>
            Jay AMBE Industries manufactures food-grade stainless-steel equipment for dairy, food-processing, institutional kitchen and hygienic process applications.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button onClick={handleManufacturingClick} className="vort-btn-primary" style={{ cursor: 'pointer' }}>
              Explore Our Manufacturing &rarr;
            </button>
            <a href="/#inquiry" onClick={handleQuoteClick} style={{ textDecoration: 'none' }}>
              <button className="vort-btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                Download Company Profile ↓
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Company Introduction */}
      <section className="about-reveal-section intro-section" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered grid-2col" style={{ alignItems: 'center', gap: '60px' }}>
          <div className="intro-left-img-wrapper" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 36px rgba(0,0,0,0.06)' }}>
            <img src={milkProcessingPlantRealImg} alt="Jay AMBE Manufacturing Floor" style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }} />
          </div>

          <div className="intro-right-content">
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>COMPANY OVERVIEW</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, margin: '12px 0 20px 0', color: '#111111' }}>
              A Manufacturing Company Built Around Practical Engineering
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#444444', marginBottom: '16px' }}>
              Established in 2006 in Gujarat, India, Jay AMBE Industries is a dedicated B2B manufacturer specializing in sanitary stainless-steel process equipment. We operate a full-scale 8,400 sq. metre manufacturing plant equipped with heavy sheet-forming rollers, argon TIG welding stations, and sanitary surface finishing bays.
            </p>
            
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#444444', marginBottom: '28px' }}>
              From standard milk collection cans to automated commercial pasteurizers and high-capacity institutional cooking cauldrons, our engineering team serves both domestic buyers and international export clients with custom dimensions, material grades (SS304 / SS316), and thermal heating/cooling integration.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#222222' }}>Established in 2006</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#222222' }}>Food-grade SS304 & SS316</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#222222' }}>Standard & Custom Fabrication</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#222222' }}>Dairy, Food & Institutional</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', gridColumn: 'span 2' }}>
                <span style={{ color: 'var(--color-red)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#222222' }}>Domestic & International Export Supply</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vertical History & Evolution Section */}
      <section className="about-reveal-section vertical-journey-section" id="history-evolution-section" style={{ padding: '120px 0', background: '#090909', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-centered">
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>OUR HISTORY & EVOLUTION</span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '38px', fontWeight: 800, color: '#ffffff', margin: '12px 0 16px 0', lineHeight: 1.2 }}>
              Two Decades of Manufacturing Growth
            </h2>
            <p style={{ fontSize: '15px', color: '#aaaaaa', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Follow our vertical evolution from a specialized workshop in 2006 into a global export powerhouse.
            </p>
          </div>

          {/* Continuous Vertical Timeline Container */}
          <div className="v-timeline-wrapper">
            {/* Background Base Line & Animated Filling Line */}
            <div className="v-line-track">
              <div className="v-line-fill"></div>
            </div>

            {/* Vertical Milestone Blocks */}
            <div className="v-milestones-list">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`v-milestone-block ${isEven ? 'left-block' : 'right-block'}`}>
                    
                    {/* Center Node Circle */}
                    <div className="v-node-dot">
                      <div className="v-node-inner-dot"></div>
                    </div>

                    {/* Content Card */}
                    <div className="v-card-container">
                      <div className="v-card-inner">
                        <div className="v-card-badge-row">
                          <span className="v-year-badge">{m.year}</span>
                          <span className="v-tag-pill">{m.tag}</span>
                        </div>

                        <h3 className="v-card-title">{m.title}</h3>
                        <p className="v-card-desc">{m.desc}</p>
                      </div>

                      <div className="v-card-img-box">
                        <img 
                          src={m.image} 
                          alt={m.title} 
                          className="v-card-img" 
                          style={m.imgPosition ? { objectPosition: m.imgPosition } : {}}
                        />
                        <div className="v-card-stat">
                          <span className="v-stat-label">MILESTONE HIGHLIGHT</span>
                          <span className="v-stat-val">{m.stat}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. What We Manufacture */}
      <section className="about-reveal-section manufacture-section" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>BUSINESS CAPABILITIES</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '8px' }}>
              One Manufacturing Partner. Multiple Processing Solutions.
            </h2>
            <p style={{ fontSize: '15px', color: '#666666', marginTop: '10px', maxWidth: '680px' }}>
              We present 6 specialized manufacturing divisions serving agricultural dairy, industrial food processing, and commercial mega kitchens.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={milkCan40LRealImg} alt="Milk Collection & Handling" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Milk Collection & Handling</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  Flagship food-grade SS milk cans, insulated transport cans, milking buckets, receiver tanks, and teat shells.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={bulkMilkCoolerRealImg} alt="Dairy Processing Equipment" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Dairy Processing Equipment</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  Direct expansion bulk milk coolers (BMCs), batch pasteurizers, butter churners, paneer press, and khoya machines.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={brewingKettleRealImg} alt="Process Equipment" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Process Equipment</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  Steam-jacketed ghee boilers, thermal heat exchange tanks, motorized blending kettles, and sweet-making machinery.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={steamCookingVesselRealImg} alt="Institutional Kitchen Equipment" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Institutional Kitchen Equipment</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  Steam cauldrons, rice cookers, dal boilers, rice chutes, and insulated food-distribution vessels for commercial kitchens.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={liquidStorageTankRealImg} alt="Storage & Hygienic Vessels" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Storage & Hygienic Vessels</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  SS storage tanks, drums, barrels, topes, vertical insulated silos, and chemically resistant process vessels.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={khoyaMachineRealImg} alt="Custom Stainless-Steel Fabrication" style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '19px', fontWeight: 700, color: '#111111', marginBottom: '8px' }}>Custom Stainless-Steel Fabrication</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555', marginBottom: '16px' }}>
                  Drawing-based contract manufacturing, custom capacities (50L–15,000L), SS304/SS316, agitators, and OEM private labeling.
                </p>
              </div>
              <a href="/#products" onClick={(e) => { e.preventDefault(); navigate('/#products'); }} style={{ color: 'var(--color-red)', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>
                Explore Solutions &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engineering and Manufacturing Capability */}
      <section className="about-reveal-section capability-section" id="capability-section">
        <div className="container-centered">
          <div className="capability-header-block">
            <span className="text-label-caps accent-red">FABRICATION WORKFLOW</span>
            <h2 className="section-headline-lg capability-main-title">
              From Raw Stainless Steel to Finished Equipment
            </h2>
            <p className="capability-sub-desc">
              Our in-house 7-stage manufacturing process guarantees dimensional tolerance and sanitary integrity.
            </p>
          </div>

          <div className="capability-steps-track">
            {[
              'Requirement Analysis',
              'Engineering CAD',
              'Material Selection',
              'Cutting & Forming',
              'TIG Welding',
              'Sanitary Finishing',
              'QA Inspection & Dispatch'
            ].map((step, idx) => (
              <div key={idx} className="capability-step-card">
                <span className="capability-step-num">0{idx + 1}</span>
                <span className="capability-step-title">{step}</span>
              </div>
            ))}
          </div>

          <div className="capability-body-grid">
            <div className="capability-tech-col">
              <h3 className="capability-tech-title">In-House Technical Capabilities</h3>
              <div className="capability-tech-cards-grid">
                <div className="capability-tech-card">
                  <h4>SS Vessel Fabrication</h4>
                  <p>Pressurized & non-pressurized tanks</p>
                </div>
                <div className="capability-tech-card">
                  <h4>Food-Grade Welding</h4>
                  <p>Argon-shielded TIG joint smoothness</p>
                </div>
                <div className="capability-tech-card">
                  <h4>Custom Dimensions</h4>
                  <p>50L to 15,000L volumetric modeling</p>
                </div>
                <div className="capability-tech-card">
                  <h4>Jacketing & Insulation</h4>
                  <p>Steam, dimple & water jackets</p>
                </div>
                <div className="capability-tech-card">
                  <h4>Agitator Integration</h4>
                  <p>Anchor, paddle & scraper blades</p>
                </div>
                <div className="capability-tech-card">
                  <h4>Export Packaging</h4>
                  <p>Seaworthy wooden crate protection</p>
                </div>
              </div>
            </div>

            <div className="capability-blueprint-frame">
              <img src={blueprintImg} alt="Vessel Technical Blueprint" className="capability-blueprint-image" />
              <div className="capability-blueprint-tag">CAD & Engineering Drafts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Infrastructure and Facility */}
      <section className="about-reveal-section infra-section" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>FACILITY OVERVIEW</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '8px' }}>
              Infrastructure Designed for Reliable Manufacturing
            </h2>
            <p style={{ fontSize: '15px', color: '#666666', marginTop: '10px' }}>
              Real manufacturing premise in GIDC Kalol, Panchmahal, Gujarat equipped for heavy fabrication.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={weldingImg} alt="Argon TIG Welding Bay" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '6px' }}>Argon TIG Welding Bays</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555' }}>
                  Dedicated clean welding stations equipped with argon purge systems to eliminate oxidization on interior vessel seams.
                </p>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={polishingImg} alt="Rotary Polishing Floor" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '6px' }}>Rotary Mirror Polishing Bays</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555' }}>
                  Automated and manual polishing setups achieving sanitary surface roughness (Ra &lt; 0.4 µm) for clean-in-place compliance.
                </p>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={milkProcessingPlantRealImg} alt="8,400 Sq. Mtr Assembly Premises" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '6px' }}>8,400 Sq. Mtr Heavy Floor</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555555' }}>
                  Equipped with overhead cranes, plate-bending rollers, and hydrostatic testing stations for large vertical tanks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quality Philosophy */}
      <section className="about-reveal-section quality-section" style={{ padding: '100px 0', background: '#fbfaf7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>ZERO DEFECT POLICY</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '8px' }}>
              Quality Built Into Every Stage
            </h2>
            <p style={{ fontSize: '15px', color: '#666666', marginTop: '10px' }}>
              8-step quality audit ensuring raw material compliance, weld integrity, and crevice-free finishing.
            </p>
          </div>

          <div className="grid-2col" style={{ alignItems: 'center', gap: '50px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', position: 'relative' }}>
              <img src={inspectionImg} alt="Quality Inspection Desk" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#0e0e0e', color: '#ffffff', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--color-red)' }}>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '14px', fontWeight: 700, color: 'var(--color-red)', display: 'block' }}>100% QA/QC</span>
                <span style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>SPECTRO & HYDRO TESTED</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { step: '01', title: 'Material Selection', desc: 'Certified SS304/SS316 prime sheets' },
                { step: '02', title: 'Grade Verification', desc: 'Spectro chemical composition audit' },
                { step: '03', title: 'Dimensional Checks', desc: 'Laser digital caliper alignment' },
                { step: '04', title: 'Welding Inspection', desc: 'Dye penetrant joint flaw testing' },
                { step: '05', title: 'Surface Finishing', desc: 'Profilometer audit (Ra < 0.4 µm)' },
                { step: '06', title: 'Hydrostatic Test', desc: 'Pressure testing of jacketed tanks' },
                { step: '07', title: 'Product Assembly', desc: 'Motor & agitator performance test' },
                { step: '08', title: 'Packing Audit', desc: 'Seaworthy crate protection check' }
              ].map((q, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', padding: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '12px', fontWeight: 700, color: 'var(--color-red)' }}>STAGE {q.step}</span>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111111', margin: '4px 0' }}>{q.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Custom Engineering and OEM Manufacturing */}
      <section className="about-reveal-section custom-oem-section" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered grid-2col" style={{ alignItems: 'center', gap: '60px' }}>
          <div>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>OEM CONTRACT MANUFACTURING</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, margin: '12px 0 18px 0' }}>
              Engineered Around Your Process
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#444444', marginBottom: '24px' }}>
              Whether the requirement begins with a drawing, technical specification or application problem, AMBE develops equipment around the required process, capacity and operating environment.
            </p>

            <h4 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Customization Scope Includes:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
              <span style={{ fontSize: '13px', color: '#333333' }}>• Capacity (50L to 15,000L)</span>
              <span style={{ fontSize: '13px', color: '#333333' }}>• SS Grade (SS304 / SS316 / 316L)</span>
              <span style={{ fontSize: '13px', color: '#333333' }}>• Steam / Hot-Water Jacketing</span>
              <span style={{ fontSize: '13px', color: '#333333' }}>• Agitators & Scraper Blades</span>
              <span style={{ fontSize: '13px', color: '#333333' }}>• Motorized Tilting Mechanisms</span>
              <span style={{ fontSize: '13px', color: '#333333' }}>• OEM Private-Label Branding</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-primary" style={{ textDecoration: 'none' }}>
                Discuss Custom Manufacturing &rarr;
              </a>
              <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-secondary" style={{ textDecoration: 'none', border: '1px solid #111111', color: '#111111' }}>
                Upload Your Drawing ↓
              </a>
            </div>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <img src={blueprintImg} alt="Custom OEM Engineering CAD Blueprint" style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* 9. Export Capability and Global Reach */}
      <section className="about-reveal-section export-global-section" style={{ padding: '100px 0', background: '#0e0e0e', color: '#ffffff' }}>
        <div className="container-centered">
          <div className="grid-2col" style={{ alignItems: 'center', gap: '60px', marginBottom: '50px' }}>
            <div>
              <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>INTERNATIONAL TRADE</span>
              <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '8px', color: '#ffffff' }}>
                Manufactured in India. Supplied Across Markets.
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, opacity: 0.8, marginTop: '16px' }}>
                We maintain full international trade compliance, exporting heavy stainless-steel machinery to global distributors and dairy processors across South Asia, Middle East, Africa, and Europe.
              </p>

              <div style={{ marginTop: '32px' }}>
                <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  Contact Export Team &rarr;
                </a>
              </div>
            </div>

            <div style={{ background: '#181818', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '36px', textAlign: 'center' }}>
              <div style={{ fontSize: '54px', marginBottom: '14px' }}>🌐</div>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', color: '#ffffff', marginBottom: '10px' }}>Global Port Dispatches</h3>
              <p style={{ fontSize: '13.5px', opacity: 0.75, lineHeight: 1.6 }}>
                Active export shipments to Bangladesh, Sri Lanka, Nepal, UAE, Saudi Arabia, Oman, Kenya, Tanzania, and European import partners.
              </p>
            </div>
          </div>

          <div className="grid-2col" style={{ gap: '28px' }}>
            <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
              <img src={dispatchImg} alt="Seaworthy Crate Packaging & Loading" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Seaworthy Crate Packaging</h4>
                <p style={{ fontSize: '12.5px', opacity: 0.7, margin: 0 }}>
                  Fumigated wooden boxes with interior moisture desiccants and protective film wrapping.
                </p>
              </div>
            </div>

            <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
              <img src={dispatchImg} alt="Container Load Lashings" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Container Load & Lashings</h4>
                <p style={{ fontSize: '12.5px', opacity: 0.7, margin: 0 }}>
                  Heavy structural steel lashings stabilizing tanks and equipment inside 20ft/40ft containers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Leadership, Values and Final Trust CTA */}
      <section className="about-reveal-section leadership-section" style={{ padding: '100px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="container-centered">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>LEADERSHIP & VALUES</span>
            <h2 className="section-headline-lg" style={{ fontFamily: 'var(--font-headline)', fontSize: '34px', fontWeight: 700, marginTop: '8px' }}>
              Built on Engineering, Trust and Long-Term Relationships
            </h2>
          </div>

          <div className="grid-2col" style={{ alignItems: 'center', gap: '60px', marginBottom: '60px' }}>
            <div style={{ background: '#fbfaf7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '36px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-red)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DIRECTOR'S STATEMENT</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: '#333333', fontStyle: 'italic', marginTop: '14px', marginBottom: '16px' }}>
                "We view every stainless-steel vessel we build as a long-term commitment to our client's operating success. Reliability is not just a marketing claim — it is engineered into the thickness of our steel, the smoothness of our welds, and our delivery promises."
              </p>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111111', display: 'block' }}>Jay AMBE Leadership Desk</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ borderLeft: '3px solid var(--color-red)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>Engineering Responsibility</h4>
                <p style={{ fontSize: '13px', color: '#666666', marginTop: '4px', margin: 0 }}>Never compromising on material thickness or sanitary safety.</p>
              </div>

              <div style={{ borderLeft: '3px solid var(--color-red)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>Manufacturing Integrity</h4>
                <p style={{ fontSize: '13px', color: '#666666', marginTop: '4px', margin: 0 }}>100% spectro testing and hydrostatic pressure verification.</p>
              </div>

              <div style={{ borderLeft: '3px solid var(--color-red)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>Customer Commitment</h4>
                <p style={{ fontSize: '13px', color: '#666666', marginTop: '4px', margin: 0 }}>Fast engineering proposals and dedicated export support.</p>
              </div>

              <div style={{ borderLeft: '3px solid var(--color-red)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111111' }}>Continuous Improvement</h4>
                <p style={{ fontSize: '13px', color: '#666666', marginTop: '4px', margin: 0 }}>Adopting automated laser cutting & mirror finishing bays.</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#0e0e0e', color: '#ffffff', borderRadius: '20px', padding: '50px', textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span className="text-label-caps accent-red" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 700 }}>GET STARTED</span>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '28px', color: '#ffffff', margin: '12px 0' }}>
              Looking for a Reliable Stainless-Steel Equipment Manufacturing Partner?
            </h3>
            <p style={{ opacity: 0.85, fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px auto' }}>
              Share your application, capacity and technical requirements with our team.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-primary" style={{ textDecoration: 'none' }}>
                Discuss Your Project &rarr;
              </a>
              <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-secondary" style={{ textDecoration: 'none', background: '#ffffff', color: '#111111' }}>
                Request a Quote
              </a>
              <a href="/#inquiry" onClick={handleQuoteClick} className="vort-btn-secondary" style={{ textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff' }}>
                Download Company Profile ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
