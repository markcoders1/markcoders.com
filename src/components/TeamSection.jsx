import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  'https://i.pravatar.cc/150?img=68',
  'https://i.pravatar.cc/150?img=59',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=33',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=61',
  'https://i.pravatar.cc/150?img=54',
  'https://i.pravatar.cc/150?img=32',
];

const TeamSection = ({ roundedTop = false }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const avatarsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Scroll reveal animation for the heading
      gsap.fromTo(
        '.team-heading',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Staggered 3D reveal for avatars
      gsap.fromTo(
        avatarsRef.current,
        { opacity: 0, scale: 0.5, rotationY: 90 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.avatars-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Description text fade up
      gsap.fromTo(
        '.team-desc',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-desc',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Stats card fade up
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Hover effect for the card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)', // Nice springy return
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-24 md:py-32 ${roundedTop ? 'rounded-t-[40px] md:rounded-t-[80px]' : ''}`}
      style={{
        background: '#f5f5f5', // Matches previous section perfectly
        zIndex: roundedTop ? 20 : 1, // ensure it overlaps nicely if needed
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Heading */}
        <div className="flex flex-col mb-20 md:mb-32 max-w-[800px] mx-auto">
          <h2
            className="team-heading font-medium tracking-[-0.04em] leading-[1.1] text-[#111]"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            An Ambitious Team
          </h2>
          <h2
            className="team-heading font-medium tracking-[-0.04em] leading-[1.1] text-[#111] self-end md:pr-12 mt-2 md:mt-4"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            for Your Vision.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

          {/* Left Side: Avatars and Text */}
          <div className="md:col-span-5 flex flex-col pt-4">

            {/* Avatars Grid */}
            <div className="avatars-container flex flex-wrap gap-2 md:gap-[10px] max-w-[380px] mb-20">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  ref={el => avatarsRef.current[i] = el}
                  className="w-[52px] h-[52px] rounded-[10px] overflow-hidden shadow-sm"
                >
                  <img src={src} alt="Team Member" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
              {/* +25 Box */}
              <div
                ref={el => avatarsRef.current[8] = el}
                className="w-[52px] h-[52px] rounded-[10px] bg-[#23b3e8] text-white flex items-center justify-center font-bold text-[15px] shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                +25
              </div>
            </div>

            {/* Description Text */}
            <p className="team-desc text-[#222] text-[15px] md:text-[28px] leading-[1.5] font-medium tracking-[-0.01em] max-w-[440px]">
              Our team of designers, strategists, and analysts works together to create digital experiences that deliver measurable results.
            </p>
          </div>

          {/* Right Side: Stats Card */}
          <div className="md:col-span-7 flex justify-end">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.05)] w-full max-w-[600px] p-8 md:p-8"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Stat Row 1 */}
              <div className="flex items-center justify-between pt-12 pb-5 ">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Team Members</span>
                <span className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium">35</span>
              </div>
              <div className="w-full h-[1px] bg-[#808385]"></div>

              {/* Stat Row 2 */}
              <div className="flex items-center justify-between pt-12 pb-5">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Core Disciplines</span>
                <span className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium">06</span>
              </div>
              <div className="w-full h-[1px] bg-[#808385]"></div>

              {/* Stat Row 3 */}
              <div className="flex items-center justify-between pt-12 pb-5">
                <span className="text-[#111] text-[16px] md:text-[30px] font-medium tracking-tight">Years Experience</span>
                <span className="text-[#23b3e8] text-[24px] md:text-[35px] font-medium">5+</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
