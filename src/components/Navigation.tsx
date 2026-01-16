'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'SOLUTIONS', href: '/solutions' },
  { label: 'STRATEGIC ALLIES', href: '/strategic-allies' },
  { label: 'ABOUT US', href: '/about' },
];

const infoLinks = [
  { label: 'TEAMS', href: '/teams' },
  { label: 'ALLIED', href: '/allied' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'LINK', href: '/link' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ENGLISH');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]">
      <nav className="flex items-center justify-between px-6 md:px-12 h-[var(--nav-height)] border-b-2 border-[var(--border-dark)]">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/3d_mm_logo.svg"
            alt="3D MM Logo"
            width={123}
            height={39}
            priority
            className="h-8 md:h-10 w-auto"
          />
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
          {/* Language Dropdown - Hidden for now, will implement fully later */}
          <div className="relative group hidden">
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
        <div className="lg:hidden fixed inset-0 top-[var(--nav-height)] bg-[var(--background)] z-40 overflow-y-auto">
          <div className="flex flex-col p-6">
            {/* Main Navigation */}
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold py-4 border-b border-[var(--border)] text-[var(--foreground)]"
                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Info & Legal Section */}
            <div className="mt-8 pt-6 border-t border-[var(--border-dark)]">
              <div className="grid grid-cols-2 gap-8">
                {/* Info Links */}
                <div>
                  <h3 className="font-display text-sm font-bold mb-4 text-[var(--muted)]">INFO</h3>
                  <nav className="space-y-3">
                    {infoLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-body text-sm hover:text-[var(--muted)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                {/* Legal Links */}
                <div>
                  <h3 className="font-display text-sm font-bold mb-4 text-[var(--muted)]">LEGAL</h3>
                  <nav className="space-y-3">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-body text-sm hover:text-[var(--muted)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

