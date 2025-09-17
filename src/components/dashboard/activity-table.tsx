import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const activities = [
  { user: 'Dr. Alice', role: 'Doctor', action: 'Accessed patient record', details: 'Patient ID: P789012', timestamp: '2 mins ago' },
  { user: 'Patient-451', role: 'Patient', action: 'Uploaded skin image', details: 'AI Analysis requested', timestamp: '15 mins ago' },
  { user: 'LabTech-02', role: 'Lab', action: 'Added lab report', details: 'Blood Panel for P654321', timestamp: '1 hour ago' },
  { user: 'Admin', role: 'Admin', action: 'Monitored system logs', details: 'Routine check', timestamp: '3 hours ago' },
  { user: 'Patient-218', role: 'Patient', action: 'Revoked consent', details: 'Provider: City Hospital', timestamp: 'Yesterday' },
];

export function ActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent User Activity</CardTitle>
        <CardDescription>A log of recent activities across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Action</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{activity.user}</div>
                  <div className="text-sm text-muted-foreground">{activity.role}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{activity.action}</TableCell>
                <TableCell className="hidden md:table-cell">{activity.details}</TableCell>
                <TableCell className="text-right">{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
