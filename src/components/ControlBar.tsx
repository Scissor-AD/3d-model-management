'use client';

import { useState } from 'react';
import IntakeFormWizard from './IntakeFormWizard';

const infoLinks = [
  { label: 'TEAMS', href: '/teams' },
  { label: 'ALLIED', href: '/allied' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'LINK', href: '/link' },
];

const services = [
  {
    id: 'service1',
    title: 'LASER SCANNING',
    description: 'Our team works interchangeably with Leica and NavVis Equipment for comprehensive reality capture solutions.',
    link: '/services/laser-scanning',
  },
  {
    id: 'service2',
    title: 'BIM MODELING',
    description: 'Full Building Information Modeling services including LOD 100-500 deliverables for all project phases.',
    link: '/services/bim-modeling',
  },
  {
    id: 'service3',
    title: 'POINT CLOUD PROCESSING',
    description: 'High-precision point cloud registration, cleanup, and conversion to usable formats.',
    link: '/services/point-cloud',
  },
  {
    id: 'service4',
    title: 'AS-BUILT DOCUMENTATION',
    description: 'Accurate as-built drawings and 3D models from existing conditions surveys.',
    link: '/services/as-built',
  },
];

export default function ControlBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <>
      {/* Backdrop for mobile when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className={`control-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Mobile Drag Handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <button 
            onClick={toggleExpand}
            className="w-12 h-1.5 bg-[var(--muted)] rounded-full opacity-40"
            aria-label="Toggle control bar"
          />
        </div>

        {/* Control Bar Header - Always Visible */}
        <div className={`flex items-center border-b border-[var(--border)] ${isExpanded ? 'hidden md:flex' : 'flex'}`}>
          {/* Desktop: Show all sections in header */}
          <div className="hidden md:flex flex-1">
            <div className="flex-1 px-4 py-4 border-r border-[var(--border)]">
              <span className="font-display text-sm font-bold">INFO</span>
            </div>
            <div className="flex-1 px-4 py-4 border-r border-[var(--border)]">
              <span className="font-display text-sm font-bold">LEGAL</span>
            </div>
            <div className="flex-1 px-4 py-4 border-r border-[var(--border)]">
              <span className="font-display text-sm font-bold">SERVICES</span>
            </div>
            <button
              onClick={toggleExpand}
              className="flex-[1.5] px-4 py-4 flex items-center justify-between hover:bg-[var(--surface-elevated)] transition-colors text-left"
            >
              <span className="font-display text-sm font-bold underline">REQUEST MORE INFORMATION:</span>
              <span className="text-xl font-light">{isExpanded ? '−' : '+'}</span>
            </button>
          </div>

          {/* Mobile: Simple toggle */}
          <button
            onClick={toggleExpand}
            className="md:hidden flex-1 flex items-center justify-between px-4 py-2"
          >
            <span className="font-display text-sm font-bold">REQUEST INFORMATION</span>
            <span className="text-xl">{isExpanded ? '−' : '+'}</span>
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="flex flex-col md:flex-row h-[calc(100%-60px)] md:h-[calc(100%-50px)] overflow-hidden">
            {/* INFO Section - Desktop only */}
            <div className="hidden md:block flex-1 border-r border-[var(--border)] p-4 overflow-y-auto">
              <nav className="space-y-2">
                {infoLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block font-body text-sm hover:text-[var(--muted)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* LEGAL Section - Desktop only */}
            <div className="hidden md:block flex-1 border-r border-[var(--border)] p-4 overflow-y-auto">
              <nav className="space-y-2">
                <a href="/privacy" className="block font-body text-sm hover:text-[var(--muted)] transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block font-body text-sm hover:text-[var(--muted)] transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="block font-body text-sm hover:text-[var(--muted)] transition-colors">
                  Cookie Policy
                </a>
              </nav>
            </div>

            {/* SERVICES Section - Desktop only */}
            <div className="hidden md:block flex-1 border-r border-[var(--border)] p-4 overflow-y-auto">
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service.id}>
                    <button
                      onClick={() => toggleService(service.id)}
                      className="flex items-center gap-2 font-body text-sm font-medium w-full text-left hover:text-[var(--muted)] transition-colors"
                    >
                      <span className="w-4">{expandedService === service.id ? '−' : '+'}</span>
                      <span className="underline">{service.title}</span>
                    </button>
                    {expandedService === service.id && (
                      <div className="ml-6 mt-2 mb-3 animate-fade-in">
                        <p className="text-xs text-[var(--muted)] mb-2 leading-relaxed">
                          {service.description}
                        </p>
                        <a
                          href={service.link}
                          className="text-xs font-medium underline hover:text-[var(--muted)] transition-colors"
                        >
                          SEE MORE
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Additional Info Box */}
              <div className="mt-4 p-3 bg-[var(--accent)] text-white">
                <p className="text-xs leading-relaxed">
                  Additional information about Services
                </p>
              </div>
            </div>

            {/* Form Section - Full width on mobile */}
            <div className="flex-1 md:flex-[1.5] p-4 pb-6 overflow-y-auto bg-[var(--surface)]">
              <IntakeFormWizard />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

