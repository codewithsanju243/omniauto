import React, { useState } from 'react';
import { X, Car, Plus, ShieldCheck, Zap, Fuel } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Vehicle, FuelType } from '../types';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose }) => {
  const { addCar } = useApp();

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState<FuelType>('EV');
  const [regNumber, setRegNumber] = useState('');
  const [range, setRange] = useState(300);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !regNumber) return;

    const newVehicle: Vehicle = {
      id: `car-${Date.now()}`,
      name,
      model: model || `${name} Standard Edition`,
      type,
      registrationNumber: regNumber.toUpperCase(),
      range: Number(range),
      battery: type === 'EV' ? 90 : undefined,
      fuel: type !== 'EV' ? 85 : undefined,
      healthStatus: 'Healthy',
      vin: `WA${Math.floor(10000000 + Math.random() * 90000000)}`,
      lastServiceDate: 'Today',
      insuranceExpiry: '2027',
      image: type === 'EV' ? 'taycan' : 'bmw-3'
    };

    addCar(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-surface-900 border border-white/15 shadow-2xl p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-brand-yellow/20 text-brand-yellow">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Add New Vehicle</h3>
              <span className="text-xs text-slate-400">Sync with AUTO SOS 24/7 Fleet</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 block">Vehicle Name / Brand</label>
            <input
              type="text"
              required
              placeholder="e.g. Audi e-tron GT / Mercedes C300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-800 text-sm text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-brand-yellow focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 block">Trim / Model Description</label>
            <input
              type="text"
              placeholder="e.g. Quattro Performance AWD"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-surface-800 text-sm text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-brand-yellow focus:outline-none"
            />
          </div>

          {/* Powertrain Type Selector */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 block">Powertrain Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['EV', 'Petrol', 'Diesel'] as FuelType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    type === t
                      ? 'bg-brand-yellow text-black shadow-glow-gold'
                      : 'bg-surface-800 text-slate-300 hover:bg-surface-750'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-400 block">Registration Plate</label>
              <input
                type="text"
                required
                placeholder="e.g. WA-5928K"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                className="w-full bg-surface-800 text-sm font-mono text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-brand-yellow focus:outline-none uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-400 block">Estimated Range (km)</label>
              <input
                type="number"
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="w-full bg-surface-800 text-sm text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-brand-yellow focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Add Car to Garage
          </button>
        </form>

      </div>
    </div>
  );
};
