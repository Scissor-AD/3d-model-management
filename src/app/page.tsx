'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ControlBar from '@/components/ControlBar';
import HeroSection from '@/components/HeroSection';

const hubCards = [
  {
    index: '01',
    title: 'SOLUTIONS',
    subtitle: 'Reality Capture · Digital Production · Equipment',
    description:
      'From laser scanning to intelligent BIM models and digital twins, we deliver comprehensive 3D digitization solutions for projects ranging from 500 to 20 million square feet.',
    href: '/solutions',
    cta: 'EXPLORE SOLUTIONS',
  },
  {
    index: '02',
    title: 'STRATEGIC ALLIES',
    subtitle: 'Partnerships · Digital Twins · Case Studies',
    description:
      'We build trusted, long-term alliances focused on digital transformation. Our partnership-driven model delivers faster service, cost reductions, and increased confidence in outcomes.',
    href: '/strategic-allies',
    cta: 'LEARN MORE',
  },
  {
    index: '03',
    title: 'ABOUT US',
    subtitle: 'New York · Jacksonville · Seattle · Córdoba',
    description:
      'Our global team of scanning and modeling experts delivers across industries with a commitment to precision, innovation, and on-time delivery.',
    href: '/about',
    cta: 'GET IN TOUCH',
  },
];

export default function Home() {
  // Scroll to hub when opening with /#home
  useEffect(() => {
    if (window.location.hash === '#home') {
      requestAnimationFrame(() => {
        const el = document.getElementById('home');
        if (el) window.scrollTo({ top: el.offsetTop, behavior: 'auto' });
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        {/* Hero — fills viewport so "WHAT WE DO" is below the fold (accounts for zoom/large screens) */}
        <div className="min-h-[100dvh] h-[100dvh] overflow-hidden bg-white hero-first-screen">
          <div className="pt-[var(--nav-height)] h-[calc(100dvh-var(--nav-height))] min-h-0 relative flex flex-col">
            <section className="relative flex-1 min-h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
              <div className="absolute inset-0 bg-white pointer-events-none" aria-hidden />

              <HeroSection />
            </section>
          </div>
        </div>

        {/* ── Home Hub Section ──────────────────────────── */}
        <section id="home" className="relative bg-white border-t border-[var(--border)]">
          <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-36 py-20 md:py-28 lg:py-32">
            {/* Header */}
            <div className="mb-16 md:mb-20">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                WHAT WE DO
              </h2>
              <div className="mt-3 w-16 h-0.5 bg-[var(--foreground)]" />
              <p className="mt-6 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
                End-to-end 3D digitization services from reality capture to
                digital twin implementation, serving all industries and project
                scales.
              </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {hubCards.map((card) => (
                <Link
                  key={card.index}
                  href={card.href}
                  className="group relative border-2 border-[var(--border-dark)] p-8 md:p-10 bg-white hover:bg-[var(--foreground)] transition-all duration-500 flex flex-col min-h-[320px]"
                >
                  {/* Large index number */}
                  <span className="font-display text-6xl md:text-7xl font-bold text-[var(--surface-elevated)] group-hover:text-white/10 transition-colors duration-500 leading-none select-none">
                    {card.index}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg md:text-xl font-bold tracking-wide mt-4 group-hover:text-white transition-colors duration-500">
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[11px] tracking-[0.15em] text-[var(--muted)] mt-2 group-hover:text-white/50 transition-colors duration-500 uppercase">
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[var(--foreground)] mt-6 group-hover:text-white/80 transition-colors duration-500 flex-1">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-8 flex items-center gap-2">
                    <span className="font-display text-xs font-medium tracking-wide group-hover:text-white transition-colors duration-500">
                      {card.cta}
                    </span>
                    <svg
                      className="w-4 h-4 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 md:mt-24 pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight">
                  Ready to digitize your built environment?
                </h3>
                <p className="text-sm text-[var(--muted)] mt-2">
                  Contact us for a complimentary consultation
                </p>
              </div>
              <button
                onClick={() =>
                  window.dispatchEvent(new Event('open-contact-drawer'))
                }
                className="btn-primary font-display text-sm tracking-wide whitespace-nowrap flex-shrink-0"
              >
                LET&apos;S CONNECT
              </button>
            </div>
          </div>
        </section>
      </main>

      <ControlBar />
    </div>
  );
}
