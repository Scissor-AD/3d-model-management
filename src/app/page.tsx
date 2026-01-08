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
              <div className="relative w-full max-w-2xl aspect-[3/2]">
                {/* Building Silhouette Placeholder */}
                <svg 
                  viewBox="0 0 400 300" 
                  className="w-full h-full"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Ground line */}
                  <line x1="0" y1="280" x2="400" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                  
                  {/* Main building structure */}
                  <g className="opacity-80">
                    {/* Left building */}
                    <rect x="30" y="120" width="100" height="160" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <rect x="40" y="135" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="70" y="135" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="100" y="135" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="40" y="180" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="70" y="180" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="100" y="180" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="40" y="225" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    <rect x="70" y="225" width="20" height="55" stroke="currentColor" strokeWidth="1"/>
                    <rect x="100" y="225" width="20" height="30" stroke="currentColor" strokeWidth="1"/>
                    {/* Roof */}
                    <path d="M25 120 L80 80 L135 120" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    
                    {/* Center building (taller) */}
                    <rect x="150" y="60" width="100" height="220" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    {[0, 1, 2, 3, 4, 5].map((row) => (
                      <g key={row}>
                        <rect x="160" y={75 + row * 35} width="18" height="25" stroke="currentColor" strokeWidth="0.8"/>
                        <rect x="185" y={75 + row * 35} width="18" height="25" stroke="currentColor" strokeWidth="0.8"/>
                        <rect x="210" y={75 + row * 35} width="18" height="25" stroke="currentColor" strokeWidth="0.8"/>
                        <rect x="235" y={75 + row * 35} width="8" height="25" stroke="currentColor" strokeWidth="0.8"/>
                      </g>
                    ))}
                    {/* Entrance */}
                    <rect x="185" y="255" width="30" height="25" stroke="currentColor" strokeWidth="1"/>
                    {/* Roof detail */}
                    <rect x="170" y="50" width="60" height="10" stroke="currentColor" strokeWidth="1" fill="none"/>
                    
                    {/* Right building */}
                    <rect x="270" y="140" width="100" height="140" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <rect x="280" y="155" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="310" y="155" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="340" y="155" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="280" y="195" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="310" y="195" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="340" y="195" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="280" y="235" width="20" height="25" stroke="currentColor" strokeWidth="1"/>
                    <rect x="310" y="235" width="40" height="45" stroke="currentColor" strokeWidth="1"/>
                    {/* Steps */}
                    <line x1="310" y1="280" x2="310" y2="285" stroke="currentColor" strokeWidth="1"/>
                    <line x1="305" y1="285" x2="355" y2="285" stroke="currentColor" strokeWidth="1"/>
                  </g>
                  
                  {/* Scan lines effect */}
                  <g className="opacity-20">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <line 
                        key={i} 
                        x1="0" 
                        y1={50 + i * 35} 
                        x2="400" 
                        y2={50 + i * 35} 
                        stroke="currentColor" 
                        strokeWidth="0.5"
                        strokeDasharray="2 4"
                      />
                    ))}
                  </g>
                  
                  {/* Point cloud dots */}
                  <g className="opacity-40">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <circle 
                        key={i}
                        cx={50 + Math.random() * 300}
                        cy={80 + Math.random() * 180}
                        r="1.5"
                        fill="currentColor"
                      />
                    ))}
                  </g>
                </svg>
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
        <section className="hidden md:flex min-h-screen px-6 md:px-12 py-20">
          <div className="flex-1 pr-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">REALITY CAPTURE</h2>
            
            <div className="mb-8">
              <button className="accordion-trigger open font-display text-lg font-semibold mb-4">
                LASER SCANNING
              </button>
              <p className="text-[var(--muted)] leading-relaxed ml-6">
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
