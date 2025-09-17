
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { Patient, Visit, Prescription, LabReport, PendingVisit, PendingPrescription } from '@/lib/types';
import { FileText, Download, Stethoscope, ClipboardPenLine, CheckCircle, Link, PlusCircle, Wand2, LoaderCircle } from 'lucide-react';
import { ImageUploader } from '@/components/detect/image-uploader';
import { useToast } from '@/hooks/use-toast';
import { runPrescriptionRecognition } from '@/app/actions';
import { useData } from '@/context/data-context';

// Helper to generate unique IDs on the client side
let idCounter = 0;
const generateUniqueId = (prefix: string) => {
  return `${prefix}${new Date().getTime()}-${idCounter++}`;
};


export default function PatientProfilePage() {
  const { patient, visits, setVisits, prescriptions, setPrescriptions, labReports } = useData();
  const [pendingVisits, setPendingVisits] = useState<PendingVisit[]>([]);
  const [newVisit, setNewVisit] = useState({ date: '', doctor: '', reason: '' });

  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pendingPrescriptions, setPendingPrescriptions] = useState<PendingPrescription[]>([]);
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVisit(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVisit = () => {
    if (newVisit.date && newVisit.doctor && newVisit.reason) {
      setPendingVisits(prev => [...prev, { ...newVisit, id: generateUniqueId('PV') }]);
      setNewVisit({ date: '', doctor: '', reason: '' });
    }
  };

  const handleConfirmVisit = (pendingVisitId: string) => {
    const visitToConfirm = pendingVisits.find(pv => pv.id === pendingVisitId);
    if (visitToConfirm) {
      const newConfirmedVisit: Visit = {
        id: generateUniqueId('V'),
        date: visitToConfirm.date,
        doctor: visitToConfirm.doctor,
        reason: visitToConfirm.reason,
        notes: 'Visit confirmed from pending.',
      };
      setVisits(prev => [newConfirmedVisit, ...prev]);
      setPendingVisits(prev => prev.filter(pv => pv.id !== pendingVisitId));
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setPrescriptionFile(selectedFile);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleAnalyzePrescription = async () => {
    if (!prescriptionFile) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image of the prescription.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setPendingPrescriptions([]);

    const reader = new FileReader();
    reader.readAsDataURL(prescriptionFile);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const response = await runPrescriptionRecognition({ photoDataUri });

      if (response.success && response.data) {
        setPendingPrescriptions(response.data.prescriptions.map(p => ({...p, id: generateUniqueId('PP')})));
        toast({ title: 'Analysis Complete', description: `${response.data.prescriptions.length} prescriptions found.` });
      } else {
        toast({
          title: 'Analysis Failed',
          description: response.error || 'Could not recognize text in the image.',
          variant: 'destructive',
        });
      }
      setIsAnalyzing(false);
    };
    reader.onerror = () => {
      toast({
        title: 'File Read Error',
        description: 'Could not read the selected file.',
        variant: 'destructive',
      });
      setIsAnalyzing(false);
    };
  };

  const handleConfirmPrescription = (pendingPrescriptionId: string) => {
    const prescriptionToConfirm = pendingPrescriptions.find(pp => pp.id === pendingPrescriptionId);
    if (prescriptionToConfirm) {
      const newConfirmedPrescription: Prescription = {
        ...prescriptionToConfirm,
        id: generateUniqueId('RX'),
        date: new Date().toISOString().split('T')[0], // Use today's date
        doctor: 'AI Assisted', // Placeholder doctor
      };
      setPrescriptions(prev => [newConfirmedPrescription, ...prev]);
      setPendingPrescriptions(prev => prev.filter(pp => pp.id !== pendingPrescriptionId));
    }
  };

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return null;
  }
  
  if (!patient) {
    return (
      <div className="flex flex-col gap-6">
        <Header title="Patient Profile" />
        <Card>
          <CardHeader>
            <CardTitle>No Patient Data</CardTitle>
            <CardDescription>Patient data could not be loaded.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title="Patient Profile" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://picsum.photos/seed/janedoe/100/100" data-ai-hint="person woman" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <CardDescription>{patient.id}</CardDescription>
               <div className="pt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300/50">
                  <CheckCircle className="h-3 w-3 mr-1.5" />
                  Verified on Chain
                  <Link className="h-3 w-3 ml-1.5 cursor-pointer hover:underline" />
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Date of Birth:</strong> {patient.dob}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Contact:</strong> {patient.contact}</p>
              <p><strong>Address:</strong> {patient.address}</p>
              <p><strong>Blood Type:</strong> {patient.bloodType}</p>
              <div>
                <strong>Allergies:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.allergies.map(allergy => <Badge key={allergy} variant="destructive">{allergy}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <PlusCircle className="h-6 w-6 text-primary" />
                <CardTitle>Add New Visit</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={newVisit.date} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor Name</Label>
                  <Input id="doctor" name="doctor" placeholder="e.g., Dr. Smith" value={newVisit.doctor} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input id="reason" name="reason" placeholder="e.g., Annual Checkup" value={newVisit.reason} onChange={handleInputChange} />
                </div>
              </div>
              <Button onClick={handleAddVisit} className="w-full md:w-auto">Add to Pending</Button>
            </CardContent>
          </Card>

          {pendingVisits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pending Visits</CardTitle>
                <CardDescription>Check the box to confirm and add the visit to the official history.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Confirm</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingVisits.map(visit => (
                      <TableRow key={visit.id}>
                        <TableCell>
                          <Checkbox onCheckedChange={() => handleConfirmVisit(visit.id)} />
                        </TableCell>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.doctor}</TableCell>
                        <TableCell>{visit.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Stethoscope className="h-6 w-6 text-primary" />
                <CardTitle>Visit History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map(visit => (
                    <TableRow key={visit.id}>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>{visit.doctor}</TableCell>
                      <TableCell>{visit.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <ClipboardPenLine className="h-6 w-6 text-primary" />
                <CardTitle>Prescriptions</CardTitle>
              </div>
              <CardDescription>Current prescriptions and AI-powered uploader.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <ImageUploader onFileSelect={handleFileSelect} previewUrl={previewUrl} />
                 <Button onClick={handleAnalyzePrescription} disabled={isAnalyzing || !prescriptionFile} className="w-full">
                    {isAnalyzing ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Prescription Image'}
                  </Button>
              </div>

              {pendingPrescriptions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Pending Prescriptions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Check the box to confirm and add the prescription to the official list.</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Confirm</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingPrescriptions.map(rx => (
                        <TableRow key={rx.id}>
                          <TableCell>
                            <Checkbox onCheckedChange={() => handleConfirmPrescription(rx.id)} />
                          </TableCell>
                          <TableCell>{rx.medication}</TableCell>
                          <TableCell>{rx.dosage}</TableCell>
                          <TableCell>{rx.frequency}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <h3 className="text-lg font-medium pt-4">Current Prescriptions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map(rx => (
                    <TableRow key={rx.id}>
                      <TableCell>{rx.date}</TableCell>
                      <TableCell>{rx.medication}</TableCell>
                      <TableCell>{rx.dosage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Lab Reports</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {labReports.map(report => (
                  <li key={report.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{report.type}</p>
                        <p className="text-xs text-muted-foreground">{report.date} - {report.fileName}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
