'use client';

import { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import Navigation from '@/components/Navigation';
import LogoRibbonSphere, { companyBlurbs } from '@/components/LogoRibbonSphere';

const SOLUTIONS_VIDEO_HLS =
  'https://customer-ry80t0pvpkom5b16.cloudflarestream.com/bf6f338f01c5d8a025bb35a46122146c/manifest/video.m3u8';

type TabKey = 'reality-capture' | 'digital-production' | 'equipment-software';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'reality-capture', label: 'REALITY CAPTURE' },
  { key: 'digital-production', label: 'DIGITAL PRODUCTION' },
  { key: 'equipment-software', label: 'EQUIPMENT + SOFTWARE' },
];

const realityCaptureContent = {
  sections: [
    {
      title: 'LASER SCANNING',
      description: 'Our laser scanning services integrate LiDAR and SLAM technologies to deliver accurate, scalable solutions for projects of all sizes. Serving all industries and sectors, our experience includes projects ranging from 500 to 20 million square feet.',
    },
    {
      title: 'PHOTOGRAMMETRY',
      description: 'We utilize advanced optics and computational methods to digitize physical spaces with exceptional fidelity. Combining terrestrial and aerial data capture, we support both fine-detail documentation and large-scale volumetric studies, primarily for conservation and asset cataloging applications.',
    },
  ],
};

const equipmentLogos = [
  { src: '/logo-navvis.png', alt: 'NavVis' },
  { src: '/logo-leica.png', alt: 'Leica' },
  { src: '/logo-faro.png', alt: 'FARO' },
  { src: '/logo-emesent.png', alt: 'Emesent', scale: 1.5 },
  { src: '/logo-xgrids.png', alt: 'XGRIDS', scale: 1.5 },
  { src: '/logo-revit.png', alt: 'Revit' },
];

