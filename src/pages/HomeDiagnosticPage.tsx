import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Search,
  Clock,
  CheckCircle,
  ShoppingBag,
  Trash2,
  Calendar,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Building,
  Check,
  Sparkles,
} from 'lucide-react';
import { DIAGNOSTIC_TESTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { DiagnosticTest, DiagnosticOrder } from '../types';
import img_diagnostic_sample_1792346319850 from '../assets/images/diagnostic_sample_1792346319850.jpg';

const DIAGNOSTIC_SAMPLE_IMG = img_diagnostic_sample_1792346319850;

const POPULAR_LOCATIONS = [
  'Mohammadpur, Dhaka',
  'Dhanmondi, Dhaka',
  'Banani, Dhaka',
  'Gulshan 1 & 2, Dhaka',
  'Uttara (Sectors 1-14), Dhaka',
  'Mirpur (1-14), Dhaka',
  'Bashundhara R/A, Dhaka',
  'Badda & Rampura, Dhaka',
  'Motijheel & Dilkusha, Dhaka',
  'Paltan & Shantinagar, Dhaka',
  'Lalmatia, Dhaka',
  'Old Dhaka (Lalbagh, Sutrapur)',
];

export const HomeDiagnosticPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    diagnosticCart,
    addToCart,
    removeFromCart,
    clearCart,
    addDiagnosticOrder,
    currentUser,
    showToast,
  } = useApp();

  // Location selector state matching PDF 2
  const [selectedLocation, setSelectedLocation] = useState('Mohammadpur, Dhaka');
  const [locationInput, setLocationInput] = useState('Mohammadpur, Dhaka');
  const [locationConfirmed, setLocationConfirmed] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Search & category filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Address & slot form
  const [patientName, setPatientName] = useState(currentUser?.name || 'Rafiq Ahmed');
  const [phone, setPhone] = useState(currentUser?.phone || '01711223344');
  const [addressDetails, setAddressDetails] = useState('2 No. Probal Housing, Ring Road');
  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('08:00 AM - 10:00 AM');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Cash on Collection' | 'Nagad'>('bKash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All',
    'Hematology',
    'Biochemistry',
    'Diabetes Care',
    'Infectious Disease',
    'Hormone & Thyroid',
    'Kidney Health',
    'Liver Health',
    'Comprehensive Package',
  ];

  const filteredTests = DIAGNOSTIC_TESTS.filter((test) => {
    if (selectedCategory !== 'All' && test.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        test.name.toLowerCase().includes(q) ||
        test.code.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const cartTotal = diagnosticCart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);
  const collectionFee = cartTotal > 1500 ? 0 : 100;
  const grandTotal = cartTotal + collectionFee;

  const handleConfirmLocation = () => {
    if (!locationInput.trim()) {
      showToast('Please enter a location.', 'error');
      return;
    }
    setSelectedLocation(locationInput);
    setLocationConfirmed(true);
    setShowLocationModal(false);
    showToast(`Location set to ${locationInput}. Operating verified!`, 'success');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressDetails.trim() || !phone.trim() || !patientName.trim()) {
      showToast('Please fill in complete address and contact details.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: DiagnosticOrder = {
        id: orderId,
        patientName,
        phone,
        address: addressDetails,
        division: 'Dhaka',
        area: selectedLocation,
        date,
        timeSlot,
        items: [...diagnosticCart],
        totalAmount: grandTotal,
        paymentMethod,
        status: 'Sample Collector Assigned',
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };

      addDiagnosticOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setCheckoutModalOpen(false);
      showToast(`Order #${orderId} booked successfully! Our technician will visit ${selectedLocation}.`, 'success');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-white font-['Poppins',sans-serif] text-gray-800 pb-20">
      {/* Top Banner strictly matching PDF 2 */}
      <div className="bg-emerald-50/70 border-b border-emerald-100 py-6">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-xs border border-white shrink-0 bg-white">
                <img
                  src={DIAGNOSTIC_SAMPLE_IMG}
                  alt="Diagnostic test"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-emerald-700 leading-tight">
                  Home Diagnostic Test
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  with safe sample collection and quick report delivery
                </p>
              </div>
            </div>

            {/* Operating status badge */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="text-gray-400 block text-[10px]">Active Location</span>
                <span className="font-semibold text-gray-900">{selectedLocation}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowLocationModal(true)}
                className="text-emerald-600 hover:text-emerald-700 hover:underline text-xs font-semibold ml-2"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE COLLECTION LOCATION CARD strictly matching PDF 2 */}
      {(!locationConfirmed || showLocationModal) && (
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 my-10">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 sm:p-10 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Sample Collection Location
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-md mx-auto">
              We need your location to ensure that we're currently operating in your area
            </p>

            <div className="space-y-4 max-w-lg mx-auto text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Enter a location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Enter a location (e.g. Mohammadpur, Dhanmondi, Banani)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Quick Area Badges */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1.5 font-medium">
                  Popular Dhaka Areas Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_LOCATIONS.slice(0, 6).map((areaName) => (
                    <button
                      key={areaName}
                      type="button"
                      onClick={() => setLocationInput(areaName)}
                      className="text-[11px] bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded-md border border-gray-200 transition"
                    >
                      {areaName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Preview Graphic matching PDF 2 */}
              <div className="h-44 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700">
                  {locationInput || 'Dhaka Metropolitan Zone'}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  ✓ Doorstep phlebotomist available · Standard pickup within 2 hours
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirmLocation}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-3 rounded-xl shadow-xs transition"
              >
                Confirm Location →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Test Ordering View */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 mt-8">
        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lab test by name or code..."
              className="w-full px-3.5 py-2 pl-9 text-xs sm:text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 2 Column Layout: Test Catalog & Sticky Cart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Tests List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredTests.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-200">
                <FlaskConical className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">No diagnostic tests found</p>
                <p className="text-xs text-gray-400 mt-1">Try another search keyword or select All categories.</p>
              </div>
            ) : (
              filteredTests.map((test) => {
                const inCart = diagnosticCart.some((item) => item.id === test.id);
                return (
                  <div
                    key={test.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-emerald-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {test.category}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {test.code}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-gray-900 leading-snug">
                        {test.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 max-w-xl">
                        {test.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Report in {test.tatHours} hours</span>
                        </span>
                        <span>Sample: {test.sampleType}</span>
                        {test.fastingRequired && (
                          <span className="text-amber-600 font-semibold">
                            ⚠️ 8-10h Fasting Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ৳{test.discountPrice || test.price}
                        </span>
                        {test.discountPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            ৳{test.price}
                          </span>
                        )}
                      </div>

                      {inCart ? (
                        <button
                          type="button"
                          onClick={() => removeFromCart(test.id)}
                          className="bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-600 text-xs font-semibold px-4 py-2 rounded-lg border border-emerald-200 hover:border-rose-200 transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Added (Remove)</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(test)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition"
                        >
                          + Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sticky Cart Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-gray-900">Diagnostic Cart</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                {diagnosticCart.length} {diagnosticCart.length === 1 ? 'test' : 'tests'}
              </span>
            </div>

            {diagnosticCart.length === 0 ? (
              <div className="py-8 text-center text-gray-400 space-y-2">
                <FlaskConical className="w-8 h-8 mx-auto text-gray-300" />
                <p className="text-xs">Your test cart is empty.</p>
                <p className="text-[11px] text-gray-400">Select tests to schedule sample collection.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {diagnosticCart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between text-xs py-1 border-b border-gray-50">
                      <div className="pr-2">
                        <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                        <span className="text-gray-400 text-[10px]">৳{item.discountPrice || item.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Tests Subtotal</span>
                    <span>৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Doorstep Collection Fee</span>
                    <span>{collectionFee === 0 ? 'FREE' : `৳${collectionFee}`}</span>
                  </div>
                  {collectionFee === 0 && (
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      ✓ Free home collection unlocked (Orders over ৳1,500)
                    </span>
                  )}
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total Amount</span>
                    <span>৳{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <span>Book Doorstep Sample Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Address & Booking Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Confirm Sample Collection
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our trained technician will visit your location to collect samples.
            </p>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Collection Area & Detailed Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="House, Road, Area (e.g. 2 No. Probal Housing, Ring Road, Mohammadpur)"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Day After Tomorrow">Day After Tomorrow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white"
                  >
                    <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM (Fasting)</option>
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['bKash', 'Nagad', 'Cash on Collection'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition ${
                        paymentMethod === method
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-900">
                <span>Total to Pay:</span>
                <span>৳{grandTotal}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-xs font-semibold rounded-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking Order...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
