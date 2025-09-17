
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useData } from '@/context/data-context';
import { useToast } from '@/hooks/use-toast';
import type { Prescription } from '@/lib/types';

type NewPrescription = Omit<Prescription, 'id' | 'doctor' | 'date'>;

export default function PatientEnrollmentPage() {
  const { addPatient, addPrescriptionToPatient } = useData();
  const { toast } = useToast();

  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [prescriptions, setPrescriptions] = useState<NewPrescription[]>([]);

  const handleAddPrescriptionRow = () => {
    setPrescriptions([...prescriptions, { medication: '', dosage: '', frequency: '' }]);
  };

  const handleRemovePrescriptionRow = (index: number) => {
    const newPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(newPrescriptions);
  };

  const handlePrescriptionChange = (index: number, field: keyof NewPrescription, value: string) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index][field] = value;
    setPrescriptions(newPrescriptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !name || !age || !date) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out all patient details.',
        variant: 'destructive',
      });
      return;
    }

    // This is a simplified simulation. In a real app, you'd check if patient exists.
    const newPatient = {
      id: patientId,
      name,
      age: parseInt(age, 10),
      dob: 'N/A', // Not collected in this form
      gender: 'N/A',
      contact: 'N/A',
      address: 'N/A',
      bloodType: 'N/A',
      allergies: [],
    };
    addPatient(newPatient); // Adds patient if they don't exist

    prescriptions.forEach(rx => {
      if (rx.medication && rx.dosage && rx.frequency) {
        addPrescriptionToPatient(patientId, {
          ...rx,
          id: `RX${Date.now()}-${Math.random()}`,
          date: new Date().toISOString().split('T')[0],
          doctor: 'Dr. LoggedIn', // Placeholder for logged-in doctor
        });
      }
    });

    toast({
      title: 'Patient Enrolled',
      description: `${name} has been enrolled and prescriptions (if any) have been added.`,
    });

    // Reset form
    setPatientId('');
    setName('');
    setAge('');
    setDate(new Date().toISOString().split('T')[0]);
    setPrescriptions([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Patient Enrollment" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Enroll New Patient</CardTitle>
            <CardDescription>
              Enter patient details and add any prescriptions. Prescriptions will be automatically added to the patient's record.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input id="patientId" value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="e.g., P123456" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g., 42" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Enrollment Date</Label>
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Prescriptions</h3>
              {prescriptions.map((rx, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`medication-${index}`}>Medication</Label>
                      <Input id={`medication-${index}`} value={rx.medication} onChange={e => handlePrescriptionChange(index, 'medication', e.target.value)} placeholder="e.g., Lisinopril" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                      <Input id={`dosage-${index}`} value={rx.dosage} onChange={e => handlePrescriptionChange(index, 'dosage', e.target.value)} placeholder="e.g., 10mg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                      <Input id={`frequency-${index}`} value={rx.frequency} onChange={e => handlePrescriptionChange(index, 'frequency', e.target.value)} placeholder="e.g., Once a day" />
                    </div>
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => handleRemovePrescriptionRow(index)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove Prescription</span>
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddPrescriptionRow}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Prescription
              </Button>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit">Enroll Patient & Save Prescriptions</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
