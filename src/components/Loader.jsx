import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  
  // Ref to animate SVG stroke draw
  const svgOutlineRef = useRef(null);
  const outlineRectRef = useRef(null);
  const outlineCircle1Ref = useRef(null);
  const outlineCircle2Ref = useRef(null);

  // Left and Right solid panels
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  
  // Top red dot
  const topDotRef = useRef(null);
  
  // Center circle
  const centerCircleRef = useRef(null);
  
  // Laser cutter & laser line
  const laserCutterRef = useRef(null);
  const laserCutLineRef = useRef(null);
  
  // Texts
  const textJayRef = useRef(null);
  const textAmbeRef = useRef(null);
  const textIndustriesRef = useRef(null);
  const textAmbeClipRef = useRef(null);
  
  // Sparks container
  const sparksRef = useRef(null);
  
  // Audio state
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Sound effect generator
    const playSound = (type) => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        if (type === 'ambience') {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, ctx.currentTime);
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(110, ctx.currentTime);
          gain.gain.setValueAtTime(0.005, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 1.2);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start();
          osc2.start();
          setTimeout(() => {
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
            setTimeout(() => {
              osc1.stop();
              osc2.stop();
            }, 1500);
          }, 3800);
        } else if (type === 'lock') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(700, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.12);
        } else if (type === 'impact') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(110, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.28);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.32);
        } else if (type === 'laser') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1500, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.45);
          gain.gain.setValueAtTime(0.012, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        }
      } catch (e) {
        console.warn(e);
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('jayambe_loader_completed', 'true');
        if (onComplete) onComplete();
      }
    });

    // Length calculations for SVG drawing animation
    const rectLength = 550; // Total perimeter of sharp A emblem
    const circle1Length = 25; // 2 * pi * 3.5 approx
    const circle2Length = 95; // 2 * pi * 14 approx
    const laserLineLength = 335; // 115.4 + 100 + 115.4

    // Reset initial animation states
    gsap.set(svgOutlineRef.current, { opacity: 0 });
    
    // Set dash stroke offsets for drawing animation
    gsap.set(outlineRectRef.current, { strokeDasharray: rectLength, strokeDashoffset: rectLength });
    gsap.set(outlineCircle1Ref.current, { strokeDasharray: circle1Length, strokeDashoffset: circle1Length });
    gsap.set(outlineCircle2Ref.current, { strokeDasharray: circle2Length, strokeDashoffset: circle2Length });
    
    gsap.set(leftPanelRef.current, { x: -250, opacity: 0 });
    gsap.set(rightPanelRef.current, { x: 250, opacity: 0 });
    gsap.set(topDotRef.current, { y: -60, opacity: 0 });
    gsap.set(centerCircleRef.current, { y: -300, opacity: 0 });
    gsap.set(laserCutterRef.current, { opacity: 0 });
    gsap.set(laserCutLineRef.current, { strokeDasharray: laserLineLength, strokeDashoffset: laserLineLength, opacity: 0 });
    
    gsap.set(textJayRef.current, { y: -15, opacity: 0 });
    gsap.set(textAmbeClipRef.current, { scaleX: 0 });
    gsap.set(textIndustriesRef.current, { y: 10, opacity: 0 });

    // Step 1: Play machine ambience hum
    tl.add(() => playSound('ambience'), 0.3);

    // Step 2: Draw outline dynamically in real time
    tl.to(svgOutlineRef.current, { opacity: 0.35, duration: 0.2 }, 0.5);
    tl.to(outlineRectRef.current, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.5);
    tl.to(outlineCircle1Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.6);
    tl.to(outlineCircle2Ref.current, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.7);

    // Step 3: Left Panel Slides & Locks with Bounce Back ease
    const leftStart = 1.5;
    tl.add(() => {
      playSound('lock');
      const sparks = sparksRef.current.querySelectorAll('.spark-left');
      gsap.fromTo(sparks, { scale: 0, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'power1.out' });
    }, leftStart);
    
    tl.to(leftPanelRef.current, { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.15)' }, leftStart);
    tl.to(containerRef.current, { x: '+=2.5', y: '+=1', duration: 0.04, repeat: 3, yoyo: true }, leftStart + 0.38);

    // Step 4: Right Panel Slides & Locks (mirrored)
    const rightStart = 1.9;
    tl.add(() => {
      playSound('lock');
      const sparks = sparksRef.current.querySelectorAll('.spark-right');
      gsap.fromTo(sparks, { scale: 0, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'power1.out' });
    }, rightStart);
    
    tl.to(rightPanelRef.current, { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.15)' }, rightStart);
    tl.to(containerRef.current, { x: '-=2.5', y: '-=1', duration: 0.04, repeat: 3, yoyo: true }, rightStart + 0.38);

    // Step 5: Top Dot & Heavy Center Circle Impact
    const circleStart = 2.3;
    tl.add(() => playSound('impact'), circleStart);
    tl.to(topDotRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, circleStart);
    tl.to(centerCircleRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'bounce.out' }, circleStart);
    tl.to(containerRef.current, { y: '+=4', duration: 0.04, repeat: 4, yoyo: true }, circleStart + 0.3);

    // Step 6: Laser precision weld / cut along inner contour
    const cutStart = 2.8;
    tl.add(() => playSound('laser'), cutStart);
    
    // Trace sharp laser pointer around the inner contour
    tl.fromTo(laserCutterRef.current, { opacity: 0, x: 200, y: 34 }, { opacity: 1, duration: 0.08 }, cutStart);
    tl.to(laserCutterRef.current, { x: 150, y: 138, duration: 0.22, ease: 'power1.in' }, cutStart + 0.08);
    
    // Left tip spark burst
    tl.add(() => {
      const sparks = sparksRef.current.querySelectorAll('.spark-tip-left');
      gsap.fromTo(sparks, { scale: 0, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.25, ease: 'power2.out' });
    }, cutStart + 0.30);
    
    tl.to(laserCutterRef.current, { x: 250, y: 138, duration: 0.18, ease: 'linear' }, cutStart + 0.30);
    
    // Right tip spark burst
    tl.add(() => {
      const sparks = sparksRef.current.querySelectorAll('.spark-tip-right');
      gsap.fromTo(sparks, { scale: 0, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.25, ease: 'power2.out' });
    }, cutStart + 0.48);
    
    tl.to(laserCutterRef.current, { x: 200, y: 34, duration: 0.22, ease: 'power1.out' }, cutStart + 0.48);
    tl.to(laserCutterRef.current, { opacity: 0, duration: 0.06 }, cutStart + 0.70);

    // Glowing laser incision line
    tl.to(laserCutLineRef.current, { opacity: 0.8, duration: 0.1 }, cutStart + 0.08);
    tl.to(laserCutLineRef.current, { strokeDashoffset: 0, duration: 0.62, ease: 'linear' }, cutStart + 0.08);
    tl.to(laserCutLineRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, cutStart + 0.70);

    // Hide outline
    tl.to(svgOutlineRef.current, { opacity: 0, duration: 0.2 }, cutStart);

    // Step 7: Typography Reveals (Sleek motion aligned under sharp emblem)
    const textStart = 3.5;
    
    // Jay slides down slightly and fades in
    tl.to(textJayRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, textStart);
    
    // AMBE slides right reveal
    tl.to(textAmbeClipRef.current, { scaleX: 1, duration: 0.48, ease: 'power3.inOut' }, textStart + 0.08);
    
    // Industries slides up and reveals
    tl.to(textIndustriesRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, textStart + 0.22);

    // Step 8: Polished metallic light sweep
    const sweepStart = 4.1;
    tl.fromTo('.logo-sweep-gradient', { x: '-100%' }, { x: '100%', duration: 0.85, ease: 'power2.inOut' }, sweepStart);

    // Step 9: Website Reveal Exit scaling into navbar logo position
    const exitStart = 4.8;
    tl.to(containerRef.current, {
      scale: 0.2,
      y: -viewportHeight() * 0.45,
      opacity: 0,
      duration: 0.75,
      ease: 'power4.inOut'
    }, exitStart);

    tl.to('.jayambe-loader-screen', {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.75,
      ease: 'power3.inOut'
    }, exitStart);

  }, []);

  const viewportHeight = () => window.innerHeight;

  return (
    <div className="jayambe-loader-screen" ref={containerRef}>
      <div className="loader-logo-wrapper">
        <svg 
          className="loader-logo-svg" 
          viewBox="0 0 400 350" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <defs>
            <clipPath id="ambe-clip">
              <rect ref={textAmbeClipRef} x="60" y="175" width="280" height="48" style={{ transformOrigin: 'left' }} />
            </clipPath>
          </defs>

          {/* Dynamic Laser Drawing Outline Layer */}
          <g ref={svgOutlineRef} className="outline-layer">
            <path 
              ref={outlineRectRef} 
              d="M150,32 L250,32 L250,138 L200,34 L150,138 Z" 
              stroke="#c91c1c" 
              strokeWidth="1.2" 
              strokeLinejoin="miter" 
              strokeMiterlimit="10" 
              fill="none" 
            />
            <circle ref={outlineCircle1Ref} cx="200" cy="22" r="3.5" stroke="#c91c1c" strokeWidth="1" fill="none" />
            <circle ref={outlineCircle2Ref} cx="200" cy="104" r="14" stroke="#c91c1c" strokeWidth="1" fill="none" />
          </g>

          {/* Sharp Left Panel with Acute Needle Point */}
          <path 
            ref={leftPanelRef} 
            d="M150,32 L200,32 L200,34 L150,138 Z" 
            fill="#c91c1c" 
            stroke="#c91c1c" 
            strokeWidth="0.5" 
            strokeLinejoin="miter" 
            strokeMiterlimit="10" 
          />
          
          {/* Sharp Right Panel with Acute Needle Point */}
          <path 
            ref={rightPanelRef} 
            d="M200,32 L250,32 L250,138 L200,34 Z" 
            fill="#c91c1c" 
            stroke="#c91c1c" 
            strokeWidth="0.5" 
            strokeLinejoin="miter" 
            strokeMiterlimit="10" 
          />

          {/* Small red dot on top */}
          <circle ref={topDotRef} cx="200" cy="22" r="3.5" fill="#c91c1c" />

          {/* Central red circle */}
          <circle ref={centerCircleRef} cx="200" cy="104" r="14" fill="#c91c1c" />

          {/* Laser Incision Glowing Seam */}
          <path 
            ref={laserCutLineRef} 
            d="M200,34 L150,138 L250,138 Z" 
            stroke="#ff3333" 
            strokeWidth="1.8" 
            strokeLinejoin="miter" 
            strokeMiterlimit="10" 
            fill="none" 
            filter="drop-shadow(0 0 5px #ff1a1a)" 
          />

          {/* Texts matching exact layout and brand typography */}
          <g className="logo-texts">
            <text ref={textJayRef} x="200" y="172" className="text-element-jay" textAnchor="middle">Jay</text>
            <g clipPath="url(#ambe-clip)">
              <text ref={textAmbeRef} x="200" y="215" className="text-element-ambe" textAnchor="middle">AMBE</text>
            </g>
            <text ref={textIndustriesRef} x="200" y="244" className="text-element-ind" textAnchor="middle">Industries</text>
          </g>

          {/* Laser Cut pointer */}
          <circle ref={laserCutterRef} cx="0" cy="0" r="3.5" fill="#ff4d4d" filter="drop-shadow(0 0 6px #ff0000)" />
        </svg>

        <div className="logo-sweep-gradient"></div>

        <svg ref={sparksRef} className="sparks-layer" viewBox="0 0 400 350">
          <circle className="spark-left" cx="150" cy="80" r="2.5" fill="#ffb300" />
          <circle className="spark-left" cx="150" cy="138" r="2" fill="#ff4d00" />
          <circle className="spark-right" cx="250" cy="80" r="2.5" fill="#ffb300" />
          <circle className="spark-right" cx="250" cy="138" r="2" fill="#ff4d00" />
          <circle className="spark-tip-left" cx="150" cy="138" r="3" fill="#ffdd00" opacity="0" />
          <circle className="spark-tip-right" cx="250" cy="138" r="3" fill="#ffdd00" opacity="0" />
        </svg>
      </div>
    </div>
  );
}
