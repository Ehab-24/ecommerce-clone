import React from "react";
import { ReactNode } from "react";
import ShopifyHeader from "./Header";
import Sidebar from "./Sidebar";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="w-full">
      <ShopifyHeader />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-[100vw] min-h-full md:w-[75vw] lg:w-full bg-[#f1f1f1]">
          {/* Main Content Area */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
