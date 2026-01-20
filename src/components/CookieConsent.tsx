'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] animate-fade-in-up">
      <div className="bg-[var(--foreground)] text-[var(--background)] px-4 py-4 md:px-8 md:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm leading-relaxed flex-1">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
            <Link 
              href="/cookies" 
              className="underline hover:opacity-80 transition-opacity"
            >
              Learn more
            </Link>
          </p>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium border border-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors"
            >
              DECLINE
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-[var(--background)] text-[var(--foreground)] hover:opacity-90 transition-opacity"
            >
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
