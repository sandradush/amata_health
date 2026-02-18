
import React from 'react';
import { Users, Calendar as CalendarIcon, FileText, CheckCircle, TrendingUp, Search, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ClinicDashboard: React.FC = () => {
  const data = [
    { name: 'Mon', visits: 45 },
    { name: 'Tue', visits: 52 },
    { name: 'Wed', visits: 38 },
    { name: 'Thu', visits: 65 },
    { name: 'Fri', visits: 48 },
    { name: 'Sat', visits: 24 },
    { name: 'Sun', visits: 12 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hospital Clinic Overview</h1>
          <p className="text-slate-500 text-sm">Managing King Faisal Outpatient Center</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
            <Plus size={18} />
            New Appointment
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '2,840', icon: Users, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Consultations', value: '456', icon: CalendarIcon, change: '+5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'E-Prescriptions', value: '1,204', icon: FileText, change: '+18%', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Completion Rate', value: '98.2%', icon: CheckCircle, change: '+0.5%', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500">{stat.change}</span>
                  <span className="text-[10px] text-slate-400">vs last month</span>
                </div>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Volume Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Weekly Patient Traffic</h3>
            <select className="text-sm bg-slate-50 border-none focus:ring-0 rounded-lg p-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visits" radius={[4, 4, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Queue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Live Consultation Queue</h3>
          <div className="flex-1 space-y-4">
            {[
              { name: 'Kamanzi Eric', time: '14:30', status: 'Live Now', pulse: true },
              { name: 'Umuhoza Solange', time: '14:45', status: 'Waiting', pulse: false },
              { name: 'Habimana John', time: '15:15', status: 'Waiting', pulse: false },
              { name: 'Mugisha Paul', time: '15:30', status: 'Upcoming', pulse: false },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{p.name}</p>
                    <p className="text-[10px] text-slate-400">Scheduled: {p.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    {p.pulse && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${p.pulse ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Manage Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;
