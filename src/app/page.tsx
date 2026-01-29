import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ControlBar from '@/components/ControlBar';
import SquareFootageCounter from '@/components/SquareFootageCounter';
import AnimatedTagline from '@/components/AnimatedTagline';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1 pt-[var(--nav-height)] pb-[var(--control-bar-height)]">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-var(--nav-height)-var(--control-bar-height))] flex flex-col items-center justify-center px-6 md:px-12 lg:px-16">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          
          {/* Hero Image */}
          <div className="relative z-10 w-full max-w-lg md:max-w-3xl lg:max-w-4xl aspect-[4/3] md:aspect-[16/9]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src="/hero-image.png"
                  alt="3D Model Management Hero"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="relative z-10 mt-6 md:mt-10 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <AnimatedTagline />
          </div>
          
          {/* Counters Row */}
          <div className="relative z-10 mt-6 md:mt-10 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-12 lg:gap-16">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <SquareFootageCounter 
                  targetValue={12500000}
                  duration={2500}
                  label="SQUARE FEET CAPTURED"
                />
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <SquareFootageCounter 
                  targetValue={850}
                  duration={2000}
                  label="PROJECTS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>
              
              <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <SquareFootageCounter 
                  targetValue={2400}
                  duration={2200}
                  label="MODELS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <ControlBar />
    </div>
  );
}
