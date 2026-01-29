'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

type TabKey = 'about' | 'pilot-project' | 'conclusion';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'about', label: 'ABOUT' },
  { key: 'pilot-project', label: 'PILOT PROJECT' },
  { key: 'conclusion', label: 'CONCLUSION' },
];

const aboutContent = {
  whatIs: {
    title: 'WHAT IS A DIGITAL TWIN?',
    paragraphs: [
      'A Digital Twin is a virtual replica of a physical object or environment and its inherent assets and processes. It is a broad term that captures many items from individual pieces of equipment to entire cities. Fully realized they span the lifecycle of the object and use real-time data inputs from the environment through sensors to simulate the operations and functions of the space. It informs decision making, fault identification and opportunities for efficiency.',
      'Depending on the level of development, Digital Twins start with providing a description of a space through to predictive and prescriptive guidance. The steps of their creation follow through the path of design and development, data integration and connectivity, monitoring and analysis, visualization and simulation, and optimization.',
    ],
  },
  whyCreate: {
    title: 'WHY CREATE A DIGITAL TWIN?',
    bullets: [
      'Accurate baseline for future development or modifications',
      'Single source of truth providing insights to multiple stakeholders',
      'Improve performance in tracking assets and facility management',
      'Remote, predictive and prescriptive capabilities',
    ],
  },
};

const pilotProjectContent = {
  steps: [
    {
      step: 1,
      title: 'USE CASE',
      description: 'Start with identifying organizational priorities and cross reference that with the opportunities a digital twin provides. Select one use case that can deliver measurable value. It may be a partial zone of a space or a single object. Define what success looks like as a result and map the steps into a project schedule and execution plan.',
    },
    {
      step: 2,
      title: 'FOUNDATIONAL DATA',
      description: 'Identify the inputs that will feed the Digital Twin what it needs for success. This starts with a point cloud and can be layered with 3D Models, 2D details, asset libraries, IoT systems, sensor data and connecting to internal software systems. Coordinating mass inputs can be a blocker to begin with, restrict the use case to only the inputs required to achieve success.',
    },
    {
      step: 3,
      title: 'STAKEHOLDERS',
      description: 'Assign an individual or a team to manage the process. Most inputs will require internal organizational coordination to functionally connect all the data points. Identify if external partners may be necessary to realize success and engage them early. Once the team is whole, share them in on the execution plan and schedule and get started.',
    },
    {
      step: 4,
      title: 'ENGAGE',
      description: 'Start small by identifying the one aspect of your plan that can be fully realized and delivered. Engage the team, begin the process and monitor the development. Ensure the data points are connected, live and reporting correctly. Provide access to the hosting platform of choice to interact with the digital twin, and share it with the collaboration partners and stakeholders and flex the process to uncover defects or illuminate unknown synergies and insights.',
    },
    {
      step: 5,
      title: 'MEASURE SUCCESS AND COMMUNICATE VALUE',
      description: 'Start small by identifying the one aspect of your plan that can be fully realized and delivered. Engage the team, begin the process and monitor the development. Ensure the data points are connected, live and reporting correctly. Provide access to the hosting platform of choice to interact with the digital twin, and share it with the collaboration partners and stakeholders and flex the process to uncover defects or illuminate unknown synergies and insights.',
    },
  ],
};

const conclusionContent = {
  paragraph: 'Most companies will not have the internal resources to embark on a Digital Twin endeavor. 3D Model Management is specifically configured to provide the additional hands, equipment and knowledge base that will enable to you to start, to scale and to maximize your digital transformation process. Connect with us, early in the process, to help you define your successful Pilot Project.',
};

export default function StrategicAlliesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-8">
            {/* What is a Digital Twin */}
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                {aboutContent.whatIs.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutContent.whatIs.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Why Create */}
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                {aboutContent.whyCreate.title}
              </h3>
              <ul className="space-y-2">
                {aboutContent.whyCreate.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'pilot-project':
        return (
          <div className="space-y-8">
            {/* Steps 1-2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {pilotProjectContent.steps.slice(0, 2).map((step) => (
                <div key={step.step}>
                  <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                    STEP {step.step} - {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* First Asset */}
            <div className="w-full aspect-video md:aspect-[21/9] bg-[#DADADA] flex items-center justify-center">
              <span className="font-display font-bold text-[var(--foreground)]">Asset</span>
            </div>

            {/* Steps 3-5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {pilotProjectContent.steps.slice(2).map((step) => (
                <div key={step.step}>
                  <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                    STEP {step.step} - {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="max-w-3xl">
            <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
              {conclusionContent.paragraph}
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
        <section className="mx-4 md:mx-8 my-6 md:my-10 bg-[var(--surface)] min-h-[calc(100vh-var(--nav-height)-3rem)]">
          <div className="p-6 md:p-10">
            {/* Page Title */}
            <h1 className="section-heading mb-6">STRATEGIC ALLIES</h1>

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
