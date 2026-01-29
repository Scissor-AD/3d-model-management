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
        <section className="relative min-h-[calc(100vh-var(--nav-height)-var(--control-bar-height))] flex flex-col items-center justify-center px-6 md:px-12">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          
          {/* 3D Model Placeholder */}
          <div className="relative z-10 w-full max-w-sm md:max-w-3xl aspect-[4/3] mb-8 md:mb-6">
            {/* Placeholder for 3D model/image - styled as a wireframe box */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-sm md:max-w-3xl aspect-[3/2]">
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
          <div className="relative z-10 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <AnimatedTagline />
          </div>
          
          {/* Square Footage Counter - Primary */}
          <div className="relative z-10 mt-8 md:mt-6 w-full max-w-5xl">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <SquareFootageCounter 
                targetValue={12500000}
                duration={2500}
                label="SQUARE FEET CAPTURED"
              />
            </div>
          </div>
          
          {/* Delivery Stats Counters - Secondary */}
          <div className="relative z-10 mt-2 md:mt-4 w-full max-w-3xl">
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              {/* Projects Delivered Counter */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <SquareFootageCounter 
                  targetValue={850}
                  duration={2000}
                  label="PROJECTS DELIVERED"
                  suffix=""
                  slowIncrementRate={0}
                />
              </div>
              
              {/* Models Delivered Counter */}
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
