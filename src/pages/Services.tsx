import React, { useState } from 'react';
import { ALL_SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { AssistanceSheet } from '../components/AssistanceSheet';
import { ServiceCategory } from '../types';
import { Search, Filter, Wrench, Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeService, setActiveService] = useState<ServiceCategory | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'emergency', label: '🚨 Emergency' },
    { id: 'towing', label: '🚗 Towing' },
    { id: 'repair', label: '🔧 Repairs & Mechanic' },
    { id: 'ev', label: '⚡ EV Charging' },
    { id: 'battery', label: '🔋 Battery' },
    { id: 'tyre', label: '🛞 Tyres' },
    { id: 'fuel', label: '⛽ Fuel Delivery' },
  ];

  const filteredServices = ALL_SERVICES.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Complete Automobile Rescue Catalog</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Roadside & Emergency Services
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Select an issue to view instant upfront flat pricing, available equipment, and nearest dispatch times across Seattle.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Filter by problem e.g. tyre, battery, towing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-850 text-sm text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-2xl border border-white/10 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/20"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-yellow text-black shadow-glow-gold'
                    : 'bg-surface-850 text-slate-300 hover:bg-surface-800 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-surface-900 rounded-3xl border border-white/10 p-8 space-y-3">
            <p className="text-base text-slate-300 font-bold">No services found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500">Try searching for towing, mechanic, puncture, or jumpstart</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-brand-yellow text-black font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => setActiveService(service)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Service Request Sheet */}
      <AssistanceSheet
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </div>
  );
};
