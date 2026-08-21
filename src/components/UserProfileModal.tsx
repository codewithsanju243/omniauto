import React from 'react';
import { X, User, Phone, ShieldCheck, CreditCard, Bell, MapPin, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfileModal: React.FC = () => {
  const { userProfileOpen, setUserProfileOpen, selectedCar, currentLocation } = useApp();

  if (!userProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-surface-900 border border-white/15 shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-yellow to-amber-600 flex items-center justify-center text-black font-black text-lg shadow-glow-gold">
              AW
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Alex Warner</h3>
              <span className="text-xs text-brand-yellow font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> AUTO SOS Elite Member
              </span>
            </div>
          </div>

          <button
            onClick={() => setUserProfileOpen(false)}
            className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Details */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-surface-850 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-yellow" /> Mobile Phone:</span>
              <strong className="text-white">+1 (206) 555-0199</strong>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-yellow" /> Primary Base:</span>
              <strong className="text-white">Seattle, WA 98119</strong>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Roadside Coverage:</span>
              <strong className="text-emerald-400">24/7 Unlimited Fleet Rescue</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow/10 to-amber-600/10 border border-brand-yellow/30">
            <span className="text-xs font-bold text-brand-yellow block mb-1">
              Active Vehicle Synchronized
            </span>
            <p className="text-xs text-slate-200">
              {selectedCar.name} • {selectedCar.registrationNumber} ({selectedCar.type})
            </p>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => setUserProfileOpen(false)}
          className="w-full py-3 rounded-2xl bg-surface-800 hover:bg-surface-750 text-white font-bold text-xs uppercase tracking-wider"
        >
          Close Profile
        </button>

      </div>
    </div>
  );
};
