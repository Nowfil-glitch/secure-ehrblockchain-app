import { Header } from '@/components/header';
import { DetectClientPage } from '@/components/detect/detect-client-page';

export default function AIDetectionPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header title="AI Disease Detection" />
      <DetectClientPage />
    </div>
  );
}
