import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { AuditLog } from '@/lib/types';

const auditLogs: AuditLog[] = [
  { id: 'L001', timestamp: '2023-11-15 10:30:45', user: 'Dr. Smith', role: 'Doctor', action: 'Viewed Lab Report', details: 'Patient: P123456', txHash: '0x1a2b...' },
  { id: 'L002', timestamp: '2023-11-15 09:15:22', user: 'Jane Doe', role: 'Patient', action: 'Granted Consent', details: 'Provider: Dr. Smith', txHash: '0x3c4d...' },
  { id: 'L003', timestamp: '2023-11-14 16:45:10', user: 'LabCorp', role: 'Lab', action: 'Uploaded Report', details: 'Patient: P123456', txHash: '0x5e6f...' },
  { id: 'L004', timestamp: '2023-11-14 11:05:00', user: 'Jane Doe', role: 'Patient', action: 'Uploaded Image', details: 'AI Detection', txHash: '0x7g8h...' },
  { id: 'L005', timestamp: '2023-11-13 14:20:05', user: 'Admin', role: 'Admin', action: 'System Check', details: 'Security Audit', txHash: '0x9i0j...' },
];

export default function AuditTrailPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header title="Audit Trail" />
      <Card>
        <CardHeader>
          <CardTitle>Immutable Audit Trail</CardTitle>
          <CardDescription>
            A complete, unchangeable history of all activities on your health records. Each entry is a verified blockchain transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="font-medium">{log.user}</div>
                    <Badge variant={log.role === 'Admin' ? 'destructive' : 'secondary'}>{log.role}</Badge>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.details}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#" aria-label="View transaction">
                        {log.txHash.slice(0, 8)}...
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
