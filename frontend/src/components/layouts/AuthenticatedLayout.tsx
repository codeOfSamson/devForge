import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';

export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 