const digitalProductionContent = {
  sections: [
    {
      title: 'SCAN TO BIM',
      description: 'We turn laser scan point clouds into intelligent, purpose-built models that support confident design and construction. Typically developed in Revit, our building information models range from detailed existing conditions to predictive, connected digital twins. Our services span all sectors, with solutions customized to each project.',
    },
    {
      title: 'DIGITAL DESIGN PRODUCTION',
      description: 'Our team supports digital design implementation through dedicated resource assignment, working closely with clients to integrate design intent into practical, data-driven workflows. We provide focused expertise to ensure seamless execution from concept through delivery.',
    },
    {
      title: 'ASSET LIBRARY DEVELOPMENT',
      description: 'We digitize furniture, fixtures, equipment, and more into parametric, data-rich models designed for scheduling and cataloguing. Each model is built to specification based on end-user requirements and is ideally suited for integration into optimized digital twin workflows.',
    },
    {
      title: 'DIGITAL TWIN IMPLEMENTATION',
      description: 'Our digital twin implementations provide a reliable foundation for project planning and architectural resource tracking. These virtual environments deliver real-time insight, supporting smarter planning, coordination, and long-term asset management.',
    },
    {
      title: 'METADATA INCORPORATION',
      description: 'Combining point cloud and photographic information generated from the initial survey, the digital twin is enhanced through identifying, creating and tagging assets.',
    },
  ],
};

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('reality-capture');
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeTab !== 'reality-capture') return;

    video.muted = true;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    video.addEventListener('ended', handleEnded);

    const handlePlay = () => {
      if (video.muted) video.muted = true;
    };
    video.addEventListener('play', handlePlay);

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });
      hlsRef.current = hls;

      hls.loadSource(SOLUTIONS_VIDEO_HLS);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('[HLS] fatal network error – attempting recovery');
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('[HLS] fatal media error – attempting recovery');
              hls?.recoverMediaError();
              break;
            default:
              console.error('[HLS] fatal error – destroying instance');
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SOLUTIONS_VIDEO_HLS;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'reality-capture':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {realityCaptureContent.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        );

      case 'digital-production':
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
              {digitalProductionContent.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display text-sm font-semibold tracking-wide mb-3">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-base text-[var(--muted)] mt-6 lg:mt-4 lg:text-sm">
              Have a project in mind that's not listed here? Contact us with a description of your goals, and we'll assess how we can support your vision.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event('open-contact-drawer'))}
              className="mt-4 lg:mt-3 px-6 py-3 lg:py-2 bg-white border border-[var(--foreground)] text-[var(--foreground)] font-display text-sm font-medium tracking-wide hover:bg-[var(--foreground)] hover:text-white transition-colors"
            >
              CONTACT US
            </button>
          </div>
        );

      case 'equipment-software': {
        const logos = [
          { src: '/logo-navvis.png', alt: 'NavVis' },
          { src: '/logo-leica.png', alt: 'Leica' },
          { src: '/logo-faro.png', alt: 'FARO' },
          { src: '/logo-emesent.png', alt: 'Emesent' },
          { src: '/logo-xgrids.png', alt: 'XGRIDS' },
          { src: '/logo-revit.png', alt: 'Revit' },
        ];
        const hoveredInfo = hoveredCompany ? companyBlurbs[hoveredCompany] : null;
        
        return (
          <div className="flex flex-col gap-6 lg:gap-4">
            {/* Text description */}
            <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
              Our team employs a flexible, technology-agnostic approach, selecting scanning, registration, and UAV solutions based on project requirements. We work with LiDAR and SLAM systems from Leica, Emesent, FARO, XGRIDS, and NavVis, and register data within Revit, Archicad, and digital twin environments including TwinMaker, Omniverse, and Tandem. Open-format delivery in GLB and glTF, combined with UAV data capture using DJI drone technology, ensures compatibility across design, planning, and asset management workflows.
            </p>
            
            {/* Animation + Info Card */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:min-h-0">
              {/* Logo Animation */}
              <div className="lg:w-1/2 flex-shrink-0">
                <LogoRibbonSphere 
                  logos={logos} 
                  autoRotate={true} 
                  rotationSpeed={0.15}
                  onHoverChange={setHoveredCompany}
                />
              </div>
              
              {/* Company Info Card - Nutrition Label Style */}
              <div className="lg:w-1/2 flex items-center">
                <div 
                  className="w-full border-2 border-[var(--foreground)] bg-white p-4 transition-all duration-300"
                  style={{ minHeight: '140px' }}
                >
                  {hoveredInfo ? (
                    <>
                      <div className="border-b-4 border-[var(--foreground)] pb-2 mb-3">
                        <h4 className="font-display text-lg font-bold tracking-wide">
                          {hoveredInfo.name}
                        </h4>
                      </div>
                      <div className="border-b border-[var(--foreground)]/20 pb-2 mb-2">
                        <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-medium">
                          Partnership
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]">
                        {hoveredInfo.blurb}
                      </p>
                    </>
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center text-center">
                      <p className="text-sm text-[var(--muted)]">
                        Hover over a partner logo to learn more
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)]">
        <section className="mx-4 md:mx-8 my-6 md:my-10 lg:my-6 bg-[var(--surface)]">
          <div className="p-6 md:p-10 lg:p-6">
            {/* Page Title + Connect Button */}
            <div className="flex items-center justify-between mb-6 lg:mb-4">
              <h1 className="section-heading lg:text-xl">SOLUTIONS</h1>
              <button
                onClick={() => window.dispatchEvent(new Event('open-contact-drawer'))}
                className="bg-white text-[var(--foreground)] border-2 border-[var(--border-dark)] px-6 py-2 text-sm font-medium hover:bg-[var(--foreground)] hover:text-white transition-all"
              >
                LET&apos;S CONNECT
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[var(--border)] mb-6 lg:mb-4 overflow-x-auto">
              <nav className="flex gap-4 md:gap-8 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 font-display text-xs md:text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'font-bold border-b-2 border-[var(--foreground)]'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in mb-6 lg:mb-4 lg:flex-shrink-0" key={activeTab}>
              {renderContent()}
            </div>

            {/* Asset Image / Video - only show for non equipment-software tabs */}
            {activeTab !== 'equipment-software' && (
              <div className="w-full mt-auto lg:flex-1 lg:min-h-0">
                {activeTab === 'reality-capture' && (
                  <video
                    ref={videoRef}
                    poster="/solutions-hero.png"
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />
                )}
                {activeTab === 'digital-production' && (
                  <img
                    src="/digital-production-hero.png"
                    alt="3D BIM model of industrial facility"
                    className="w-full max-h-[280px] lg:max-h-[320px] object-contain"
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
