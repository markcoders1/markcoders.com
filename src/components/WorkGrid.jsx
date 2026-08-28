import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroCardImg from '../assets/vantage.webp';
import saucedImg from '../assets/sauced.webp';
import jerseyImg from '../assets/jersey.webp';
import jersey2Img from '../assets/jersey2.webp';

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

    // Clean up any stale clones from previous renders/HMR
    document.querySelectorAll('.workgrid-morph-clone').forEach((el) => el.remove());

    // Wait for layout to settle
    const timer = setTimeout(() => {
      // 1. Create a CLONE of the hero image & position it fixed over the original
      const clone = document.createElement('img');
      clone.src = heroCardImg;
      clone.alt = 'Vantage Project';
      clone.className = 'workgrid-morph-clone';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">

        {/* Card 1 (Top Left) - Vantage - Blank initially, image lands here on scroll */}
        <div
          ref={card1Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14]"
        >
          {/* This image shows ONLY when morph is complete */}
          <img
            ref={card1ImageRef}
            src={heroCardImg}
            alt="Vantage Project"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: morphComplete ? 1 : 0 }}
          />
        </div>

        {/* Card 2 (Top Right) - Sauced */}
        <div
          ref={card2Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14]"
        >
          <img
            src={saucedImg}
            alt="Sauced Project"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card 3 (Bottom Left) - Jersey / Shareable vCard Platform */}
        <div
          ref={card3Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14]"
        >
          <img
            src={jerseyImg}
            alt="Shareable vCard Platform"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Card 4 (Bottom Right) - The Jersey Generator */}
        <div
          ref={card4Ref}
          className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14]"
        >
          <img
            src={jersey2Img}
            alt="The Jersey Generator"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default WorkGrid;

