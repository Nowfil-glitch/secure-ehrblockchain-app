
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ScanSearch,
  User,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  Atom,
  PenSquare,
} from 'lucide-react';
import type { NavLink } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/detect', label: 'AI Disease Detection', icon: ScanSearch },
  { href: '/patient-profile', label: 'Patient Profile', icon: User, roles: ['patient', 'admin'] },
  { href: '/patient-enrollment', label: 'Patient Enrollment', icon: PenSquare, roles: ['doctor'] },
  { href: '/consent', label: 'Consent Management', icon: ShieldCheck },
  { href: '/audit-trail', label: 'Audit Trail', icon: History },
];

export function MainSidebar() {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const filteredNavLinks = navLinks.filter(link => 
    !link.roles || (role && link.roles.includes(role))
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Atom className="text-primary h-8 w-8" />
          <h1 className="text-xl font-semibold text-foreground">MediChain</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.label }}
              >
                <a href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: 'Settings' }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={{ children: 'Logout' }}>
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
