
import React from 'react';
import { UserPlus, Calendar, Search, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const ReceptionistDashboard: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reception Desk</h1>
          <p className="text-slate-500 text-sm">Managing patient flow for today</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          <UserPlus size={18} /> Walk-in Registration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Appointments To Check-in</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search by name..." className="pl-8 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs" />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Kamanzi Eric', time: '14:30', doc: 'Dr. Sarah', type: 'In-Person' },
                { name: 'Umuhoza Solange', time: '14:45', doc: 'Dr. Sarah', type: 'Video' },
                { name: 'Niyigena Eric', time: '15:15', doc: 'Dr. Kalisa', type: 'In-Person' }
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{p.name}</h4>
                      <p className="text-[10px] text-slate-500">With {p.doc} • {p.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">{p.time}</p>
                      <p className="text-[10px] text-slate-400">Scheduled</p>
                    </div>
                    <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <h3 className="font-bold text-sm mb-4">Clinic Status</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Clock size={16} className="text-emerald-400" />
                     <span className="text-xs font-medium">Wait Time</span>
                  </div>
                  <span className="text-sm font-bold">~ 15 mins</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Calendar size={16} className="text-blue-400" />
                     <span className="text-xs font-medium">Booked Today</span>
                  </div>
                  <span className="text-sm font-bold">24 / 32</span>
               </div>
               <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[75%]"></div>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-sm mb-4">Doctor Availability</h3>
             <div className="space-y-4">
               {[
                 { name: 'Dr. Sarah', status: 'Available', color: 'bg-emerald-500' },
                 { name: 'Dr. Kalisa', status: 'In Consultation', color: 'bg-amber-500' },
                 { name: 'Dr. Uwase', status: 'Offline', color: 'bg-slate-300' }
               ].map((d, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">{d.name}</span>
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${d.color}`}></span>
                       <span className="text-[10px] text-slate-500">{d.status}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
