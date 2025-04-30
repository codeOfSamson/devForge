import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TABS = [
  { label: "UI Sandbox", path: "/sandbox" },
  { label: "Factory", path: "/factory" },
  { label: "Strategy", path: "/strategy" },
  { label: "Command", path: "/command" },
  { label: "Observer", path: "/observer" },
  { label: "Async", path: "/async" },
  { label: "Adapter", path: "/adapter" },
];

export default function Navigation() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">UI, OOP, & Design Patterns</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {TABS.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`${
                    location.pathname === tab.path
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                {user && (
                  <>
                    <span className="text-gray-700">{user.name}</span>
                    {user.image && (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        alt={user.name}
                      />
                    )}
                  </>
                )}
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 