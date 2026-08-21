import { useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkGrid from './components/WorkGrid';
import AboutAndVideo from './components/AboutAndVideo';
import WhatWeDo from './components/WhatWeDo';
import ToolsSection from './components/ToolsSection';
import TeamSection from './components/TeamSection';
import WorkAndPlaySection from './components/WorkAndPlaySection';
import CursorGlow from './components/CursorGlow';

function App() {
  const heroImageRef = useRef(null);

  return (
    <div className="relative bg-[#030712] min-h-screen text-white">
      <CursorGlow />
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
