import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/hero-card.png';
import img2 from '../assets/4.png';
import img3 from '../assets/2.png';
import img4 from '../assets/3.png';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: '01', title: 'Branding', color: '#E84E3A', img: img1 },
  { num: '02', title: 'UI/UX Design', color: '#6C5CE7', img: img2 },
  { num: '03', title: 'Web & Development', color: '#00B894', img: img3 },
  { num: '04', title: 'SEO', color: '#FDCB6E', img: img4 },
];

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const imageContainerRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(null);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.service-row');
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Track mouse X position and move image horizontally
  const handleMouseMove = useCallback((e) => {
    if (!listRef.current || !imageContainerRef.current || activeIndex === null) return;
    const rect = listRef.current.getBoundingClientRect();
    mouseX.current = e.clientX - rect.left;

    gsap.to(imageContainerRef.current, {
      x: mouseX.current - 160,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [activeIndex]);

  const handleItemEnter = (index, e) => {
    setActiveIndex(index);

    if (imageContainerRef.current && listRef.current && rowRefs.current[index]) {
      const listRect = listRef.current.getBoundingClientRect();
      const rowRect = rowRefs.current[index].getBoundingClientRect();
      const mouseXPos = e.clientX - listRect.left;

      // Position image vertically centered on the hovered row
      const rowCenterY = rowRect.top - listRect.top + rowRect.height / 2 - 110;

      gsap.set(imageContainerRef.current, { x: mouseXPos - 160 });
      gsap.to(imageContainerRef.current, {
        y: rowCenterY,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power3.out',
      });
    }
  };

  const handleItemHover = (index) => {
    // Update Y position when switching between rows without leaving
    if (imageContainerRef.current && listRef.current && rowRefs.current[index]) {
      const listRect = listRef.current.getBoundingClientRect();
      const rowRect = rowRefs.current[index].getBoundingClientRect();
      const rowCenterY = rowRect.top - listRect.top + rowRect.height / 2 - 110;

      setActiveIndex(index);
      gsap.to(imageContainerRef.current, {
        y: rowCenterY,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  const handleListLeave = () => {
    setActiveIndex(null);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: '#f5f5f0',
        borderRadius: '40px 40px 0 0',
        marginTop: '-20px',
        zIndex: 30,
      }}
    >
      <div className="py-20 md:py-32 w-full">
        {/* Section Heading */}
        <div ref={headingRef} className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
          <h2
            className="text-[#111] leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: 'clamp(48px, 10vw, 190px)',
              fontWeight: 400,
            }}
          >
            <span className="block">What</span>
            <span className="block pl-16 md:pl-32 lg:pl-48">We Do.</span>
          </h2>
        </div>

        {/* Services List */}
        <div
          ref={listRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleListLeave}
        >
          {/* Floating image — follows mouse X, snaps to hovered row Y */}
          <div
            ref={imageContainerRef}
            className="hidden lg:block absolute pointer-events-none"
            style={{
              top: 0,
              left: 0,
              width: '320px',
              height: '220px',
              opacity: 0,
              transform: 'scale(0.88)',
              zIndex: 20,
              willChange: 'transform, opacity',
            }}
          >
            {services.map((service, i) => (
              <img
                key={i}
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          {/* Service rows */}
          {services.map((service, index) => (
            <div
              key={service.num}
              ref={(el) => (rowRefs.current[index] = el)}
              className="service-row relative overflow-hidden cursor-pointer"
              onMouseEnter={(e) => handleItemEnter(index, e)}
              onMouseMove={() => handleItemHover(index)}
              style={{
                borderTop: index === 0 ? '1.5px solid rgba(0,0,0,0.1)' : 'none',
                borderBottom: '1.5px solid rgba(0,0,0,0.1)',
              }}
            >
              {/* Colored background that slides in on hover */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: service.color,
                  transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              />

              {/* Row content */}
              <div
                className="relative z-10 flex justify-center items-center gap-4 md:gap-8 py-7 md:py-9 px-2 md:px-4"
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: 'clamp(11px, 1.1vw, 14px)',
                    color: activeIndex === index ? 'rgba(255,255,255,0.7)' : '#999',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    minWidth: '32px',
                    transition: 'color 0.35s ease',
                  }}
                >
                  ({service.num})
                </span>

                {/* Service title */}
                <span
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontSize: 'clamp(26px, 4.5vw, 52px)',
                    fontWeight: activeIndex === index ? 600 : 400,
                    color: activeIndex === index ? '#fff' : '#1a1a1a',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transition: 'font-weight 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.35s ease',
                  }}
                >
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
