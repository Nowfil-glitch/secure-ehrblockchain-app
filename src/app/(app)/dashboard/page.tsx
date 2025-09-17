
'use client';

import { useAuth } from '@/context/auth-context';
import { DoctorDashboard } from '@/components/dashboard/doctor/doctor-dashboard';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { ActivityTable } from '@/components/dashboard/activity-table';
import { Header } from '@/components/header';
import { LoaderCircle } from 'lucide-react';

export default function DashboardPage() {
  const { role, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title="Dashboard" />
      
      {role === 'doctor' ? (
        <DoctorDashboard />
      ) : (
        <>
          <StatsCards />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <ActivityTable />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
