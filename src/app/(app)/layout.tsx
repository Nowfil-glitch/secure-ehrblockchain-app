

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/main-sidebar';
import { ReactNode } from 'react';
import AuthLayout from '../(auth)/layout';
import { DataProvider } from '@/context/data-context';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout>
      <DataProvider>
        <SidebarProvider>
          <MainSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DataProvider>
    </AuthLayout>
  );
}
