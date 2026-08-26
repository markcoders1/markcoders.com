import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL_MS = 4500;

const testimonials = [
  {
    quote:
      'Pleasure to work with from start to finish. They translated complex flows into something intuitive a rare balance between aesthetics and functionality.',
    name: 'Emma Watson',
    role: 'VISENTA, Photo & Video',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote:
      'Markcoders delivered beyond expectations. Clear communication, sharp design sense, and a product our team actually loves using every day.',
    name: 'James Carter',
    role: 'NEXORA, Product Lead',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote:
      'They took our messy brief and turned it into a polished experience. Fast iterations, thoughtful UX, and zero drama throughout the build.',
    name: 'Sofia Reyes',
    role: 'LUMINA Studio, Founder',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote:
      'A rare team that cares about both craft and shipping. Our launch felt smooth, and the final product still looks fresh months later.',
    name: 'Daniel Okonkwo',
    role: 'Forge Labs, CEO',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
];

const TrustSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const slideContentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const cards = cardsRef.current?.children;

      // Same scroll-scrub char opacity reveal as AboutAndVideo
      if (heading) {
        const childNodes = Array.from(heading.childNodes);
        heading.innerHTML = '';

        childNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
            heading.appendChild(document.createElement('br'));
            return;
          }

          const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text) return;

          const words = text.split(' ').filter(Boolean);
          words.forEach((word, idx) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'normal';
            wordSpan.style.maxWidth = '100%';

            for (const char of word) {
              const charSpan = document.createElement('span');
              charSpan.textContent = char;
              charSpan.className = 'trust-heading-char';
              charSpan.style.opacity = '0.15';
              wordSpan.appendChild(charSpan);
            }

            heading.appendChild(wordSpan);
            if (idx < words.length - 1) {
              heading.appendChild(document.createTextNode(' '));
            }
          });
        });

        const headingChars = heading.querySelectorAll('.trust-heading-char');

        gsap.to(headingChars, {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
      }

      gsap.set(cards, { opacity: 0, y: 120 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 15%',
          scrub: 1.2,
        },
      });

      tl.fromTo(
        section,
        { backgroundColor: '#ffffff' },
        { backgroundColor: '#030712', ease: 'none', duration: 1 },
        0
      );

      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: 'power2.out',
          duration: 0.9,
        },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = (nextIndex) => {
    if (
      nextIndex === activeIndexRef.current ||
      !slideContentRef.current ||
      isAnimatingRef.current
    ) {
      return;
    }

    isAnimatingRef.current = true;
    const el = slideContentRef.current;

    gsap.to(el, {
      opacity: 0,
      y: 12,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        gsap.fromTo(
          el,
          { opacity: 0, y: -12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });
  };

  const startAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToSlide((activeIndexRef.current + 1) % testimonials.length);
    }, SLIDE_INTERVAL_MS);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDotClick = (i) => {
    goToSlide(i);
    startAutoplay();
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-[100%] overflow-x-hidden px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-[1200px] mx-auto w-full min-w-0">
        <h2
          ref={headingRef}
          className="text-white font-semibold leading-[1.15] tracking-[-0.03em] mb-8 sm:mb-12 md:mb-16 max-w-[900px] break-words"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(26px, 7vw, 64px)',
          }}
        >
          A partner you can trust.
          <br />
          High standards.
          <br />
          Reliable delivery.
        </h2>

        <div
          ref={cardsRef}
          className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 w-full"
        >
          {/* Stats / trust card — narrower on desktop */}
          <div className="relative w-full lg:w-[36%] lg:flex-[0_0_36%] min-w-0 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-[#2B5CFF] min-h-[240px] sm:min-h-[300px] md:min-h-[380px] p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden">
            <span
              className="text-white/90 leading-none select-none"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(56px, 12vw, 120px)',
                lineHeight: 0.7,
              }}
              aria-hidden
            >
              &ldquo;
            </span>

            <div className="min-w-0">
              <p
                className="text-white font-semibold tracking-[-0.02em] mb-2 sm:mb-3 break-words"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(22px, 5vw, 40px)',
                }}
              >
                Trusted by 20+ companies.
              </p>
              <a
                href="#why-clients"
                className="text-white/85 text-[14px] sm:text-[15px] md:text-[16px] hover:text-white transition-colors"
                style={{ fontFamily: 'Switzer, sans-serif' }}
              >
                Why clients rely on us
              </a>
            </div>
          </div>

          {/* Testimonial slider — wider on desktop */}
          <div className="relative w-full lg:flex-1 lg:min-w-[58%] min-w-0 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-[#14141A] min-h-[260px] sm:min-h-[320px] md:min-h-[380px] p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => handleDotClick(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer border-0 p-0 ${
                    i === activeIndex ? 'bg-white' : 'bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <div ref={slideContentRef} className="flex flex-col justify-between flex-1 mt-6 sm:mt-8 min-w-0">
              <p
                className="text-white/95 font-normal leading-[1.45] tracking-[-0.01em] mb-8 sm:mb-10 break-words"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(16px, 4.2vw, 28px)',
                }}
              >
                {current.quote}
              </p>

              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-[10px] object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className="text-white font-medium text-[14px] sm:text-[15px] leading-tight truncate"
                    style={{ fontFamily: 'Switzer, sans-serif' }}
                  >
                    {current.name}
                  </p>
                  <p
                    className="text-white/50 text-[12px] sm:text-[13px] mt-0.5 truncate"
                    style={{ fontFamily: 'Switzer, sans-serif' }}
                  >
                    {current.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
