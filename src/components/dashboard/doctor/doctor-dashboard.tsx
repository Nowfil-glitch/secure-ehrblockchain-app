import { TodaysAppointments } from './todays-appointments';
import { LongTermPatients } from './long-term-patients';

export function DoctorDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TodaysAppointments />
      </div>
      <div>
        <LongTermPatients />
      </div>
    </div>
  );
}
