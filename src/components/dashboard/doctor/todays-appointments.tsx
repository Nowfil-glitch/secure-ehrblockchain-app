import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Appointment } from '@/lib/types';
import { CalendarClock, Check, X } from 'lucide-react';

const appointments: Appointment[] = [
  { id: 'APT001', time: '09:00 AM', patientName: 'John Smith', patientId: 'P123456', reason: 'Follow-up Consultation', status: 'Upcoming' },
  { id: 'APT002', time: '10:30 AM', patientName: 'Emily White', patientId: 'P789012', reason: 'Annual Physical Exam', status: 'Upcoming' },
  { id: 'APT003', time: '11:15 AM', patientName: 'Michael Brown', patientId: 'P345678', reason: 'Prescription Refill', status: 'Upcoming' },
  { id: 'APT004', time: '01:00 PM', patientName: 'Sarah Davis', patientId: 'P901234', reason: 'Post-operative Checkup', status: 'Upcoming' },
  { id: 'APT005', time: '02:30 PM', patientName: 'James Wilson', patientId: 'P567890', reason: 'Lab Results Review', status: 'Upcoming' },
];

const statusVariant: Record<Appointment['status'], 'default' | 'secondary' | 'destructive'> = {
  Upcoming: 'default',
  Completed: 'secondary',
  Cancelled: 'destructive',
};

const statusIcon = {
    Upcoming: <CalendarClock className="h-3.5 w-3.5" />,
    Completed: <Check className="h-3.5 w-3.5" />,
    Cancelled: <X className="h-3.5 w-3.5" />,
}

export function TodaysAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>A list of scheduled appointments for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.time}</TableCell>
                <TableCell>
                    <div>{appointment.patientName}</div>
                    <div className="text-sm text-muted-foreground">{appointment.patientId}</div>
                </TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant[appointment.status]} className="capitalize">
                    {statusIcon[appointment.status]}
                    <span className="ml-1.5">{appointment.status}</span>
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
