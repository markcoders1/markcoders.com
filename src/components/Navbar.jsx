import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about-us' },
  { label: 'Services', to: '/#services' },
];

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

  // Hide on scroll down, show on any scroll up
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let isHidden = false;

    const showNav = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(nav, {
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const hideNav = () => {
      if (isHidden) return;
      isHidden = true;

      // Close mobile menu when nav hides
      const menu = mobileMenuRef.current;
      const hamburger = hamburgerRef.current;
      if (menu && !menu.classList.contains('max-h-0')) {
        menu.classList.remove('max-h-[400px]', 'opacity-100');
        menu.classList.add('max-h-0', 'opacity-0');
        hamburger?.classList.remove('active');
      }

      gsap.to(nav, {
        y: '-100%',
        duration: 0.35,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        showNav();
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 72) {
        hideNav();
      } else if (currentScrollY < lastScrollY) {
        showNav();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.set(nav, { clearProps: 'y' });
    };
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
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-16 py-5 will-change-transform"
      style={{
        background:
          'linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.7) 60%, transparent 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" ref={logoRef} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none no-underline">
          <img
            src={LOGO_SRC}
            alt=""
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0"
            decoding="async"
            draggable={false}
          />
          <span
            className="text-[1.35rem] sm:text-[1.65rem] font-extrabold text-white uppercase leading-none tracking-[-0.04em]"
            style={{ fontFamily: 'Switzer, sans-serif' }}
          >
            MARKCODERS
            <span className="text-white">/</span>
            <span className="text-[#25A9E0]">&gt;</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          ref={linksRef}
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[24px] text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium tracking-wide no-underline"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={btnRef} className="hidden md:block">
          <button
            className="px-7 py-3 rounded-[15px] text-lg font-normal text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
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
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-base py-2 border-b border-white/5 no-underline"
              onClick={toggleMobileMenu}
            >
              {item.label}
            </Link>
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
