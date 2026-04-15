import React from 'react';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'Nasliha', email: 'nasliha@company.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Cashier 1', email: 'cashier@company.com', role: 'Cashier', status: 'Active' }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>
        <table className="w-full text-left">
          <thead className="bg-fuchsia-50">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.role}</td>
                <td className="px-6 py-4 text-green-600 font-bold">{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;