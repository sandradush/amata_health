
import React from 'react';
import { LayoutDashboard, Calendar, MessageSquare, Pill, User, Settings, Bell, Menu, X, LogOut, HeartPulse, UserCheck, ShieldCheck, Search, Users, Key } from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  setRole: (role: Role) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, setRole, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const menus = {
    PATIENT: [
      { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
      { id: 'search', label: 'Find Doctor', icon: Search },
      { id: 'appointments', label: 'My Bookings', icon: Calendar },
      { id: 'meds', label: 'Prescriptions', icon: Pill },
    ],
    DOCTOR: [
      { id: 'dashboard', label: 'Queue', icon: LayoutDashboard },
      { id: 'schedule', label: 'My Schedule', icon: Calendar },
      { id: 'patients', label: 'Patient Files', icon: User },
      { id: 'history', label: 'Consult History', icon: MessageSquare },
    ],
    ADMIN: [
      { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
      { id: 'staff', label: 'Manage Staff', icon: Users },
      { id: 'roles', label: 'Role Permissions', icon: Key },
      { id: 'approvals', label: 'Doctor Requests', icon: ShieldCheck },
      { id: 'assignments', label: 'Assign Doctors', icon: UserCheck },
    ],
    RECEPTIONIST: [
      { id: 'dashboard', label: 'Check-in', icon: LayoutDashboard },
      { id: 'schedule', label: 'Appointments', icon: Calendar },
      { id: 'patients', label: 'Patients', icon: User },
    ]
  };

  const currentMenu = menus[role];

  if (role === 'PATIENT') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-4">
        <div className="w-full h-screen md:w-[420px] md:h-[840px] md:rounded-[3rem] md:border-[8px] md:border-slate-800 bg-white relative overflow-hidden shadow-2xl flex flex-col">
          <div className="h-6 bg-white hidden md:block"></div>
          <div className="flex-1 overflow-y-auto pb-24">
            <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">Amata Mobile</h1>
                    <p className="text-xs text-slate-500">Kigali, Rwanda</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">JD</div>
               </div>
               {children}
            </div>
          </div>
          <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-10">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`}
                >
                  <Icon size={20} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 rounded-full text-[10px] text-white opacity-20 hover:opacity-100 transition-opacity flex gap-2 cursor-pointer z-50">
            <span onClick={() => setRole('PATIENT')}>P</span>
            <span onClick={() => setRole('DOCTOR')}>D</span>
            <span onClick={() => setRole('ADMIN')}>A</span>
            <span onClick={() => setRole('RECEPTIONIST')}>R</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <HeartPulse size={24} />
            </div>
            <h1 className="text-xl font-bold text-emerald-900">Amata {role.charAt(0) + role.slice(1).toLowerCase()}</h1>
          </div>
          <nav className="flex-1 space-y-1">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none"
            >
              <option value="PATIENT">Switch to Patient</option>
              <option value="DOCTOR">Switch to Doctor</option>
              <option value="ADMIN">Switch to Admin</option>
              <option value="RECEPTIONIST">Switch to Receptionist</option>
            </select>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500 lg:hidden"><Menu size={20} /></button>
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative"><Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
              {role.substring(0,2).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="p-8 overflow-y-auto flex-1">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
