import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import heroCardImg from '../assets/vantage.webp';
import saucedImg from '../assets/sauced.webp';
import savmontImg from '../assets/Savmont.webp';
import jerseyImg from '../assets/jersey2.webp';
import midasImg from '../assets/midas.webp';
import gardenImg from '../assets/gardeninminute.webp';
import checkMyRideImg from '../assets/checkmyride.webp';
import dogImg from '../assets/dog.webp';

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ previewImageRef }) => {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card1ImageRef = useRef(null);
  const cardRefs = useRef([]);
  const cloneRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useEffect(() => {
    if (!previewImageRef?.current || !card1Ref.current) return;

    const heroImg = previewImageRef.current;
    const targetContainer = card1Ref.current;

    document.querySelectorAll('.projects-morph-clone').forEach((el) => el.remove());

    const timer = setTimeout(() => {
      const clone = document.createElement('img');
      clone.src = heroCardImg;
      clone.alt = 'Vantage Project';
      clone.className = 'projects-morph-clone';
      clone.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 15px;
        object-fit: cover;
        will-change: transform, width, height, top, left;
        transition: none;
      `;
      document.body.appendChild(clone);
      cloneRef.current = clone;

      const positionClone = () => {
        const r = heroImg.getBoundingClientRect();
        clone.style.top = r.top + 'px';
        clone.style.left = r.left + 'px';
        clone.style.width = r.width + 'px';
        clone.style.height = r.height + 'px';
      };
      positionClone();

      gsap.set(clone, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroRect = heroImg.getBoundingClientRect();
          const targetRect = targetContainer.getBoundingClientRect();

          const startTop = heroRect.top;
          const startLeft = heroRect.left;
          const startWidth = heroRect.width;
          const startHeight = heroRect.height;

          const endTop = targetRect.top;
          const endLeft = targetRect.left;
          const endWidth = targetRect.width;
          const endHeight = targetRect.height;

          const currentTop = startTop + (endTop - startTop) * progress;
          const currentLeft = startLeft + (endLeft - startLeft) * progress;
          const currentWidth = startWidth + (endWidth - startWidth) * progress;
          const currentHeight = startHeight + (endHeight - startHeight) * progress;
          const currentRadius = 15 + (32 - 15) * progress;

          clone.style.top = currentTop + 'px';
          clone.style.left = currentLeft + 'px';
          clone.style.width = currentWidth + 'px';
          clone.style.height = currentHeight + 'px';
          clone.style.borderRadius = currentRadius + 'px';

          if (progress > 0.02) {
            clone.style.opacity = '1';
            heroImg.style.opacity = '0';
          } else {
            clone.style.opacity = '0';
            heroImg.style.opacity = '1';
          }

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
  }, [previewImageRef]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card) => {
        gsap.set(card, { scale: 0.72, yPercent: 8, force3D: true });

        gsap.to(card, {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh(true);
    const onLoad = () => refresh();

    const images = section.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad, { once: true });
    });

    requestAnimationFrame(refresh);
    const refreshTimers = [150, 600, 1200].map((ms) =>
      window.setTimeout(refresh, ms)
    );

    return () => {
      refreshTimers.forEach((id) => window.clearTimeout(id));
      images.forEach((img) => img.removeEventListener('load', onLoad));
      ctx.revert();
    };
  }, []);

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
    if (index === 0) {
      card1Ref.current = el;
    }
  };

  const imagesList = [
    { src: heroCardImg, alt: "Vantage" },
    { src: saucedImg, alt: "Sauced" },
    { src: savmontImg, alt: "Savmont" },
    { src: jerseyImg, alt: "TIG The Jersey Generator" },
    { src: midasImg, alt: "Midas" },
    { src: gardenImg, alt: "Garden In Minutes" },
    { src: checkMyRideImg, alt: "Check My Ride" },
    { src: dogImg, alt: "Dog App" },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects-grid"
      className="relative z-20 py-16 px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
        {imagesList.map((item, i) => (
          <div
            key={i}
            ref={(el) => setCardRef(el, i)}
            className="w-full max-w-[661.02px] h-[520px] sm:h-[650px] lg:h-[804px] rounded-[32px] relative overflow-hidden group cursor-pointer bg-[#0A0D14] will-change-transform origin-center"
          >
            <img
              ref={i === 0 ? card1ImageRef : null}
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={i === 0 ? { opacity: morphComplete ? 1 : 0 } : {}}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
