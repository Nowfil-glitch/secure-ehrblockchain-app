
'use client';

import { createContext, useContext, useState, ReactNode, FC } from 'react';
import type { Patient, Visit, Prescription, LabReport } from '@/lib/types';

// Initial hardcoded data
const initialPatient: Patient = {
  id: 'P123456',
  name: 'Jane Doe',
  dob: '1985-08-15',
  age: 38,
  gender: 'Female',
  contact: 'jane.doe@email.com',
  address: '123 Health St, Medville, MD 12345',
  bloodType: 'O+',
  allergies: ['Peanuts', 'Penicillin'],
};

const initialVisits: Visit[] = [
  { id: 'V001', date: '2023-10-26', doctor: 'Dr. Smith', reason: 'Annual Checkup', notes: 'All vitals normal.' },
  { id: 'V002', date: '2023-05-12', doctor: 'Dr. Jones', reason: 'Flu-like symptoms', notes: 'Prescribed rest and fluids.' },
];

const initialPrescriptions: Prescription[] = [
  { id: 'RX001', date: '2023-05-12', medication: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', doctor: 'Dr. Jones' },
  { id: 'RX002', date: '2022-03-01', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice a day', doctor: 'Dr. Smith' },
];

const initialLabReports: LabReport[] = [
  { id: 'L001', date: '2023-10-26', type: 'Blood Panel', fileName: 'report_20231026.pdf', fileHash: '0xabc...' },
  { id: 'L002', date: '2021-08-19', type: 'X-Ray', fileName: 'xray_chest_20210819.dicom', fileHash: '0xdef...' },
];

interface DataContextType {
  patient: Patient | null;
  visits: Visit[];
  prescriptions: Prescription[];
  labReports: LabReport[];
  setPatient: (patient: Patient | null) => void;
  setVisits: (visits: Visit[]) => void;
  setPrescriptions: (prescriptions: Prescription[]) => void;
  addPatient: (patient: Patient) => void;
  addPrescriptionToPatient: (patientId: string, prescription: Prescription) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, this would be a list of patients
  const [patient, setPatient] = useState<Patient | null>(initialPatient);
  const [visits, setVisits] = useState<Visit[]>(initialVisits);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [labReports] = useState<LabReport[]>(initialLabReports);

  // This simulates a database of patients, for now, we just have one.
  const [patients, setPatients] = useState<Patient[]>([initialPatient]);

  const addPatient = (newPatient: Patient) => {
    // Prevent adding duplicate patients
    if (!patients.find(p => p.id === newPatient.id)) {
      setPatients(prev => [...prev, newPatient]);
    }
  };

  const addPrescriptionToPatient = (patientId: string, newPrescription: Prescription) => {
    // This logic assumes we are only managing one patient's prescriptions on the client.
    // In a real app, you'd find the correct patient in a list and update their records.
    if (patient && patient.id === patientId) {
      setPrescriptions(prev => [newPrescription, ...prev]);
    }
  };

  return (
    <DataContext.Provider value={{
      patient,
      setPatient,
      visits,
      setVisits,
      prescriptions,
      setPrescriptions,
      labReports,
      addPatient,
      addPrescriptionToPatient,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
