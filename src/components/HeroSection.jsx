import PageHero from './landing/PageHero';
import cardImage from '../assets/hero-card.png';

const HeroSection = ({ heroImageRef }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-visible pt-20 pb-10 px-6 md:px-10 lg:px-16 z-10"
    >
      <PageHero
        title="MarkCoders/>"
        titleSize="xl"
        layout="split"
        showDot
        subtitle="We work with startups, scaleups, and established brands to launch digital products that stand out and convert."
      >
        <div
          className="rounded-2xl p-5 relative overflow-hidden group cursor-pointer flex flex-row gap-4 items-stretch"
          style={{
            background: '#00060B',
            border: '1px solid #FFFFFF66',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, transparent 30%, rgba(26, 122, 248, 0.05) 50%, transparent 70%)',
            }}
          />

          <div className="flex flex-col justify-between flex-1 relative z-10 min-w-[160px]">
            <div className="flex flex-col gap-1">
              <span
                className="text-sm font-medium text-gray-400 tracking-wide"
                style={{ fontFamily: 'Switzer, sans-serif' }}
              >
                Our work
              </span>
              <h3
                className="text-base font-semibold text-white leading-snug"
                style={{ fontFamily: 'Switzer, sans-serif' }}
              >
                Designing a bold voice
                <br />
                for thought leadership
              </h3>
            </div>

            <div className="flex justify-start mt-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #1a7af8 0%, #1565d8 100%)',
                  boxShadow: '0 2px 10px rgba(26, 122, 248, 0.3)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M4 12L12 4M12 4H5.33M12 4V10.67"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl w-[160px] md:w-[190px] flex-shrink-0 min-h-[170px] z-30">
            <img
              ref={heroImageRef}
              src={cardImage}
              alt="Our work - Designing a bold voice"
              className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105 z-50 relative will-change-transform origin-center"
              style={{ minHeight: '170px' }}
            />
          </div>
        </div>
      </PageHero>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,1) 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
