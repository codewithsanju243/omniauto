import React from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SOSBellIllustration } from '../data/illustrations';

export const SOSCard: React.FC = () => {
  const { setSosModalOpen, selectedCar } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-850 via-surface-900 to-surface-950 border border-brand-yellow/30 p-6 shadow-glow-gold transition-all hover:border-brand-yellow/60 group">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/20 transition-all" />
      
      <div className="relative z-10 flex items-center justify-between gap-4">
        
        {/* Left Text Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Auto SOS
            </h3>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </div>

          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            Notifications sent to your pre-selected emergency contacts with real-time GPS coordinates.
          </p>

          {/* Quick Vehicle Link info */}
          <div className="flex items-center gap-2 text-xs text-brand-yellow font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-yellow" />
            <span>Ready for {selectedCar.name} ({selectedCar.registrationNumber})</span>
          </div>

          {/* Large Yellow/Orange Pill CTA Button */}
          <button
            onClick={() => setSosModalOpen(true)}
            className="mt-2 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-extrabold text-sm tracking-wide uppercase shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span>ACTIVATE SOS</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>

        {/* Right 3D Golden Bell with Floating Animation */}
        <div className="shrink-0 relative cursor-pointer" onClick={() => setSosModalOpen(true)}>
          <div className="animate-float-bell">
            <SOSBellIllustration className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl" />
          </div>
        </div>

      </div>
    </div>
  );
};
