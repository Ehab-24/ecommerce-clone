import React from "react";
import { ReactNode } from "react";
import ShopifyHeader from "./Header";
import Sidebar from "./Sidebar";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <>
      <ShopifyHeader />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full bg-slate-50 md:p-6">
          {/* Main Content Area */}
          <div className="w-full mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
