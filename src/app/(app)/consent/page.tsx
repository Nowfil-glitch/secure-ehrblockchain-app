'use client'

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { ProviderConsent } from '@/lib/types';

const initialProviders: ProviderConsent[] = [
  { id: 'prov_01', name: 'Dr. Emily Carter', type: 'Doctor', hasAccess: true },
  { id: 'prov_02', name: 'Metro Health Hospital', type: 'Hospital', hasAccess: true },
  { id: 'prov_03', name: 'Precision Labs', type: 'Lab', hasAccess: false },
  { id: 'prov_04', name: 'Dr. Ben Adams', type: 'Doctor', hasAccess: false },
];

export default function ConsentManagementPage() {
  const [providers, setProviders] = useState(initialProviders);
  const { toast } = useToast();

  const handleAccessChange = (providerId: string, newAccess: boolean) => {
    setProviders(
      providers.map((p) =>
        p.id === providerId ? { ...p, hasAccess: newAccess } : p
      )
    );
  };

  const handleSaveChanges = () => {
    // In a real app, this would trigger a blockchain transaction
    console.log('Saving consent changes:', providers);
    toast({
      title: 'Consent Updated',
      description: 'Your data sharing preferences have been saved securely.',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Consent Management" />
      <Card>
        <CardHeader>
          <CardTitle>Data Sharing & Consent</CardTitle>
          <CardDescription>
            You have full control over your data. Grant or revoke access for healthcare providers at any time.
            Changes are recorded securely on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-semibold">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">{provider.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`access-switch-${provider.id}`} className="text-muted-foreground">
                    {provider.hasAccess ? 'Access Granted' : 'Access Revoked'}
                  </Label>
                  <Switch
                    id={`access-switch-${provider.id}`}
                    checked={provider.hasAccess}
                    onCheckedChange={(checked) => handleAccessChange(provider.id, checked)}
                    aria-label={`Toggle access for ${provider.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
