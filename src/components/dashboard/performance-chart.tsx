'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', accuracy: 0.85 },
  { name: 'Feb', accuracy: 0.88 },
  { name: 'Mar', accuracy: 0.87 },
  { name: 'Apr', accuracy: 0.90 },
  { name: 'May', accuracy: 0.91 },
  { name: 'Jun', accuracy: 0.92 },
  { name: 'Jul', accuracy: 0.93 },
];

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Model Performance</CardTitle>
        <CardDescription>Accuracy over the last 7 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value as number * 100).toFixed(0)}%`} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
