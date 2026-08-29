import PageHero from './landing/PageHero';
import cardImage from '../assets/vantage.webp';
import canvasBg from '../assets/canvasbg.gif';

const HeroSection = ({ heroImageRef }) => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-visible pt-28 pb-12 px-6 md:px-10 lg:px-16 z-10"
    >
      {/* Background GIF */}
      <img
        src={canvasBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-80"
        style={{
          filter: 'brightness(0.9) contrast(1.1)',
        }}
      />

      {/* Top Gradient Overlay for smooth blending with Navbar */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(rgb(0, 6, 11) 0%, rgb(0 0 0 / 89%) 25%, rgba(0, 6, 11, 0.3) 50%, rgba(0, 6, 11, 0.8) 100%)',
        }}
      />

      {/* Ambient Blue Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(26, 122, 248, 0.15) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10 w-full flex-1 flex flex-col">
        <PageHero
          title="MarkCoders/>"
          titleSize="xl"
          layout="split"
          spread
          showDot
          className="flex-1"
          subtitle="We work with startups, scaleups, and established brands to launch digital products that stand out and convert."
          subtitleClassName="text-[22px] sm:text-[28px] md:text-[35px] leading-[32px] sm:leading-[38px] md:leading-[45px] font-[500] tracking-[-1px] text-white/90"
          subtitleContainerClassName="max-w-xl lg:max-w-2xl"
          subtitleStyle={{
            fontFamily: 'Switzer, sans-serif',
            fontWeight: 500,
            letterSpacing: '-1px',
            verticalAlign: 'middle',
          }}
        >
          <div
            className="w-full max-w-[430.82px] h-[216.86px] rounded-[15px] p-[10px] relative overflow-hidden group cursor-pointer flex flex-row items-stretch"
            style={{
              width: '430.82px',
              maxWidth: '100%',
              height: '216.86px',
              background: '#00060B',
              border: '1px solid #FFFFFF66',
              borderRadius: '15px',
              backdropFilter: 'blur(20px)',
              opacity: 1,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, transparent 30%, rgba(26, 122, 248, 0.05) 50%, transparent 70%)',
              }}
            />

            <div className="flex flex-col justify-between flex-1 relative z-10 pl-3 pr-2 py-1.5 h-full">
              <div className="flex flex-col">
                <span
                  className="text-white select-none"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '26px',
                    letterSpacing: '-1px',
                    verticalAlign: 'middle',
                  }}
                >
                  Our work
                </span>
                <h3
                  className="mt-2.5 select-none"
                  style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '26px',
                    letterSpacing: '-1px',
                    verticalAlign: 'middle',
                    color: '#FFFFFF66',
                  }}
                >
                  Designing a bold voice
                  <br />
                  for thought leadership
                </h3>
              </div>

              <div className="flex justify-start mt-auto">
                <div
                  className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: '#1399e8',
                    boxShadow: '0 2px 10px rgba(19, 153, 232, 0.3)',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path
                      d="M4 12L12 4M12 4H5.33M12 4V10.67"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="relative flex-shrink-0 z-30 overflow-hidden"
              style={{
                width: '162.16px',
                height: '197.3px',
                borderRadius: '15px',
              }}
            >
              <img
                ref={heroImageRef}
                src={cardImage}
                alt="Our work - Designing a bold voice"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-50 relative will-change-transform origin-center"
                style={{
                  width: '162.16px',
                  height: '197.3px',
                  borderRadius: '15px',
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </PageHero>
      </div>

      {/* Bottom gradient fade for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,1) 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
