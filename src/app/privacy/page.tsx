import Navigation from '@/components/Navigation';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col lg:overflow-hidden">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)] lg:h-[calc(100vh-var(--nav-height))] lg:overflow-hidden">
        <section className="mx-4 md:mx-8 my-6 md:my-10 lg:my-6 bg-[var(--surface)] lg:h-[calc(100vh-var(--nav-height)-3rem)] lg:overflow-hidden">
          <div className="p-6 md:p-10 lg:p-8 max-w-4xl lg:h-full lg:overflow-y-auto">
            <h1 className="section-heading mb-8">PRIVACY POLICY</h1>
            
            <p className="text-sm text-[var(--muted)] mb-8">Last updated: January 2026</p>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-base font-bold mb-4">1. Information We Collect</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                  We collect information you provide directly to us, such as when you fill out a contact form, 
                  request a consultation, or communicate with us. This may include your name, email address, 
                  phone number, company name, and any other information you choose to provide.
                </p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  We also automatically collect certain information when you visit our website, including your 
                  IP address, browser type, operating system, referring URLs, and information about how you 
                  interact with our website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Respond to your inquiries and provide customer service
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Send you information about our services, updates, and promotional materials
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Improve and optimize our website and services
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Comply with legal obligations
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">3. Information Sharing</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as necessary to provide our services or as required by law. 
                  We may share information with trusted service providers who assist us in operating our 
                  website and conducting our business.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">4. Data Security</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  We implement appropriate technical and organizational measures to protect the security 
                  of your personal information. However, no method of transmission over the Internet or 
                  electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">5. Your Rights</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  You have the right to access, correct, or delete your personal information. You may also 
                  opt out of receiving marketing communications from us at any time. To exercise these rights, 
                  please contact us at info@3dmodelmanagement.com.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">6. Contact Us</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  If you have any questions about this Privacy Policy, please contact us at:<br />
                  <span className="font-medium">3D Model Management</span><br />
                  108 Bowery, Suite 3, New York, NY 10013<br />
                  info@3dmodelmanagement.com
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
