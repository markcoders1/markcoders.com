import { ArrowUpRight } from 'lucide-react';
import PageHero from './landing/PageHero';
import { FEATURED_PROJECT } from '../data/projects';

const OurWorkCard = ({ imageRef, tagline, image, title }) => (
  <div
    className="w-full rounded-2xl p-5 relative overflow-hidden group cursor-pointer flex flex-row gap-4 items-stretch"
    style={{
      background: '#00060B',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(20px)',
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{
        background:
          'linear-gradient(135deg, transparent 30%, rgba(26, 122, 248, 0.06) 50%, transparent 70%)',
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
          className="text-base font-semibold text-white leading-snug text-left"
          style={{ fontFamily: 'Switzer, sans-serif' }}
        >
          {tagline}
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
          <ArrowUpRight
            size={16}
            strokeWidth={2}
            className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>

    <div className="relative rounded-2xl w-[160px] md:w-[190px] flex-shrink-0 min-h-[170px] z-30">
      <img
        ref={imageRef}
        src={image}
        alt={title}
        className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105 relative z-50 will-change-transform"
        style={{ minHeight: '170px' }}
        draggable={false}
      />
    </div>
  </div>
);

const ProjectsHero = ({ previewImageRef }) => {
  const featured = FEATURED_PROJECT;

  return (
    <section className="relative min-h-[100svh] flex flex-col pt-28 pb-10 px-6 md:px-10 lg:px-16 overflow-hidden">
      <PageHero
        title="Projects"
        subtitle="We've successfully delivered a wide range of projects, helping brands grow and thrive."
        layout="split"
        spread
        titleSize="xl"
        className="flex-1"
      >
        <OurWorkCard
          imageRef={previewImageRef}
          tagline={featured.tagline}
          image={featured.image}
          title={featured.title}
        />
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

export default ProjectsHero;
