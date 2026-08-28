import { useRef } from 'react';
import Navbar from '../components/Navbar';
import SplashCursor from '../components/SplashCursor';
import Footer from '../components/Footer';
import ProjectsHero from '../components/ProjectsHero';
import ProjectsGrid from '../components/ProjectsGrid';
import TrustSection from '../components/TrustSection';
import WorkAndPlaySection from '../components/WorkAndPlaySection';
import TeamSection from '../components/TeamSection.jsx';


function Projects() {
  const previewImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-x-hidden max-w-[100vw]">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={12}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#005ef7"
      />
      <Navbar />
      <main>
        <ProjectsHero previewImageRef={previewImageRef} />
        <ProjectsGrid previewImageRef={previewImageRef} />
        <TeamSection />
        <WorkAndPlaySection />
        <TrustSection />
        <Footer />
      </main>
    </div>
  );
}

export default Projects;
