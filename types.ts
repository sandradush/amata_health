
export type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN' | 'RECEPTIONIST';

export type Permission = 
  | 'VIEW_DASHBOARD'
  | 'MANAGE_STAFF'
  | 'APPROVE_DOCTORS'
  | 'ASSIGN_APPOINTMENTS'
  | 'VIEW_PATIENT_RECORDS'
  | 'CONSULT_PATIENTS'
  | 'WRITE_PRESCRIPTIONS'
  | 'RECEPTION_ACCESS';

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  available: boolean;
  rating: number;
  image: string;
  status: 'PENDING' | 'APPROVED';
}

export interface Staff {
  id: string;
  name: string;
  role: string; // Dynamic role name
  roleId: string; // Reference to RoleDefinition
  specialty?: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Patient {
  id: string;
  name: string;
  nid: string;
  lastVisit?: string;
}

export interface ConsultRequest {
  id: string;
  patientId: string;
  patientName: string;
  symptoms: string;
  status: 'PENDING' | 'APPROVED' | 'ASSIGNED' | 'REJECTED';
  requestedDate: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  type: 'VIDEO' | 'IN_PERSON';
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  date: string;
  instructions: string;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI' | 'DOCTOR';
  text: string;
  timestamp: Date;
}
