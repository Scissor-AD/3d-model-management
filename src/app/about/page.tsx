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
        <section className="min-h-[calc(100vh-var(--nav-height))]">
          <div className="p-6 md:p-10 lg:p-12 max-w-5xl">
            {/* About Us Section */}
            <div className="mb-12">
              <h2 className="font-display text-sm font-bold tracking-wide mb-6">ABOUT US</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <p className="text-sm text-[var(--foreground)] leading-relaxed text-justify">
                  3D Model Management is a solutions provider servicing the task of digitizing our environments. 
                  From ideation to virtual replica, we provide a vertically integrated solution from start to finish. 
                  With solutions for building, for operating, and for conservation among others, we provide a 
                  bespoke delivery tailored to fit.
                </p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed text-justify">
                  Our objective is to provide the framework and resources to achieve our clients goals. We achieve 
                  this through using our toolsets of hardware and software capabilities as well as our knowledge 
                  base of subject matter expertise and experience in delivering parallel results across industries.
                </p>
              </div>

              <h3 className="font-display text-sm font-bold tracking-wide mb-6">LOCATIONS</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium mb-1">NYC HQ:</p>
                  <p className="text-sm text-[var(--foreground)]">108 Bowery, Suite 3, New York, NY 10013</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Lower East Side:</p>
                  <p className="text-sm text-[var(--foreground)]">55 Canal Street, FL2, New York, NY 10002</p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="border-t border-[var(--border)] pt-10">
              <h2 className="font-display text-sm font-bold tracking-wide mb-6">CONTACT</h2>
              
              <p className="text-sm text-[var(--foreground)] mb-6 leading-relaxed">
                Complete the form below for a complimentary consultation or email us directly at{' '}
                <a 
                  href="mailto:info@3dmodelmanagement.com" 
                  className="underline hover:text-[var(--muted)] transition-colors"
                >
                  info@3dmodelmanagement.com
                </a>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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
        </section>
      </main>
    </div>
  );
}
