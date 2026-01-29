'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {digitalProductionContent.sections.map((section) => (
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
            <p className="text-base text-[var(--muted)] mt-8">
              Have a project in mind that's not listed here? Contact us with a description of your goals, and we'll assess how we can support your vision.
            </p>
          </div>
        );

      case 'equipment-software':
        const logos = [
          { src: '/logo-navvis.png', alt: 'NavVis', size: 'h-6 md:h-7' },
          { src: '/logo-leica.png', alt: 'Leica', size: 'h-8 md:h-10' },
          { src: '/logo-faro.png', alt: 'FARO', size: 'h-6 md:h-8' },
          { src: '/logo-emesent.png', alt: 'Emesent', size: 'h-28 md:h-44' },
          { src: '/logo-xgrids.png', alt: 'XGRIDS', size: 'h-28 md:h-44' },
          { src: '/logo-revit.png', alt: 'Revit', size: 'h-14 md:h-20' },
        ];
        return (
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Text content - left side on desktop */}
            <div className="md:w-1/2">
              <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                Our team employs a flexible, technology-agnostic approach, selecting scanning, registration, and UAV solutions based on project requirements. We work with LiDAR and SLAM systems from Leica, Emesent, FARO, XGRIDS, and NavVis, and register data within Revit, Archicad, and digital twin environments including TwinMaker, Omniverse, and Tandem. Open-format delivery in GLB and glTF, combined with UAV data capture using DJI drone technology, ensures compatibility across design, planning, and asset management workflows.
              </p>
            </div>
            {/* Logos carousel - right side on desktop, below on mobile */}
            <div className="md:w-1/2 flex items-center overflow-hidden">
              <div className="flex animate-scroll-logos">
                {/* First set of logos */}
                {logos.map((logo, i) => (
                  <div key={`logo-1-${i}`} className="flex-shrink-0 px-6 md:px-8 flex items-center">
                    <img src={logo.src} alt={logo.alt} className={`${logo.size} object-contain opacity-80 hover:opacity-100 transition-opacity`} />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {logos.map((logo, i) => (
                  <div key={`logo-2-${i}`} className="flex-shrink-0 px-6 md:px-8 flex items-center">
                    <img src={logo.src} alt={logo.alt} className={`${logo.size} object-contain opacity-80 hover:opacity-100 transition-opacity`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)]">
        <section className="mx-4 md:mx-8 my-6 md:my-10 bg-[var(--surface)] min-h-[calc(100vh-var(--nav-height)-3rem)]">
          <div className="p-6 md:p-10">
            {/* Page Title */}
            <h1 className="section-heading mb-6">SOLUTIONS</h1>

            {/* Tabs */}
            <div className="border-b border-[var(--border)] mb-6 overflow-x-auto">
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
            <div className="animate-fade-in mb-10" key={activeTab}>
              {renderContent()}
            </div>

            {/* Asset Image */}
            <div className="w-full mt-8">
              <img
                src={
                  activeTab === 'digital-production' 
                    ? '/digital-production-hero.png' 
                    : activeTab === 'equipment-software'
                    ? '/equipment-hero.png'
                    : '/solutions-hero.png'
                }
                alt={
                  activeTab === 'digital-production' 
                    ? '3D BIM model of industrial facility' 
                    : activeTab === 'equipment-software'
                    ? 'Laser scanner on tripod in industrial facility'
                    : '3D model scan of construction site with exposed roof trusses'
                }
                className={`w-full h-auto md:aspect-[21/9] ${
                  activeTab === 'digital-production'
                    ? 'object-contain aspect-[4/3] sm:aspect-video md:object-cover'
                    : 'object-cover aspect-[16/9] sm:aspect-video'
                }`}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
