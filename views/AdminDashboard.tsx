
import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Users, Calendar, AlertCircle, Check, X, Search, UserCheck, Stethoscope, Mail, Plus, Trash2, Key, Settings, Shield } from 'lucide-react';
import { Staff, RoleDefinition, Permission } from '../types';

const AVAILABLE_PERMISSIONS: { id: Permission; label: string; desc: string }[] = [
  { id: 'VIEW_DASHBOARD', label: 'View Dashboard', desc: 'Access to general clinic overview' },
  { id: 'MANAGE_STAFF', label: 'Manage Staff', desc: 'Register and delete staff members' },
  { id: 'APPROVE_DOCTORS', label: 'Approve Doctors', desc: 'Review and approve doctor registrations' },
  { id: 'ASSIGN_APPOINTMENTS', label: 'Assign Appointments', desc: 'Assign doctors to patient requests' },
  { id: 'VIEW_PATIENT_RECORDS', label: 'View Patient Records', desc: 'Access to sensitive medical files' },
  { id: 'CONSULT_PATIENTS', label: 'Consult Patients', desc: 'Perform clinical consultations' },
  { id: 'WRITE_PRESCRIPTIONS', label: 'Write Prescriptions', desc: 'Generate digital prescriptions' },
  { id: 'RECEPTION_ACCESS', label: 'Reception Access', desc: 'Check-in patients and manage local flow' },
];

