import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Title and Desktop Tabs */}
          <div className="flex items-center space-x-6">
            <span className="text-lg font-bold text-indigo-600">UI, OOP, & Design Patterns</span>
            <div className="hidden sm:flex space-x-4">
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

          {/* User + Hamburger */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span className="text-gray-700">{user.name}</span>
                  {user.image && (
                    <img className="h-8 w-8 rounded-full" src={user.image} alt={user.name} />
                  )}
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-1">
            {TABS.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === tab.path
                    ? 'text-indigo-700 font-semibold bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
