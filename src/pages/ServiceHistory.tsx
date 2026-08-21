import React from 'react';
import { History, CheckCircle2, Star, Download, MapPin, Car, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceHistory: React.FC = () => {
  const historyItems = [
    {
      id: 'SOS-849201',
      date: 'Feb 14, 2026 • 09:30 PM',
      service: 'Car Towing (Flatbed Recovery)',
      vehicle: 'BMW 3 Series (AZM9590)',
      provider: 'MV Tow Truck (Driver: Paul Sterling)',
      pickup: '211 W Highland, Seattle, WA',
      drop: 'BMW Seattle Service Center, 2802 Elliott Ave',
      amount: '₹999.00',
      rating: 5,
      status: 'Completed'
    },
    {
      id: 'SOS-729112',
      date: 'Jan 28, 2026 • 04:15 PM',
      service: 'Dead Battery Jumpstart & Diagnostic',
      vehicle: 'Porsche Taycan (WA78-EV91)',
      provider: 'VoltCharge Mobile Rescue (Driver: David Chen)',
      pickup: '1417 Queen Anne Ave N, Seattle',
      drop: 'On-site Resolved',
      amount: '₹499.00',
      rating: 5,
      status: 'Completed'
    },
    {
      id: 'SOS-618409',
      date: 'Dec 19, 2025 • 07:45 AM',
      service: 'Flat Tyre Repair & Pressure Calibration',
      vehicle: 'Hyundai Creta (WA-7892K)',
      provider: 'PNW Tyre Patrol 24/7 (Driver: Jack Harrison)',
      pickup: 'Mercer St & 5th Ave N, Seattle',
      drop: 'On-site Resolved',
      amount: '₹299.00',
      rating: 5,
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-wider">
            <History className="w-3.5 h-3.5" />
            <span>Assistance Records & Invoices</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Service History
          </h1>
          <p className="text-slate-400 text-sm">
            Past emergency dispatches, mechanic diagnostics and official verified invoices.
          </p>
        </div>

        {/* History Cards */}
        <div className="space-y-4">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-surface-900 border border-white/10 hover:border-white/20 transition-all shadow-card-dark flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brand-yellow bg-brand-yellow/10 px-2.5 py-1 rounded-lg border border-brand-yellow/20">
                    {item.id}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {item.service}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Car className="w-3.5 h-3.5 text-brand-yellow" /> {item.vehicle}
                    </span>
                    <span>•</span>
                    <span className="text-slate-300">{item.provider}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500 font-bold mr-1">From:</span> {item.pickup}
                  </div>
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500 font-bold mr-1">To:</span> {item.drop}
                  </div>
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 block font-medium">Paid Total</span>
                  <span className="font-display font-black text-2xl text-white">{item.amount}</span>
                  <div className="flex items-center gap-1 mt-0.5 justify-start md:justify-end">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading official PDF tax receipt for ${item.id}`)}
                  className="px-4 py-2 rounded-xl bg-surface-800 hover:bg-surface-750 text-slate-200 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
