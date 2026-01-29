'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
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
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
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
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)]">
        <section className="min-h-[calc(100vh-var(--nav-height))] flex flex-col">
          {/* Desktop: Two-column layout, Mobile: Single column */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* About Us - Right on desktop, First on mobile */}
            <div className="p-6 md:p-10 lg:p-12 lg:w-1/2 lg:order-2">
              <h2 className="font-display text-sm font-bold tracking-wide mb-6">ABOUT US</h2>
              
              <div className="space-y-6">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  3D Model Management (3DMM), a technology-driven consultancy delivering large-scale reality capture, spatial data, and BIM advisory services to the AEC and owner-operator market. Built the firm to serve organizations that rely on accurate, scalable spatial intelligence to coordinate, manage, and optimize complex physical environments.
                </p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  3DMM specializes in fast, high-fidelity reality capture and enterprise-grade BIM strategy for non-traditional clients, including portfolio-scale owner-operators and high-growth organizations seeking to leverage design technology for improved decision-making, cost efficiency, and operational insight. The practice focuses on translating spatial data into actionable intelligence. Supporting footprint optimization, program standardization, and data-driven capital planning across diverse building typologies.
                </p>
              </div>
            </div>

            {/* Contact Form - Left on desktop, Second on mobile */}
            <div className="p-6 md:p-10 lg:p-12 lg:w-1/2 lg:order-1 lg:border-r lg:border-[var(--border)] border-t lg:border-t-0 border-[var(--border)]">
              <h2 className="font-display text-sm font-bold tracking-wide mb-6">CONTACT</h2>
              
              <p className="text-sm text-[var(--foreground)] mb-6 leading-relaxed">
                Complete the form below for a complimentary consultation or email us directly at{' '}
                <a 
                  href="mailto:info@3dmodelmanagement.co" 
                  className="underline hover:text-[var(--muted)] transition-colors"
                >
                  info@3dmodelmanagement.co
                </a>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-[var(--muted)] mb-2">
                      First Name (Required)
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-[var(--muted)] mb-2">
                      Last Name (Required)
                    </label>
                    <input
                      type="text"
                      id="lastName"
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
                  <label htmlFor="email" className="block text-sm text-[var(--muted)] mb-2">
                    Email (Required)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-[var(--muted)] mb-2">
                    Subject (Required)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] bg-transparent text-sm focus:border-[var(--foreground)] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-[var(--muted)] mb-2">
                    Message (Required)
                  </label>
                  <textarea
                    id="message"
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
                    id="signUpForNews"
                    name="signUpForNews"
                    checked={formData.signUpForNews}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-[var(--border)] accent-[var(--foreground)]"
                  />
                  <label htmlFor="signUpForNews" className="text-sm text-[var(--muted)]">
                    Sign up for news and updates
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : submitStatus === 'success' ? 'SUBMITTED!' : 'SUBMIT'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer - Locations & Legal */}
          <div className="border-t border-[var(--border)] p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div>
              <h3 className="font-display text-sm font-bold tracking-wide mb-4">LOCATIONS</h3>
              <p className="text-sm text-[var(--foreground)]">
                New York | Jacksonville | Seattle | Cordoba
              </p>
            </div>
            <div className="lg:text-right">
              <h3 className="font-display text-sm font-bold tracking-wide mb-4">LEGAL</h3>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <a href="/privacy" className="text-sm text-[var(--foreground)] hover:text-[var(--muted)] transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-sm text-[var(--foreground)] hover:text-[var(--muted)] transition-colors">Terms of Service</a>
                <a href="/cookies" className="text-sm text-[var(--foreground)] hover:text-[var(--muted)] transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
