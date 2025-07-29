import { redirect } from 'next/navigation';
import { getCurrentUserAction } from '@/app/actions/auth';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const result = await getCurrentUserAction();
  
  if (result.error || !result.user) {
    redirect('/login');
  }

  return <DashboardClient user={result.user} />;
}