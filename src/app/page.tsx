import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ControlBar from '@/components/ControlBar';

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
          <div className="relative z-10 w-full max-w-4xl aspect-[4/3] mb-8 md:mb-12">
            {/* Placeholder for 3D model/image - styled as a wireframe box */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-[3/2]">
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
            <h1 className="hero-tagline">
              <span className="text-[var(--foreground)]">DESIGN</span>{' '}
              <span className="highlight">TECHNOLOGY</span>{' '}
              <span className="text-[var(--foreground)]">SERVICE</span>{' '}
              <span className="text-[var(--foreground)]">PROVIDER</span>
            </h1>
          </div>
        </section>

        {/* Reality Capture Section - Preview */}
        <section className="flex flex-col md:flex-row min-h-screen px-6 md:px-12 py-12 md:py-20 gap-8 md:gap-0">
          <div className="flex-1 md:pr-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 md:mb-8">REALITY CAPTURE</h2>
            
            <div className="mb-8">
              <button className="accordion-trigger open font-display text-base md:text-lg font-semibold mb-3 md:mb-4">
                LASER SCANNING
              </button>
              <p className="text-[var(--muted)] leading-relaxed ml-6 text-sm md:text-base">
                Our team works interchangeably with Leica and NavVis Equipment for comprehensive 
                reality capture solutions. We deliver high-accuracy point clouds for projects of 
                any scale, from single rooms to entire campuses.
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Blueprint/Floorplan placeholder */}
            <div className="w-full aspect-square bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full p-8 opacity-60"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor plan grid */}
                <g strokeWidth="0.5" stroke="currentColor" opacity="0.3">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <g key={i}>
                      <line x1={i * 20} y1="0" x2={i * 20} y2="400" />
                      <line x1="0" y1={i * 20} x2="400" y2={i * 20} />
                    </g>
                  ))}
                </g>
                
                {/* Room outlines */}
                <g strokeWidth="2" stroke="#3B82F6">
                  <rect x="40" y="40" width="150" height="120" />
                  <rect x="40" y="160" width="150" height="100" />
                  <rect x="190" y="40" width="170" height="220" />
                  <rect x="40" y="260" width="320" height="100" />
                </g>
                
                {/* Doors */}
                <g strokeWidth="1.5" stroke="#3B82F6">
                  <path d="M40 100 L40 130" strokeDasharray="4 2"/>
                  <path d="M190 150 L190 180" strokeDasharray="4 2"/>
                  <path d="M200 260 L230 260" strokeDasharray="4 2"/>
                </g>
                
                {/* Dimension lines */}
                <g strokeWidth="0.5" stroke="#EF4444" opacity="0.6">
                  <line x1="40" y1="30" x2="190" y2="30"/>
                  <line x1="40" y1="25" x2="40" y2="35"/>
                  <line x1="190" y1="25" x2="190" y2="35"/>
                  <text x="115" y="25" fontSize="8" fill="#EF4444" textAnchor="middle">15.0m</text>
                </g>
              </svg>
            </div>
          </div>
        </section>
      </main>

      <ControlBar />
    </div>
  );
}
