import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ControlBar from '@/components/ControlBar';
import SquareFootageCounter from '@/components/SquareFootageCounter';
import AnimatedTagline from '@/components/AnimatedTagline';

export default function Home() {
  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col lg:overflow-hidden">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-1 pt-[var(--nav-height)] pb-[var(--control-bar-height)]">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-var(--nav-height)-var(--control-bar-height))] flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          
          {/* Hero Image */}
          <div className="relative z-10 w-full max-w-lg md:max-w-3xl lg:max-w-4xl">
            <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.5/1] relative">
              <Image 
                src="/hero-image.png"
                alt="3D Model Management Hero"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Tagline */}
          <div className="relative z-10 mt-4 md:mt-6 text-center">
            <AnimatedTagline />
          </div>
          
          {/* Counters Row */}
          <div className="relative z-10 mt-4 md:mt-6 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
              <div>
                <SquareFootageCounter 
                  targetValue={12500000}
                  duration={2500}
                  label="SQUARE FEET CAPTURED"
                />
              </div>
              
              <div>
                <SquareFootageCounter 
                  targetValue={850}
                  duration={2000}
                  label="PROJECTS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>
              
              <div>
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
