import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../App.css'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

// Import all 14 copied assets
import milkCoolerImg from '../assets/milk_cooler.png'
import steamVesselImg from '../assets/steam_vessel.png'
import factoryViewImg from '../assets/factory_view.png'
import milkCanImg from '../assets/milk_can.png'
import milkTankImg from '../assets/milk_tank.png'
import butterChurnerImg from '../assets/butter_churner.png'
import paneerPressImg from '../assets/paneer_press.png'
import khoyaMachineImg from '../assets/khoya_machine.png'
import gheeBoilerImg from '../assets/ghee_boiler.png'
import blueprintImg from '../assets/vessel_blueprint.png'
import weldingImg from '../assets/welding_close_up.png'
import polishingImg from '../assets/polishing_close_up.png'
import inspectionImg from '../assets/inspection_close_up.png'
import dispatchImg from '../assets/dispatch_loading.png'

import heroBg1 from '../assets/herosection/hero3.png'
import heroBg2 from '../assets/herosection/hero2.png'
import heroBg3 from '../assets/herosection/hero1.png'
import worldMapSvg from '../assets/world.svg'

const heroSlides = [
  {
    label: 'STAINLESS-STEEL DAIRY & PROCESS EQUIPMENT',
    title: ['Precision-Engineered', 'Stainless-Steel Equipment'],
    desc: 'Food-grade equipment for milk collection, dairy processing, institutional kitchens, hygienic storage and customised industrial applications.',
    img: heroBg1,
    btn1Text: 'Explore Products',
    btn1Link: '#products',
    btn2Text: 'Discuss Your Requirement',
    btn2Link: '#inquiry'
  },
  {
    label: 'AUTOMATED THERMAL & COOLING SOLUTIONS',
    title: ['High-Efficiency Cooling &', 'Pasteurisation Systems'],
    desc: 'Direct expansion bulk milk coolers and automated processing vessels designed to maintain strict temperature controls and absolute sanitary hygiene.',
    img: heroBg2,
    btn1Text: 'View Cooling Range',
    btn1Link: '#products',
    btn2Text: 'Request a Quote',
    btn2Link: '#inquiry'
  },
  {
    label: 'CUSTOM INDUSTRIAL ENGINEERING',
    title: ['Tailored Fabrications Built', 'Around Your Process'],
    desc: 'Custom jacketed cooking vessels, storage silos, and process machinery manufactured according to your precise capacity, dimensional, and material specifications.',
    img: heroBg3,
    btn1Text: 'See Our Process',
    btn1Link: '#process-section',
    btn2Text: 'Custom Inquiry',
    btn2Link: '#inquiry'
  }
]

