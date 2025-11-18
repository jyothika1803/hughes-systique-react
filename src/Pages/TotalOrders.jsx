// src/Pages/TotalOrders.jsx
import { controllers } from "chart.js";
import React, { useEffect, useState } from "react";
import { $crud } from "../factory/crudFactory";
import { BASE_ASSETS_URL } from "../constants/bassPath";

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    retrieveOrders();
  }, []);

  const retrieveOrders = async () => {
    try {
      const {
        data: { orders },
      } = await $crud.retrieve("orders");
      setOrders(() => orders);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        📋 All Orders
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <p className="text-lg font-medium">No orders submitted yet.</p>
          <p className="text-sm text-gray-500 mt-1">Orders will appear here once added.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-indigo-100">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-indigo-100 text-indigo-800 uppercase text-xs font-semibold tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Product ID</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-center">Pincode</th>
                <th className="px-4 py-3 text-center">Phone</th>
                <th className="px-4 py-3 text-center">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-indigo-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium text-gray-800">{o.id}</td>
                  <td className="px-4 py-3 text-gray-700">{o.productId}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{o.qty}</td>
                  <td className="px-4 py-3 text-gray-600">{o.description}</td>
                  <td className="px-4 py-3 text-gray-600">{o.address}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{o.pincode}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{o.phone}</td>
                  <td className="px-4 py-3 text-center text-indigo-600 font-medium">{o.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TotalOrders;
