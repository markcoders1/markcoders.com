import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import webflowImg from '../assets/Tools Logo/webflow.png';
import figmaImg from '../assets/Tools Logo/figma.png';
import shopifyImg from '../assets/Tools Logo/shopify.png';
import wordpressImg from '../assets/Tools Logo/wordpress.png';
import aiImg from '../assets/Tools Logo/illustartor.png';
import psImg from '../assets/Tools Logo/photoshop.png';
import reactImg from '../assets/Tools Logo/react.png';
import framerImg from '../assets/Tools Logo/framer.png';
import cubeImg from '../assets/Tools Logo/cube.png';
import tsImg from '../assets/Tools Logo/typescript.png';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: 'Webflow', img: webflowImg },
  { name: 'Figma', img: figmaImg },
  { name: 'Shopify', img: shopifyImg },
  { name: 'WordPress', img: wordpressImg },
  { name: 'Illustrator', img: aiImg },
  { name: 'Photoshop', img: psImg },
  { name: 'React', img: reactImg },
  { name: 'Framer', img: framerImg },
  { name: 'Cube', img: cubeImg },
  { name: 'Tailwind', img: tsImg },
];

const cards = [
  {
    title: 'UX/UI Design',
    desc: 'Every screen has a purpose. From wireframes to pixel-perfect UI, we create experiences that guide users and drive business goals.',
  },
  {
    title: 'No-code Development',
    desc: 'We build responsive, production-ready websites in Webflow and Framer, so your product launches faster without sacrificing quality. One team from concept to live site.',
    isRight: true,
  },
  {
    title: 'Corporate Design',
    desc: 'Pitch decks, brand presentations, and visual identities that match the ambition of your business. We design corporate materials that feel modern, polished, and unmistakably yours.',
  },
  {
    title: '3D Design',
    desc: 'Immersive 3D visuals and motion design that give your product a cinematic edge. From animated product showcases to interface elements with depth.',
    isRight: true,
  },
];

