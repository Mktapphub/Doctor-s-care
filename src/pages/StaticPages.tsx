import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle, ChevronDown, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does an online doctor consultation work on Doctor\'s care?',
      a: 'You can choose between instant GP consultations (average waiting time 10 minutes) or booking a specialist at your chosen time. When your slot arrives, join the encrypted video call from your mobile or laptop. Upon finishing, the doctor issues an official digital prescription that you can download or use to order medicines.',
    },
    {
      q: 'Are all doctors verified by Bangladesh Medical & Dental Council (BMDC)?',
      a: 'Yes, 100%. Every single doctor on Doctor\'s care is rigorously audited against the BMDC national practitioner database. Their registration numbers are displayed on their public profiles and on every electronic prescription.',
    },
    {
      q: 'How does the Doorstep Diagnostic sample collection work?',
      a: 'Select your required lab tests (e.g. CBC, Dengue, Lipid, Sugar) and enter your address in Dhaka or other supported areas. Our certified phlebotomist arrives with sterile kits at your designated time window. Your sample is processed at our certified lab and reports appear directly in your app within 12-24 hours.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bKash, Nagad, Rocket (DBBL), Visa, Mastercard, and American Express cards. For diagnostic tests, Cash on Sample Collection is also available.',
    },
    {
      q: 'What should I do in a medical emergency?',
      a: 'Doctor\'s care is a telemedicine platform and is NOT a substitute for emergency room care. If someone is experiencing severe chest pain, sudden paralysis, unconsciousness, heavy trauma, or breathing failure, please call Bangladesh National Emergency 999 or proceed immediately to the nearest hospital emergency room.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#047857] bg-emerald-50 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Everything you need to know about Doctor&apos;s care</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === i ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
              {openIdx === i && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#047857] bg-emerald-50 px-3 py-1 rounded-full">
            Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Transforming Healthcare Access Across Bangladesh
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Doctor&apos;s care was founded to ensure that quality medical advice and laboratory diagnostics are accessible to every citizen from anywhere at anytime.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            In a country where navigating traffic to reach a clinic can take hours, Doctor&apos;s care brings verified specialist doctors directly to patients&apos; fingertips. By leveraging modern tele-consultation protocols compliant with BMDC Telemedicine Guidelines, we reduce delays in early triage and prevent complications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50">
              <p className="text-2xl font-black text-[#047857]">1,800+</p>
              <p className="text-xs font-bold text-slate-700 mt-1">Verified Doctors</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50">
              <p className="text-2xl font-black text-emerald-700">820,000+</p>
              <p className="text-xs font-bold text-slate-700 mt-1">Patients Served</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50">
              <p className="text-2xl font-black text-purple-700">64</p>
              <p className="text-xs font-bold text-slate-700 mt-1">Districts Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been received! Our support agent will call you shortly.', 'success');
    setName('');
    setPhone('');
    setMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Contact & 24/7 Helpline</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">We are here to support your medical needs around the clock.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
            <h3 className="text-base font-bold text-slate-900">Get in Touch</h3>
            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Dhaka Head Office</strong>
                  <span>Level 7, Concord Tower, Road 11, Block D, Banani, Dhaka-1213</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">24/7 Telemedicine Hotline</strong>
                  <span>09612-444888 / +880 1711-223344</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Support Email</strong>
                  <span>support@doctorscare.bd</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Send Us a Direct Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 text-xs border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Inquiry</label>
                <textarea
                  rows={3}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full p-3 text-xs border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#047857] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Terms of Service & Telemedicine Policy</h1>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
          <p>1. Telemedicine services provided on Doctor&apos;s care are governed by the Bangladesh Medical and Dental Council (BMDC) Telemedicine Guidelines.</p>
          <p>2. Doctors have the professional authority to advise immediate in-person clinical evaluation or hospital emergency admission if a patient presents severe warning signs.</p>
          <p>3. This platform does not dispense narcotic, psychiatric, or habit-forming medicines without strict in-person verification under the Directorate General of Drug Administration (DGDA) rules.</p>
          <p>4. In life-threatening emergencies, patients must immediately dial 999 or report to the nearest hospital casualty department.</p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Privacy & Patient Health Information Policy</h1>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
          <p>1. We treat all patient medical histories, video consultations, and diagnostic laboratory reports as strictly confidential medical records.</p>
          <p>2. Video consultations are peer-to-peer encrypted and are never recorded without explicit, informed patient consent.</p>
          <p>3. Only verified treating physicians and authorized lab personnel can access relevant clinical reports for diagnosis.</p>
        </div>
      </div>
    </div>
  );
};
