'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [animationDone, setAnimationDone] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const autoScrollFired = useRef(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  // Measure real visible viewport (immune to CSS zoom issues) and size the wrapper.
  // With html { zoom: 0.8 }, CSS vh/innerHeight undercount the visible area.
  // Dividing by the zoom factor gives the correct CSS-pixel height to fill the screen.
  const syncWrapperHeight = useCallback(() => {
    if (heroWrapperRef.current) {
      const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const visibleHeight = Math.ceil(window.innerHeight / zoom);
      heroWrapperRef.current.style.height = `${visibleHeight}px`;
    }
  }, []);

  useEffect(() => {
    syncWrapperHeight();
    window.addEventListener('resize', syncWrapperHeight);
    return () => window.removeEventListener('resize', syncWrapperHeight);
  }, [syncWrapperHeight]);

  // Detect /#home hash — skip animation and scroll straight to hub
  useEffect(() => {
    if (window.location.hash === '#home') {
      setSkipAnimation(true);
      setAnimationDone(true);
      autoScrollFired.current = true; // don't auto-scroll on hash nav
      requestAnimationFrame(() => {
        const el = document.getElementById('home');
        if (el) window.scrollTo({ top: el.offsetTop, behavior: 'auto' });
      });
    }
  }, []);

  // Auto-scroll to hub 3.5 s after animation finishes (unless user scrolls first)
  useEffect(() => {
    if (!animationDone || autoScrollFired.current) return;
    autoScrollFired.current = true;

    const timer = setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);

    // Cancel auto-scroll if user initiates scroll / swipe
    const cancel = () => clearTimeout(timer);
    window.addEventListener('wheel', cancel, { once: true, passive: true });
    window.addEventListener('touchstart', cancel, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    };
  }, [animationDone]);

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        !animationDone ? 'h-screen overflow-hidden' : ''
      }`}
    >
      <Navigation />

      <main className="flex-1">
        {/* ── Hero Viewport Wrapper — clips to screen so hub never peeks ── */}
        <div ref={heroWrapperRef} className="overflow-hidden bg-white" style={{ height: '100vh' }}>
          <div className="pt-[var(--nav-height)] h-full">
            <section className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
              <div className="absolute inset-0 bg-white" />

              <HeroSection
                onComplete={() => setAnimationDone(true)}
                skipAnimation={skipAnimation}
              />

              {/* Scroll indicator — appears after animation finishes */}
              {animationDone && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
                  <button
                    onClick={() =>
                      document
                        .getElementById('home')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex flex-col items-center gap-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    aria-label="Scroll to explore"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase font-display font-medium">
                      EXPLORE
                    </span>
                    <svg
                      className="w-4 h-4 animate-bounce-subtle"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
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
