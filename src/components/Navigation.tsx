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

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-6">
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
            
            {/* Legal Section */}
            <div className="mt-8 pt-6 border-t border-[var(--border-dark)]">
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
      )}
    </header>
  );
}

