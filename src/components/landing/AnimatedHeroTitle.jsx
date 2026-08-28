import { forwardRef } from 'react';

const TITLE_SIZES = {
  xl: 'clamp(60px, 12vw, 200px)',
  lg: 'clamp(4.5rem, 14vw, 11rem)',
};

/**
 * Per-letter hover bold — same as Home hero heading.
 */
const AnimatedHeroTitle = forwardRef(function AnimatedHeroTitle(
  { text, size = 'lg', className = '' },
  ref
) {
  return (
    <h1
      ref={ref}
      className={`leading-[0.9] tracking-[-0.04em] text-white ${className}`}
      style={{
        fontFamily: 'Switzer, sans-serif',
        fontSize: TITLE_SIZES[size] || TITLE_SIZES.lg,
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block font-bold cursor-default transition-[font-weight] duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ fontWeight: 700 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.fontWeight = '900';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.fontWeight = '700';
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
});

export default AnimatedHeroTitle;
