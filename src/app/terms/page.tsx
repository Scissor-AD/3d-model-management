import Navigation from '@/components/Navigation';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)]">
        <section className="mx-4 md:mx-8 my-6 md:my-10 bg-[var(--surface)]">
          <div className="p-6 md:p-10 max-w-4xl">
            <h1 className="section-heading mb-8">TERMS OF SERVICE</h1>
            
            <p className="text-sm text-[var(--muted)] mb-8">Last updated: January 2026</p>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-base font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  By accessing and using the 3D Model Management website and services, you accept and agree 
                  to be bound by these Terms of Service. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">2. Description of Services</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  3D Model Management provides professional 3D scanning, modeling, and digital twin services 
                  including but not limited to laser scanning, photogrammetry, BIM modeling, CAD services, 
                  and related consulting. The specific scope of services will be defined in individual 
                  project agreements.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">3. Intellectual Property</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                  All content on this website, including text, graphics, logos, and software, is the property 
                  of 3D Model Management and is protected by intellectual property laws. You may not reproduce, 
                  distribute, or create derivative works without our express written permission.
                </p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  Ownership of deliverables created for clients will be transferred upon full payment as 
                  specified in individual project agreements.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">4. User Responsibilities</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Provide accurate and complete information
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Use our services only for lawful purposes
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Not interfere with the proper functioning of our website
                  </li>
                  <li className="text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--foreground)] rounded-full flex-shrink-0" />
                    Maintain the confidentiality of any account credentials
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  3D Model Management shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising from your use of our services. Our total liability shall not 
                  exceed the amount paid by you for the specific services giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">6. Indemnification</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  You agree to indemnify and hold harmless 3D Model Management, its officers, directors, 
                  employees, and agents from any claims, damages, or expenses arising from your use of 
                  our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">7. Modifications</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  We reserve the right to modify these Terms of Service at any time. Changes will be 
                  effective immediately upon posting to our website. Your continued use of our services 
                  constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">8. Governing Law</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  These Terms of Service shall be governed by and construed in accordance with the laws 
                  of the State of New York, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">9. Contact</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  For questions regarding these Terms of Service, please contact us at:<br />
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
