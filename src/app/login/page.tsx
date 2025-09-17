
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Atom, User, UserCog, Stethoscope } from 'lucide-react';
import type { UserRole } from '@/lib/types';

const roleIcons = {
  admin: <UserCog className="h-5 w-5 text-muted-foreground" />,
  doctor: <Stethoscope className="h-5 w-5 text-muted-foreground" />,
  patient: <User className="h-5 w-5 text-muted-foreground" />,
};

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('patient');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(role);
    router.replace('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2">
            <Atom className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">MediChain</h1>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Select your role to sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    {roleIcons[role]}
                    <SelectValue placeholder="Select a role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Patient</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="doctor">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      <span>Doctor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                     <div className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      <span>Admin</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
