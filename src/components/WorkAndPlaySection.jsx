import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
];

const WorkAndPlaySection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      const slides = gsap.utils.toArray('.scatter-image');

      if (slides.length === 4) {
        // Set initial state (stacked at the bottom center, fully visible)
        gsap.set(slides, {
          y: '35vh',
          xPercent: -50,
          left: '50%',
          scale: 0.9,
          opacity: 1, // Visible before scroll
          rotation: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=250%', // Scroll duration (enough for 2 steps)
            pin: true,
            scrub: 1, // Smooth scrub
          }
        });

        // Step 1: Spread horizontally into a line (like in the first screenshot)
        tl.to(slides[0], { left: '20%', rotation: -2, duration: 1 }, 'line')
          .to(slides[1], { left: '40%', rotation: 1, duration: 1 }, 'line')
          .to(slides[2], { left: '60%', rotation: -1, duration: 1 }, 'line')
          .to(slides[3], { left: '80%', rotation: 2, duration: 1 }, 'line');

        // Step 2: Move UP and scatter into corners (like in the second/third screenshot)
        tl.to(slides[0], { y: '-10vh', left: '12%', scale: 1, rotation: -4, duration: 1.5 }, 'scatter')
          .to(slides[1], { y: '30vh', left: '28%', scale: 1, rotation: 2, duration: 1.5 }, 'scatter')
          .to(slides[2], { y: '-35vh', left: '72%', scale: 1, rotation: 5, duration: 1.5 }, 'scatter')
          .to(slides[3], { y: '5vh', left: '88%', scale: 1, rotation: -2, duration: 1.5 }, 'scatter');
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full">
      <div
        ref={containerRef}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ color: '#111', backgroundColor: 'rgb(245, 245, 245)' }}
      >
        {/* Heading */}
        <h2
          className="text-center font-normal leading-[1] uppercase z-10  text-[#111] "
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 10vw, 60px)' }}
        >
          There’s work<br />and there’s play
        </h2>

        {/* The 4 Images */}
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Work and Play ${index + 1}`}
            className="scatter-image absolute top-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] object-cover border-[8px] border-white shadow-2xl z-20"
            style={{ transform: 'translate(-50%, -50%)' }} // Initial centering alignment
          />
        ))}
      </div>
    </section>
  );
};

export default WorkAndPlaySection;
