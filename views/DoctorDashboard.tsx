
import React, { useState } from 'react';
import { User, Activity, FileText, CheckCircle, Video, ArrowRight, Pill, Send, Thermometer, Droplets } from 'lucide-react';

export const DoctorDashboard: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [consulting, setConsulting] = useState<string | null>(null);

  if (consulting) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <button onClick={() => setConsulting(null)} className="text-emerald-600 text-sm font-bold flex items-center gap-2">
          &larr; Exit Consultation
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={18} className="text-emerald-500" /> Current Consultation: {consulting}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Chief Complaints / Symptoms</label>
                  <textarea rows={4} className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="Patient reports severe headache and joint pain..."></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Diagnosis / Notes</label>
                  <textarea rows={3} className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="Suspected viral infection..."></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold flex items-center gap-2"><Pill size={18} className="text-blue-500" /> Prescribe Medication</h3>
                 <button className="text-xs font-bold text-emerald-600">+ Add Drug</button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                   <input className="col-span-1 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100" placeholder="Drug Name" />
                   <input className="col-span-1 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100" placeholder="Dosage" />
                   <input className="col-span-1 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100" placeholder="Duration" />
                </div>
                <textarea rows={2} className="w-full p-3 bg-slate-50 rounded-xl text-xs border border-slate-100" placeholder="Instructions (e.g. after meals)"></textarea>
              </div>
              <button className="mt-6 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Send size={18} /> Finalize & Send E-Prescription
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-sm mb-4">Patient Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold">JD</div>
                <div>
                  <p className="font-bold text-sm">{consulting}</p>
                  <p className="text-[10px] text-slate-400">ID: 1 1990 8 004562 1 20</p>
                </div>
              </div>
              <div className="space-y-3 text-[11px]">
                 <div className="flex justify-between border-b border-white/10 pb-2"><span>Age</span><span>34 Yrs</span></div>
                 <div className="flex justify-between border-b border-white/10 pb-2"><span>Gender</span><span>Male</span></div>
                 <div className="flex justify-between border-b border-white/10 pb-2"><span>Allergies</span><span className="text-rose-400 font-bold">Penicillin</span></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
               <h3 className="font-bold text-sm mb-4">Last Vitals</h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <Thermometer size={16} className="text-amber-500" />
                   <div className="flex-1"><p className="text-[10px] text-slate-400">Temp</p><p className="text-sm font-bold">38.2°C</p></div>
                 </div>
                 <div className="flex items-center gap-3">
                   <Droplets size={16} className="text-rose-500" />
                   <div className="flex-1"><p className="text-[10px] text-slate-400">Blood Sugar</p><p className="text-sm font-bold">110 mg/dL</p></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Dr. Kayitesi</h1>
        <div className="bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           <span className="text-xs font-bold text-emerald-700">Online & Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold">Next Patients</h3>
            <span className="text-xs text-slate-400">Total in queue: 4</span>
          </div>
          <div className="divide-y divide-slate-50">
             {['Umuhoza Solange', 'Gasana David', 'Habimana John', 'Mukamana Rose'].map((p, i) => (
               <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{p.charAt(0)}</div>
                    <div>
                      <h4 className="text-sm font-bold">{p}</h4>
                      <p className="text-[10px] text-slate-400">Appointment at {2 + i}:30 PM • {i === 0 ? 'Video' : 'In-Person'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {i === 0 && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-lg">Ready Now</span>}
                    <button 
                      onClick={() => setConsulting(p)}
                      className="bg-slate-900 text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-slate-800"
                    >
                      Consult Patient
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-700 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4">Clinic Efficiency</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Daily Target</span><span>14/20</span></div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-[70%]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">8.4</p>
                  <p className="text-[10px] opacity-60">Avg Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">12m</p>
                  <p className="text-[10px] opacity-60">Wait Time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-sm mb-4">Patient Updates</h3>
            <div className="space-y-4">
               {[1, 2].map(i => (
                 <div key={i} className="flex gap-3">
                   <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                   <div>
                     <p className="text-xs font-bold">Prescription refill requested</p>
                     <p className="text-[10px] text-slate-400">Kamanzi Eric • 20 mins ago</p>
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
