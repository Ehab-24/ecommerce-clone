import React from "react";
import { ReactNode } from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineShopping,
  AiOutlineShop,
  AiOutlineUser,
  AiOutlineBars,
  AiOutlineAreaChart,
  AiOutlineTag,
} from "react-icons/ai";
import ShopifyHeader from "./Header";

interface MenuItem {
  label: string;
  icon: any;
  link: string;
}

interface DashboardProps {
  children: ReactNode;
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: AiFillHome, link: "/home" },
  { label: "Orders", icon: AiOutlineShopping, link: "/orders" },
  { label: "Products", icon: AiOutlineShop, link: "/products" },
  { label: "Customers", icon: AiOutlineUser, link: "/customers" },
  { label: "Content", icon: AiOutlineBars, link: "/content" },
  { label: "Analytics", icon: AiOutlineAreaChart, link: "/analytics" },
  { label: "Marketing", icon: AiOutlineTag, link: "/marketing" },
  { label: "Discounts", icon: AiOutlineTag, link: "/discounts" },
];

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <>
      <ShopifyHeader />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-[#f1f1f1] w-60">
          <nav className="mt-4">
            {menuItems.map((menuItem, index) => (
              <Link
                key={index}
                href={menuItem.link}
                className="flex items-center hover:bg-gray-100 text-sm font-semibold mx-3 py-[5px] px-2 rounded-md text-gray-600 hover:text-gray-800"
              >
                {React.createElement(menuItem.icon, { className: "mr-2.5" })}
                {menuItem.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-slate-[#f1f1f1]">
          {/* Main Content Area */}
          <div className="container mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
