'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

type TabKey = 'about' | 'digital-twin' | 'case-study' | 'work-with-us';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'about', label: 'ABOUT' },
  { key: 'digital-twin', label: 'DIGITAL TWIN' },
  { key: 'case-study', label: 'CASE STUDY' },
  { key: 'work-with-us', label: 'WORK WITH US' },
];

const aboutContent = {
  intro: {
    title: '',
    paragraphs: [
      'We approach every engagement as a partnership, prioritizing long-term relationships over transactional work. By building trusted alliances with our clients and collaborators, we develop a deep understanding of operational needs, standards, and goals—allowing us to work more efficiently and proactively over time.',
      'This partnership-driven model results are faster service delivery, significant cost reductions and increased confidence in outcomes. Through consistency, alignment, and shared accountability, our team aims to support reliable execution and sustained value across projects.',
    ],
  },
  partners: {
    title: 'TECHNOLOGY PARTNERS',
    bullets: [
      'Leading laser scanning and reality capture hardware manufacturers',
      'Advanced point cloud processing and modeling software providers',
      'IoT and sensor integration specialists',
      'Cloud platform and data management solutions',
    ],
  },
};

const digitalTwinContent = {
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

type CaseStudySection = 'problem' | 'approach' | 'final-solution';

const caseStudySections: { key: CaseStudySection; label: string }[] = [
  { key: 'problem', label: 'PROBLEM' },
  { key: 'approach', label: 'APPROACH' },
  { key: 'final-solution', label: 'SOLUTION' },
];

const caseStudyContent = {
  problem: {
    title: 'PROBLEM',
    content: 'Start with identifying organizational priorities and cross reference that with the opportunities a digital twin provides. Select one use case that can deliver measurable value. It may be a partial zone of a space or a single object. Define what success looks like as a result and map the steps into a project schedule and execution plan.',
  },
  approach: {
    title: 'APPROACH',
    content: 'Identify the inputs that will feed the Digital Twin what it needs for success.  This starts with a point cloud and can be layered with 3D Models, 2D details, asset libraries, IoT systems, sensor data and connecting to internal software systems.  Coordinating mass inputs can be a blocker to begin with, restrict the use case to only the inputs required to achieve success.',
  },
  finalSolution: {
    title: 'SOLUTION',
    content: 'Assign an individual or a team to manage the process. Most inputs will require internal organizational coordination to functionally connect all the data points. Identify if external partners may be necessary to realize success and engage them early. Once the team is whole, share them in on the execution plan and schedule and get started.',
  },
};

const workWithUsContent = {
  intro: {
    paragraph: 'Embarking on a Digital Twin initiative can be challenging for organizations without dedicated internal resources. 3D Model Management is designed to provide the expertise, equipment, and support needed to help you start, scale, and maximize your digital transformation journey. By partnering with us early in the process, we can work together to define a clear, achievable Pilot Project that sets the foundation for long-term success.',
  },
};

export default function StrategicAlliesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [activeCaseStudySection, setActiveCaseStudySection] = useState<CaseStudySection | null>(null);
  const [caseStudyExpanded, setCaseStudyExpanded] = useState(false);
  const [contactDrawerOpen, setContactDrawerOpen] = useState(false);

  const handleTabClick = (tabKey: TabKey) => {
    if (tabKey === 'case-study') {
      setCaseStudyExpanded(!caseStudyExpanded);
      if (!caseStudyExpanded) {
        setActiveTab('case-study');
        setActiveCaseStudySection('problem'); // Default to first subsection
      }
    } else {
      setActiveTab(tabKey);
      setCaseStudyExpanded(false);
      setActiveCaseStudySection(null);
    }
  };

  const handleCaseStudySectionClick = (section: CaseStudySection) => {
    setActiveCaseStudySection(section);
    setActiveTab('case-study');
  };

  const getCurrentSectionIndex = () => {
    if (!activeCaseStudySection) return 0;
    return caseStudySections.findIndex(s => s.key === activeCaseStudySection);
  };

  const goToPrevSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      setActiveCaseStudySection(caseStudySections[currentIndex - 1].key);
    }
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < caseStudySections.length - 1) {
      setActiveCaseStudySection(caseStudySections[currentIndex + 1].key);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-8">
            {/* Intro */}
            <div>
              {aboutContent.intro.title && (
                <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                  {aboutContent.intro.title}
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutContent.intro.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                {aboutContent.partners.title}
              </h3>
              <ul className="space-y-2">
                {aboutContent.partners.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'digital-twin':
        return (
          <div className="space-y-8">
            {/* What is a Digital Twin */}
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                {digitalTwinContent.whatIs.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {digitalTwinContent.whatIs.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Why Create */}
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wide mb-4">
                {digitalTwinContent.whyCreate.title}
              </h3>
              <ul className="space-y-2">
                {digitalTwinContent.whyCreate.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Twin Asset - desktop: new visualization, mobile: current asset */}
            <div className="w-full aspect-[4/3] md:aspect-[2/1] overflow-hidden rounded-sm">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet="/strategic-allies-digital-twin-desktop.png?v=2"
                />
                <img
                  src="/digital-twin-asset.png"
                  alt="Digital Twin visualization showing a building with its virtual replica"
                  className="w-full h-full object-cover object-top"
                />
              </picture>
            </div>
          </div>
        );

      case 'case-study':
        const currentContent = activeCaseStudySection === 'problem' 
          ? caseStudyContent.problem.content 
          : activeCaseStudySection === 'approach' 
            ? caseStudyContent.approach.content 
            : caseStudyContent.finalSolution.content;
        
        const currentIndex = getCurrentSectionIndex();
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === caseStudySections.length - 1;
        
        return (
          <div className="space-y-8">
            {/* Content with navigation */}
            <div className="flex items-start justify-between gap-6">
              {/* Text content */}
              <div className="max-w-3xl">
                <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                  {currentContent}
                </p>
              </div>
              
              {/* Prev/Next Navigation - right aligned */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {/* Progress indicator */}
                <span className="text-xs font-display font-medium text-[var(--muted)] mr-2 hidden sm:inline">
                  {currentIndex + 1} / {caseStudySections.length}
                </span>
                
                {/* Previous button */}
                <button
                  onClick={goToPrevSection}
                  disabled={isFirst}
                  className={`group relative w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
                    isFirst 
                      ? 'border-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-40' 
                      : 'border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--surface)]'
                  }`}
                  aria-label="Previous section"
                >
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next button */}
                <button
                  onClick={goToNextSection}
                  disabled={isLast}
                  className={`group relative w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
                    isLast 
                      ? 'border-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-40' 
                      : 'border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--surface)]'
                  }`}
                  aria-label="Next section"
                >
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Asset placeholder for case study */}
            <div className="w-full aspect-[4/3] md:aspect-[2/1] bg-[#DADADA] flex items-center justify-center">
              <span className="font-display font-bold text-[var(--foreground)]">Asset</span>
            </div>
          </div>
        );

      case 'work-with-us':
        return (
          <div className="space-y-8">
            {/* Intro */}
            <div className="max-w-3xl">
              <p className="text-sm leading-relaxed text-[var(--foreground)] text-justify">
                {workWithUsContent.intro.paragraph}
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => setContactDrawerOpen(true)}
                className="btn-primary font-display text-sm tracking-wide"
              >
                GET IN TOUCH
              </button>
            </div>
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
          <div className="p-6 md:p-10 lg:p-8 lg:flex-1 lg:flex lg:flex-col lg:overflow-hidden">
            {/* Page Title */}
            <h1 className="section-heading mb-6">STRATEGIC ALLIES</h1>

            {/* Tabs */}
            <div className="border-b border-[var(--border)] mb-6">
              {/* Desktop: Main tabs with subsections right-aligned */}
              <nav 
                className="flex items-center justify-between"
              >
                {/* Main Tabs */}
                <div className="flex gap-4 md:gap-8 items-center">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => handleTabClick(tab.key)}
                      className={`pb-3 font-display text-xs md:text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
                        activeTab === tab.key
                          ? 'font-bold border-b-2 border-[var(--foreground)]'
                          : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Case Study Subsections - Desktop: right-aligned */}
                {caseStudyExpanded && (
                  <div className="hidden md:flex items-center gap-1">
                    {caseStudySections.map((section, idx) => (
                      <button
                        key={section.key}
                        onClick={() => handleCaseStudySectionClick(section.key)}
                        className={`pb-3 px-3 font-display text-sm font-medium tracking-wide transition-all whitespace-nowrap relative ${
                          activeCaseStudySection === section.key
                            ? 'text-[var(--foreground)]'
                            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        {section.label}
                        {activeCaseStudySection === section.key && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--foreground)]" />
                        )}
                        {idx < caseStudySections.length - 1 && (
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-3 bg-[var(--border)]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </nav>
            </div>

            {/* Mobile: Case Study Subsections as segmented control */}
            {caseStudyExpanded && (
              <div className="md:hidden mb-6 -mt-3">
                <div className="flex bg-[var(--surface-elevated)] rounded-full p-1 gap-1">
                  {caseStudySections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => handleCaseStudySectionClick(section.key)}
                      className={`flex-1 py-2 px-3 font-display text-xs font-medium tracking-wide transition-all whitespace-nowrap rounded-full ${
                        activeCaseStudySection === section.key
                          ? 'bg-[var(--foreground)] text-[var(--surface)]'
                          : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="animate-fade-in mb-10 lg:mb-0 lg:flex-1 lg:overflow-auto scrollbar-hide" key={activeTab}>
              {renderContent()}
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
                  <p className="text-sm text-[var(--surface)]/60 mt-1">Start your digital transformation journey</p>
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
