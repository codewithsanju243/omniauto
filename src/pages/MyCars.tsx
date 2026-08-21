import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleGraphic } from '../data/illustrations';
import { AddCarModal } from '../components/AddCarModal';
import { 
  Car, 
  Plus, 
  BatteryCharging, 
  Fuel, 
  ShieldCheck, 
  Calendar, 
  Trash2, 
  Edit3, 
  Check, 
  Zap, 
  Sparkles,
  Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyCars: React.FC = () => {
  const { 
    cars, 
    selectedCar, 
    selectCarById, 
    removeCar 
  } = useApp();

  const navigate = useNavigate();
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Add Car Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              <span>Digital Garage & Telemetry</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
              My Saved Vehicles
            </h1>
            <p className="text-slate-400 text-sm">
              Manage your registered automobiles, sync roadside telemetry and customize emergency profiles.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Car</span>
          </button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => {
            const isSelected = selectedCar.id === car.id;
            const isEV = car.type === 'EV';
            const percentage = isEV ? car.battery : car.fuel;

            return (
              <div
                key={car.id}
                className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-surface-850 to-surface-900 border-2 border-brand-yellow shadow-glow-gold'
                    : 'bg-surface-850/80 border border-white/10 hover:border-white/25 hover:bg-surface-800'
                }`}
              >
                {/* Active Selection Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-brand-yellow text-black font-extrabold text-[11px] shadow-lg">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ACTIVE CAR</span>
                  </div>
                )}

                {/* Top Info */}
                <div className="space-y-1 pr-16">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isEV ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {car.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {car.registrationNumber}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-white">
                    {car.name}
                  </h3>
                  <span className="text-xs text-slate-400 block truncate">
                    {car.model}
                  </span>
                </div>

                {/* 3D Illustration */}
                <div className="my-4 flex justify-center items-center h-32">
                  <VehicleGraphic modelId={car.image} className="w-full h-full max-w-[240px] drop-shadow-xl" />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-surface-950/60 border border-white/5 text-xs mb-4">
                  <div className="flex items-center gap-2">
                    {isEV ? <BatteryCharging className="w-4 h-4 text-sky-400" /> : <Fuel className="w-4 h-4 text-brand-yellow" />}
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isEV ? 'Battery' : 'Fuel'}</span>
                      <strong className="text-white text-sm">{percentage}%</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-brand-yellow" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Range</span>
                      <strong className="text-white text-sm">{car.range} km</strong>
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span>Health Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {car.healthStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>VIN:</span>
                    <span className="font-mono text-slate-300">{car.vin}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  {isSelected ? (
                    <button
                      onClick={() => navigate('/')}
                      className="flex-1 py-2.5 rounded-xl bg-brand-yellow text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-colors"
                    >
                      Request Service
                    </button>
                  ) : (
                    <button
                      onClick={() => selectCarById(car.id)}
                      className="flex-1 py-2.5 rounded-xl bg-surface-800 hover:bg-surface-750 border border-white/10 text-white font-bold text-xs hover:border-brand-yellow/40 transition-colors"
                    >
                      Select Car
                    </button>
                  )}

                  {cars.length > 1 && (
                    <button
                      onClick={() => removeCar(car.id)}
                      className="p-2.5 rounded-xl bg-surface-800 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-white/5 transition-colors"
                      title="Remove vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <AddCarModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  );
};
