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
        { backgroundColor: '#0a0e17', ease: 'none', duration: 1 },
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
        {/* ── Heading ── */}
        <h2
          ref={headingRef}
          className="text-white font-bold leading-[1.08] tracking-[-0.035em] mb-10 sm:mb-14 md:mb-20 max-w-[900px] break-words"
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: 'clamp(32px, 7.5vw, 72px)',
            fontStyle: 'italic',
          }}
        >
          A partner you can trust.
          <br />
          High standards. Reliable
          <br />
          delivery.
        </h2>

        {/* ── Cards row ── */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 w-full"
        >
          {/* ── Left: Stats / trust card (blue) ── */}
          <div
            className="relative w-full lg:w-[38%] lg:flex-[0_0_38%] min-w-0 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex flex-col justify-between overflow-hidden"
            style={{
              backgroundColor: '#1B75BB',
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            {/* Large quotation mark */}
            <span
              className="select-none block"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(64px, 14vw, 130px)',
                lineHeight: 0.65,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: '20px',
              }}
              aria-hidden
            >
              &ldquo;
            </span>

            {/* Bottom text */}
            <div className="min-w-0 mt-auto">
              <p
                className="text-white font-semibold tracking-[-0.02em] mb-2 sm:mb-3 break-words leading-[1.15]"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(24px, 5vw, 38px)',
                }}
              >
                Trusted by 20+
                <br />
                companies.
              </p>
              <a
                href="#why-clients"
                className="text-white/80 hover:text-white transition-colors inline-block"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(13px, 1.6vw, 16px)',
                  fontWeight: 500,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Why clients rely on us
              </a>
            </div>
          </div>

          {/* ── Right: Testimonial slider (dark) ── */}
          <div
            className="relative w-full lg:flex-1 min-w-0 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex flex-col justify-between overflow-hidden"
            style={{
              backgroundColor: '#1c1c24',
              borderRadius: '20px',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            {/* Dots */}
            <div className="flex items-center gap-[6px]" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => handleDotClick(i)}
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    backgroundColor:
                      i === activeIndex
                        ? 'rgba(255,255,255,0.95)'
                        : 'rgba(255,255,255,0.22)',
                    transition: 'background-color 0.25s ease',
                  }}
                />
              ))}
            </div>

            {/* Slide content */}
            <div
              ref={slideContentRef}
              className="flex flex-col justify-between flex-1 min-w-0"
              style={{ marginTop: 'clamp(20px, 3vw, 36px)' }}
            >
              {/* Quote */}
              <p
                className="text-white/90 font-normal break-words"
                style={{
                  fontFamily: 'Switzer, sans-serif',
                  fontSize: 'clamp(16px, 2.8vw, 22px)',
                  lineHeight: 1.55,
                  letterSpacing: '-0.01em',
                  marginBottom: 'clamp(24px, 4vw, 48px)',
                }}
              >
                {current.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 min-w-0 mt-auto">
                <img
                  src={current.avatar}
                  alt={current.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div className="min-w-0">
                  <p
                    className="text-white font-medium truncate"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: '15px',
                      lineHeight: 1.3,
                    }}
                  >
                    {current.name}
                  </p>
                  <p
                    className="truncate"
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: '13px',
                      lineHeight: 1.3,
                      color: 'rgba(255,255,255,0.45)',
                      marginTop: '2px',
                    }}
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
