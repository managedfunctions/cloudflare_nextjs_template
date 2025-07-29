'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';

interface User {
  id: number;
  email: string;
  name: string | null;
  company: string | null;
  role: string;
}

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.push('/login');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.email}</span>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                {isPending ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Welcome, {user.name || user.email}
              </h2>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                {user.name && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                )}
                {user.company && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Company:</span> {user.company}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <p className="text-sm text-gray-500">
                  Add your custom dashboard content here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}