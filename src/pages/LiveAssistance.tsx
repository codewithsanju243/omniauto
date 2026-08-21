import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/MapView';
import { MOCK_PROVIDERS } from '../data/providers';
import { RedTowTruckVector } from '../data/illustrations';
import { 
  Phone, 
  MessageSquare, 
  XCircle, 
  Navigation, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send,
  Radio,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveAssistance: React.FC = () => {
  const { 
    activeBooking, 
    cancelBooking, 
    createBooking, 
    currentLocation, 
    driverETA, 
    driverStatus,
    selectedCar
  } = useApp();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'driver' | 'user'; text: string; time: string }[]>([
    { sender: 'driver', text: "Hi! I'm Paul with MV Tow Truck. I've accepted your request and I'm currently on Queen Anne Ave heading towards you.", time: 'Just now' },
    { sender: 'driver', text: "Please ensure your hazard lights are on if you're stopped on the roadside.", time: 'Just now' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [callModalOpen, setCallModalOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Simulated driver response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'driver',
          text: "Copy that! I can see your GPS beacon clearly. Almost there!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  // Start instant demo if no active booking
  const handleStartDemo = () => {
    createBooking('car-towing', 'Car Towing', MOCK_PROVIDERS[0], 'Flatbed towing requested');
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                Live Assistance Radar
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Encrypted satellite link with active rescue vehicle
            </p>
          </div>

          {activeBooking ? (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-surface-850 border border-brand-yellow/30 text-xs font-mono font-bold text-brand-yellow flex items-center gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>BOOKING #{activeBooking.id}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartDemo}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-yellow to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold hover:scale-105 transition-all"
            >
              Dispatch Demo Unit (Paul - MV Tow Truck)
            </button>
          )}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Live Map Full View (7 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
              <MapView showRoute={true} className="w-full h-full" />
            </div>

            {/* Step Progress Indicators */}
            <div className="p-4 rounded-2xl bg-surface-850 border border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-surface-900 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Dispatched</span>
              </div>

              <div className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 ${
                driverStatus === 'arrived' 
                  ? 'bg-surface-900 border-emerald-500/30 text-emerald-400' 
                  : 'bg-brand-yellow/15 border-brand-yellow/40 text-brand-yellow animate-pulse'
              }`}>
                <Navigation className="w-4 h-4" />
                <span>2. {driverStatus === 'arrived' ? 'Arrived' : 'En Route'}</span>
              </div>

              <div className={`p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 ${
                driverStatus === 'arrived'
                  ? 'bg-brand-yellow/15 border-brand-yellow/40 text-brand-yellow animate-pulse'
                  : 'bg-surface-900 border-white/5 text-slate-500'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                <span>3. Service Execution</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Tracking Card (Matching Reference Screen 3) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            
            {activeBooking ? (
              <div className="rounded-3xl bg-surface-900/95 backdrop-blur-xl border border-brand-yellow/30 p-6 shadow-glow-gold space-y-5 animate-slide-up">
                
                {/* Driver ETA Banner */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-850 border border-white/10 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={activeBooking.provider.driverAvatar}
                        alt={activeBooking.provider.driverName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-surface-850" />
                    </div>
                    <div>
                      <span className="font-display font-black text-base text-white block">
                        {activeBooking.provider.driverName}
                      </span>
                      <span className="text-xs text-brand-yellow font-extrabold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {driverETA > 0 ? `Arriving in ~${driverETA} minutes` : 'Arrived at your location!'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCallModalOpen(true)}
                    className="p-3 rounded-2xl bg-brand-yellow text-black hover:bg-yellow-400 shadow-glow-gold transition-transform hover:scale-105"
                    title="Call Driver"
                  >
                    <Phone className="w-4 h-4 fill-black" />
                  </button>
                </div>

                {/* Pickup and Drop Details */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-surface-850/60 border border-white/5 space-y-1">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-yellow" /> Pick-up Location
                    </span>
                    <p className="text-white font-medium pl-4">{activeBooking.pickupLocation}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-surface-850/60 border border-white/5 space-y-1">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-sky-400" /> Drop Location / Workshop
                    </span>
                    <p className="text-white font-medium pl-4">{activeBooking.dropLocation || 'Authorized Brand Workshop'}</p>
                  </div>
                </div>

                {/* Assigned Vehicle & Illustration */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-850/80 border border-white/10">
                  <div>
                    <h4 className="font-display font-extrabold text-base text-white">
                      {activeBooking.provider.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-brand-yellow block">
                      {activeBooking.provider.vehicleNumber}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                      <span className="font-bold text-white">{activeBooking.provider.rating}</span>
                      <span className="text-slate-400 font-mono">({activeBooking.provider.vehicleModel})</span>
                    </div>
                  </div>

                  <div className="shrink-0 -mr-1">
                    <RedTowTruckVector className="w-20 h-14" />
                  </div>
                </div>

                {/* Total Fare & Actions */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Guaranteed Flat Total</span>
                    <span className="font-display font-black text-2xl text-white">
                      ₹{activeBooking.totalCost}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setChatOpen(true)}
                      className="py-3 px-4 rounded-xl bg-surface-800 hover:bg-surface-750 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-yellow" />
                      <span>Message</span>
                    </button>

                    <button
                      onClick={cancelBooking}
                      className="py-3 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="rounded-3xl bg-surface-900 border border-white/10 p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow mx-auto flex items-center justify-center">
                  <Navigation className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    No Active Assistance
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Select a service from the catalog or dispatch an instant test tow truck to view live GPS tracking.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleStartDemo}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-gold hover:scale-[1.02] transition-all"
                  >
                    Start Simulated Tow Truck
                  </button>

                  <Link
                    to="/services"
                    className="block w-full py-3 rounded-2xl bg-surface-800 text-slate-300 font-bold text-xs hover:text-white"
                  >
                    Browse All Services
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Driver Chat Drawer */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-surface-900 border border-white/15 shadow-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeBooking?.provider.driverAvatar || MOCK_PROVIDERS[0].driverAvatar}
                  alt="Driver"
                  className="w-10 h-10 rounded-full object-cover border-2 border-brand-yellow"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{activeBooking?.provider.driverName || 'Paul Sterling'}</h4>
                  <span className="text-xs text-emerald-400 font-medium">● Online • Approaching in {driverETA} min</span>
                </div>
              </div>

              <button onClick={() => setChatOpen(false)} className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-64 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-yellow text-black font-semibold rounded-br-none'
                        : 'bg-surface-800 text-slate-200 rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message to Paul..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-surface-800 text-xs text-white px-4 py-3 rounded-2xl border border-white/10 focus:border-brand-yellow focus:outline-none"
              />
              <button
                type="submit"
                className="p-3 bg-brand-yellow text-black font-bold rounded-2xl hover:bg-yellow-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Driver Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="rounded-3xl bg-surface-900 border border-brand-yellow/40 p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-brand-yellow text-black mx-auto flex items-center justify-center shadow-glow-gold animate-bounce">
              <Phone className="w-8 h-8 fill-black" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">Calling {activeBooking?.provider.driverName || 'Paul'}</h4>
              <span className="text-xs text-slate-400">{activeBooking?.provider.driverPhone || '+1 (206) 555-0192'}</span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 py-1.5 rounded-xl border border-emerald-500/20">
              Live Encrypted Dispatch Voice Channel
            </p>
            <button
              onClick={() => setCallModalOpen(false)}
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
