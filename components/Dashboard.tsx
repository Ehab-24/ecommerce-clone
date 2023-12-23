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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className=" hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full min-h-full bg-[#f1f1f1]">
          {/* Main Content Area */}
          {children}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
