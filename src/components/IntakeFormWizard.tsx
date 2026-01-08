'use client';

import { useState } from 'react';

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Company' },
  { id: 3, name: 'Project' },
  { id: 4, name: 'Timeline & Budget' },
  { id: 5, name: 'Assets & Technical' },
  { id: 6, name: 'Final Details' },
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  projectType: string;
  projectDescription: string;
  existingAssets: string;
  timeline: string;
  budget: string;
  deadline: string;
  fileFormats: string[];
  deliveryMethod: string;
  additionalNotes: string;
  howHeard: string;
}

export default function IntakeFormWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'Email',
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    projectType: '',
    projectDescription: '',
    existingAssets: '',
    timeline: '',
    budget: '',
    deadline: '',
    fileFormats: [],
    deliveryMethod: '',
    additionalNotes: '',
    howHeard: '',
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="h-full flex flex-col">
      {/* Step Indicator */}
      <div className="mb-6 px-1">
        {/* Circles row with connecting lines */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center justify-center relative">
              {/* Left line segment */}
              {index > 0 && (
                <div 
                  className={`absolute right-1/2 top-1/2 -translate-y-1/2 h-[2px] w-full transition-colors ${currentStep > index ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                />
              )}
              {/* Right line segment */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute left-1/2 top-1/2 -translate-y-1/2 h-[2px] w-full transition-colors ${currentStep > step.id ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                />
              )}
              {/* Circle */}
              <div
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
                  ${currentStep === step.id 
                    ? 'bg-[var(--accent)] text-white' 
                    : currentStep > step.id 
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]'
                  }`}
              >
                {currentStep > step.id ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Labels row - separate grid with same column structure */}
        <div className="grid mt-1 hidden sm:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step) => (
            <div 
              key={`label-${step.id}`}
              className="text-center overflow-hidden"
            >
              <span className="text-[10px] text-[var(--muted)] truncate block">
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Let&apos;s start with your basic information</h3>
            <p className="text-sm text-[var(--muted)] mb-4">We&apos;ll use this to get in touch with you about your project.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white focus:border-[var(--accent)] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email Address*</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white focus:border-[var(--accent)] transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white focus:border-[var(--accent)] transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Preferred Contact Method</label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => updateField('preferredContact', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white focus:border-[var(--accent)] transition-colors"
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Video Call</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Tell us about your company</h3>
            <p className="text-sm text-[var(--muted)] mb-4">This helps us understand your business needs better.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Company Name*</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => updateField('companySize', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select industry</option>
                  <option>Architecture</option>
                  <option>Construction</option>
                  <option>Real Estate</option>
                  <option>Engineering</option>
                  <option>Manufacturing</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                  placeholder="https://company.com"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Project Details</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Describe your 3D modeling project requirements.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Project Type*</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => updateField('projectType', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select project type</option>
                  <option>3D Laser Scanning</option>
                  <option>BIM Modeling</option>
                  <option>As-Built Documentation</option>
                  <option>Point Cloud Processing</option>
                  <option>Virtual Reality Tour</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Project Description*</label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => updateField('projectDescription', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white resize-none"
                  placeholder="Describe your project, goals, and any specific requirements..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Existing Assets</label>
                <input
                  type="text"
                  value={formData.existingAssets}
                  onChange={(e) => updateField('existingAssets', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                  placeholder="CAD files, floor plans, photos, etc."
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Timeline & Budget</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Help us understand your project constraints.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select timeline</option>
                  <option>ASAP / Rush</option>
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>1-2 months</option>
                  <option>3+ months</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select budget</option>
                  <option>Under $5,000</option>
                  <option>$5,000 - $15,000</option>
                  <option>$15,000 - $50,000</option>
                  <option>$50,000 - $100,000</option>
                  <option>$100,000+</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Target Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField('deadline', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Assets & Technical Requirements</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Specify your technical needs and deliverable formats.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-2">Required File Formats</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['RVT', 'DWG', 'IFC', 'OBJ', 'FBX', 'E57', 'LAS', 'PDF'].map((format) => (
                    <label key={format} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fileFormats.includes(format)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateField('fileFormats', [...formData.fileFormats, format]);
                          } else {
                            updateField('fileFormats', formData.fileFormats.filter((f) => f !== format));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-mono">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Preferred Delivery Method</label>
                <select
                  value={formData.deliveryMethod}
                  onChange={(e) => updateField('deliveryMethod', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select method</option>
                  <option>Cloud Storage (Google Drive, Dropbox)</option>
                  <option>FTP Server</option>
                  <option>Physical Media</option>
                  <option>Project Portal</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg font-bold mb-1">Final Details</h3>
            <p className="text-sm text-[var(--muted)] mb-4">Any additional information you&apos;d like to share?</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Additional Notes</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => updateField('additionalNotes', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white resize-none"
                  placeholder="Any other details, questions, or special requirements..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">How did you hear about us?</label>
                <select
                  value={formData.howHeard}
                  onChange={(e) => updateField('howHeard', e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--border)] bg-white"
                >
                  <option value="">Select an option</option>
                  <option>Google Search</option>
                  <option>Social Media</option>
                  <option>Referral</option>
                  <option>Industry Event</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 mt-4 border-t border-[var(--border)]">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        {currentStep === steps.length ? (
          <button onClick={handleSubmit} className="btn-primary">
            Submit Request
          </button>
        ) : (
          <button onClick={nextStep} className="btn-primary">
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}

