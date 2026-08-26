import { useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkGrid from './components/WorkGrid';
import AboutAndVideo from './components/AboutAndVideo';
import WhatWeDo from './components/WhatWeDo';
import ToolsSection from './components/ToolsSection';
import TeamSection from './components/TeamSection';
import WorkAndPlaySection from './components/WorkAndPlaySection';
import SplashCursor from './components/SplashCursor';

function App() {
  const heroImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white">
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
        <HeroSection heroImageRef={heroImageRef} />
        <WorkGrid heroImageRef={heroImageRef} />
        <AboutAndVideo />
        <WhatWeDo />
        <ToolsSection />
        <TeamSection />
        <WorkAndPlaySection />
      </main>
    </div>
  );
}

export default App;
