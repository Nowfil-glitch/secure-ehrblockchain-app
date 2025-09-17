import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, User, FlaskConical, ScanSearch } from 'lucide-react';

const stats = [
  { title: 'Active Users', value: '1,254', icon: User, change: '+12.5%' },
  { title: 'AI Analyses Today', value: '320', icon: ScanSearch, change: '+5.2%' },
  { title: 'Lab Reports Added', value: '89', icon: FlaskConical, change: '+2.1%' },
  { title: 'Total Activities', value: '15,832', icon: Activity, change: '-0.5%' },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
