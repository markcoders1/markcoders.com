import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoImg from '../assets/videoimg.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutAndVideo = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Char Reveal
      const headingElement = headingRef.current;
      if (headingElement) {
        const text = "We craft design that turns ambitious ideas into products people trust.";
        headingElement.innerHTML = '';

        // Spacer for first line indent
        const spacer = document.createElement('span');
        spacer.className = 'inline-block w-12 sm:w-20 md:w-28 lg:w-36';
        spacer.setAttribute('aria-hidden', 'true');
        headingElement.appendChild(spacer);

        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'inline-block mr-[0.28em] whitespace-nowrap';

          for (let char of word) {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.className = 'about-heading-char';
            charSpan.style.opacity = '0.15';
            charSpan.style.color = '#FFFFFF';
            wordSpan.appendChild(charSpan);
          }
          headingElement.appendChild(wordSpan);
        });

        const chars = headingElement.querySelectorAll('.about-heading-char');
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: headingElement,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        });
      }

      // 2. About us paragraph reveal
      const paraElement = paragraphRef.current;
      if (paraElement) {
        paraElement.innerHTML = '';

        // Spacer for first line indent
        const spacer = document.createElement('span');
        spacer.className = 'inline-block w-8 sm:w-12 md:w-16';
        spacer.setAttribute('aria-hidden', 'true');
        paraElement.appendChild(spacer);

        const segments = [
          { text: 'About us. ', isBold: true },
          { text: 'Markcoders is a research-driven design studio that treats every project like its own product. We go deep into your market and your users before designing a single screen. ', isBold: false },
          { text: "The result: digital experiences that don't just look sharp, they perform.", isBold: true },
        ];

        segments.forEach((seg) => {
          const segWords = seg.text.split(/\s+/).filter(Boolean);
          segWords.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'inline-block mr-[0.28em] whitespace-nowrap';

            for (let char of word) {
              const charSpan = document.createElement('span');
              charSpan.textContent = char;
              charSpan.className = 'about-para-char';
              charSpan.style.opacity = seg.isBold ? '0.35' : '0.2';
              charSpan.style.fontWeight = seg.isBold ? '700' : '500';
              charSpan.style.color = '#FFFFFF';
              wordSpan.appendChild(charSpan);
            }
            paraElement.appendChild(wordSpan);
          });
        });

        const paraChars = paraElement.querySelectorAll('.about-para-char');
        gsap.to(paraChars, {
          opacity: 1,
          stagger: 0.01,
          ease: 'none',
          scrollTrigger: {
            trigger: paraElement,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        });
      }

      // 3. Video Box Scroll Animation (Expanding to full width)
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          {
            width: '85%',
            borderRadius: '24px',
          },
          {
            width: '100%',
            borderRadius: '0px',
            ease: 'none',
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top 95%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-us"
      className="relative z-10 w-full bg-transparent overflow-hidden pt-20 md:pt-32 pb-8"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-24 md:mb-32">
        {/* (All Work) Label */}
        <h2
          className="text-[#25A9E0] text-center mb-16 md:mb-24"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(42px, 6.5vw, 91px)',
            lineHeight: '1.13',
            letterSpacing: '-3.4px',
          }}
        >
          (All Work)
        </h2>

        {/* Large Statement Heading */}
        <h3
          ref={headingRef}
          className="text-white text-left max-w-[1300px] mb-20 md:mb-28"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5.8vw, 84px)',
            lineHeight: '1.15',
            letterSpacing: '-0.035em',
          }}
        >
          <span className="inline-block w-12 sm:w-20 md:w-28 lg:w-36" aria-hidden="true" />
          We craft design that turns ambitious ideas into products people trust.
        </h3>

        {/* Bottom Split Description Grid */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Column: About Paragraph & CTA Button */}
          <div className="w-full lg:max-w-[740px] flex flex-col gap-10">
            <div
              ref={paragraphRef}
              className="text-left text-[#9ca3af]"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(18px, 1.85vw, 26px)',
                lineHeight: '1.45',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="inline-block w-8 sm:w-12 md:w-16" aria-hidden="true" />
              <strong className="text-white font-bold">About us.</strong> Markcoders is a research-driven design studio that treats every project like its own product. We go deep into your market and your users before designing a single screen.{' '}
              <strong className="text-white font-bold">
                The result: digital experiences that don't just look sharp, they perform.
              </strong>
            </div>

            {/* Figma Pixel-Perfect Button */}
            <div>
              <button
                className="inline-flex items-center justify-center gap-2.5 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
                style={{
                  width: '223.65px',
                  height: '52.88px',
                  borderRadius: '15px',
                  background: '#25A9E0',
                  boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                  fontFamily: 'Switzer, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '30px',
                  letterSpacing: '-0.5px',
                }}
              >
                {/* Arrow Icon 19.08px x 19.08px */}
                <svg
                  width="19.08"
                  height="19.08"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Explore Our Process</span>
              </button>
            </div>
          </div>

          {/* Right Column: Secondary Description */}
          <div className="w-full lg:max-w-[340px] lg:pt-2">
            <p
              className="text-[#9ca3af] text-left"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 1.45vw, 20px)',
                lineHeight: '1.4',
                letterSpacing: '-0.02em',
              }}
            >
              We design intuitive interfaces for web and mobile products, from first wireframe to development-ready files.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Expanding Video/Image Showcase on scroll */}
      <div className="w-full flex justify-center items-center py-6">
        <div
          ref={videoWrapperRef}
          className="relative h-[55vh] md:h-[75vh] overflow-hidden mx-auto"
          style={{ width: '85%', borderRadius: '24px' }}
        >
          <img
            ref={videoImgRef}
            src={videoImg}
            alt="Showcase Video Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AboutAndVideo;
