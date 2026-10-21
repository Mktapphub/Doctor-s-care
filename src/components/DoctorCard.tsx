import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Building2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { Doctor } from '../types';

export interface DoctorCardProps {
  doctor: Doctor;
  onQuickView?: (doctor: Doctor) => void;
  compact?: boolean;
  isSelected?: boolean;
  onSelectSlots?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  isSelected = false,
  onSelectSlots,
  compact = false,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onSelectSlots) {
      onSelectSlots(doctor);
    } else {
      navigate(`/doctor/${doctor.id}`);
    }
  };

  const handleSelectSlotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectSlots) {
      onSelectSlots(doctor);
    } else {
      navigate(`/booking/${doctor.id}`);
    }
  };

  const bmdcLabel = doctor.bmdcNumber.startsWith('BMDC-')
    ? doctor.bmdcNumber
    : `BMDC-${doctor.bmdcNumber}`;

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/10'
          : 'border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Left: Avatar with verified shield badge underneath */}
        <div className="relative shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          </div>

          <div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-2xs"
            title="BMDC Verified Specialist"
          >
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>

        {/* Center / Details Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Doctor Name + BMDC + Star Rating */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {doctor.name.startsWith('Dr.') || doctor.name.startsWith('Prof.')
                  ? doctor.name
                  : `Dr. ${doctor.name}`}
              </h3>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                {bmdcLabel}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs shrink-0 mt-0.5 sm:mt-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900">{doctor.rating.toFixed(1)}</span>
              <span className="text-slate-400">({doctor.reviewCount})</span>
            </div>
          </div>

          {/* Specialty */}
          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1">
            {doctor.speciality}
          </p>

          {/* Degrees */}
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
            {doctor.degrees}
          </p>

          {/* Hospital Affiliation */}
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.hospital}</span>
          </p>

          {/* Bottom Strip: CONSULT FEE, EXPERIENCE, SELECT SLOTS */}
          <div className="border-t border-slate-100 pt-2.5 sm:pt-3 mt-3 flex items-center justify-between flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  CONSULT FEE
                </span>
                <span className="text-sm sm:text-base md:text-lg font-black text-slate-900">
                  ৳{doctor.fee} BDT
                </span>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  EXPERIENCE
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {doctor.experienceYears} Years
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSelectSlotsClick}
              className={`min-h-[40px] sm:min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{isSelected ? 'Selected' : 'Select Slots'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
