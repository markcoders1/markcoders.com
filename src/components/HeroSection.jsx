import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import cardImage from '../assets/hero-card.png';
import canvasbg from '../assets/canvasbg.gif';

const HeroSection = ({ heroImageRef }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const cardRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
      });

      gsap.set(subTextRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 60,
        x: 30,
        rotation: 2,
      });

      gsap.set(dotRef.current, {
        opacity: 0,
        scale: 0,
      });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.8 });

      // Heading entrance - smooth reveal
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      })
        // Sub text entrance
        .to(
          subTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        // Dot indicator
        .to(
          dotRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          '-=0.7'
        )
        // Card entrance
        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        );

      // Floating animation for the card
      gsap.to(cardRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.5,
      });

      // Glow pulse animation
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Dot pulse
      gsap.to(dotRef.current, {
        boxShadow: '0 0 20px 5px rgba(26, 122, 248, 0.6)',
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-visible pt-20 pb-10 px-6 md:px-10 lg:px-16 z-10"
      style={{
        backgroundImage: `url(${canvasbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark gradient overlay on top of GIF for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(rgb(0 6 11 / 96%) 0%, rgba(0, 6, 11, 0.85) 40%, rgb(0 6 11 / 48%) 100%)',
        }}
      />

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"

      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Hero Heading with per-letter hover bold effect */}
        <h1
          ref={headingRef}
          className="leading-[0.9] tracking-[-0.04em] text-white mb-12 md:mb-16"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(60px, 12vw, 200px)',
            letterSpacing: '-1.4px',
          }}
        >
          {'MarkCoders/>'.split('').map((char, i) => (
            <span
              key={i}
              className="hero-letter-hover"
              style={{
                display: 'inline-block',
                fontWeight: 600,
                transition: 'font-weight 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.fontWeight = '900';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fontWeight = '700';
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Bottom Content Area */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 mt-8 md:mt-12">
          {/* Left side - Dot + Description */}
          <div className="flex flex-col gap-6 max-w-md">
            {/* Dot Indicator */}
            <div
              ref={dotRef}
              className="w-3 h-3 bg-white"
              style={{
                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)',
              }}
            />

            {/* Description Text */}
            <p
              ref={subTextRef}
              className="text-[24px] leading-[34px] md:text-[35px] md:leading-[45px] font-medium tracking-[-1px] text-gray-300"
              style={{ fontFamily: 'Switzer, sans-serif' }}
            >
              We work with startups, scaleups, and established brands to launch
              digital products that stand out and convert.
            </p>
          </div>

          {/* Right side - "Our Work" Card - Horizontal Layout */}
          <div
            ref={cardRef}
            className="w-full md:w-auto md:max-w-[480px] lg:max-w-[520px]"
          >
            <div
              className="rounded-2xl p-5 relative overflow-hidden group cursor-pointer flex flex-row gap-4 items-stretch"
              style={{
                background: 'rgba(0, 6, 11, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Card shimmer effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 30%, rgba(26, 122, 248, 0.05) 50%, transparent 70%)',
                }}
              />

              {/* Left Side - Text + Button */}
              <div className="flex flex-col justify-between flex-1 relative z-10 min-w-[160px]">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm font-medium text-gray-400 tracking-wide"
                    style={{ fontFamily: 'Switzer, sans-serif' }}
                  >
                    Our work
                  </span>
                  <h3
                    className="text-base font-semibold text-white leading-snug"
                    style={{ fontFamily: 'Switzer, sans-serif' }}
                  >
                    Designing a bold voice
                    <br />
                    for thought leadership
                  </h3>
                </div>

                {/* Arrow Button */}
                <div className="flex justify-start mt-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background:
                        'linear-gradient(135deg, #1a7af8 0%, #1565d8 100%)',
                      boxShadow: '0 2px 10px rgba(26, 122, 248, 0.3)',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M4 12L12 4M12 4H5.33M12 4V10.67"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side - Card Image Slot */}
              <div className="relative rounded-2xl w-[160px] md:w-[190px] flex-shrink-0 min-h-[170px] z-30">
                <img
                  ref={heroImageRef}
                  src={cardImage}
                  alt="Our work - Designing a bold voice"
                  className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105 z-50 relative will-change-transform origin-center"
                  style={{ minHeight: '170px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(3,7,18,1) 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
