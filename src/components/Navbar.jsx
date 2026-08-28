import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import marklogo from '../assets/marklogo.png';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([logoRef.current, linksRef.current, btnRef.current], {
        opacity: 0,
        y: -30,
      });

      // Staggered entrance
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          linksRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          btnRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMobileMenu = () => {
    const menu = mobileMenuRef.current;
    const hamburger = hamburgerRef.current;

    if (menu.classList.contains('max-h-0')) {
      menu.classList.remove('max-h-0', 'opacity-0');
      menu.classList.add('max-h-[400px]', 'opacity-100');
      hamburger.classList.add('active');
    } else {
      menu.classList.remove('max-h-[400px]', 'opacity-100');
      menu.classList.add('max-h-0', 'opacity-0');
      hamburger.classList.remove('active');
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16 py-5"
      style={{
        background:
          'linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.7) 60%, transparent 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center cursor-pointer select-none">
          <img src={marklogo} alt="MarkCoders" className="h-8 md:h-10 w-auto" />
        </div>

        {/* Desktop Nav Links */}
        <div
          ref={linksRef}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {['Home', 'About Us', 'Services'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[24px] text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium tracking-wide"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={btnRef} className="hidden md:block">
          <button
            className="px-6 py-2.5 rounded-[15px] text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              background: '#25A9E0',
              boxShadow: '0 4px 20px rgba(26, 122, 248, 0.3)',
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center hamburger-line-1" />
          <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300 hamburger-line-2" />
          <span className="w-4 h-0.5 bg-white rounded-full transition-all duration-300 origin-center hamburger-line-3" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="pt-6 pb-4 flex flex-col gap-4">
          {['Home', 'About Us', 'Services'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-base py-2 border-b border-white/5"
              onClick={toggleMobileMenu}
            >
              {item}
            </a>
          ))}
          <button
            className="mt-2 px-6 py-3 rounded-full text-sm font-semibold text-white w-full cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #1a7af8 0%, #1565d8 100%)',
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
