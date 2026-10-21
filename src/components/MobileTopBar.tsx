import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Video, Search, MessageCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileTopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== '/doctors' && location.pathname !== '/consultation') {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="md:hidden bg-gradient-to-b from-[#EAF2FF] to-[#FFFFFF] font-['Poppins',sans-serif] print:hidden">
      {/* Row 1 (height 48px, static / not sticky) */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Left: 24px video-call icon (navy) + "Video" (20px/700, navy) + "Consultation" inside brand-blue (#1F6BFF) pill */}
        <div
          onClick={() => navigate('/doctors')}
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <Video className="w-6 h-6 text-[#0B1E48] shrink-0" />
          <span className="text-[20px] font-bold text-[#0B1E48] tracking-tight leading-none">
            Video
          </span>
          <div className="bg-[#1F6BFF] px-2 py-0.5 rounded-[4px] -skew-x-[8deg] flex items-center justify-center shadow-xs">
            <span className="text-[20px] font-bold text-white skew-x-[8deg] leading-none">
              Consultation
            </span>
          </div>
        </div>

        {/* Right: 32px blue support-chat bubble icon (min 44px tap area) */}
        <button
          type="button"
          onClick={() => navigate('/contact')}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1F6BFF] hover:opacity-85 transition-opacity cursor-pointer"
          aria-label="24/7 Support Chat"
        >
          <MessageCircle className="w-8 h-8 fill-[#1F6BFF]/10 text-[#1F6BFF]" />
        </button>
      </div>

      {/* Row 2 (Search input, height 44px, sticky top-0) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs px-4 pb-2.5 pt-1">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name/code or department"
            className="w-full h-11 bg-white border border-[#D9DEE7] rounded-[12px] pl-4 pr-11 text-[15px] text-slate-800 placeholder:text-[15px] placeholder:text-[#6B7280] focus:outline-none focus:border-[#1F6BFF] focus:ring-1 focus:ring-[#1F6BFF]/30 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-8 h-8 absolute right-9 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Search className="w-[22px] h-[22px] text-[#6B7280] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </form>
      </div>
    </div>
  );
};
