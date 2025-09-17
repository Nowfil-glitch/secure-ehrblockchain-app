

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  roles?: UserRole[];
};

export type Patient = {
  id: string;
  name: string;
  dob: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  bloodType: string;
  allergies: string[];
};

export type Visit = {
  id: string;
  date: string;
  doctor: string;
  reason: string;
  notes: string;
};

export type PendingVisit = {
  id: string;
  date: string;
  doctor: string;
  reason: string;
};

export type Prescription = {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  frequency: string;
  doctor: string;
};

export type PendingPrescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
};

export type LabReport = {
  id: string;
  date: string;
  type: string;
  fileHash: string;
  fileName: string;
};

export type ProviderConsent = {
  id: string;
  name: string;
  type: 'Doctor' | 'Lab' | 'Hospital';
  hasAccess: boolean;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  role: 'Patient' | 'Doctor' | 'Admin' | 'Lab';
  action: string;
  details: string;
  txHash: string;
};

export type UserRole = 'admin' | 'doctor' | 'patient';

export type Appointment = {
  id: string;
  time: string;
  patientName: string;
  patientId: string;
  reason: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
};

export type LongTermPatient = {
  id: string;
  name: string;
  room: string;
  condition: string;
  lastCheckup: string;
  nextCheckup: string;
  isCompleted: boolean;
};
