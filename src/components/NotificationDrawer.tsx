import React from 'react';
import { X, Bell, ShieldAlert, CheckCheck, Car, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    notificationDrawerOpen, 
    setNotificationDrawerOpen, 
    notifications, 
    markNotificationRead 
  } = useApp();

  if (!notificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-surface-900 border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-yellow/20 text-brand-yellow">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Notifications</h3>
                  <span className="text-xs text-slate-400">Emergency & Vehicle Updates</span>
                </div>
              </div>

              <button
                onClick={() => setNotificationDrawerOpen(false)}
                className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification List */}
            <div className="mt-4 space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      notif.read
                        ? 'bg-surface-850/40 border-white/5 opacity-70'
                        : 'bg-surface-850 border-brand-yellow/30 shadow-card-dark'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {notif.type === 'emergency' && (
                          <span className="p-1 rounded-lg bg-red-500/20 text-red-400">
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {notif.type === 'vehicle' && (
                          <span className="p-1 rounded-lg bg-sky-500/20 text-sky-400">
                            <Car className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <h4 className="font-bold text-xs text-white">{notif.title}</h4>
                      </div>
                      <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {notif.message}
                    </p>

                    {!notif.read && (
                      <div className="mt-2 flex justify-end">
                        <span className="text-[10px] text-brand-yellow font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Mark read
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                notifications.forEach(n => markNotificationRead(n.id));
              }}
              className="w-full py-2.5 rounded-xl bg-surface-800 hover:bg-surface-750 text-slate-300 text-xs font-semibold"
            >
              Mark all as read
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
