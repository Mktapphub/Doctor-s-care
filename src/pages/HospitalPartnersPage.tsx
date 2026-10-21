import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  MapPin,
  Percent,
  Phone,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Tag,
  Download,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PartnerHospital {
  id: string;
  name: string;
  district: string;
  area: string;
  address: string;
  phone: string;
  discounts: {
    pathology: string;
    radiology: string;
    bed: string;
    opd?: string;
  };
  features: string[];
  rating: number;
}

export const HospitalPartnersPage: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [voucherModal, setVoucherModal] = useState<PartnerHospital | null>(null);

  const hospitals: PartnerHospital[] = [
    {
      id: 'square',
      name: 'Square Hospitals Ltd.',
      district: 'Dhaka',
      area: 'Panthapath',
      address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka 1205',
      phone: '10616 / 09610010616',
      discounts: {
        pathology: '20% Off',
        radiology: '15% Off (MRI, CT, X-Ray)',
        bed: '10% Off Cabin Rent',
        opd: '10% Off Consultation',
      },
      features: ['JCI Accredited', '24/7 Emergency & ICU', 'Digital Radiology'],
      rating: 4.9,
    },
    {
      id: 'evercare',
      name: 'Evercare Hospital Dhaka',
      district: 'Dhaka',
      area: 'Bashundhara R/A',
      address: 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229',
      phone: '10678 / 09666710678',
      discounts: {
        pathology: '25% Off',
        radiology: '20% Off (PET-CT, MRI)',
        bed: '15% Off In-patient Cabin',
        opd: '10% Off Specialist OPD',
      },
      features: ['Comprehensive Cancer Center', 'Level-1 Trauma Care', 'JCI Gold Seal'],
      rating: 4.9,
    },
    {
      id: 'united',
      name: 'United Hospital Limited',
      district: 'Dhaka',
      area: 'Gulshan 2',
      address: 'Plot 15, Road 71, Gulshan 2, Dhaka 1212',
      phone: '10666 / +880 2 8836444',
      discounts: {
        pathology: '20% Off',
        radiology: '15% Off',
        bed: '10% Off Cabin Rent',
        opd: 'Priority Appointment Desk',
      },
      features: ['Cardiac Center of Excellence', 'Neuroscience Center', 'Renal Dialysis'],
      rating: 4.8,
    },
    {
      id: 'labaid',
      name: 'Labaid Specialized Hospital',
      district: 'Dhaka',
      area: 'Dhanmondi',
      address: 'House 06, Road 04, Dhanmondi, Dhaka 1205',
      phone: '10606 / 09666710606',
      discounts: {
        pathology: '30% Off',
        radiology: '20% Off (Cardiac CT, Echo)',
        bed: '15% Off Bed Charges',
        opd: '15% Off Specialist OPD',
      },
      features: ['Pioneer Cardiac Hospital', '24/7 Cath Lab', 'Emergency Ambulance'],
      rating: 4.8,
    },
    {
      id: 'ibnsina',
      name: 'Ibn Sina Medical College & Hospital',
      district: 'Dhaka',
      area: 'Kalyanpur / Dhanmondi',
      address: '1/1 B, Kallyanpur, Mirpur Road, Dhaka 1207',
      phone: '10615 / +880 9610010615',
      discounts: {
        pathology: '35% Off',
        radiology: '25% Off',
        bed: '20% Off Bed Charges',
        opd: '15% Off OPD Tickets',
      },
      features: ['Affordable Diagnostics', 'ISO 15189 Certified Lab', 'Mother & Child Care'],
      rating: 4.7,
    },
    {
      id: 'popular',
      name: 'Popular Diagnostic Centre',
      district: 'Dhaka',
      area: 'Dhanmondi, Shantinagar, Mirpur, Uttara',
      address: 'House 16, Road 2, Dhanmondi R/A, Dhaka 1205 (All branches)',
      phone: '09613787801 / 09666787801',
      discounts: {
        pathology: '25% Off All Blood Tests',
        radiology: '20% Off MRI & CT Scan',
        bed: '10% Off Day-care Surgery',
      },
      features: ['Largest Diagnostic Network', 'Automated Lab Systems', 'Same-day Reports'],
      rating: 4.7,
    },
    {
      id: 'bsh',
      name: 'Bangladesh Specialized Hospital',
      district: 'Dhaka',
      area: 'Shyamoli',
      address: '21 Mirpur Road, Shyamoli, Dhaka 1207',
      phone: '10633 / +880 9666700100',
      discounts: {
        pathology: '20% Off',
        radiology: '15% Off',
        bed: '10% Off Cabin & ICU',
        opd: '10% Off OPD Consultation',
      },
      features: ['Multidisciplinary Surgery', 'Gastroenterology Hub', '24/7 Emergency'],
      rating: 4.8,
    },
    {
      id: 'asgarali',
      name: 'Asgar Ali Hospital',
      district: 'Dhaka',
      area: 'Gandaria (Old Dhaka)',
      address: '111/1/A, Distillery Road, Gandaria, Dhaka 1204',
      phone: '10602 / 09666710602',
      discounts: {
        pathology: '25% Off',
        radiology: '20% Off',
        bed: '15% Off Inpatient Stay',
      },
      features: ['Modular OT Complex', 'Pediatric ICU', 'Comprehensive Cardiac Care'],
      rating: 4.7,
    },
    {
      id: 'imperial-ctg',
      name: 'Apollo Imperial Hospital Chittagong',
      district: 'Chittagong',
      area: 'Pahartali',
      address: 'Zakir Hossain Road, Pahartali, Chattogram 4202',
      phone: '09612244244 / 031-659014',
      discounts: {
        pathology: '25% Off',
        radiology: '20% Off',
        bed: '15% Off Bed Rent',
        opd: '15% Off Specialist Visits',
      },
      features: ['Top Hospital in Chittagong', 'Apollo Health Network Partner', 'Helipad Services'],
      rating: 4.9,
    },
    {
      id: 'mount-adora',
      name: 'Mount Adora Hospital Sylhet',
      district: 'Sylhet',
      area: 'Akhalia & Nayasarak',
      address: 'Nayasarak Point, Sylhet 3100',
      phone: '01799-903903 / 0821-727827',
      discounts: {
        pathology: '30% Off',
        radiology: '20% Off',
        bed: '15% Off Cabin Rent',
      },
      features: ['Leading Private Hospital in Sylhet', 'Dialysis Unit', 'Modern ICU/NICU'],
      rating: 4.8,
    },
    {
      id: 'gazi-khulna',
      name: 'Gazi Medical College Hospital',
      district: 'Khulna',
      area: 'Sonadanga',
      address: 'Majid Sarani, Sonadanga, Khulna 9100',
      phone: '041-731518 / 01711-356789',
      discounts: {
        pathology: '30% Off',
        radiology: '25% Off',
        bed: '20% Off Bed Charges',
      },
      features: ['Teaching Hospital', 'Low-cost Quality Diagnostics', '24/7 Trauma Care'],
      rating: 4.6,
    },
    {
      id: 'khwaja-yunus',
      name: 'Khwaja Yunus Ali Medical College Hospital',
      district: 'Rajshahi / Sirajganj',
      area: 'Enayetpur',
      address: 'Enayetpur, Chauhali, Sirajganj 6751',
      phone: '0751-63870 / 01716-291681',
      discounts: {
        pathology: '25% Off',
        radiology: '20% Off',
        bed: '15% Off All Wards & Cabins',
      },
      features: ['World-class Cancer Research', 'Charity Wards', 'Advanced Cardiac Surgery'],
      rating: 4.8,
    },
  ];

  const districts = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi / Sirajganj'];

  const filtered = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || h.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleGenerateVoucher = (hospital: PartnerHospital) => {
    setVoucherModal(hospital);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/70 font-['Poppins',sans-serif] text-gray-800 pb-24">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/70 pt-10 pb-12 border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Hospital Partners</span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <Building2 className="w-4 h-4" />
              Nationwide Hospital Network
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Our Partner Hospitals & Healthcare Discounts
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Show your <strong>Doctor's care</strong> app or digital health pass to enjoy up to <strong>40% exclusive discount</strong> on pathology, radiology investigations (MRI, CT Scan, Ultrasound, X-Ray), OPD consultations, and hospital bed charges at top hospitals in Bangladesh.
            </p>
          </div>

          {/* Quick Search & District Filter */}
          <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search hospital by name, area, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* District Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`text-xs font-medium px-4 py-2 rounded-xl transition ${
                  selectedDistrict === d
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Cards Grid */}
      <section className="py-12">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Showing <strong className="text-gray-900">{filtered.length}</strong> partner hospitals
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Instant Digital Discount Pass Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ★ {h.rating}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                    {h.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{h.area}, {h.district}</span>
                  </div>

                  {/* Discount Badges */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-gray-100 mb-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Pathology Tests:</span>
                      <strong className="text-emerald-700 font-bold">{h.discounts.pathology}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Radiology & Scans:</span>
                      <strong className="text-emerald-600 font-bold">{h.discounts.radiology}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Cabin & Bed:</span>
                      <strong className="text-amber-600 font-bold">{h.discounts.bed}</strong>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {h.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleGenerateVoucher(h)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Get Discount Pass</span>
                  </button>
                  <a
                    href={`tel:${h.phone.split('/')[0].trim()}`}
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                    title="Call Hospital Helpline"
                  >
                    <Phone className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Hospital Onboarding Banner */}
      <section className="mt-8 max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-900/40">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              For Healthcare Providers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Are you a Hospital, Diagnostic Centre, or Clinic in Bangladesh?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Join the Doctor's care partner network. Connect with over 800,000 digital subscribers looking for in-person diagnostics, specialized surgery, and hospital admissions.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg shrink-0 transition"
          >
            Partner With Us
          </Link>
        </div>
      </section>

      {/* Digital Discount Pass Modal */}
      {voucherModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 relative">
            <button
              onClick={() => setVoucherModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Tag className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Digital Hospital Pass
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-2">
                {voucherModal.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{voucherModal.address}</p>
            </div>

            {/* Simulated Pass Voucher */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border-2 border-dashed border-emerald-500/40 text-left space-y-3">
              <div className="flex justify-between items-center text-xs border-b border-gray-200 pb-2">
                <span className="text-gray-500">Member Name:</span>
                <strong className="text-gray-900">{currentUser?.name || 'Doctor\'s care Premium Member'}</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-gray-200 pb-2">
                <span className="text-gray-500">Voucher Code:</span>
                <span className="font-mono font-bold text-sm text-emerald-700 tracking-wider">
                  DC-{voucherModal.id.toUpperCase()}-2026
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-gray-800">Your Discount Privileges:</p>
                <p className="text-gray-600">• Pathology: {voucherModal.discounts.pathology}</p>
                <p className="text-gray-600">• Radiology: {voucherModal.discounts.radiology}</p>
                <p className="text-gray-600">• Bed / Cabin: {voucherModal.discounts.bed}</p>
              </div>
              <div className="pt-2 text-[10px] text-gray-400">
                Show this screen or quote your code at the hospital billing / registration counter before invoice generation.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  showToast('Discount Voucher saved to your phone!', 'success');
                  setVoucherModal(null);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>Save Pass to Phone</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
