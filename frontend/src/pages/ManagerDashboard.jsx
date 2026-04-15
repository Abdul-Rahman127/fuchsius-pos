import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaCog,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2016", purple: 80, red: 30 },
  { year: "2017", purple: 40, red: 55 },
  { year: "2018", purple: 65, red: 50 },
  { year: "2019", purple: 70, red: 25 },
  { year: "2020", purple: 35, red: 75 },
];

const purchases = [
  { id: 1, item: "Car Seats", date: "2020-02-27", amount: "LKR 20,000", status: "Shipping" },
  { id: 2, item: "Car Seats", date: "2020-02-27", amount: "LKR 20,000", status: "Complete" },
  { id: 3, item: "Car Seats", date: "2020-02-27", amount: "LKR 20,000", status: "Complete" },
  { id: 4, item: "Car Seats", date: "2020-02-27", amount: "LKR 20,000", status: "Pending" },
];

const ManagerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#1E1B4B] text-white p-6 flex flex-col">

        <div className="mb-10">
          <h2 className="text-lg font-bold">Fuchsius</h2>
          <p className="text-sm text-gray-300">Point of Sale</p>
        </div>

        <nav className="space-y-4">

          <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaTachometerAlt /> Dashboard
          </div>

          <div className="flex items-center gap-3 text-white font-semibold">
            <FaUsers /> Customer
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaShoppingCart /> Sales
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaBox /> Inventory
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaCog /> Settings
          </div>

        </nav>

        <div className="mt-auto text-red-400 text-sm cursor-pointer">
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-2xl font-bold mb-8">Manager Dashboard</h1>

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h3 className="font-semibold mb-4">Analytics Of Revenue</h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="purple" fill="#7C3AED" radius={[5,5,0,0]} />
                <Bar dataKey="red" fill="#F87171" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Purchase Table */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-4">Purchase History</h3>

          <table className="w-full text-sm">

            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>

              {purchases.map((item) => (
                <tr key={item.id} className="border-t">

                  <td className="py-3">{item.item}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Complete"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;