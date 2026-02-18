
import React from 'react';
import { Calendar, Video, Clock, ChevronRight, Activity, Droplets, Thermometer } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const stats = [
    { label: 'Next Visit', value: 'Today, 2:30 PM', icon: Clock, color: 'bg-blue-500' },
    { label: 'Blood Pressure', value: '120/80', icon: Activity, color: 'bg-emerald-500' },
    { label: 'Blood Glucose', value: '94 mg/dL', icon: Droplets, color: 'bg-rose-500' },
    { label: 'Temperature', value: '36.8°C', icon: Thermometer, color: 'bg-amber-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-emerald-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Muraho, Jean! 👋</h1>
          <p className="text-emerald-100 mb-6 max-w-md">Your health journey is looking great. You have one upcoming video consultation today.</p>
          <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2">
            <Video size={18} />
            Join Consultation Room
          </button>
        </div>
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4`}>
                <Icon size={20} />
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
            <button className="text-emerald-600 text-sm font-semibold hover:underline">See all</button>
          </div>
          
          {[1, 2].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-emerald-200 transition-all">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/doc${i}/100/100`} alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Dr. Uwase Ange</h4>
                <p className="text-sm text-slate-500">General Physician • King Faisal Hospital</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">June 24</p>
                <p className="text-xs text-slate-500">09:00 AM</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
            </div>
          ))}
        </div>

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Active Prescriptions</h3>
          <div className="space-y-3">
            {[
              { name: 'Amoxicillin', dose: '500mg, 3x Daily', color: 'border-l-blue-500' },
              { name: 'Paracetamol', dose: '1000mg, As needed', color: 'border-l-emerald-500' },
              { name: 'Vitamin C', dose: '1000mg, 1x Daily', color: 'border-l-amber-500' }
            ].map((med, i) => (
              <div key={i} className={`bg-white p-4 rounded-xl border border-slate-100 border-l-4 ${med.color} shadow-sm`}>
                <h4 className="font-bold text-slate-900">{med.name}</h4>
                <p className="text-xs text-slate-500">{med.dose}</p>
                <button className="mt-2 text-[10px] uppercase font-bold text-slate-400 hover:text-emerald-600">Refill Request</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