function HomePage() {
  const [loading, setLoading] = useState(true);

  // Lenis & Scroll Effect Hooks
  const heroImageRef = useRef(null)
  const heroTrackRef = useRef(null)
  const trackContainerRef = useRef(null)
  const slidingTrackRef = useRef(null)
  
  // GSAP Hero Animation Hooks
  const heroContainerRef = useRef(null)
  const tlRef = useRef(null)
  const prevSlideRef = useRef(null)
  const autoplayTimerRef = useRef(null)
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  
  // Manufacturing Workflow Refs
  const workflowSectionRef = useRef(null)
  const workflowTrackRef = useRef(null)
  const workflowProgressFillRef = useRef(null)
  const workflowCardsRef = useRef([])
  const workflowImagesRef = useRef([])
  const lenisRef = useRef(null)
  
  // Custom Fabrication Scroll Story Refs
  const customFabSectionRef = useRef(null)
  const customFabProgressFillRef = useRef(null)
  
  // States for interactive switchers
  const [activeDivision, setActiveDivision] = useState(0)
  const [activeStage, setActiveStage] = useState(0)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)

  // Inquiry Form state
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    productCategory: 'Milk Collection & Handling',
    requiredCapacity: '',
    application: '',
    materialPreference: 'SS 304',
    message: '',
    drawing: null
  })
  const [submitted, setSubmitted] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [])

  // Equipment Divisions details (Solution groups)
  const divisions = [
    { num: '01', title: 'Milk Collection & Handling', desc: 'Sanitary milk cans, transport tanks, weighing bowls, and raw milk reception systems engineered for hygiene and temperature maintenance.', img: milkCanImg },
    { num: '02', title: 'Dairy Processing Equipment', desc: 'Pasteurisers, cream separators, butter churners, and paneer presses that streamline dairy production with easy-to-clean sanitary components.', img: milkCoolerImg },
    { num: '03', title: 'Process Equipment', desc: 'High-efficiency heating, cooling, mixing, and reaction vessels designed for precise thermal control and sanitary processing.', img: gheeBoilerImg },
    { num: '04', title: 'Institutional Kitchen Equipment', desc: 'High-capacity steam jacketed cooking vessels, boiling pans, and custom food preparation equipment optimized for energy efficiency and hygiene.', img: steamVesselImg },
    { num: '05', title: 'Storage & Hygienic Vessels', desc: 'Single-skin, insulated, and jacketed vertical or horizontal storage silos, process tanks, and sanitary vessels.', img: milkTankImg },
    { num: '06', title: 'Custom Stainless Steel Fabrication', desc: 'Tailor-made stainless-steel machinery configured to match specific factory layout dimensions, chemical resistance requirements, and flow-rates.', img: factoryViewImg }
  ]

  // Expanded Featured Products (8 Items)
  const products = [
    { title: 'Stainless-Steel Milk Can', desc: 'Hygienic storage cans with air-tight shrink covers and reinforced bottom bands for heavy-duty daily handling.', img: milkCanImg, specs: ['20L - 100L', 'Mirror Polished', 'Heavy-Duty Bands'] },
    { title: 'Bulk Milk Cooler', desc: 'Direct expansion cooling systems with digital temperature control and laser-welded evaporator plates.', img: milkCoolerImg, specs: ['500L - 5000L', 'Direct Expansion', 'Digital Controller'] },
    { title: 'Milk Storage Tank', desc: 'Insulated vertical silos with sanitary surface finishes, agitator assemblies, and CIP cleaning nozzles.', img: milkTankImg, specs: ['1000L - 10,000L', 'PUF Insulated', 'CIP Spray Ball'] },
    { title: 'Butter Churner', desc: 'Commercial-grade horizontal butter extraction barrels with dynamic balance shafts and drainage valves.', img: butterChurnerImg, specs: ['20kg - 500kg/batch', 'Gearbox Driven', 'Dual Drainage Valves'] },
    { title: 'Paneer Press', desc: 'Pneumatic or mechanical compression systems for uniform curd whey extraction and square block forming.', img: paneerPressImg, specs: ['Pneumatic Press', 'Custom Curd Molds', 'Drainage Trays'] },
    { title: 'Khoya Machine', desc: 'Automated condensing and roasting pans with gear-motor scraper blades for consistent milk solids preparation.', img: khoyaMachineImg, specs: ['100L - 500L', 'Teflon Scrapers', 'LPG / Steam Heated'] },
    { title: 'Ghee Boiler', desc: 'Steam-jacketed boilers with temperature dial gauges and bottom outlets for clarifying butter fats.', img: gheeBoilerImg, specs: ['Double Jacketed', 'Dial Temp Gauges', 'Bottom Discharging'] },
    { title: 'Steam Cooking Vessel', desc: 'High-capacity double-walled tilting vessels designed for industrial kitchens and bulk food processing.', img: steamVesselImg, specs: ['Tilting Design', 'Double-Walled Steam', 'Hygienic SS 304'] }
  ]

  // stages details (In-House Manufacturing Journey)
  const stages = [
    { num: '01', title: 'Requirement Analysis', desc: 'Detailed engineering consultations to document operating conditions, temperature dynamics, capacity targets, and space constraints.', img: blueprintImg },
    { num: '02', title: 'Engineering & CAD', desc: 'Designing custom 2D layouts and 3D CAD models to simulate agitator flow patterns, thermal transfer rates, and structural load distributions.', img: blueprintImg },
    { num: '03', title: 'Material Selection', desc: 'Sourcing certified, traceable food-grade SS 304, SS 316, or SS 316L. Every sheet is verified for thickness tolerances and surface flaws.', img: factoryViewImg },
    { num: '04', title: 'In-House Fabrication', desc: 'Precision shell rolling, plasma cutting, and argon-shielded TIG welding by our certified fabricators to form pressure-stable equipment.', img: weldingImg },
    { num: '05', title: 'Finishing & Polishing', desc: 'Mechanical grinding and multi-stage polishing to achieve a sanitary mirror finish (Ra < 0.4 µm) that prevents bacterial build-up.', img: polishingImg },
    { num: '06', title: 'Quality Inspection', desc: 'Hydrostatic pressure testing, weld dye penetrant checks, and surface roughness verification to ensure absolute sanitary compliance.', img: inspectionImg },
    { num: '07', title: 'Heavy-Duty Packaging', desc: 'Securing polished equipment with protective bubble wrapping, foam edges, and steel-reinforced seaworthy wooden crates.', img: dispatchImg },
    { num: '08', title: 'Secure Dispatch', desc: 'Direct loading and logistics coordination for safe transport to client sites across domestic and export markets.', img: dispatchImg }
  ]

  // processes details
  const processes = [
    { num: '01', title: 'Collection & Reception', desc: 'Direct dumping into hygienic stainless steel receiving tanks with integrated weighing scales and coarse filtration screens.', img: milkCanImg },
    { num: '02', title: 'Chilling & Thermal Storage', desc: 'Rapid direct-expansion cooling down to 4°C to arrest bacterial growth, stored inside polyurethane insulated vertical silos.', img: milkCoolerImg },
    { num: '03', title: 'Thermal Pasteurisation', desc: 'Automated plate or tubular heat exchange keeping precise holding temperatures before separation or packaging.', img: steamVesselImg },
    { num: '04', title: 'Standardisation & Separation', desc: 'Centrifugal fat separation yielding controlled skim milk and cream streams for downstream value-added products.', img: milkTankImg },
    { num: '05', title: 'Value-Addition Processing', desc: 'Controlled agitation cooking and mechanical compression for khoya, paneer, butter, and clarified ghee production.', img: paneerPressImg },
    { num: '06', title: 'Sanitary Packaging & Cold Chain', desc: 'Aseptic pouch filling, thermal sealing, and crate dispatching under controlled temperature logistics.', img: dispatchImg }
  ]

  // requirements details
  const requirements = [
    { num: '01', title: 'Capacity Range (50L to 15,000L)' },
    { num: '02', title: 'Material Specification (SS 304 / SS 316 / SS 316L)' },
    { num: '03', title: 'Heating / Cooling Medium (Steam, Hot Water, DX Refrigerant)' },
    { num: '04', title: 'Agitator Type (Anchor, Paddle, Scraper, High-Shear)' },
    { num: '05', title: 'Insulation & Cladding (PUF, Rockwool, Polished SS Cover)' },
    { num: '06', title: 'Control Automation (Manual, Semi-Auto, PLC Touchscreen)' }
  ]

  // Company Strengths details
  const strengths = [
    {
      num: '01',
      title: 'Engineering Expertise',
      desc: 'Every system is backed by mechanical calculations, CAD drafts, and fluid flow modeling. We optimize heating/cooling jackets and agitator profiles for maximum thermal efficiency.',
      img: blueprintImg
    },
    {
      num: '02',
      title: 'Manufacturing Experience',
      desc: 'With decades of shop-floor fabrication experience, our team excels in precision metal forming, argon TIG welding, and high-tolerance assembly of complex food-grade plants.',
      img: factoryViewImg
    },
    {
      num: '03',
      title: 'Quality Control',
      desc: 'We follow a strict inspection framework. Every vessel undergoes hydrostatic pressure testing, weld dye penetrant verification, and surface roughness profiling to ensure absolute hygiene.',
      img: inspectionImg
    },
    {
      num: '04',
      title: 'Custom Fabrication',
      desc: 'We configure agitators, insulation claddings, and capacities (from 50L up to 15,000L) around your exact operational parameters rather than forcing standard catalog models.',
      img: weldingImg
    },
    {
      num: '05',
      title: 'Export Support',
      desc: 'We provide heavy-duty seaworthy wooden crate packaging, container loading supervision, and full documentation to support smooth customs clearance in global markets.',
      img: dispatchImg
    },
    {
      num: '06',
      title: 'Responsive Service',
      desc: 'From fast initial quoting and technical drawings to post-installation support, our engineers are directly accessible to resolve operational issues without delay.',
      img: polishingImg
    }
  ]

  // Stage Navigation Handler for buttons
  const handleStageNav = (dir) => {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let targetStage = activeStage;
    if (dir === 'next' && activeStage < 7) {
      targetStage = activeStage + 1;
    } else if (dir === 'prev' && activeStage > 0) {
      targetStage = activeStage - 1;
    }

    if (isMobile || prefersReducedMotion || !workflowSectionRef.current) {
      setActiveStage(targetStage);
    } else {
      const getStepWidth = () => {
        if (window.innerWidth <= 1024) {
          return 240 + 420 + 16 + 30; // 706px
        }
        return 300 + 520 + 24 + 60; // 904px
      };
      const stepWidth = getStepWidth();
      const rect = workflowSectionRef.current.getBoundingClientRect();
      const sectionTop = window.pageYOffset + rect.top;
      
      window.scrollTo({
        top: sectionTop + targetStage * stepWidth,
        behavior: 'smooth'
      });
    }
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, drawing: e.target.files[0] }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        productCategory: 'Milk Collection & Handling',
        requiredCapacity: '',
        application: '',
        materialPreference: 'SS 304',
        message: '',
        drawing: null
      })
    }, 4000)
  }

  // Hero Autoplay & Interactions Effect
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = setInterval(() => {
        if (!isHoveringHero && window.innerWidth <= 992) {
          setCurrentHeroSlide(prev => (prev + 1) % 3)
        }
      }, 5000)
    }

    startAutoplay()
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
    }
  }, [isHoveringHero])

  // GSAP Smooth Slide Animation Effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      if (tlRef.current) tlRef.current.kill();
      const tl = gsap.timeline();
      tlRef.current = tl;

      if (prefersReducedMotion) {
        gsap.set('.hero-background, .navbar-overlay, .hero-eyebrow, .hero-line, .hero-description, .hero-action, .hero-spec-card, .hero-slide-dots, .vort-scroll-indicator', {
          clearProps: 'all',
          opacity: 1
        });
        return;
      }

      const activeText = `.slide-${currentHeroSlide}`;
      const prevText = prevSlideRef.current !== null ? `.slide-${prevSlideRef.current}` : null;
      const activeBg = `.bg-${currentHeroSlide}`;
      const prevBg = prevSlideRef.current !== null ? `.bg-${prevSlideRef.current}` : null;
      const activeSpec = `.spec-${currentHeroSlide}`;
      const prevSpec = prevSlideRef.current !== null ? `.spec-${prevSlideRef.current}` : null;

      if (prevSlideRef.current === null || prevSlideRef.current === currentHeroSlide) {
        // Initial setup
        gsap.set('.hero-background', { opacity: 0, scale: 1.06 });
        gsap.set('.navbar-overlay', { opacity: 0, y: -12 });
        gsap.set('.hero-eyebrow', { opacity: 0, yPercent: 120 });
        gsap.set('.hero-line', { opacity: 0, yPercent: 115 });
        gsap.set('.hero-description', { opacity: 0, y: 20 });
        gsap.set('.hero-action', { opacity: 0, y: 14 });
        gsap.set('.hero-spec-card', { opacity: 0, x: 30, filter: 'blur(8px)' });
        gsap.set('.hero-slide-dots, .vort-scroll-indicator', { opacity: 0, y: 10 });

        // INITIAL HERO LOAD
        tl.to(activeBg, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, 0)
          .to('.navbar-overlay', { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.2)
          .to(`${activeText} .hero-eyebrow`, { opacity: 1, yPercent: 0, duration: 0.7 }, 0.45)
          .to(`${activeText} .hero-line`, { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' }, 0.58)
          .to(`${activeText} .hero-description`, { opacity: 1, y: 0, duration: 0.65 }, 1.08)
          .to(`${activeText} .hero-action`, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 1.18)
          .to(activeSpec, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.75 }, 1.28)
          .to('.hero-slide-dots, .vort-scroll-indicator', { opacity: 1, y: 0, duration: 0.5 }, 1.4);

        prevSlideRef.current = currentHeroSlide;
      } else if (prevSlideRef.current !== currentHeroSlide) {
        // SLIDE CHANGE ANIMATION
        tl.to(`${prevText} .hero-eyebrow`, { y: -20, opacity: 0, duration: 0.4 }, 0)
          .to(`${prevText} .hero-line`, { y: -20, opacity: 0, duration: 0.4, stagger: 0.05 }, 0)
          .to(`${prevText} .hero-description`, { y: -10, opacity: 0, duration: 0.4 }, 0)
          .to(`${prevText} .hero-action`, { y: -8, opacity: 0, duration: 0.4 }, 0)
          .to(prevSpec, { x: 25, opacity: 0, duration: 0.4 }, 0)
          .to(prevBg, { scale: 1.03, opacity: 0, duration: 0.5 }, 0)
          
        gsap.set(activeBg, { opacity: 0, scale: 1.05 });
        gsap.set(`${activeText} .hero-eyebrow`, { opacity: 0, yPercent: 120, y: 0 });
        gsap.set(`${activeText} .hero-line`, { opacity: 0, yPercent: 115, y: 0 });
        gsap.set(`${activeText} .hero-description`, { opacity: 0, y: 20 });
        gsap.set(`${activeText} .hero-action`, { opacity: 0, y: 14 });
        gsap.set(activeSpec, { opacity: 0, x: 30, filter: 'blur(8px)' });

        tl.to(activeBg, { opacity: 1, scale: 1, duration: 1 }, 0.3)
          .to(`${activeText} .hero-eyebrow`, { opacity: 1, yPercent: 0, duration: 0.7 }, 0.4)
          .to(`${activeText} .hero-line`, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.1 }, 0.5)
          .to(`${activeText} .hero-description`, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
          .to(`${activeText} .hero-action`, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.8)
          .to(activeSpec, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.75 }, 0.9);

        prevSlideRef.current = currentHeroSlide;
      }
    });

    return () => ctx.revert();
  }, [currentHeroSlide]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) return;
    
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.workflow-card');
      const images = gsap.utils.toArray('.workflow-image-container');
      
      const getStepWidth = () => {
        if (window.innerWidth <= 1024) {
          return 240 + 420 + 16 + 30; // 706px
        }
        return 300 + 520 + 24 + 60; // 904px
      };

      const stepWidth = getStepWidth();
      const totalStages = 8;
      const scrollDistance = stepWidth * 7 + 100;
      
      gsap.set(cards[0], { opacity: 1 });
      gsap.set(images[0], { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)', x: 0 });
      gsap.set(cards[1], { opacity: 0.6 });
      
      for (let k = 2; k < totalStages; k++) {
        gsap.set(cards[k], { opacity: 0 });
      }
      for (let k = 1; k < totalStages; k++) {
        gsap.set(images[k], { opacity: 0, scale: 0.94, clipPath: 'inset(0% 12% 0% 12% round 20px)', x: -40 });
      }
      
      gsap.fromTo('.workflow-inner-panel', 
        { 
          opacity: 0.7, 
          y: 80, 
          scale: 0.96 
        }, 
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: workflowSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'workflow-trigger',
          trigger: workflowSectionRef.current,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (workflowProgressFillRef.current) {
              gsap.set(workflowProgressFillRef.current, { scaleX: self.progress });
            }
            
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * totalStages + 0.05),
              totalStages - 1
            );
            setActiveStage(index);
          }
        }
      });
      
      for (let i = 0; i < totalStages - 1; i++) {
        const nextIdx = i + 1;
        const start = i;
        
        tl.to(workflowTrackRef.current, {
          x: -stepWidth * nextIdx,
          ease: 'none',
          duration: 1
        }, start);
        
        tl.to(cards[i], {
          opacity: 0.25,
          ease: 'power1.out',
          duration: 0.6
        }, start);
        
        tl.to(images[i], {
          opacity: 0,
          scale: 0.97,
          x: 40,
          ease: 'power1.out',
          duration: 0.6
        }, start);
        
        tl.to(cards[nextIdx], {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.6
        }, start + 0.2);
        
        tl.to(images[nextIdx], {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          x: 0,
          ease: 'power2.out',
          duration: 0.8
        }, start + 0.2);
        
        if (nextIdx + 1 < totalStages) {
          tl.to(cards[nextIdx + 1], {
            opacity: 0.6,
            ease: 'power1.in',
            duration: 0.6
          }, start + 0.4);
        }
      }
      
    }, workflowSectionRef.current);
    
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };
    
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);
    
    return () => {
      ctx.revert();
      clearTimeout(timer);
      imgElements.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  // Scroll animations and Lenis init
  useEffect(() => {
    let lenis = null
    if (window.Lenis) {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis
      lenis.scrollTo(0, { immediate: true })

      const updateLenis = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(updateLenis)
      gsap.ticker.lagSmoothing(0)

      lenis.on('scroll', ScrollTrigger.update)

      window._updateLenis = updateLenis
    }

    const handleScroll = () => {
      const scrollY = window.scrollY

      if (heroImageRef.current) {
        const zoomFactor = Math.max(1, 1.15 - scrollY * 0.0005)
        heroImageRef.current.style.setProperty('--hero-zoom', zoomFactor)
      }

      if (heroTrackRef.current && window.innerWidth > 992) {
        const track = heroTrackRef.current
        const rect = track.getBoundingClientRect()
        const containerHeight = track.offsetHeight
        const viewportHeight = window.innerHeight
        
        const scrolledInTrack = -rect.top
        const maxScroll = containerHeight - viewportHeight

        if (scrolledInTrack >= 0 && scrolledInTrack <= maxScroll) {
          const progress = scrolledInTrack / maxScroll
          const index = Math.min(2, Math.floor(progress * 3.01))
          setCurrentHeroSlide(index)
        }
      }

      if (trackContainerRef.current && slidingTrackRef.current && window.innerWidth > 768) {
        const container = trackContainerRef.current
        const track = slidingTrackRef.current
        const rect = container.getBoundingClientRect()
        const containerHeight = container.offsetHeight
        const viewportHeight = window.innerHeight
        
        const scrolledInContainer = -rect.top
        const maxScroll = containerHeight - viewportHeight

        if (scrolledInContainer >= 0 && scrolledInContainer <= maxScroll) {
          const progress = scrolledInContainer / maxScroll
          const trackWidth = track.scrollWidth
          const pl = window.innerWidth > 1400 ? (window.innerWidth - 1400) / 2 + 40 : 40
          const lastCard = track.querySelector('.process-panel:last-child')
          const lastCardWidth = lastCard ? lastCard.offsetWidth : 320

          const maxTranslate = pl + trackWidth - lastCardWidth / 2 - window.innerWidth / 2
          const translateAmount = progress * maxTranslate
          track.style.transform = `translateX(-${translateAmount}px)`
        }
      }

      const cards = document.querySelectorAll('.story-card')
      if (cards.length > 0) {
        let activeIndex = 0
        let closestDist = Infinity
        const viewportCenter = window.innerHeight / 2
        
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect()
          const cardCenter = rect.top + rect.height / 2
          const dist = Math.abs(cardCenter - viewportCenter)
          if (dist < closestDist) {
            closestDist = dist
            activeIndex = index
          }
        })
        setActiveStage(activeIndex)
      }

      const processSec = document.getElementById('process-section')
      const horizSec = document.querySelector('.horizontal-scroll-section')
      const fabSec = document.getElementById('custom-fabrication')
      
      let targetBg = '#fcfcfc'
      
      if (processSec) {
        const rect = processSec.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          targetBg = '#f8f9fa'
        }
      }
      
      if (horizSec) {
        const rect = horizSec.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          targetBg = '#151515'
        }
      }
      
      if (fabSec) {
        const rect = fabSec.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          targetBg = '#fbfaf7'
        }
      }
      
      document.body.style.backgroundColor = targetBg

      const reveals = document.querySelectorAll('.reveal-on-scroll, .masked-image-container')
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('revealed')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (window._updateLenis) {
        gsap.ticker.remove(window._updateLenis)
      }
      if (lenis) lenis.destroy()
      document.body.style.backgroundColor = '#fcfcfc'
    }
  }, [])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Hero Section */}
      <div className="hero-page-wrapper" ref={heroTrackRef}>
        <div 
          className="hero-wrapper vort-hero" 
          ref={heroContainerRef}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          
          <div className="hero-background-slider" ref={heroImageRef}>
            {heroSlides.map((slide, index) => (
              <img 
                key={index}
                src={slide.img}
                alt=""
                className={`hero-bg-img hero-background bg-${index} ${currentHeroSlide === index ? 'active' : 'inactive'}`}
              />
            ))}
            <div className="hero-vort-tint"></div>
          </div>

          <Navbar />

          <div className="vort-hero-content-wrapper">
            <div className="vort-hero-text-area">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`vort-hero-slide-text slide-${index} ${currentHeroSlide === index ? 'active' : 'inactive'}`}
                  style={{
                    pointerEvents: currentHeroSlide === index ? 'auto' : 'none'
                  }}
                >
                  <span className="hero-eyebrow-mask">
                    <span className="hero-eyebrow text-label-caps" style={{ color: 'var(--color-red)', marginBottom: '16px', display: 'block' }}>
                      {slide.label}
                    </span>
                  </span>
                  
                  <h1 className="vort-hero-title">
                    {slide.title.map((line, i) => (
                      <span key={i} className="hero-line-mask">
                        <span className="hero-line">{line}</span>
                      </span>
                    ))}
                  </h1>
                  
                  <p className="vort-hero-desc hero-description">{slide.desc}</p>
                  
                  <div className="vort-hero-actions hero-actions">
                    <a href={slide.btn1Link} className="vort-btn-primary hero-action">
                      {slide.btn1Text} &rarr;
                    </a>
                    <a href={slide.btn2Link} className="vort-btn-secondary hero-action">
                      {slide.btn2Text}
                    </a>
                  </div>
                </div>
              ))}
              
              <div className="hero-slide-dots">
                {heroSlides.map((_, index) => (
                  <button 
                    key={index} 
                    className={`dot ${currentHeroSlide === index ? 'active' : ''}`} 
                    onClick={() => {
                      if (window.innerWidth <= 992) {
                        setCurrentHeroSlide(index)
                      } else if (heroTrackRef.current) {
                        const track = heroTrackRef.current
                        const rect = track.getBoundingClientRect()
                        const slideScrollOffset = window.scrollY + rect.top + (index * (track.offsetHeight - window.innerHeight) / 2)
                        window.scrollTo({ top: slideScrollOffset, behavior: 'smooth' })
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {heroSlides.map((_, index) => (
              <div 
                key={`spec-${index}`}
                className={`vort-metric-card hero-spec-card spec-${index}`} 
                style={{ 
                  pointerEvents: currentHeroSlide === index ? 'auto' : 'none'
                }}
              >
                <span className="vort-metric-value">
                  {index === 0 ? 'SS 304 / 316' : index === 1 ? 'Ra < 0.4 µm' : '100% Custom'}
                </span>
                <p className="vort-metric-desc">
                  {index === 0 
                    ? 'Engineered for sanitation & corrosion resistance' 
                    : index === 1 
                    ? 'Mirror-polished finishing to eliminate micro-crevices' 
                    : 'Vessels custom fabricated around exact specifications'}
                </p>
              </div>
            ))}
            
            <div className="vort-scroll-indicator">
              Scroll to Explore &darr;
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar (Immediately below Hero Section) */}
      <section className="trust-bar">
        <div className="container-centered trust-bar-inner">
          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="trust-text">Since 2006</span>
          </div>

          <div className="trust-separator"></div>

          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="trust-text">Food-Grade SS304 / SS316</span>
          </div>

          <div className="trust-separator"></div>

          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="trust-text">Export Ready</span>
          </div>

          <div className="trust-separator"></div>

          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20V9l8 4V9l8 4V9l4 3v8H2z" />
              <path d="M18 20v-4" />
            </svg>
            <span className="trust-text">OEM Manufacturing</span>
          </div>

          <div className="trust-separator"></div>

          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className="trust-text">Custom Engineering</span>
          </div>

          <div className="trust-separator"></div>

          <div className="trust-item">
            <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span className="trust-text">Worldwide Shipping</span>
          </div>
        </div>
      </section>

      {/* Company Introduction Bento */}
      <section className="about-bento reveal-on-scroll" id="company-overview">
        <div className="container-centered about-bento-inner">
          <div className="about-bento-header">
            <h2 className="about-bento-title">
              Every Product<br />
              <span className="about-bento-title-accent">Built With Precision</span>
            </h2>
            <p className="about-bento-subtitle">
              Our manufacturing brings decades of stainless-steel engineering experience, a quality-first perspective, and a shared commitment to sustainable dairy infrastructure.
            </p>
          </div>

          <div className="about-bento-grid">
            <div className="about-bento-card about-bento-card-image">
              <img src={factoryViewImg} alt="Jay Ambe Industries factory floor" className="about-bento-img" />
              <div className="about-bento-img-tint"></div>
              <div className="about-bento-img-overlay">
                <span className="about-bento-img-label">Our Capacity Over Time</span>
                <div className="about-bento-stats">
                  <div className="about-bento-stat">
                    <span className="about-bento-stat-value">500+</span>
                    <span className="about-bento-stat-label">Units Delivered</span>
                  </div>
                  <div className="about-bento-stat">
                    <span className="about-bento-stat-value">15+</span>
                    <span className="about-bento-stat-label">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-bento-right">
              <div className="about-bento-card about-bento-card-dark">
                <h3 className="about-bento-card-title">Precision Engineering</h3>
                <p className="about-bento-card-desc">
                  Jay Ambe Industries manufactures stainless-steel dairy equipment, institutional kitchen solutions, hygienic vessels and custom process machinery — all built to exact specifications.
                </p>
              </div>

              <div className="about-bento-card about-bento-card-dark">
                <h3 className="about-bento-card-title">Trusted Nationwide</h3>
                <p className="about-bento-card-desc">
                  A steady, results-driven approach focused on sustainable performance across dairy, food processing and institutional sectors.
                </p>
                <div className="about-bento-card-icons">
                  <div className="about-bento-icon-item">
                    <div className="about-bento-icon">🏭</div>
                    <span>Dairy</span>
                  </div>
                  <div className="about-bento-icon-item">
                    <div className="about-bento-icon">🍳</div>
                    <span>Kitchen</span>
                  </div>
                  <div className="about-bento-icon-item">
                    <div className="about-bento-icon">⚙️</div>
                    <span>Industrial</span>
                  </div>
                  <div className="about-bento-icon-item">
                    <div className="about-bento-icon">🧪</div>
                    <span>Pharma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Categories */}
      <section className="divisions-section" id="divisions">
        <div className="container-centered">
          <div className="divisions-header-group">
            <span className="text-label-caps">ENGINEERING & PROCESS SOLUTIONS</span>
            <h2 className="text-headline-md" style={{ marginTop: '8px', marginBottom: '40px' }}>Our Solution Categories</h2>
          </div>
          
          <div className="divisions-grid-redesign">
            {divisions.map((div, index) => (
              <div 
                key={index} 
                className="division-card-redesign"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const xc = rect.width / 2;
                  const yc = rect.height / 2;
                  const rx = -((y - yc) / yc) * 12;
                  const ry = ((x - xc) / xc) * 12;
                  card.style.setProperty('--rx', `${rx}deg`);
                  card.style.setProperty('--ry', `${ry}deg`);
                  card.style.setProperty('--mx', `${x}px`);
                  card.style.setProperty('--my', `${y}px`);
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.setProperty('--rx', '0deg');
                  card.style.setProperty('--ry', '0deg');
                }}
              >
                <div className="division-card-bg-wrapper">
                  <img src={div.img} alt={div.title} className="division-card-bg" />
                  <div className="division-card-gradient"></div>
                </div>
                
                <div className="division-card-content">
                  <span className="division-card-num">{div.num}</span>
                  <h3 className="division-card-title">{div.title}</h3>
                  <p className="division-card-desc">{div.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section" id="products">
        <div className="container-centered">
          <div className="section-header">
            <div>
              <span className="text-label-caps">CATALOGUE SELECTION</span>
              <h2 className="text-headline-md" style={{ marginTop: '8px' }}>Featured Stainless Steel Equipment</h2>
            </div>
            <span className="text-tech">SS 304 & 316 RANGE</span>
          </div>

          <div className="products-grid-8 reveal-on-scroll">
            {products.map((prod, index) => (
              <div key={index} className="product-card-sm">
                <div className="product-img-container">
                  <img 
                    src={prod.img} 
                    alt={prod.title} 
                    className="product-img" 
                  />
                </div>
                <div className="product-info-sm">
                  <h3 className="product-title">{prod.title}</h3>
                  <p className="text-body-md product-desc">
                    {prod.desc}
                  </p>
                  
                  <div className="product-specs-grid">
                    {prod.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="product-spec-badge">{spec}</span>
                    ))}
                  </div>

                  <div className="product-actions-sm">
                    <a href="#inquiry" onClick={() => setFormData(prev => ({ ...prev, productCategory: prod.title }))}>
                      <button className="product-inquire-btn">INQUIRE</button>
                    </a>
                    <span className="product-jaispec">JAI-SPEC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section 
        className="story-section workflow-section" 
        id="process-section"
        ref={workflowSectionRef}
      >
        <div className="workflow-inner-panel">
          <div className="workflow-header-row">
            <div className="workflow-header-left">
              <span className="workflow-label-caps">IN-HOUSE MANUFACTURING</span>
              <h2 className="workflow-title-main">Our End-to-End Production Journey</h2>
            </div>
            <div className="workflow-header-right">
              <p className="workflow-supporting-text">
                Every piece of equipment is designed, fabricated, polished, and tested in-house at our GIDC facility. By managing all stages directly, we guarantee absolute sanitary compliance and high-strength execution.
              </p>
              <a href="#inquiry" className="workflow-link-action">View Full Process &rarr;</a>
            </div>
          </div>

          <div className="workflow-track-wrapper">
            <div className="workflow-track" ref={workflowTrackRef}>
              {stages.map((stage, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`workflow-card card-${index} ${activeStage === index ? 'active' : activeStage + 1 === index ? 'preview' : activeStage > index ? 'past' : 'upcoming'}`}
                    ref={el => workflowCardsRef.current[index] = el}
                  >
                    <span className="workflow-card-num">STAGE {stage.num}</span>
                    <div className="workflow-card-info-bottom">
                      <h3 className="workflow-card-title">{stage.title}</h3>
                      <p className="workflow-card-desc">{stage.desc}</p>
                    </div>
                  </div>

                  <div 
                    className={`workflow-image-container img-container-${index} ${activeStage === index ? 'active' : activeStage + 1 === index ? 'preview' : activeStage > index ? 'past' : 'upcoming'}`}
                    ref={el => workflowImagesRef.current[index] = el}
                  >
                    <img 
                      src={stage.img} 
                      alt={stage.title} 
                      className="workflow-image"
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="workflow-bottom-bar">
            <div className="workflow-progress-container">
              <div className="workflow-progress-line">
                <div 
                  className="workflow-progress-fill" 
                  ref={workflowProgressFillRef}
                ></div>
              </div>
            </div>

            <div className="workflow-nav-buttons">
              <button 
                className="workflow-nav-btn prev"
                onClick={() => handleStageNav('prev')}
                disabled={activeStage === 0}
                aria-label="Go to previous stage"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button 
                className="workflow-nav-btn next"
                onClick={() => handleStageNav('next')}
                disabled={activeStage === 7}
                aria-label="Go to next stage"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Process */}
      <section className="horizontal-scroll-section">
        <div className="horizontal-track-container" ref={trackContainerRef}>
          <div className="horizontal-sticky-wrapper">
            <div className="container-centered">
              <div className="horizontal-header-inline">
                <span className="text-label-caps">SYSTEM WORKFLOW</span>
                <h2 className="text-headline-md" style={{ marginTop: '8px' }}>Explore by Process</h2>
                <p className="text-body-md" style={{ marginTop: '12px' }}>
                  Scroll down to see the sequential stages of material flow and thermal operations handled by our equipment line.
                </p>
              </div>
            </div>
            
            <div className="horizontal-sliding-track-wrapper">
              <div className="horizontal-sliding-track" ref={slidingTrackRef}>
                {processes.map((proc, index) => (
                  <div key={index} className="process-panel">
                    <div className="process-panel-visual">
                      <img src={proc.img} alt={proc.title} className="process-panel-img" />
                      <span className="process-panel-num">{proc.num}</span>
                    </div>
                    <div className="process-panel-body">
                      <h3 className="process-panel-title">{proc.title}</h3>
                      <p className="text-body-md process-panel-desc">
                        {proc.desc}
                      </p>
                    </div>
                    <span className="text-tech" style={{ fontSize: '10px', color: 'var(--color-silver)', letterSpacing: '0.1em' }}>JAI PROCESS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Fabrication */}
      <section className="custom-fab-section" id="custom-fabrication" ref={customFabSectionRef}>
        <div className="custom-fab-sticky-wrapper">
          <div className="custom-fab-container">
            <div className="custom-fab-left">
              <div className="custom-fab-left-content">
                <span className="text-label-caps accent-red">MADE TO MEASURE</span>
                <h2 className="text-headline-md font-strong" style={{ marginTop: '10px', marginBottom: '12px', lineHeight: 1.15 }}>
                  Built Around<br/>Your Process
                </h2>
                <p className="text-body-md custom-fab-desc" style={{ marginBottom: '28px' }}>
                  Custom stainless-steel equipment manufactured around your required capacity, material grade, thermal process, insulation, agitation, outlet configuration and operating environment.
                </p>

                <div className="custom-fab-nav-wrapper">
                  <div className="custom-fab-progress-container">
                    <div className="progress-marker-line">
                      <div className="progress-marker-fill" ref={customFabProgressFillRef}></div>
                    </div>
                    <div className="progress-marker-steps">
                      <div className="marker-step-fab active" data-step="0">Define</div>
                      <div className="marker-step-fab" data-step="1">Engineer</div>
                      <div className="marker-step-fab" data-step="2">Fabricate</div>
                      <div className="marker-step-fab" data-step="3">Deliver</div>
                    </div>
                  </div>

                  <div className="custom-fab-specs-list">
                    {requirements.map((req, idx) => (
                      <div key={idx} className={`fab-spec-badge spec-badge-${idx}`}>
                        <span className="spec-badge-num">{req.num}</span>
                        <span className="spec-badge-title">{req.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fab-final-statement">
                  Designed to Your Capacity. Built for Your Process.
                </div>
                <div className="fab-cta-wrapper" style={{ marginTop: '20px' }}>
                  <a href="#inquiry">
                    <button className="btn-primary">Send Your Requirement</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="custom-fab-right">
              <div className="custom-fab-visual-frame">
                <img 
                  src={steamVesselImg} 
                  alt="Finished stainless steel steam tilting cooking vessel" 
                  className="custom-fab-product-img" 
                />
                <div className="custom-fab-img-overlay"></div>
              </div>
            </div>

            <div className="custom-fab-mobile-stages">
              <div className="mobile-stage-card">
                <span className="mobile-stage-label">STAGE 01 — BLUEPRINT DESIGN</span>
                <div className="mobile-stage-visual dark-bg">
                  <svg className="blueprint-svg-static" viewBox="0 0 600 500" fill="none">
                    <rect width="100%" height="100%" fill="#111111" />
                    <path d="M 230 130 L 230 350 A 20 20 0 0 0 250 370 L 450 370 A 20 20 0 0 0 470 350 L 470 130 Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
                    <path d="M 210 150 L 210 350 A 40 40 0 0 0 250 390 L 450 390 A 40 40 0 0 0 490 350 L 490 150" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4,4" fill="none" />
                    <path d="M 320 70 L 380 70 L 390 130 L 310 130 Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
                    <line x1="350" y1="130" x2="350" y2="330" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                    <path d="M 270 320 L 350 340 L 430 320" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="mobile-stage-text">
                  <h3>01. Concept & Drafting</h3>
                  <p>Translating specific process needs into standard-compliant CAD drafts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section className="export-section" id="exports">
        <div className="container-centered">
          
          {/* Top Header Block */}
          <div className="export-header-row">
            <div className="export-header-left">
              <span className="text-label-caps accent-red">GLOBAL SUPPLY NETWORK</span>
              <h2 className="text-headline-md font-strong" style={{ marginTop: '10px', marginBottom: '20px', lineHeight: 1.15 }}>
                International Freight,<br />OEM & Custom Exports
              </h2>
              <p className="text-body-md export-intro-text" style={{ marginBottom: '24px' }}>
                Jay Ambe Industries is an export-ready fabrication house. We engineer and package stainless steel process plants and dairy equipment for international buyers, matching strict globally-accepted sanitary specifications.
              </p>
              <a href="#inquiry" onClick={() => setFormData(prev => ({ ...prev, productCategory: 'Export Inquiry' }))} className="vort-btn-primary export-cta-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Contact Export Team &rarr;
              </a>
            </div>
            
            <div className="export-header-right">
              <div className="export-image-container">
                <img src={dispatchImg} alt="Export loading and packaging" className="export-img" />
              </div>
            </div>
          </div>

          {/* Export Pillars Grid */}
          <div className="export-pillars-grid">
            <div className="export-pillar-card">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">Export Experience</h3>
              <p className="pillar-desc">Over a decade supplying dairy plants, mixing vessels, and industrial equipment to buyers across the Middle East, East Africa, and neighboring Asian markets.</p>
            </div>
            
            <div className="export-pillar-card">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">Export Documentation</h3>
              <p className="pillar-desc">Comprehensive support for Bank L/Cs, certificates of origin, customs declaration paperwork, and third-party pre-shipment inspections (SGS, Intertek).</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">OEM Manufacturing</h3>
              <p className="pillar-desc">White-label manufacturing solutions for global process brands and engineering consultants who require reliable, premium, ASME-standard sub-assemblies.</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">04</div>
              <h3 className="pillar-title">Custom Manufacturing</h3>
              <p className="pillar-desc">Vessels and machinery tailored to meet international factory specifications, voltage profiles (50Hz/60Hz), and regional regulatory standards.</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">05</div>
              <h3 className="pillar-title">International Packaging</h3>
              <p className="pillar-desc">Heavy-duty multi-layered wrapping, shock-absorbing foam edge protectors, and steel-reinforced, ISPM-15 certified fumigated wooden crates.</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">06</div>
              <h3 className="pillar-title">Container Loading</h3>
              <p className="pillar-desc">Rigorous shipping container securement using heavy-duty nylon lashing, industrial strapping, and weight-balanced timber blocking to prevent transit shifting.</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">07</div>
              <h3 className="pillar-title">Distributor Opportunities</h3>
              <p className="pillar-desc">Flexible commercial partnership models for regional distributors, turn-key kitchen consultants, and local process machinery installers.</p>
            </div>

            <div className="export-pillar-card">
              <div className="pillar-num">08</div>
              <h3 className="pillar-title">International Buyer Support</h3>
              <p className="pillar-desc">Dedicated export support desk providing swift time-zone aligned communication, live-video inspection runs, and remote video installation guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="global-presence-section" id="global-map">
        <div className="container-centered">
          <div className="map-header">
            <span className="text-label-caps accent-red">GLOBAL FOOTPRINT</span>
            <h2 className="text-headline-md font-strong" style={{ marginTop: '8px', marginBottom: '16px' }}>
              Confirmed International Markets
            </h2>
            <p className="text-body-md map-subtitle">
              We regularly supply food-grade stainless steel equipment to key processing hubs worldwide, coordinating full customs documentation and seaworthy packaging.
            </p>
          </div>

          <div className="regions-grid-layout">
            {/* Manufacturing Hub */}
            <div className="region-editorial-card hub-card">
              <span className="region-category">CENTRAL FABRICATION HUB</span>
              <h3 className="region-title">India (GIDC Hub)</h3>
              <p className="region-desc">
                Our main manufacturing facility in Gujarat manages core TIG welding, mirror finishing (Ra &lt; 0.4 µm), hydrostatic testing, and export container stuffing.
              </p>
              <div className="region-tags">
                <span className="region-tag">15,000 sq. ft. Facility</span>
                <span className="region-tag">ASME Standards</span>
              </div>
            </div>

            {/* Middle East */}
            <div className="region-editorial-card">
              <span className="region-category">EXPORT REGION</span>
              <h3 className="region-title">Middle East</h3>
              <p className="region-desc">
                Supplying jacketed thermal vessels, automated pasteurisers, and sanitary process piping directly to UAE, Saudi Arabia, and Oman.
              </p>
              <div className="region-tags">
                <span className="region-tag">Saudi Arabia</span>
                <span className="region-tag">UAE</span>
                <span className="region-tag">Oman</span>
              </div>
            </div>

            {/* East Africa */}
            <div className="region-editorial-card">
              <span className="region-category">EXPORT REGION</span>
              <h3 className="region-title">East Africa</h3>
              <p className="region-desc">
                Providing rapid-cooling bulk milk coolers, insulated transport tanks, and sanitary collection lines to Kenya, Tanzania, and Uganda.
              </p>
              <div className="region-tags">
                <span className="region-tag">Kenya</span>
                <span className="region-tag">Tanzania</span>
                <span className="region-tag">Uganda</span>
              </div>
            </div>

            {/* South Asia */}
            <div className="region-editorial-card">
              <span className="region-category">EXPORT REGION</span>
              <h3 className="region-title">South Asia</h3>
              <p className="region-desc">
                Delivering high-capacity milk collection cans, paneer presses, and steam cooking equipment to Nepal, Bangladesh, and Sri Lanka.
              </p>
              <div className="region-tags">
                <span className="region-tag">Nepal</span>
                <span className="region-tag">Bangladesh</span>
                <span className="region-tag">Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Legend / Stats overlay */}
          <div className="map-stats-legend">
            <div className="legend-stat">
              <span className="legend-stat-num">15+</span>
              <span className="legend-stat-text">Active Export Countries</span>
            </div>
            <div className="legend-stat">
              <span className="legend-stat-num">100%</span>
              <span className="legend-stat-text">Certified Cargo Dispatch</span>
            </div>
            <div className="legend-stat">
              <span className="legend-stat-num">Fumigated</span>
              <span className="legend-stat-text">ISPM-15 Wood Packing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Strengths Section */}
      <section className="strengths-section" id="strengths">
        <div className="container-centered strengths-layout">
          <div className="strengths-sidebar">
            <span className="text-label-caps accent-red">WHY BUYERS CHOOSE AMBE</span>
            <h2 className="text-headline-md strengths-main-title">
              Engineered for Performance.<br/>Built for Trust.
            </h2>
            <p className="text-body-md strengths-subtitle">
              Discover the engineering discipline, quality protocols, and fabrication expertise that make Jay Ambe Industries the preferred manufacturing partner for dairy and food-processing plants worldwide.
            </p>
          </div>
          
          <div className="strengths-feed">
            {strengths.map((item, idx) => (
              <div key={idx} className="strength-editorial-card">
                <div className="strength-image-wrapper">
                  <img src={item.img} alt={item.title} className="strength-img" />
                  <span className="strength-number">{item.num}</span>
                </div>
                <div className="strength-content">
                  <h3 className="strength-title">{item.title}</h3>
                  <p className="strength-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="contact-section" id="inquiry">
        <div className="container-centered contact-layout-inner">
          <div className="contact-info">
            <div>
              <span className="inquiry-label accent-red">CAD REGISTRY & INQUIRIES</span>
              <h2 className="text-headline-md font-strong" style={{ marginTop: '10px', marginBottom: '16px', lineHeight: '1.15' }}>
                Discuss Your<br/>Equipment Requirement
              </h2>
              <p className="inquiry-text-body">
                Send us your capacity parameters, material specification details, or CAD blueprints. Our engineering team will review structural details and generate a response.
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-detail-row">
                <span className="inquiry-detail-label">OFFICIAL DESK</span>
                <span className="inquiry-detail-val">+91 9904X XXXXX</span>
              </div>
              <div className="contact-detail-row">
                <span className="inquiry-detail-label">EMAIL COMMUNICATION</span>
                <span className="inquiry-detail-val">info@jayambeindustries.example.com</span>
              </div>
              <div className="contact-detail-row">
                <span className="inquiry-detail-label">GIDC FABRICATION SITE</span>
                <span className="inquiry-detail-val">Plot No. 42-A, GIDC Industrial Estate, Gujarat, India</span>
              </div>
            </div>
          </div>

          <div>
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    className="form-input" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    className="form-input" 
                    value={formData.company} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="phone">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    className="form-input" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="productCategory">Solution Category</label>
                  <select 
                    id="productCategory" 
                    name="productCategory" 
                    className="form-input" 
                    value={formData.productCategory} 
                    onChange={handleInputChange}
                  >
                    <option value="Milk Collection & Handling">Milk Collection & Handling</option>
                    <option value="Dairy Processing Equipment">Dairy Processing Equipment</option>
                    <option value="Process Equipment">Process Equipment</option>
                    <option value="Institutional Kitchen Equipment">Institutional Kitchen Equipment</option>
                    <option value="Storage & Hygienic Vessels">Storage & Hygienic Vessels</option>
                    <option value="Custom Stainless Steel Fabrication">Custom Stainless Steel Fabrication</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="requiredCapacity">Required Capacity</label>
                  <input 
                    type="text" 
                    id="requiredCapacity" 
                    name="requiredCapacity" 
                    className="form-input" 
                    placeholder="e.g. 1000 Litres, 500 Kg"
                    value={formData.requiredCapacity} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="application">Application Area</label>
                  <input 
                    type="text" 
                    id="application" 
                    name="application" 
                    className="form-input" 
                    placeholder="e.g. Milk transport, curd coagulation"
                    value={formData.application} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="inquiry-form-label" htmlFor="materialPreference">Material Preference</label>
                  <select 
                    id="materialPreference" 
                    name="materialPreference" 
                    className="form-input" 
                    value={formData.materialPreference} 
                    onChange={handleInputChange}
                  >
                    <option value="SS 304">SS 304 Stainless Steel</option>
                    <option value="SS 316">SS 316 Stainless Steel</option>
                    <option value="SS 316L">SS 316L (Low Carbon Sanitary)</option>
                    <option value="Custom specification">Other / Custom specification</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="inquiry-form-label" htmlFor="message">Specifications / Requirements</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-input" 
                  placeholder="List detailed dimensions, cooling jacket requirements, insulation depth, or design guidelines..."
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="form-group full-width file-upload-wrapper">
                <label className="inquiry-form-label">Upload Fabrication Drawing (PDF/CAD/Image)</label>
                <div className="file-upload-btn">
                  {formData.drawing ? formData.drawing.name : 'CHOOSE FILE / ATTACH BLUEPRINT DRAWING'}
                </div>
                <input 
                  type="file" 
                  className="file-upload-input" 
                  onChange={handleFileChange} 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>
                {submitted ? 'REQUIREMENT SENT SUCCESSFULLY' : 'Submit Requirement'}
              </button>
              {submitted && <p className="inquiry-submit-success-text">Your technical specifications have been registered under technical inquiry dispatch control.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default HomePage;

