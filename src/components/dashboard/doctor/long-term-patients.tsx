'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { LongTermPatient } from '@/lib/types';
import { ClipboardList, UserPlus, CheckCircle2 } from 'lucide-react';

const initialPatients: LongTermPatient[] = [
  { id: 'P654321', name: 'Robert Johnson', room: '302A', condition: 'Post-op Recovery', lastCheckup: '2023-11-15 08:00', nextCheckup: '2023-11-15 14:00', isCompleted: false },
  { id: 'P987654', name: 'Maria Garcia', room: '415B', condition: 'Chronic Heart Failure', lastCheckup: '2023-11-15 09:30', nextCheckup: '2023-11-15 17:30', isCompleted: false },
  { id: 'P246813', name: 'David Lee', room: '305A', condition: 'Pneumonia', lastCheckup: '2023-11-14 18:00', nextCheckup: '2023-11-15 10:00', isCompleted: true },
  { id: 'P135792', name: 'Susan Chen', room: '420C', condition: 'Diabetes Management', lastCheckup: '2023-11-15 07:45', nextCheckup: '2023-11-15 12:45', isCompleted: false },
];

export function LongTermPatients() {
  const [patients, setPatients] = useState(initialPatients);

  const handleToggleCompletion = (patientId: string) => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, isCompleted: !p.isCompleted } : p
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Long-Term Patients</CardTitle>
                <CardDescription>Patients requiring regular check-ups.</CardDescription>
            </div>
            <Button size="icon" variant="outline">
                <UserPlus />
                <span className="sr-only">Admit New Patient</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Next Check-up</TableHead>
              <TableHead className="text-right">Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} className={patient.isCompleted ? 'opacity-50' : ''}>
                <TableCell>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-muted-foreground">Room {patient.room}</div>
                </TableCell>
                <TableCell>
                  <div>{patient.nextCheckup.split(' ')[1]}</div>
                  <div className="text-sm text-muted-foreground">{patient.condition}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleToggleCompletion(patient.id)}
                    aria-label={patient.isCompleted ? 'Mark as not completed' : 'Mark as completed'}
                    className={`rounded-full h-8 w-8 ${patient.isCompleted ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
