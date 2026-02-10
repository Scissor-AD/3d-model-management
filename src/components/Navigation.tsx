'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
  
  // Hide "Let's Connect" button on About and Strategic Allies pages
  const hideConnectButton = pathname === '/about' || pathname === '/strategic-allies' || pathname === '/solutions';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    signUpForNews: false,
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        signUpForNews: false,
        subject: '',
        message: '',
      });
      setSubmitStatus('idle');
      setIsContactDrawerOpen(false);
    }, 2000);
  };

  const openContactDrawer = () => {
    setIsMobileMenuOpen(false);
    setIsContactDrawerOpen(true);
  };

  // Allow any page to open the contact drawer via a custom event
  useEffect(() => {
    const handler = () => setIsContactDrawerOpen(true);
    window.addEventListener('open-contact-drawer', handler);
    return () => window.removeEventListener('open-contact-drawer', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]">
      <nav className="flex items-center justify-between px-6 md:px-12 h-[var(--nav-height)] border-b-2 border-[var(--border-dark)]">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/3dmm-logo.svg"
            alt="3DMM Logo"
            width={160}
            height={40}
            priority
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation - Right justified */}
        <div className="hidden lg:flex items-center gap-12 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium tracking-wide link-hover"
            >
              {item.label}
            </Link>
          ))}
          {!hideConnectButton && (
            <button
              onClick={openContactDrawer}
              className="bg-white text-[var(--foreground)] border-2 border-[var(--border-dark)] px-6 py-2 text-sm font-medium hover:bg-[var(--foreground)] hover:text-white transition-all"
            >
              LET&apos;S CONNECT
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-6 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <span className="w-6 h-0.5 bg-current transition-all" />
            ) : (
              <>
                <span className="w-6 h-0.5 bg-current transition-all" />
                <span className="w-6 h-0.5 bg-current transition-all" />
              </>
            )}
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
            
            {/* Let's Connect */}
            {!hideConnectButton && (
              <button
                onClick={openContactDrawer}
                className="mt-6 bg-white text-[var(--foreground)] border-2 border-[var(--border-dark)] px-6 py-3 text-sm font-medium hover:bg-[var(--foreground)] hover:text-white transition-all w-full"
                style={{ animationDelay: `${(navItems.length + 1) * 0.05}s` }}
              >
                LET&apos;S CONNECT
              </button>
            )}
            
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

      {/* Contact Drawer */}
      {isContactDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsContactDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--background)] z-50 shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-sm font-bold tracking-wide">CONTACT</h2>
                <button
                  onClick={() => setIsContactDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                  aria-label="Close drawer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-[var(--foreground)] mb-6 leading-relaxed">
                Complete the form below for a complimentary consultation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="drawer-firstName" className="block text-sm text-[var(--muted)] mb-2">
                      First Name (Required)
                    </label>
                    <input
                      type="text"
                      id="drawer-firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="drawer-lastName" className="block text-sm text-[var(--muted)] mb-2">
                      Last Name (Required)
                    </label>
                    <input
                      type="text"
                      id="drawer-lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="drawer-email" className="block text-sm text-[var(--muted)] mb-2">
                    Email (Required)
                  </label>
                  <input
                    type="email"
                    id="drawer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="drawer-subject" className="block text-sm text-[var(--muted)] mb-2">
                    Subject (Required)
                  </label>
                  <input
                    type="text"
                    id="drawer-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="drawer-message" className="block text-sm text-[var(--muted)] mb-2">
                    Message (Required)
                  </label>
                  <textarea
                    id="drawer-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors resize-none"
                  />
                </div>

                {/* Newsletter Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="drawer-signUpForNews"
                    name="signUpForNews"
                    checked={formData.signUpForNews}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-[var(--border)] accent-[var(--foreground)]"
                  />
                  <label htmlFor="drawer-signUpForNews" className="text-sm text-[var(--muted)]">
                    Sign up for news and updates
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : submitStatus === 'success' ? 'SUBMITTED!' : 'SUBMIT'}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