const ToolsSection = () => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Top Headings Animation
      gsap.fromTo(
        '.tools-heading',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tools-heading', // Triggers exactly when heading enters
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Tools Icons Staggered Pop-in
      gsap.fromTo(
        '.tool-icon',
        { opacity: 0, scale: 0.6, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.tool-icon', // Triggers exactly when icons enter
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Bottom Intro Text Reveal
      gsap.fromTo(
        '.bottom-intro',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bottom-intro', // Triggers when text enters
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Cards Staggered Slide Up
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-card', // Triggers when cards enter
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{
        background: '#f5f5f5', // Ultra light gray to match screenshot perfectly
        color: '#111',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Top Heading with Tools */}
        <div className="flex flex-col mb-24 md:mb-32 overflow-hidden">
          <h2
            className="tools-heading font-medium tracking-tight leading-[1] mb-6 md:mb-8"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(56px, 9vw, 110px)', letterSpacing: '-0.04em' }}
          >
            Our tools &
          </h2>

          {/* Tools Row */}
          <div
            className="flex flex-wrap items-end justify-center md:justify-start gap-[12px] md:gap-[23px] my-2 relative z-20 h-[80px] md:h-[120px]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {tools.map((tool, index) => {
              const isHovered = hoveredIndex === index;
              const isAdjacent = hoveredIndex === index - 1 || hoveredIndex === index + 1;
              const isFar = hoveredIndex !== null && !isHovered && !isAdjacent;

              // Mobile vs Desktop sizes
              const baseSize = 'w-[48px] h-[48px] md:w-[73px] md:h-[73px]';
              const adjacentSize = 'w-[56px] h-[56px] md:w-[84px] md:h-[84px]';
              const hoveredSize = 'w-[64px] h-[64px] md:w-[104px] md:h-[104px]';

              const currentSizeClass = isHovered ? hoveredSize : isAdjacent ? adjacentSize : baseSize;
              const fontSizeClass = isHovered ? 'text-2xl md:text-4xl' : isAdjacent ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl';

              return (
                <div
                  key={index}
                  className="tool-icon relative group flex flex-col items-center justify-end h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Icon Box */}
                  <div
                    className={`${currentSizeClass} rounded-[12px] md:rounded-[22px] flex items-center justify-center cursor-pointer overflow-hidden`}
                    style={{
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', // Ultra smooth, soft framer-like spring
                      boxShadow: isHovered ? '0 16px 32px rgba(0,0,0,0.15)' : isAdjacent ? '0 8px 20px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.08)',
                      transform: isHovered ? 'translateY(-12px)' : isAdjacent ? 'translateY(-6px)' : 'translateY(0)',
                      opacity: isFar ? 0.85 : 1,
                    }}
                  >
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Tooltip Label */}
                  <div
                    className="absolute top-full mt-3 pointer-events-none z-30"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
                    }}
                  >
                    <span className="bg-white text-black text-[11px] font-bold py-[6px] px-[12px] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] whitespace-nowrap tracking-wide">
                      {tool.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden flex justify-end w-full">
            <h2
              className="tools-heading font-medium tracking-tight leading-[1] mt-6 md:mt-8"
              style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(56px, 9vw, 110px)', letterSpacing: '-0.04em' }}
            >
              your brand.
            </h2>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="mt-16 md:mt-24">

          {/* Top Intro Text & Button */}
          <div className="bottom-intro max-w-[480px] mb-20 md:mb-32">
            <p className="text-[#222] text-[16px] md:text-[26px] leading-[1.4] mb-8 font-medium tracking-[-0.02em]">
              We design products that live in the digital world: intuitive UX, sharp UI, immersive 3D and motion. From research to launch, we craft bold, seamless experiences.
            </p>
            <button className="flex items-center gap-2 bg-[#23b3e8] hover:bg-[#1ca2d4] transition-colors text-white font-medium py-[12px] px-[24px] rounded-[12px] text-[18px] group">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M4 12L12 4M12 4H5.33M12 4V10.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Explore Our Process
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative items-start">

            {/* Left Column (Shifted down for masonry effect) */}
            <div className="flex flex-col gap-6 md:gap-10 md:mt-[100px]">
              {cards.filter(c => !c.isRight).map((card, i) => (
                <div
                  key={i}
                  className="service-card bg-white rounded-[28px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group cursor-pointer relative flex flex-col h-auto"
                  style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.975)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 className="text-[32px] md:text-[40px] font-medium tracking-[-0.05em] mb-5 text-[#111]">
                    {card.title}
                  </h3>
                  <div className="w-full h-[1px] bg-[#e5e5e5] mb-12"></div>
                  <div className="mb-4 max-w-[95%]">
                    <p className="text-[#111] text-[14px] md:text-[20px] leading-[1.4] font-medium tracking-[-0.01em]">
                      {card.desc}
                    </p>
                  </div>
                  {/* Arrow Button */}
                  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-9 h-9 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:bg-[#e4e4e4]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#111] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M4 12L12 4M12 4H5.33M12 4V10.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (Starts higher) */}
            <div className="flex flex-col gap-6 md:gap-10">
              {cards.filter(c => c.isRight).map((card, i) => (
                <div
                  key={i}
                  className="service-card bg-white rounded-[28px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group cursor-pointer relative flex flex-col h-auto"
                  style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.975)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 className="text-[32px] md:text-[36px] font-medium tracking-[-0.05em] mb-5 text-[#111]">
                    {card.title}
                  </h3>
                  <div className="w-full h-[1px] bg-[#e5e5e5] mb-12"></div>
                  <div className="mb-4 max-w-[95%]">
                    <p className="text-[#111] text-[14px] md:text-[20px] leading-[1.4] font-medium tracking-[-0.01em]">
                      {card.desc}
                    </p>
                  </div>
                  {/* Arrow Button */}
                  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-9 h-9 bg-[#f2f2f2] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:bg-[#e4e4e4]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#111] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M4 12L12 4M12 4H5.33M12 4V10.67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
