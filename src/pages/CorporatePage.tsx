import React, { useState } from 'react';
import { Building2, Users, ShieldCheck, PhoneCall, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CorporatePage: React.FC = () => {
  const { showToast } = useApp();
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('50-200');
  const [contactPerson, setContactPerson] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Real backend note: replace with CRM lead webhook (e.g. HubSpot / Salesforce / internal corporate API) */
    setSubmitted(true);
    showToast('Corporate inquiry received! Our enterprise wellness manager will contact you.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-3 py-1 rounded-full">
              Enterprise Employee Wellbeing
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 leading-tight">
              Protect Your Workforce with Bangladesh&apos;s Leading Digital Healthcare
            </h1>
            <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
              Empower your employees and their family members with 24/7 telemedicine consultations, doorstep diagnostic health camps, mental wellness sessions, and digitized medical records.
            </p>
          </div>
        </div>

        {/* 2 Column Layout: Benefits & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Why Corporate Care */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Why 120+ Top Bangladeshi Companies Choose Doctor&apos;s care
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">24/7 Instant Doctor Access</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Employees can consult BMDC certified general physicians and specialists via video in under 10 minutes without taking half-day sick leave.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Annual Executive Health Screenings</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    On-site office blood sample collection and customized executive health checkups with complete confidential medical audits.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mental Health & Stress Counselling</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Dedicated certified psychiatrists and clinical psychologists providing private online support for work-life balance and burnout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quotation Form */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Thank you for your interest!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We have received your corporate wellness request. Our enterprise team will send a tailored package quotation to your work email within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-slate-100 text-xs font-bold text-slate-700 rounded-xl"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Request Corporate Health Proposal</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Customized health plans starting from ৳150/employee/month</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Technologies Ltd."
                    className="w-full h-11 px-3 text-xs border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Number of Employees</label>
                    <select
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(e.target.value)}
                      className="w-full h-11 px-2 text-xs border rounded-xl"
                    >
                      <option value="10-50">10 - 50 Employees</option>
                      <option value="50-200">50 - 200 Employees</option>
                      <option value="200-1000">200 - 1,000 Employees</option>
                      <option value="1000+">1,000+ Employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Sadia Rahman (HR Head)"
                      className="w-full h-11 px-3 text-xs border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="hr@company.com"
                      className="w-full h-11 px-3 text-xs border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01711223344"
                      className="w-full h-11 px-3 text-xs border rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Get Custom Corporate Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
