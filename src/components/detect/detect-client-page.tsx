'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/detect/image-uploader';
import { runAIDetection } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Wand2 } from 'lucide-react';
import { DetectResults } from './detect-results';
import type { AIDiseaseDetectionOutput } from '@/ai/flows/ai-disease-detection';

export function DetectClientPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AIDiseaseDetectionOutput | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResults(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleAnalysis = async () => {
    if (!file) {
      toast({
        title: 'No image selected',
        description: 'Please select an image to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResults(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const response = await runAIDetection({ photoDataUri });

      if (response.success && response.data) {
        setResults(response.data);
      } else {
        toast({
          title: 'Analysis Failed',
          description: response.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
      toast({
        title: 'File Read Error',
        description: 'Could not read the selected file.',
        variant: 'destructive',
      });
      setIsLoading(false);
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Disease Detection</CardTitle>
          <CardDescription>
            Upload a medical image (e.g., X-ray, skin scan) to get an AI-driven analysis,
            including a probability score, potential areas of concern, and suggested next steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUploader onFileSelect={handleFileSelect} previewUrl={previewUrl} />
          <Button onClick={handleAnalysis} disabled={isLoading || !file} className="w-full">
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </CardContent>
      </Card>
      
      {isLoading && (
         <div className="flex justify-center items-center rounded-lg border border-dashed p-12">
           <div className="flex flex-col items-center gap-4">
            <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is analyzing the image. Please wait...</p>
           </div>
         </div>
      )}

      {results && <DetectResults results={results} />}
    </div>
  );
}
