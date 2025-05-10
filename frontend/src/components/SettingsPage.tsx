import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL =  'http://localhost:5000'; // adjust for your setup

interface Settings {
  name: string;
  email: string;
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
}

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>({
    name: '',
    email: '',
    theme: 'light',
    language: 'en',
    notificationsEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Replace this with how you manage auth tokens
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get<Settings>(`${API_URL}/api/userSettings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(response.data);
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSettings();
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/userSettings`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMessage('Settings saved!');
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error('Save error', err);
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <p className="p-4">Loading settings...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">User Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <select
            value={form.theme}
            onChange={(e) => setForm({ ...form, theme: e.target.value as 'light' | 'dark' })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={form.notificationsEnabled}
            onChange={(e) => setForm({ ...form, notificationsEnabled: e.target.checked })}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Enable Notifications
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
