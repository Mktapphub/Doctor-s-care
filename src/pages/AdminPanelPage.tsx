import React, { useState } from 'react';
import {
  Shield,
  UserCheck,
  Check,
  X,
  Plus,
  Trash2,
  DollarSign,
  Activity,
  Calendar,
  FlaskConical,
  AlertCircle,
} from 'lucide-react';
import { DOCTORS_DATA, INSTANT_OFFERS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AdminPanelPage: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'doctors' | 'banners' | 'orders'>('doctors');

  // Pending doctors verification list
  const [pendingDoctors, setPendingDoctors] = useState([
    {
      id: 'doc-pending-1',
      name: 'Dr. Sharmin Akter',
      bmdcNumber: 'A-89412',
      speciality: 'Pediatrics',
      degrees: 'MBBS (SSMC), DCH',
      hospital: 'Sir Salimullah Medical College',
      appliedDate: 'Yesterday',
    },
    {
      id: 'doc-pending-2',
      name: 'Dr. Rakibul Islam',
      bmdcNumber: 'A-77301',
      speciality: 'Cardiology',
      degrees: 'MBBS, MD (Cardiology)',
      hospital: 'National Institute of Cardiovascular Diseases (NICVD)',
      appliedDate: '2 days ago',
    },
  ]);

  const [offersList, setOffersList] = useState(INSTANT_OFFERS);
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferFee, setNewOfferFee] = useState(400);

  const handleApproveDoctor = (id: string, name: string) => {
    setPendingDoctors((prev) => prev.filter((d) => d.id !== id));
    showToast(`Doctor ${name} approved and credentials verified with BMDC registry!`, 'success');
  };

  const handleRejectDoctor = (id: string, name: string) => {
    setPendingDoctors((prev) => prev.filter((d) => d.id !== id));
    showToast(`Doctor application for ${name} rejected.`, 'info');
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle.trim()) return;
    const newOffer = {
      id: 'offer-' + Date.now(),
      title: newOfferTitle,
      titleBn: newOfferTitle,
      subtitle: 'Instant priority consultation',
      subtitleBn: 'তাৎক্ষণিক কনসালটেশন',
      fee: Number(newOfferFee),
      speciality: 'General Physician',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      badge: 'Live',
    };
    setOffersList((prev) => [newOffer, ...prev]);
    setNewOfferTitle('');
    showToast('New instant consultation offer created and published!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Admin Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">Platform Operations Admin</h1>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Doctor&apos;s care Bangladesh · Verification & Marketplace Console
                </p>
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-emerald-700 font-bold">Total Active Doctors</p>
              <p className="text-2xl font-black text-emerald-900 mt-0.5">1,842</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-700 font-bold">Pending BMDC Approvals</p>
              <p className="text-2xl font-black text-amber-900 mt-0.5">{pendingDoctors.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-emerald-700 font-bold">Today&apos;s Consultations</p>
              <p className="text-2xl font-black text-emerald-900 mt-0.5">389</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-600 font-bold">Today&apos;s Diagnostic Orders</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">112</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 mt-6 gap-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('doctors')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'doctors' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Doctor Verifications ({pendingDoctors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'banners' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Instant Consultation Offers</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DOCTOR VERIFICATIONS */}
        {activeTab === 'doctors' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Pending BMDC Practitioner Approvals
            </h2>

            {pendingDoctors.length > 0 ? (
              <div className="space-y-3">
                {pendingDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          BMDC: {doc.bmdcNumber}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          Applied {doc.appliedDate}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-1">{doc.degrees}</p>
                      <p className="text-xs text-slate-500">{doc.hospital} · Speciality: {doc.speciality}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveDoctor(doc.id, doc.name)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & Verify</span>
                      </button>
                      <button
                        onClick={() => handleRejectDoctor(doc.id, doc.name)}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center text-slate-500 text-xs">
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-800">All doctor credentials verified!</p>
                <p className="mt-1">No pending BMDC applications in queue.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INSTANT OFFERS & PROMO MANAGEMENT */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            {/* Create new offer */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">Add 24/7 Instant Consultation Offer</h3>
              <form onSubmit={handleAddOffer} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newOfferTitle}
                  onChange={(e) => setNewOfferTitle(e.target.value)}
                  placeholder="Offer Title (e.g. Winter Viral Fever Care)"
                  className="h-10 px-3 text-xs border rounded-xl"
                />
                <input
                  type="number"
                  required
                  value={newOfferFee}
                  onChange={(e) => setNewOfferFee(Number(e.target.value))}
                  placeholder="Fee in ৳"
                  className="h-10 px-3 text-xs border rounded-xl"
                />
                <button
                  type="submit"
                  className="h-10 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Offer</span>
                </button>
              </form>
            </div>

            {/* Existing offers list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offersList.map((off) => (
                <div key={off.id} className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={off.image}
                      alt={off.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{off.title}</h4>
                      <p className="text-[11px] text-slate-500">{off.subtitle}</p>
                      <p className="text-xs font-black text-purple-700 mt-0.5">৳{off.fee}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOffersList(offersList.filter((o) => o.id !== off.id));
                      showToast('Offer removed from mobile homepage.', 'info');
                    }}
                    className="text-slate-400 hover:text-rose-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
