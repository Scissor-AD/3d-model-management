'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

type TabKey = 'reality-capture' | 'model-authoring' | 'staff-augmentation' | 'equipment-software';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'reality-capture', label: 'REALITY CAPTURE' },
  { key: 'model-authoring', label: 'MODEL AUTHORING' },
  { key: 'staff-augmentation', label: 'STAFF AUGMENTATION' },
  { key: 'equipment-software', label: 'EQUIPMENT + SOFTWARE' },
];

const realityCaptureContent = {
  sections: [
    {
      title: 'LASER SCANNING',
      description: 'Our team works interchangeably with Leica and NavVis equipment depending on the task. Combining LiDAR and SLAM technologies provides the accuracy and scalability as required. Servicing all industries and sectors, previous projects have ranged between 500 to 20M square feet.',
    },
    {
      title: 'PHOTOGRAMMETRY',
      description: 'High fidelity optics and algorithms allow us to digitize space pixel by pixel. With both terrestrial and aerial capabilities we can capture both intricate details and mass volumetric studies. Primarily serving the conservation and asset cataloging sectors.',
    },
  ],
};

const modelAuthoringContent = {
  sections: [
    {
      title: 'SCAN TO BIM',
      description: 'Using the point clouds from our scanning process, we generate intelligent models built to spec. Typically using Revit, we create a building information model starting with a base existing conditions model through to predictive and connected digital twins. We provide a solution to all sectors and customize to suit.',
    },
    {
      title: 'SCAN TO CAD',
      description: 'This service is in reality a Scan to BIM to CAD process which ensures the accuracy of our 2D outputs. Multiple formats available and adaptable to suit client internal drawings standards.',
    },
    {
      title: 'LIBRARY DEVELOPMENT',
      description: 'Digitizing furniture, fixtures, equipment and more with built in parametric flexibility and data rich models ready for scheduling and cataloging. Built on spec based on the end user requirements, perfectly paired for digital twin optimization.',
    },
    {
      title: 'TEMPLATE DEVELOPMENT',
      description: 'Start from scratch or further enhance existing Revit templates to dial in on internal workflows.',
    },
    {
      title: 'ASSET TAGGING',
      description: 'Combining point cloud and photographic information generated from the initial survey, the digital twin is enhanced through identifying, creating and tagging assets.',
    },
  ],
};

const staffAugmentationContent = {
  sections: [
    {
      title: 'TEMPORARY CONTRACTORS',
      description: 'Short term contracts to allow us to work alongside your team and contribute to your goals through time and effort based arrangement to allow for better financial optimization and flexibility.',
    },
  ],
};

const equipmentSoftwareContent = {
  sections: [
    {
      title: 'LiDAR',
      items: ['Leica RTC360', 'Leica BLK2GO', 'LEICA BLK360', 'NAVVIS VLX3'],
    },
    {
      title: 'REGISTRATION',
      items: ['LEICA REGISTER 360', 'NAVVIS IVION'],
    },
    {
      title: 'UAV',
      items: ['DJI Technology DRONE SUITE'],
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

      case 'model-authoring':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {modelAuthoringContent.sections.map((section) => (
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

      case 'staff-augmentation':
        return (
          <div className="max-w-xl">
            {staffAugmentationContent.sections.map((section) => (
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

      case 'equipment-software':
        return (
          <div className="space-y-6">
            {equipmentSoftwareContent.sections.map((section) => (
              <div key={section.title}>
                <p className="text-sm text-[var(--muted)] mb-2">
                  <span className="font-semibold">{section.title}:</span>{' '}
                  {section.items?.join(', ')}
                </p>
              </div>
            ))}
            <p className="text-sm text-[var(--muted)] mt-6">
              Depending on the project, we deploy the technology combination that best suits the scope.
            </p>
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
        <section className="border-l-4 border-[var(--border-dark)] mx-4 md:mx-8 my-6 md:my-10 bg-[var(--surface)] min-h-[calc(100vh-var(--nav-height)-3rem)]">
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

            {/* Asset Placeholder */}
            <div className="w-full aspect-video md:aspect-[21/9] bg-[#DADADA] flex items-center justify-center mt-8">
              <span className="font-display font-bold text-[var(--foreground)]">Asset</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