export const AdminDashboard: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  
  const [roles, setRoles] = useState<RoleDefinition[]>([
    { id: 'r1', name: 'Doctor', description: 'Clinical staff for patient care', permissions: ['VIEW_DASHBOARD', 'VIEW_PATIENT_RECORDS', 'CONSULT_PATIENTS', 'WRITE_PRESCRIPTIONS'] },
    { id: 'r2', name: 'Receptionist', description: 'Front desk management', permissions: ['VIEW_DASHBOARD', 'RECEPTION_ACCESS', 'ASSIGN_APPOINTMENTS'] },
    { id: 'r3', name: 'System Admin', description: 'Full platform access', permissions: AVAILABLE_PERMISSIONS.map(p => p.id) },
  ]);

  const [staffList, setStaffList] = useState<Staff[]>([
    { id: '1', name: 'Dr. Kayitesi Sarah', role: 'Doctor', roleId: 'r1', specialty: 'General Physician', email: 'sarah.k@amata.health', status: 'ACTIVE' },
    { id: '2', name: 'Mugisha Eric', role: 'Receptionist', roleId: 'r2', email: 'eric.m@amata.health', status: 'ACTIVE' },
    { id: '3', name: 'Dr. Kalisa Jean', role: 'Doctor', roleId: 'r1', specialty: 'Dermatologist', email: 'jean.k@amata.health', status: 'ACTIVE' },
  ]);

  const [newStaff, setNewStaff] = useState<Partial<Staff>>({ roleId: 'r1' });
  const [newRole, setNewRole] = useState<Partial<RoleDefinition>>({ permissions: [] });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.roleId) return;
    
    const selectedRole = roles.find(r => r.id === newStaff.roleId);
    
    const staff: Staff = {
      id: Date.now().toString(),
      name: newStaff.name,
      role: selectedRole?.name || 'Unknown',
      roleId: newStaff.roleId,
      email: newStaff.email,
      specialty: newStaff.specialty,
      status: 'ACTIVE'
    };
    
    setStaffList([...staffList, staff]);
    setShowAddStaff(false);
    setNewStaff({ roleId: 'r1' });
  };

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.name) return;
    
    const role: RoleDefinition = {
      id: 'r' + Date.now(),
      name: newRole.name,
      description: newRole.description || '',
      permissions: newRole.permissions || []
    };
    
    setRoles([...roles, role]);
    setShowAddRole(false);
    setNewRole({ permissions: [] });
  };

  const togglePermission = (permId: Permission) => {
    setNewRole(prev => {
      const perms = prev.permissions || [];
      if (perms.includes(permId)) {
        return { ...prev, permissions: perms.filter(p => p !== permId) };
      } else {
        return { ...prev, permissions: [...perms, permId] };
      }
    });
  };

  const pendingRequests = [
    { id: '1', name: 'Gasana David', symptoms: 'Severe persistent cough for 3 days, mild fever.', date: 'Today, 10:15 AM' },
    { id: '2', name: 'Mukamana Rose', symptoms: 'Rash appearing on arms and chest after new medication.', date: 'Today, 11:30 AM' },
    { id: '3', name: 'Niyigena Eric', symptoms: 'Routine post-surgery follow-up check.', date: 'Yesterday' }
  ];

  if (activeTab === 'roles') {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Role & Permission Management</h2>
          <button 
            onClick={() => setShowAddRole(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <Plus size={18} /> Create New Role
          </button>
        </div>

        {showAddRole && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-4">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold flex items-center gap-3">
                 <Shield className="text-emerald-500" /> Define System Role
               </h3>
               <button onClick={() => setShowAddRole(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
             </div>
             
             <form onSubmit={handleAddRole} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Role Name</label>
                      <input 
                        required
                        type="text" 
                        value={newRole.name || ''}
                        onChange={e => setNewRole({...newRole, name: e.target.value})}
                        placeholder="e.g. Head Nurse"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5 focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                      <textarea 
                        rows={3}
                        value={newRole.description || ''}
                        onChange={e => setNewRole({...newRole, description: e.target.value})}
                        placeholder="Purpose of this role..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-4">Assign Permissions</label>
                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                      {AVAILABLE_PERMISSIONS.map(perm => (
                        <div 
                          key={perm.id} 
                          onClick={() => togglePermission(perm.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${newRole.permissions?.includes(perm.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900">{perm.label}</p>
                            <p className="text-[10px] text-slate-500">{perm.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${newRole.permissions?.includes(perm.id) ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                            {newRole.permissions?.includes(perm.id) && <Check size={12} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                   <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg">
                     Save Role Configuration
                   </button>
                </div>
             </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(role => (
            <div key={role.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Shield size={20} /></div>
                <button className="text-slate-400 hover:text-slate-600"><Settings size={18} /></button>
              </div>
              <h4 className="font-bold text-lg text-slate-900">{role.name}</h4>
              <p className="text-xs text-slate-500 mt-1 mb-6">{role.description}</p>
              
              <div className="space-y-2 flex-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Permissions</p>
                 <div className="flex flex-wrap gap-1.5">
                   {role.permissions.map(pId => {
                     const p = AVAILABLE_PERMISSIONS.find(ap => ap.id === pId);
                     return (
                       <span key={pId} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md border border-slate-100">
                         {p?.label}
                       </span>
                     );
                   })}
                 </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] text-slate-400">{staffList.filter(s => s.roleId === role.id).length} Staff Assigned</span>
                 <button className="text-rose-500 hover:text-rose-700 p-1"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'staff') {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Staff Directory</h2>
          <button 
            onClick={() => setShowAddStaff(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus size={18} /> Register Staff
          </button>
        </div>

        {showAddStaff && (
          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Register New Staff</h3>
              <button onClick={() => setShowAddStaff(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input 
                  type="text" required
                  value={newStaff.name || ''}
                  onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                <input 
                  type="email" required
                  value={newStaff.email || ''}
                  onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Assign Role</label>
                <select 
                  value={newStaff.roleId}
                  onChange={e => setNewStaff({...newStaff, roleId: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium"
                >
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              {roles.find(r => r.id === newStaff.roleId)?.name.toLowerCase().includes('doctor') && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Specialty</label>
                  <input 
                    type="text" 
                    value={newStaff.specialty || ''}
                    onChange={e => setNewStaff({...newStaff, specialty: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" 
                  />
                </div>
              )}
              <div className="md:col-span-2 flex justify-end pt-4">
                <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700">Add to System</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Staff Member</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                        {staff.specialty && <p className="text-[10px] text-slate-500">{staff.specialty}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{staff.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-medium text-slate-700">{staff.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'assignments' || activeTab === 'dashboard') {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Consultation Assignment Center</h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{pendingRequests.length} Pending Requests</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {pendingRequests.map(req => (
              <div 
                key={req.id} 
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer ${selectedRequest?.id === req.id ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-lg' : 'border-slate-200 hover:border-slate-300'}`}
                onClick={() => setSelectedRequest(req)}
              >
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {req.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{req.name}</h4>
                        <p className="text-xs text-slate-400">{req.date}</p>
                      </div>
                   </div>
                   <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                     Awaiting Doctor
                   </div>
                </div>
                <div className="mt-4 bg-slate-50 p-3 rounded-xl">
                  <p className="text-xs text-slate-600 italic">"{req.symptoms}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {selectedRequest ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl sticky top-24 animate-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                    <UserCheck size={20} />
                  </div>
                  <h3 className="font-bold">Assign Specialist</h3>
                </div>
                
                <p className="text-xs text-slate-500 mb-4">Assigning a doctor for <strong>{selectedRequest.name}</strong> based on symptoms.</p>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Doctor</label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {staffList.filter(s => s.role.toLowerCase().includes('doctor')).map(doc => (
                      <button 
                        key={doc.id}
                        className="w-full p-3 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-all group"
                        onClick={() => {
                          alert(`Assigned ${doc.name} to ${selectedRequest.name}`);
                          setSelectedRequest(null);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">{doc.name}</p>
                          <Stethoscope size={14} className="text-slate-300 group-hover:text-emerald-500" />
                        </div>
                        <p className="text-[10px] text-slate-400">{doc.specialty}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-2">
                  <button className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100">
                    Reject Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center text-slate-400 sticky top-24">
                <AlertCircle size={32} className="mb-2 opacity-20" />
                <p className="text-sm">Select a request from the left to assign a doctor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
