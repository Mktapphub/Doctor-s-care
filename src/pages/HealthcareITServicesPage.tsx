import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Laptop,
  Server,
  Shield,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  Database,
  Lock,
  Headphones,
  Send,
  Sparkles,
  Layers,
  Code2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HealthcareITServicesPage: React.FC = () => {
  const { showToast } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [solutionType, setSolutionType] = useState('Hospital Information Management (HIMS)');
  const [budgetRange, setBudgetRange] = useState('BDT 5 - 15 Lakh');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone || !email) {
      showToast('Please fill in your contact information', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast('Inquiry received! Our HealthTech Solution Architect will call you within 24 hours.', 'success');
    }, 1200);
  };

  const services = [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: 'Custom Telemedicine Platforms',
      desc: 'White-label video consultation platforms with WebRTC HD video/audio streaming, encrypted in-call chat, waiting queue triage, and BMDC compliant e-prescriptions.',
      tags: ['WebRTC', 'iOS & Android Apps', 'Queue Management'],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Hospital Information Systems (HIMS)',
      desc: 'End-to-end hospital ERP managing OPD/IPD registrations, bed management, doctor rosters, OT scheduling, billing, and insurance claims processing.',
      tags: ['IPD / OPD', 'Bed Roster', 'Billing Automation'],
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Laboratory Information Systems (LIMS)',
      desc: 'Complete pathology lab automation with bidirectional analyzer interfacing, barcode sample tracking, technician verification gates, and automated SMS report delivery.',
      tags: ['Machine Interfacing', 'Barcode Tracking', 'SMS / PDF Reports'],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'HL7 & FHIR Compliant EHR / EMR',
      desc: 'Interoperable electronic health records supporting international medical coding (ICD-10, SNOMED-CT), vitals tracking, and timeline-based patient longitudinal history.',
      tags: ['FHIR Standard', 'ICD-10 Coding', 'Patient Timeline'],
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Smart Pharmacy & Inventory POS',
      desc: 'DGDA-compliant pharmacy management system with drug batch tracking, expiration warnings, automated re-ordering, barcode scanning, and multi-branch POS.',
      tags: ['DGDA Compliance', 'Batch Expiry Alerts', 'Multi-Store'],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'AI Clinical Triage & Analytics',
      desc: 'Artificial intelligence assistance for preliminary patient symptom triage, vital signs anomaly detection, operational hospital occupancy forecasting, and clinic KPIs.',
      tags: ['AI Symptom Checker', 'Forecasting', 'Executive Analytics'],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/70 font-['Poppins',sans-serif] text-gray-800 pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-10 pb-20 relative overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs text-emerald-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Healthcare IT Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Code2 className="w-4 h-4" />
                Enterprise HealthTech Solutions
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
                Engineering Bangladesh's Next Generation of <br />
                <span className="text-emerald-400">Digital Health Systems</span>
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-xl">
                We empower hospitals, diagnostic labs, pharmaceutical giants, and digital health startups with secure, high-availability software built specifically for the South Asian healthcare ecosystem.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#it-inquiry-form"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  <span>Request Solution Proposal</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <Link
                  to="/corporate"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 flex items-center gap-2 transition"
                >
                  <span>Employee Health Plans</span>
                </Link>
              </div>
            </div>

            {/* Architecture Stack Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Security & Compliance
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    99.98% Uptime SLA
                  </span>
                </div>
                <div className="space-y-3 text-xs text-emerald-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>End-to-End Encryption:</strong> 256-bit AES encryption for video streams and medical records in transit and at rest.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Interoperability:</strong> HL7, FHIR Release 4, and ICD-10 medical ontology integration.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Regulatory Ready:</strong> Complies with Bangladesh BMDC Telemedicine Guidelines and DGDA drug master lists.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Disaster Recovery:</strong> Multi-region cloud automated snapshot backups on AWS & Google Cloud Platform.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ecfdf5] px-3.5 py-1.5 rounded-full">
              What We Build
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Full-Suite Digital Health Engineering
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Modular, scalable microservices architecture that grows seamlessly with your patient volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:border-[#059669] hover:shadow-md transition group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#059669] flex items-center justify-center mb-4 border border-gray-200 group-hover:bg-[#059669] group-hover:text-white transition">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/80">
                  {s.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-white text-gray-600 px-2 py-0.5 rounded-md border border-gray-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="it-inquiry-form" className="py-16 bg-slate-50">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ecfdf5] px-3.5 py-1.5 rounded-full">
                Consult With Our Tech Leads
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
                Request an IT Solution Consultation
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Tell us about your organization and requirements. Our engineering leadership will prepare an architectural roadmap.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Thank You, {contactName}!</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  We have received your requirements for <strong>{companyName}</strong>. Our Principal HealthTech Architect will review your brief and contact you at <strong>{phone}</strong> / <strong>{email}</strong> within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#059669] text-white text-xs font-semibold rounded-xl"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Organization / Hospital Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. City General Hospital Ltd."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Tanvir Ahmed (IT Director)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tanvir@cityhospital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1711-234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Solution Required
                    </label>
                    <select
                      value={solutionType}
                      onChange={(e) => setSolutionType(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] bg-white"
                    >
                      <option value="Hospital Information Management (HIMS)">Hospital Information Management (HIMS)</option>
                      <option value="Custom Telemedicine Platform">Custom Telemedicine Platform & Mobile Apps</option>
                      <option value="Laboratory Information System (LIMS)">Laboratory Information System (LIMS)</option>
                      <option value="EHR / EMR Interoperability">EHR / EMR Interoperability</option>
                      <option value="Pharmacy POS & DGDA Compliance">Pharmacy POS & DGDA Compliance</option>
                      <option value="Enterprise Architecture Consulting">Enterprise Architecture Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Estimated Project Budget
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] bg-white"
                    >
                      <option value="BDT 3 - 5 Lakh">BDT 3 - 5 Lakh (Basic/Pilot)</option>
                      <option value="BDT 5 - 15 Lakh">BDT 5 - 15 Lakh (Mid-tier Clinic/Lab)</option>
                      <option value="BDT 15 - 50 Lakh">BDT 15 - 50 Lakh (Specialized Hospital)</option>
                      <option value="BDT 50 Lakh+">BDT 50 Lakh+ (Enterprise Hospital Network)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current system, bed capacity, number of daily tests or doctor consultations..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-[#059669] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request IT Architecture Proposal</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
