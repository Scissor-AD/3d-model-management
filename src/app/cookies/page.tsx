import Navigation from '@/components/Navigation';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[var(--nav-height)]">
        <section className="border-l-4 border-[var(--border-dark)] mx-4 md:mx-8 my-6 md:my-10 bg-[var(--surface)]">
          <div className="p-6 md:p-10 max-w-4xl">
            <h1 className="section-heading mb-8">COOKIE POLICY</h1>
            
            <p className="text-sm text-[var(--muted)] mb-8">Last updated: January 2026</p>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-base font-bold mb-4">1. What Are Cookies</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  Cookies are small text files that are placed on your computer or mobile device when you 
                  visit a website. They are widely used to make websites work more efficiently and to 
                  provide information to website owners. Cookies help us remember your preferences, 
                  understand how you use our website, and improve your overall experience.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">2. Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-sm font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">
                      These cookies are necessary for the website to function properly. They enable basic 
                      functions like page navigation and access to secure areas. The website cannot function 
                      properly without these cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously. This helps us improve our website and services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">
                      These cookies enable enhanced functionality and personalization, such as remembering 
                      your preferences and settings. They may be set by us or by third-party providers 
                      whose services we have added to our pages.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-sm leading-relaxed text-[var(--foreground)]">
                      These cookies may be set through our site by our advertising partners. They may be 
                      used to build a profile of your interests and show you relevant advertisements on 
                      other sites.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">3. Managing Cookies</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking 
                  cookies may impact your user experience and some functionality may no longer be available.
                </p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  Most browsers allow you to view, manage, delete, and block cookies for a website. Be aware 
                  that if you delete all cookies, any preferences you have set will be lost, including the 
                  ability to opt out of cookies as this function itself requires placement of an opt-out cookie.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">4. Third-Party Cookies</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  Some cookies on our website are set by third parties whose services we use. These include 
                  analytics providers and other service providers. We do not control the cookies set by 
                  these third parties. Please refer to their respective privacy policies for more information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">5. Cookie Consent</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  When you first visit our website, you will be shown a cookie consent banner. By clicking 
                  "Accept," you consent to our use of cookies as described in this policy. You can change 
                  your cookie preferences at any time through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">6. Updates to This Policy</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  We may update this Cookie Policy from time to time to reflect changes in technology, 
                  legislation, or our data practices. Any changes will be posted on this page with an 
                  updated revision date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-base font-bold mb-4">7. Contact Us</h2>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  If you have questions about our use of cookies, please contact us at:<br />
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
