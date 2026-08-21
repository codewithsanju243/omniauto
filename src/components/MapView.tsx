import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { MOCK_PROVIDERS, MOCK_ROUTE_COORDINATES } from '../data/providers';
import { Provider, ProviderServiceType } from '../types';
import { 
  Crosshair, 
  Plus, 
  Minus, 
  Layers, 
  Zap, 
  Wrench, 
  Truck, 
  Fuel, 
  Disc, 
  ShieldAlert,
  Navigation
} from 'lucide-react';

interface MapViewProps {
  onSelectProvider?: (provider: Provider) => void;
  selectedProvider?: Provider | null;
  showRoute?: boolean;
  className?: string;
  interactive?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  onSelectProvider,
  selectedProvider,
  showRoute = true,
  className = 'w-full h-full min-h-[400px]',
  interactive = true
}) => {
  const { 
    currentLocation, 
    activeFilter, 
    setActiveFilter, 
    activeBooking, 
    currentDriverCoords, 
    driverETA 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);

  // Filter providers according to active tab
  const filteredProviders = MOCK_PROVIDERS.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'Mechanics') return p.type === 'Mechanic';
    if (activeFilter === 'Towing') return p.type === 'Towing';
    if (activeFilter === 'EV Charging') return p.type === 'EV Charging';
    if (activeFilter === 'Fuel') return p.type === 'Fuel';
    if (activeFilter === 'Tyres') return p.type === 'Tyres';
    if (activeFilter === 'Service') return p.type === 'Service' || p.type === 'Locksmith';
    return true;
  });

  const filterTabs: { label: string; value: ProviderServiceType | 'ALL'; icon?: any }[] = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Towing', value: 'Towing', icon: Truck },
    { label: 'Mechanics', value: 'Mechanic', icon: Wrench },
    { label: 'EV Charging', value: 'EV Charging', icon: Zap },
    { label: 'Fuel', value: 'Fuel', icon: Fuel },
    { label: 'Tyres', value: 'Tyres', icon: Disc },
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentLocation.latitude, currentLocation.longitude],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Dark Matter Tiles for authentic sleek dark automotive map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // clean up on unmount if needed
    };
  }, []);

  // Update Markers & Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. User Location Pulse Marker (Center beacon from reference Screen 3)
    const userHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 bg-amber-500/25 rounded-full animate-ping"></div>
        <div class="absolute w-8 h-8 bg-amber-500/40 rounded-full border border-brand-yellow/60"></div>
        <div class="relative w-4 h-4 bg-brand-yellow rounded-full border-2 border-black shadow-glow-gold flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
        </div>
      </div>
    `;
    const userIcon = L.divIcon({
      html: userHtml,
      className: 'custom-user-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const userMarker = L.marker([currentLocation.latitude, currentLocation.longitude], { icon: userIcon });
    userMarker.bindPopup(`
      <div style="background: #111622; color: #fff; padding: 6px 10px; border-radius: 12px; font-family: Outfit, sans-serif; border: 1px solid #f5a623;">
        <strong style="color: #f5a623;">📍 Your Location</strong><br/>
        <span style="font-size: 11px; color: #94a3b8;">${currentLocation.address}</span>
      </div>
    `);
    markersGroup.addLayer(userMarker);

    // 2. Providers Markers
    filteredProviders.forEach((prov) => {
      const isSelected = selectedProvider?.id === prov.id;
      const isEV = prov.type === 'EV Charging';
      const isTowing = prov.type === 'Towing';

      const provHtml = `
        <div class="group relative cursor-pointer flex flex-col items-center">
          <div class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 shadow-lg transition-transform hover:scale-110 ${
            isSelected 
              ? 'bg-brand-yellow text-black ring-2 ring-white scale-110 font-bold' 
              : isEV 
                ? 'bg-sky-500 text-white' 
                : 'bg-surface-800 text-slate-100 border border-white/20'
          }">
            ${prov.name.split(' ')[0]} • $${prov.price}
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-glow-gold border-2 ${
            isSelected 
              ? 'bg-brand-yellow border-white text-black' 
              : isEV 
                ? 'bg-sky-500 border-sky-300 text-white' 
                : 'bg-surface-850 border-brand-yellow text-brand-yellow'
          }">
            <span style="font-size: 13px;">${isTowing ? '🚚' : isEV ? '⚡' : '🔧'}</span>
          </div>
        </div>
      `;

      const provIcon = L.divIcon({
        html: provHtml,
        className: 'custom-provider-marker',
        iconSize: [60, 60],
        iconAnchor: [30, 45]
      });

      const marker = L.marker([prov.latitude, prov.longitude], { icon: provIcon });
      marker.on('click', () => {
        if (onSelectProvider) onSelectProvider(prov);
      });
      markersGroup.addLayer(marker);
    });

    // 3. Glowing Route Polyline (Matching Screen 3 reference: bold yellow connected road route)
    if (showRoute || activeBooking) {
      if (routePolylineRef.current) {
        map.removeLayer(routePolylineRef.current);
      }

      // Outer glow line
      const glowLine = L.polyline(MOCK_ROUTE_COORDINATES, {
        color: '#f59e0b',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      });
      markersGroup.addLayer(glowLine);

      // Inner solid bright route
      const mainLine = L.polyline(MOCK_ROUTE_COORDINATES, {
        color: '#fbbf24',
        weight: 4,
        opacity: 0.95,
        dashArray: activeBooking ? '8, 8' : undefined,
        lineCap: 'round',
        lineJoin: 'round'
      });
      markersGroup.addLayer(mainLine);
      routePolylineRef.current = mainLine;
    }

    // 4. Active Service Provider Live Marker Moving Along Route
    if (activeBooking) {
      const driverHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 bg-emerald-500/30 rounded-full animate-ping"></div>
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-yellow to-amber-500 flex items-center justify-center text-black font-extrabold shadow-glow-gold border-2 border-white">
            <span style="font-size: 18px;">🚚</span>
          </div>
        </div>
      `;
      const driverIcon = L.divIcon({
        html: driverHtml,
        className: 'driver-live-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const driverMarker = L.marker(currentDriverCoords, { icon: driverIcon });
      markersGroup.addLayer(driverMarker);
      driverMarkerRef.current = driverMarker;
    }

  }, [filteredProviders, selectedProvider, activeFilter, activeBooking, currentDriverCoords, showRoute]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    mapInstanceRef.current?.flyTo([currentLocation.latitude, currentLocation.longitude], 14, {
      duration: 1
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-surface-950 shadow-card-dark ${className}`}>
      
      {/* Interactive Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

      {/* Floating Filter Bar at Top of Map */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-900/90 backdrop-blur-xl border border-white/15 shadow-2xl pointer-events-auto overflow-x-auto max-w-full">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-brand-yellow text-black shadow-glow-gold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Map Controls (Recenter & Zoom) */}
      <div className="absolute right-4 bottom-6 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleRecenter}
          className="p-3 rounded-2xl bg-surface-900/90 backdrop-blur-md border border-white/15 text-brand-yellow hover:text-yellow-300 hover:bg-surface-800 shadow-xl transition-all"
          title="Recenter to GPS"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <div className="flex flex-col rounded-2xl bg-surface-900/90 backdrop-blur-md border border-white/15 shadow-xl overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-2.5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-white/10 w-full" />
          <button
            onClick={handleZoomOut}
            className="p-2.5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Status Overlay Badge (When Booking is Active) */}
      {activeBooking && (
        <div className="absolute top-16 left-4 z-20 pointer-events-none animate-slide-down">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-surface-900/95 backdrop-blur-xl border border-brand-yellow/50 shadow-glow-gold">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-white">
              {activeBooking.provider.name} is {driverETA > 0 ? `${driverETA} min away` : 'Arriving now!'}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
