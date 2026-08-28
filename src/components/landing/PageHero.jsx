import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedHeroTitle from './AnimatedHeroTitle';

/**
 * Reusable landing hero — same GSAP entrance as Home:
 * title bounce-in, optional dot pulse, subtitle fade, footer slot float.
 */
const PageHero = ({
  title,
  subtitle,
  align = 'left',
  layout = 'stack',
  titleSize = 'lg',
  showDot = false,
  spread = false,
  animateFooter = true,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  children,
}) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const dotRef = useRef(null);
  const subRef = useRef(null);
  const footerRef = useRef(null);

  const isCenter = align === 'center';
  const isSplit = layout === 'split';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 80, scale: 0.95 });

      if (subRef.current) {
        gsap.set(subRef.current, { opacity: 0, y: 50 });
      }

      if (dotRef.current) {
        gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      }

      if (footerRef.current) {
        gsap.set(footerRef.current, {
          opacity: 0,
          y: 60,
          x: isCenter ? 0 : 30,
          rotation: isCenter ? 0 : 2,
        });
      }

      const tl = gsap.timeline({ delay: 0.8 });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      });

      if (subRef.current) {
        tl.to(
          subRef.current,
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        );
      }

      if (dotRef.current) {
        tl.to(
          dotRef.current,
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
          '-=0.7'
        );
      }

      if (footerRef.current) {
        tl.to(
          footerRef.current,
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
      }

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          boxShadow: '0 0 20px 5px rgba(26, 122, 248, 0.6)',
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      }

      if (animateFooter && footerRef.current) {
        gsap.to(footerRef.current, {
          y: -8,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [align, animateFooter, isCenter]);

  const subtitleEl = subtitle && (
    <p
      ref={subRef}
      className={`text-lg md:text-xl leading-relaxed text-gray-300 font-light ${
        isCenter
          ? 'mt-10 md:mt-14 max-w-[640px] text-white/55 text-lg md:text-xl lg:text-2xl'
          : 'max-w-md'
      } ${subtitleClassName}`}
      style={{ fontFamily: 'Switzer, sans-serif' }}
    >
      {subtitle}
    </p>
  );

  const dotEl = showDot && (
    <div
      ref={dotRef}
      className={`w-3 h-3 rounded-sm bg-white ${isCenter ? 'mx-auto' : ''}`}
      style={{ boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)' }}
    />
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-visible ${spread ? 'flex flex-col flex-1' : ''} ${className}`}
    >
      <div
        className={`max-w-[1400px] mx-auto w-full relative z-10 ${
          isCenter ? 'flex flex-col items-center text-center' : ''
        } ${spread ? 'flex flex-col flex-1 h-full' : ''}`}
      >
        <AnimatedHeroTitle
          ref={headingRef}
          text={title}
          size={titleSize}
          className={`${
            isSplit ? (spread ? 'mb-0' : 'mb-12 md:mb-16') : ''
          } ${titleClassName}`}
        />

        {isSplit ? (
          <div
            className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 ${
              spread ? 'mt-auto pt-10 md:pt-16' : 'mt-8 md:mt-12'
            }`}
          >
            <div className="flex flex-col gap-6 max-w-md">
              {dotEl}
              {subtitleEl}
            </div>
            {children && (
              <div ref={footerRef} className="w-full md:w-auto md:max-w-[480px] lg:max-w-[520px]">
                {children}
              </div>
            )}
          </div>
        ) : (
          <>
            {showDot && !isSplit && (
              <div className={isCenter ? 'mt-8 md:mt-10' : 'mt-8'}>{dotEl}</div>
            )}
            {subtitleEl}
            {children && (
              <div
                ref={footerRef}
                className={`w-full ${
                  isCenter
                    ? 'flex justify-center mt-12 md:mt-16 lg:mt-20'
                    : 'mt-8 md:mt-12'
                }`}
              >
                {children}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PageHero;
