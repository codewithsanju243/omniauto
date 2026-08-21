import React, { useState } from 'react';
import { Provider } from '../types';
import { useApp } from '../context/AppContext';
import { RedTowTruckVector } from '../data/illustrations';
import { 
  Phone, 
  Star, 
  MapPin, 
  Edit3, 
  ShieldCheck, 
  Check, 
  X,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onConfirm: () => void;
  onClose?: () => void;
  isConfirmed?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onConfirm,
  onClose,
  isConfirmed = false
}) => {
  const { currentLocation, updateDropAddress } = useApp();
  const [editingDrop, setEditingDrop] = useState(false);
  const [dropAddressInput, setDropAddressInput] = useState(currentLocation.dropAddress);
  const [showCallModal, setShowCallModal] = useState(false);

  const handleSaveDrop = () => {
    updateDropAddress(dropAddressInput);
    setEditingDrop(false);
  };

  return (
    <div className="relative w-full rounded-3xl bg-surface-900/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 shadow-2xl space-y-4 animate-slide-up">
      
      {/* Top Floating Driver Banner (Screen 3 Reference Style) */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-850 border border-white/10 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={provider.driverAvatar}
              alt={provider.driverName}
              className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-surface-850" />
          </div>
          <div>
            <span className="font-display font-bold text-sm text-white block">
              {provider.driverName} will reach your location
            </span>
            <span className="text-xs text-brand-yellow font-extrabold">
              in {provider.eta} minutes.
            </span>
          </div>
        </div>

        {/* Yellow Phone Call Button */}
        <button
          onClick={() => setShowCallModal(true)}
          className="p-3 rounded-2xl bg-brand-yellow text-black hover:bg-yellow-400 shadow-glow-gold hover:scale-105 active:scale-95 transition-all"
          title={`Call ${provider.driverName}`}
        >
          <Phone className="w-4 h-4 fill-black" />
        </button>
      </div>

      {/* Drop Location Row */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex-1 pr-2">
          <span className="text-slate-400 font-medium block">
            Drop Location
          </span>
          {editingDrop ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={dropAddressInput}
                onChange={(e) => setDropAddressInput(e.target.value)}
                className="bg-surface-800 text-xs text-white px-2.5 py-1 rounded-lg border border-white/20 w-full focus:outline-none focus:border-brand-yellow"
              />
              <button
                onClick={handleSaveDrop}
                className="px-2 py-1 bg-brand-yellow text-black font-bold rounded-lg text-[10px]"
              >
                Save
              </button>
            </div>
          ) : (
            <span className="font-bold text-slate-200 truncate block max-w-[240px] sm:max-w-xs">
              {currentLocation.dropAddress}
            </span>
          )}
        </div>

        {!editingDrop && (
          <button
            onClick={() => setEditingDrop(true)}
            className="text-brand-yellow hover:underline font-bold text-xs flex items-center gap-1 shrink-0"
          >
            <Edit3 className="w-3 h-3" />
            Edit
          </button>
        )}
      </div>

      {/* Middle Provider Details with Red Tow Truck Illustration */}
      <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-surface-850/60 border border-white/5">
        <div>
          <h4 className="font-display font-extrabold text-lg text-white">
            {provider.name}
          </h4>
          <span className="text-xs font-mono font-bold text-brand-yellow block">
            {provider.vehicleNumber}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
            <span className="text-xs font-bold text-slate-200">{provider.rating}</span>
            <span className="text-[11px] text-slate-400">({provider.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Tow Truck Vector Illustration */}
        <div className="shrink-0 -mr-1">
          <RedTowTruckVector className="w-24 h-16 drop-shadow-xl" />
        </div>
      </div>

      {/* Bottom Price and Large Confirm Button */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <div>
          <span className="text-xs text-slate-400 block font-medium">
            Total Fare
          </span>
          <span className="font-display font-black text-2xl text-white">
            ₹{provider.price}
          </span>
        </div>

        <button
          onClick={onConfirm}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          {isConfirmed ? 'View Live Status' : 'Confirm'}
        </button>
      </div>

      {/* Simulated Phone Call Dialog */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="rounded-3xl bg-surface-900 border border-brand-yellow/40 p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-brand-yellow text-black mx-auto flex items-center justify-center shadow-glow-gold animate-bounce">
              <Phone className="w-8 h-8 fill-black" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">Calling {provider.driverName}</h4>
              <span className="text-xs text-slate-400">{provider.driverPhone}</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 py-1.5 rounded-xl border border-emerald-500/20">
              Connecting via AUTO SOS Encrypted Relay...
            </p>
            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
