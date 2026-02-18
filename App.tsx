
import React, { useState } from 'react';
import Layout from './components/Layout';
import { Role } from './types';
import { PatientMobileApp } from './views/PatientMobileApp';
import { DoctorDashboard } from './views/DoctorDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { ReceptionistDashboard } from './views/ReceptionistDashboard';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('PATIENT');
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (role) {
      case 'PATIENT':
        return <PatientMobileApp activeTab={activeTab} />;
      case 'DOCTOR':
        return <DoctorDashboard activeTab={activeTab} />;
      case 'ADMIN':
        return <AdminDashboard activeTab={activeTab} />;
      case 'RECEPTIONIST':
        return <ReceptionistDashboard activeTab={activeTab} />;
      default:
        return <div>Role Error</div>;
    }
  };

  return (
    <Layout 
      role={role} 
      setRole={(r) => { 
        setRole(r); 
        setActiveTab('dashboard'); 
      }} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
