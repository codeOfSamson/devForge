import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

// Simulated API responses
const api1Response = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Charlie", email: "charlie@example.com" },
];

const api2Response = [
  { userId: 42, fullName: "Bob Smith", contact: "bob@example.com" },
  { userId: 43, fullName: "Dana Jones", contact: "dana@example.com" },
];

// Adapters
function adaptApi1User(data: any): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
}

function adaptApi2User(data: any): User {
  return {
    id: data.userId,
    name: data.fullName,
    email: data.contact,
  };
}

export default function AdapterPatternPanel() {
  const api1Users = api1Response.map(adaptApi1User);
  const api2Users = api2Response.map(adaptApi2User);
  const allUsers: User[] = [...api1Users, ...api2Users];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔌 Adapter Pattern</h2>
      <p className="mb-4 text-gray-700">
        This demo shows how to unify data from two different APIs using the Adapter Pattern.
      </p>
      <div className="mb-2 font-semibold">Unified User List:</div>
      <ul className="mb-4">
        {allUsers.map((user) => (
          <li key={user.id} className="mb-1">
            <span className="font-medium text-blue-700">{user.name}</span> <span className="text-gray-500">({user.email})</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded border">
          <div className="font-semibold mb-2">API 1 Raw Data</div>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(api1Response, null, 2)}</pre>
        </div>
        <div className="bg-gray-50 p-4 rounded border">
          <div className="font-semibold mb-2">API 2 Raw Data</div>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(api2Response, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
} 