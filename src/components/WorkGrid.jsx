import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroCardImg from '../assets/hero-card.png';
import card3Img from '../assets/2.png';
import card4Img from '../assets/3.png';

gsap.registerPlugin(ScrollTrigger);

const WorkGrid = ({ heroImageRef }) => {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card1ImageRef = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const cloneRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!heroImageRef?.current || !card1Ref.current) return;

    const heroImg = heroImageRef.current;
    const targetContainer = card1Ref.current;

    // Wait for layout to settle
    const timer = setTimeout(() => {
      // 1. Create a CLONE of the hero image & position it fixed over the original
      const clone = document.createElement('img');
      clone.src = heroImg.src;
      clone.alt = '';
      clone.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 16px;
        object-fit: cover;
        will-change: transform, width, height, top, left;
        transition: none;
      `;
      document.body.appendChild(clone);
      cloneRef.current = clone;

      // Position clone exactly over the hero image
      const positionClone = () => {
        const r = heroImg.getBoundingClientRect();
        clone.style.top = r.top + 'px';
        clone.style.left = r.left + 'px';
        clone.style.width = r.width + 'px';
        clone.style.height = r.height + 'px';
      };
      positionClone();

      // Hide clone initially (will show on scroll)
      gsap.set(clone, { opacity: 0 });

      // 2. Create the ScrollTrigger morph animation
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Get current positions dynamically
          const heroRect = heroImg.getBoundingClientRect();
          const targetRect = targetContainer.getBoundingClientRect();

          // Determine start and end states
          const startTop = heroRect.top;
          const startLeft = heroRect.left;
          const startWidth = heroRect.width;
          const startHeight = heroRect.height;

          // Target: fill the entire Card 1 container
          const endTop = targetRect.top;
          const endLeft = targetRect.left;
          const endWidth = targetRect.width;
          const endHeight = targetRect.height;

          // Interpolate between start and end
          const currentTop = startTop + (endTop - startTop) * progress;
          const currentLeft = startLeft + (endLeft - startLeft) * progress;
          const currentWidth = startWidth + (endWidth - startWidth) * progress;
          const currentHeight = startHeight + (endHeight - startHeight) * progress;
          const currentRadius = 16 + (32 - 16) * progress; // 16px -> 32px

          // Apply to clone
          clone.style.top = currentTop + 'px';
          clone.style.left = currentLeft + 'px';
          clone.style.width = currentWidth + 'px';
          clone.style.height = currentHeight + 'px';
          clone.style.borderRadius = currentRadius + 'px';

          // Show clone and hide original hero image as scroll starts
          if (progress > 0.02) {
            clone.style.opacity = '1';
            heroImg.style.opacity = '0';
          } else {
            clone.style.opacity = '0';
            heroImg.style.opacity = '1';
          }

          // When morph is complete, show the final static image and hide clone
          if (progress > 0.95) {
            setMorphComplete(true);
            clone.style.opacity = '0';
          } else {
            setMorphComplete(false);
          }
        },
      });

      return () => {
        st.kill();
        clone.remove();
      };
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cloneRef.current) {
        cloneRef.current.remove();
      }
    };
  }, [heroImageRef]);

  // Staggered reveal for grid cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      cards.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work-grid"
      className="relative z-20 py-16 px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto"
    >
      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

        {/* Card 1 (Top Left) - Blank initially, image lands here on scroll */}
        <div
          ref={card1Ref}
          className="rounded-[32px] min-h-[480px] md:min-h-[560px] relative overflow-hidden group cursor-pointer"
          style={{ background: 'transparent' }}
        >
          {/* This image shows ONLY when morph is complete */}
          <img
            ref={card1ImageRef}
            src={heroCardImg}
            alt="Kiwe Card Project"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: morphComplete ? 1 : 0 }}
          />
        </div>

        {/* Card 2 (Top Right) - Dark Theme with Floating Snippets */}
        <div
          ref={card2Ref}
          className="bg-[#19191C] text-white rounded-[32px] p-8 md:p-12 min-h-[480px] md:min-h-[560px] relative overflow-hidden flex items-center justify-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative w-full max-w-[340px] flex flex-col items-center justify-center gap-4">
            <div className="absolute -top-12 -left-6 w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-white/10 hidden sm:block">
              <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-emerald-950 p-2 flex items-end">
                <span className="text-[10px] text-emerald-200 font-medium">ADHD focus</span>
              </div>
            </div>
            <div className="bg-white/95 text-black p-6 rounded-2xl shadow-2xl backdrop-blur-md w-full border border-black/5 transform transition-transform duration-500 group-hover:scale-[1.02]">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                ADHD FOCUS
              </span>
              <h4 className="text-xl md:text-2xl font-bold leading-snug mb-3 tracking-tight">
                Here, you stop fighting your...
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                We put special focus on ADHD...
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded-lg">
                <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">calm inside</span>
                <span>— more impact outside</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-6 w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-white/10 hidden sm:block">
              <div className="w-full h-full bg-gradient-to-br from-amber-900 to-neutral-900 p-2 flex flex-col justify-end">
                <span className="text-[9px] text-amber-200 font-mono">Productivity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 (Bottom Left) */}
        <div
          ref={card3Ref}
          className="bg-[#F8EFE4] rounded-[32px] p-8 md:p-12 min-h-[480px] md:min-h-[560px] flex items-center justify-center relative overflow-hidden group cursor-pointer"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={card3Img}
              alt="Crypto Dashboard App"
              className="max-h-[380px] md:max-h-[440px] w-auto object-contain transition-transform duration-700 group-hover:scale-105 rounded-3xl"
            />
          </div>
        </div>

        {/* Card 4 (Bottom Right) */}
        <div
          ref={card4Ref}
          className="rounded-[32px] min-h-[480px] md:min-h-[560px] flex items-center justify-center relative overflow-hidden group cursor-pointer bg-neutral-900"
        >
          <img
            src={card4Img}
            alt="Pet Care App Architecture"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default WorkGrid;
