'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Logo3DCarouselThree from '@/components/Logo3DCarouselThree';

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
  { src: '/logo-emesent.png', alt: 'Emesent' },
  { src: '/logo-xgrids.png', alt: 'XGRIDS' },
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
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
              {digitalProductionContent.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display text-sm font-semibold tracking-wide mb-2 lg:mb-1">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify lg:text-xs lg:leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-base text-[var(--muted)] mt-6 lg:mt-4 lg:text-sm">
              Have a project in mind that's not listed here? Contact us with a description of your goals, and we'll assess how we can support your vision.
            </p>
            <button
              onClick={() => setContactDrawerOpen(true)}
              className="mt-4 lg:mt-3 px-6 py-3 lg:py-2 bg-white border border-[var(--foreground)] text-[var(--foreground)] font-display text-sm font-medium tracking-wide hover:bg-[var(--foreground)] hover:text-white transition-colors"
            >
              CONTACT US
            </button>
          </div>
        );

      case 'equipment-software':
        return (
          <div>
            <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
              Our team employs a flexible, technology-agnostic approach, selecting scanning, registration, and UAV solutions based on project requirements. We work with LiDAR and SLAM systems from Leica, Emesent, FARO, XGRIDS, and NavVis, and register data within Revit, Archicad, and digital twin environments including TwinMaker, Omniverse, and Tandem. Open-format delivery in GLB and glTF, combined with UAV data capture using DJI drone technology, ensures compatibility across design, planning, and asset management workflows.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col lg:overflow-hidden">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)] lg:h-[calc(100vh-var(--nav-height))] lg:overflow-hidden">
        <section className="mx-4 md:mx-8 my-6 md:my-10 lg:my-6 bg-[var(--surface)] min-h-[calc(100vh-var(--nav-height)-3rem)] lg:h-[calc(100vh-var(--nav-height)-3rem)] lg:overflow-hidden lg:flex lg:flex-col">
          <div className="p-6 md:p-10 lg:p-6 lg:flex-1 lg:flex lg:flex-col lg:overflow-hidden">
            {/* Page Title */}
            <h1 className="section-heading mb-6 lg:mb-4 lg:text-xl">SOLUTIONS</h1>

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

            {/* Asset Image / Video */}
            <div className="w-full mt-auto lg:flex-1 lg:min-h-0">
              {activeTab === 'reality-capture' && (
                <video
                  src="/solutions-hero.mp4"
                  poster="/solutions-hero.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-auto md:aspect-[21/9] lg:h-full lg:max-h-full object-cover aspect-[16/9] sm:aspect-video lg:object-contain"
                />
              )}
              {activeTab === 'digital-production' && (
                <img
                  src="/digital-production-hero.png"
                  alt="3D BIM model of industrial facility"
                  className="w-full h-auto md:aspect-[21/9] lg:h-full lg:max-h-full object-cover aspect-[16/9] sm:aspect-video lg:object-contain"
                />
              )}
              {activeTab === 'equipment-software' && (
                <div className="w-full h-full lg:min-h-0 flex items-center justify-center">
                  <Logo3DCarouselThree logos={equipmentLogos} autoRotate={true} rotationSpeed={0.3} className="lg:h-full" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Contact Drawer */}
      {contactDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setContactDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            {/* Drag indicator */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>
            
            <div className="bg-[var(--foreground)] text-[var(--surface)] rounded-t-3xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold tracking-wide">LET&apos;S CONNECT</h2>
                  <p className="text-sm text-[var(--surface)]/60 mt-1">Tell us about your project</p>
                </div>
                <button
                  onClick={() => setContactDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-white/10 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
              
              {/* Content */}
              <div className="px-6 md:px-10 pb-8 md:pb-10 max-h-[70vh] overflow-y-auto">
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setContactDrawerOpen(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-display font-medium tracking-wider mb-2 text-[var(--surface)]/60">NAME</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-[var(--surface)] text-sm placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display font-medium tracking-wider mb-2 text-[var(--surface)]/60">COMPANY</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-[var(--surface)] text-sm placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-display font-medium tracking-wider mb-2 text-[var(--surface)]/60">EMAIL</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-[var(--surface)] text-sm placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display font-medium tracking-wider mb-2 text-[var(--surface)]/60">PHONE</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 text-[var(--surface)] text-sm placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-colors"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-display font-medium tracking-wider mb-2 text-[var(--surface)]/60">MESSAGE</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-[var(--surface)] text-sm placeholder:text-white/40 focus:border-white/40 focus:bg-white/15 transition-colors min-h-[100px] resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[var(--surface)] text-[var(--foreground)] font-display text-sm font-semibold tracking-wide py-4 px-6 hover:bg-[var(--surface)]/90 transition-colors"
                    >
                      SEND MESSAGE
                    </button>
                    <a
                      href="mailto:contact@3dmodelmanagement.com"
                      className="flex-1 border border-white/30 text-[var(--surface)] font-display text-sm font-medium tracking-wide py-4 px-6 text-center hover:bg-white/10 transition-colors"
                    >
                      EMAIL DIRECTLY
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
