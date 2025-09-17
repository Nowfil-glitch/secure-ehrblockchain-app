import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { AIDiseaseDetectionOutput } from '@/ai/flows/ai-disease-detection';
import { Lightbulb, ListChecks, TestTube2 } from 'lucide-react';

interface DetectResultsProps {
  results: AIDiseaseDetectionOutput;
}

export function DetectResults({ results }: DetectResultsProps) {
  const probabilityPercent = Math.round(results.probability * 100);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TestTube2 className="h-6 w-6 text-primary" />
            <CardTitle>Analysis Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between items-baseline">
              <span className="text-base font-medium text-foreground">Disease Probability</span>
              <span className="text-xl font-bold text-primary">{probabilityPercent}%</span>
            </div>
            <Progress value={probabilityPercent} className="h-3" />
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle>Heatmap Instructions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{results.heatmapInstructions}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-primary" />
            <CardTitle>Suggested Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{results.suggestedActions}</p>
        </CardContent>
      </Card>
    </div>
  );
}
