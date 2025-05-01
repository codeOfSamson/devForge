import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthenticatedLayout from './components/layouts/AuthenticatedLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CommandPatternPanel from './components/CommandPatternPanel';
import StrategyPatternPanel from './components/StrategyPatternPanel';
import FactoryPatternPanel from './components/FactoryPatternPanel';
import AdapterPatternPanel from './components/AdapterPatternPanel';
import AsyncPanel from './components/AsyncPanel';
import PatternInfoPanel from './components/PatternInfoPanel';
import PreviewSandbox from './components/PreviewSandbox';

const TABS = [
  { label: "Sandbox", component: <PreviewSandbox />, path: "/sandbox" },
  { label: "Factory", component: <FactoryPatternPanel />, path: "/factory" },
  { label: "Strategy", component: <StrategyPatternPanel />, path: "/strategy" },
  { label: "Command", component: <CommandPatternPanel />, path: "/command" },
  { label: "Observer", component: <PatternInfoPanel />, path: "/observer" },
  { label: "Async", component: <AsyncPanel />, path: "/async" },
  { label: "Adapter", component: <AdapterPatternPanel />, path: "/adapter" },
];

const defaultPreviewProps = {
  layoutType: "flex",
  direction: "flex-row",
  justify: "justify-center",
  align: "items-center",
  wrap: "flex-wrap",
  gap: "gap-4",
  padding: "p-4",
  boxes: [
    { id: 1, color: "bg-blue-500", size: "w-20 h-20" },
    { id: 2, color: "bg-green-500", size: "w-20 h-20" },
    { id: 3, color: "bg-red-500", size: "w-20 h-20" },
    { id: 4, color: "bg-yellow-500", size: "w-20 h-20" }
  ],
  goCrazy: false
};

function AppContent() {
  const navigate = useNavigate();
  
  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><AuthenticatedLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/sandbox" replace />} />
          {TABS.map((tab) => (
            <Route
              key={tab.path}
              path={tab.path}
              element={tab.component}
            />
          ))}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
