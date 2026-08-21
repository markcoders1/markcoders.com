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
      // Opacity scroll animation for the main heading
      const headingElement = headingRef.current;
      if (headingElement) {
        const text = (headingElement.textContent || '').trim();
        headingElement.innerHTML = '';

        // Split heading into words, then characters for opacity reveal
        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word, idx) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.whiteSpace = 'nowrap';

          for (let char of word) {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.className = 'heading-char-reveal';
            charSpan.style.opacity = '0.15';
            charSpan.style.transition = 'opacity 0.15s ease';
            wordSpan.appendChild(charSpan);
          }
          headingElement.appendChild(wordSpan);

          // Add a real space between words
          if (idx < words.length - 1) {
            const space = document.createTextNode(' ');
            headingElement.appendChild(space);
          }
        });

        const headingChars = headingElement.querySelectorAll('.heading-char-reveal');

        gsap.to(headingChars, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: headingElement,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
      }

      // Smooth scroll reveal for the "About us" paragraph text
      const paraElement = paragraphRef.current;
      if (paraElement) {
        // Get all child nodes (spans and text nodes)
        const childNodes = Array.from(paraElement.childNodes);
        const fullText = paraElement.textContent || '';

        // Clear and rebuild with character spans, preserving bold markup
        const fragment = document.createDocumentFragment();

        childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            // Plain text node — split into words and chars
            const words = (node.textContent || '').split(/\s+/).filter(Boolean);
            words.forEach((word, idx) => {
              const wordSpan = document.createElement('span');
              wordSpan.style.display = 'inline-block';
              wordSpan.style.whiteSpace = 'nowrap';

              for (let char of word) {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'char-opacity-reveal';
                charSpan.style.opacity = '0.25';
                charSpan.style.transition = 'opacity 0.2s ease';
                wordSpan.appendChild(charSpan);
              }
              fragment.appendChild(wordSpan);
              // Add real space after each word
              if (idx < words.length - 1) {
                fragment.appendChild(document.createTextNode(' '));
              }
            });
            // Add trailing space after text node to separate from next node
            fragment.appendChild(document.createTextNode(' '));
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Element node (like <strong>) — split its text into chars but wrap in same tag
            const tagName = node.tagName;
            const text = node.textContent || '';
            const words = text.split(/\s+/).filter(Boolean);
            words.forEach((word, idx) => {
              const wordSpan = document.createElement('span');
              wordSpan.style.display = 'inline-block';
              wordSpan.style.whiteSpace = 'nowrap';

              for (let char of word) {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.className = 'char-opacity-reveal';
                charSpan.style.opacity = '0.25';
                charSpan.style.transition = 'opacity 0.2s ease';
                // Inherit bold styling
                if (tagName === 'STRONG' || tagName === 'B') {
                  charSpan.style.fontWeight = '700';
                  charSpan.style.color = '#ffffff';
                }
                wordSpan.appendChild(charSpan);
              }
              fragment.appendChild(wordSpan);
              // Add real space after each word
              if (idx < words.length - 1) {
                fragment.appendChild(document.createTextNode(' '));
              }
            });
            // Add trailing space after element node to separate from next node
            fragment.appendChild(document.createTextNode(' '));
          }
        });

        paraElement.innerHTML = '';
        paraElement.appendChild(fragment);

        const chars = paraElement.querySelectorAll('.char-opacity-reveal');

        gsap.to(chars, {
          opacity: 1,
          stagger: 0.01,
          ease: 'none',
          scrollTrigger: {
            trigger: paraElement,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: true,
          },
        });
      }

      // Video Box Scroll Animation (Expanding to full width)
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
              end: 'top 15%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full bg-transparent overflow-hidden pt-28 pb-4">
      {/* (All Work) Heading & Text block */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-20">
        {/* Centered (All Work) label */}
        <h2 className="text-[#25A9E0] text-[40px] md:text-[91px] font-medium mb-20 tracking-tight font-sans text-center">
          (All Work)
        </h2>

        {/* Large centered heading with opacity scroll animation */}
        <h3
          ref={headingRef}
          className="text-white text-[40px] md:text-[64px] lg:text-[91px] font-normal leading-[1.08] tracking-tight  mx-auto mb-24 font-sans"
        >
          We craft design that turns ambitious ideas into products people trust.
        </h3>

        {/* About description footer block */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-16 pt-10 border-t border-white/10 font-sans">
          {/* Left column: About text + button */}
          <div className="flex-1 max-w-[680px]">
            <div ref={paragraphRef} className="text-[17px] md:text-[26px] text-[#6b7280] font-normal leading-[1.7] tracking-normal">
              <strong className="text-white font-bold">About us.</strong> Markcoders is a research-driven design studio that treats every project like its own product. We go deep into your market  and your users before designing a single screen. <strong className="text-white font-bold">The result: digital experiences that don't just look sharp, they perform.</strong>
            </div>

            <div className="mt-10">
              <button
                className="px-7 py-3.5 rounded-[12px] text-[18px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer flex items-center gap-2.5"
                style={{
                  background: '#25A9E0',
                  boxShadow: '0 4px 20px rgba(37, 169, 224, 0.25)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <path d="M3.33337 12.6667L12.6667 3.33337M12.6667 3.33337H5.33337M12.6667 3.33337V10.6667" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Explore Our Process
              </button>
            </div>
          </div>

          {/* Right column: Service description */}
          <div className="lg:max-w-[300px] lg:ml-auto self-start">
            <p className="text-[15px] md:text-[20px] text-[#9ca3af] leading-[1.7] font-normal">
              We design intuitive interfaces for web and mobile products, from first wireframe to development-ready files.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Expanding Video Image section */}
      <div className="w-full flex justify-center items-center py-10">
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
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default AboutAndVideo;
