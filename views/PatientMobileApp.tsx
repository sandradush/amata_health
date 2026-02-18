
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Star, ArrowRight, Video, Stethoscope, Clock, CheckCircle2, Send } from 'lucide-react';

export const PatientMobileApp: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [requestStep, setRequestStep] = useState<'IDLE' | 'FORM' | 'SUCCESS'>('IDLE');
  const [symptoms, setSymptoms] = useState('');

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {requestStep === 'SUCCESS' ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-emerald-900 font-bold text-lg">Request Sent!</h2>
            <p className="text-emerald-700 text-xs mt-2">Your consultation request has been sent to the Admin for approval and doctor assignment.</p>
            <button 
              onClick={() => setRequestStep('IDLE')}
              className="mt-6 text-emerald-600 font-bold text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-100">
            <h2 className="text-lg font-bold">Health Summary</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <p className="text-[10px] opacity-80 uppercase font-bold">Request Status</p>
                <p className="font-bold text-sm">Awaiting Admin</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <p className="text-[10px] opacity-80 uppercase font-bold">Weight</p>
                <p className="font-bold text-sm">72.4 kg</p>
              </div>
            </div>
          </div>
        )}

        {requestStep === 'FORM' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-900">Request Consultation</h3>
            <p className="text-xs text-slate-500">Briefly describe your symptoms for the Admin to assign the right specialist.</p>
            <textarea 
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Sharp pain in lower back, started 2 days ago..."
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm h-32 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
            <button 
              onClick={() => setRequestStep('SUCCESS')}
              disabled={!symptoms.trim()}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={18} /> Submit to Admin
            </button>
            <button onClick={() => setRequestStep('IDLE')} className="w-full text-slate-400 text-xs font-bold py-2">Cancel</button>
          </div>
        )}

        {requestStep === 'IDLE' && (
          <>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setRequestStep('FORM')}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left hover:border-emerald-500 transition-colors"
                >
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <Video size={20} />
                  </div>
                  <p className="font-bold text-sm">Request Consult</p>
                  <p className="text-[10px] text-slate-500">Admin will assign Doc</p>
                </button>
                <button className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left hover:border-emerald-500 transition-colors">
                  <div className="bg-amber-100 text-amber-600 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <Stethoscope size={20} />
                  </div>
                  <p className="font-bold text-sm">Emergency</p>
                  <p className="text-[10px] text-slate-500">Call local clinic</p>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Available Specialists</h3>
                <button className="text-emerald-600 text-xs font-bold">See All</button>
              </div>
              <div className="space-y-3">
                 {[1, 2].map(i => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                          <img src={`https://picsum.photos/seed/med${i}/100/100`} alt="Doc" className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-900">Dr. {i === 1 ? 'Uwase Ange' : 'Habimana Eric'}</h4>
                          <p className="text-[10px] text-slate-500">Cardiologist • Kigali</p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (activeTab === 'search' ? (
    <div className="text-center py-20 text-slate-400">
      <Search size={40} className="mx-auto mb-4 opacity-20" />
      <p className="text-sm">Use "Request Consult" on Home to start the assignment process.</p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 space-y-4 py-20">
      <div className="bg-slate-50 p-8 rounded-full">
        <Clock size={48} />
      </div>
      <p className="text-sm font-medium">Coming soon in the next update!</p>
    </div>
  ));
};
