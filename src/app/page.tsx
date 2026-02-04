import Navigation from '@/components/Navigation';
import ControlBar from '@/components/ControlBar';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col lg:overflow-hidden">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1 pt-[var(--nav-height)] pb-[var(--control-bar-height)]">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-var(--nav-height)-var(--control-bar-height))] flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
          {/* Background - White/Light for clean architectural aesthetic */}
          <div className="absolute inset-0 bg-white" />
          
          {/* Hero Animation with Fullscreen + Text Reveal */}
          <HeroSection />
        </section>
      </main>

      <ControlBar />
    </div>
  );
}
