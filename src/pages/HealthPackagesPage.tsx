import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Heart, Users, ArrowRight, X, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PlanDetail {
  id: string;
  name: string;
  price: number;
  period: string;
  personText: string;
  features: string[];
  color: string;
  fullDetails: string[];
}

const PLANS: PlanDetail[] = [
  {
    id: 'jotno',
    name: 'Jotno',
    price: 99,
    period: '/monthly',
    personText: '1 Person',
    color: '#059669',
    features: [
      'Free 4 consultations with our experienced on duty General Physician doctors',
      '10% discount* on any Specialist Doctor consultation',
    ],
    fullDetails: [
      'Instant access to on-duty General Physicians via video call 24/7',
      'Digital prescription saved directly in your app health records',
      'Free follow-up consultation within 7 days of initial visit',
      'Priority sample collection booking for doorstep diagnostic tests',
      'Discounts applied automatically at specialist checkout',
    ],
  },
  {
    id: 'astha',
    name: 'Astha',
    price: 175,
    period: '/monthly',
    personText: '1 Person',
    color: '#10B981',
    features: [
      'Free 8 consultations with our experienced on duty General Physician doctors',
      '10% discount* on any Specialist Doctor consultation',
    ],
    fullDetails: [
      '8 full consultations per month for continuous personal health monitoring',
      'Dedicated health history tracking and chronic condition reminders',
      'Direct messaging for minor symptoms and prescription renewal',
      'Up to 15% discount on home sample collection diagnostics',
      'Free annual digital vitals & health screening evaluation',
    ],
  },
  {
    id: 'aponjon',
    name: 'Aponjon',
    price: 249,
    period: '/monthly',
    personText: 'For 4 persons',
    color: '#F59E0B',
    features: [
      'Free 8 consultations with our experienced on duty General Physician doctors',
      '10% discount* on any Specialist Doctor consultation',
    ],
    fullDetails: [
      'One subscription covers up to 4 family members under a single account',
      'Pooled 8 free consultations per month across all enrolled members',
      'Pediatric and child health guidance from qualified physicians',
      'Doorstep diagnostic collection for the whole family at one address',
      'Consolidated electronic health records for children and spouse',
    ],
  },
  {
    id: 'momota',
    name: 'Momota',
    price: 382,
    period: '/monthly',
    personText: 'For Parents',
    color: '#8B5CF6',
    features: [
      'Free 8 consultations with our experienced on duty General Physician doctors',
      'Monthly 2 online health screening calls for your parents',
    ],
    fullDetails: [
      'Designed specifically for elderly parents with gentle elder-care advisory',
      '2 proactive monthly geriatric health checkup calls from our medical team',
      'Hypertension, blood sugar, and medication schedule management',
      'Immediate emergency triage assistance and family caregiver updates',
      'Complimentary doorstep blood sugar and BP checks during visits',
    ],
  },
];

export const HealthPackagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, openAuthModal, currentUser } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<PlanDetail | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<PlanDetail | null>(null);
  const [paymentGateway, setPaymentGateway] = useState<'bKash' | 'Nagad' | 'Card'>('bKash');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '01712345678');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribeClick = (plan: PlanDetail) => {
    setCheckoutPlan(plan);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutPlan(null);
      showToast(`Congratulations! You are now subscribed to the ${checkoutPlan?.name} plan.`, 'success');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Poppins',sans-serif] text-gray-800 py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        {/* Title strictly matching PDF 1 */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-gray-900 tracking-tight">
            Doctor's care Health Care and Protect Plans
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Choose the right healthcare plan for you, your parents, and your loved ones.
          </p>
        </div>

        {/* 4 Cards Grid strictly matching PDF 1 layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Jotno */}
          {PLANS.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-700">{plan.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    {plan.name === 'Jotno' && <Heart className="w-5 h-5 text-emerald-600" />}
                    {plan.name === 'Astha' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                    {plan.name === 'Aponjon' && <Users className="w-5 h-5 text-amber-500" />}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">৳ {plan.price}</span>
                    <span className="text-xs text-gray-500 font-medium">{plan.period}</span>
                  </div>
                  <span className="text-xs text-gray-400 block mt-0.5">{plan.personText}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600 mb-6">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons matching screenshot */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleSubscribeClick(plan)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-xs transition text-center"
                >
                  Subscribe now
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className="text-emerald-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline py-2.5 px-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4th Card: Momota (Row 2 in PDF 1) */}
        <div className="max-w-[360px] md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.slice(3, 4).map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-700">{plan.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                    <Heart className="w-5 h-5 text-purple-500" />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">৳ {plan.price}</span>
                    <span className="text-xs text-gray-500 font-medium">{plan.period}</span>
                  </div>
                  <span className="text-xs text-gray-400 block mt-0.5">{plan.personText}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600 mb-6">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons matching screenshot */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleSubscribeClick(plan)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-xs transition text-center"
                >
                  Subscribe now
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className="text-emerald-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline py-2.5 px-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
                {selectedPlan.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name} Plan</h3>
                <p className="text-xs text-gray-500">৳ {selectedPlan.price} {selectedPlan.period} · {selectedPlan.personText}</p>
              </div>
            </div>

            <div className="space-y-3 my-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                What's Included
              </h4>
              {selectedPlan.fullDetails.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  const plan = selectedPlan;
                  setSelectedPlan(null);
                  handleSubscribeClick(plan);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-3 rounded-lg shadow-sm transition"
              >
                Proceed to Subscribe (৳ {selectedPlan.price})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Checkout Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setCheckoutPlan(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Subscribe to {checkoutPlan.name}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Total to pay: <span className="font-bold text-gray-900 text-sm">৳ {checkoutPlan.price}</span> for 1 month subscription
            </p>

            <form onSubmit={handleConfirmSubscription} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('bKash')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                      paymentGateway === 'bKash'
                        ? 'border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-500/20'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('Nagad')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                      paymentGateway === 'Nagad'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Nagad
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('Card')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                      paymentGateway === 'Card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Card
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Mobile / Wallet Number
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 space-y-1">
                <p>• Plan renews automatically every month. Cancel anytime.</p>
                <p>• Instant activation of free consultations upon payment verification.</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-3 rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {isProcessing ? 'Processing payment...' : `Confirm & Pay ৳ ${checkoutPlan.price}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
