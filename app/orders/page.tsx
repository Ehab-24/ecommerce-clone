// pages/orders.tsx
import Dashboard from "@/components/Dashboard";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const OrdersPage = () => {
  return (
    <Dashboard>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
            <h1 className="text-xl font-bold text-[#1a1a1a]">Create Order</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Products */}
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-lg font-semibold mb-4">Products</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">Product 1</li>
                <li className="py-2">Product 2</li>
                {/* Add more products */}
              </ul>
            </div>

            {/* Payments */}
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-lg font-semibold mb-4">Payments</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">Payment 1</li>
                <li className="py-2">Payment 2</li>
                {/* Add more payments */}
              </ul>
            </div>

            {/* Notes */}
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-lg font-semibold mb-4">Notes</h2>
              <div>
                <p>Note 1</p>
                <p>Note 2</p>
                {/* Add more notes */}
              </div>
            </div>

            {/* Customers */}
            <div className="bg-white p-6 shadow rounded col-span-2">
              <h2 className="text-lg font-semibold mb-4">Customers</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">Customer 1</li>
                <li className="py-2">Customer 2</li>
                {/* Add more customers */}
              </ul>
            </div>

            {/* Marketing */}
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-lg font-semibold mb-4">Marketing</h2>
              <p>Marketing content goes here.</p>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-lg font-semibold mb-4">Tags</h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">Tag 1</li>
                <li className="py-2">Tag 2</li>
                {/* Add more tags */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default OrdersPage;
