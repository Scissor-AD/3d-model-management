'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'SOLUTIONS', href: '/solutions' },
  { label: 'STRATEGIC ALLIES', href: '/strategic-allies' },
  { label: 'ABOUT US', href: '/about' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ENGLISH');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]">
      <nav className="flex items-center justify-between px-6 md:px-12 h-[var(--nav-height)] border-b-2 border-[var(--border-dark)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 relative">
            {/* 3D Cube Logo */}
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M24 4L24 24M24 24L44 14M24 24L4 14M24 24V44" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 9L34 19V39" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
            </svg>
          </div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight">3D MM</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium tracking-wide link-hover"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Language Selector & Mobile Menu Button */}
        <div className="flex items-center gap-6">
          {/* Language Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 font-body text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {language}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:rotate-180">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white border-2 border-[var(--border-dark)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {['ENGLISH', 'ESPAÑOL', 'FRANÇAIS'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="block w-full px-4 py-2 text-left font-body text-sm hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[var(--nav-height)] bg-[var(--background)] z-40 animate-fade-in">
          <div className="flex flex-col p-6">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-display text-3xl font-bold py-4 border-b border-[var(--border)] animate-fade-in-up stagger-${index + 1}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

