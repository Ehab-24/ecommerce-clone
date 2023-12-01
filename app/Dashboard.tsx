import React from "react";
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

const menuItems = [
  { label: "Home", icon: AiFillHome },
  { label: "Orders", icon: AiOutlineShopping },
  { label: "Products", icon: AiOutlineShop },
  { label: "Customers", icon: AiOutlineUser },
  { label: "Content", icon: AiOutlineBars },
  { label: "Analytics", icon: AiOutlineAreaChart },
  { label: "Marketing", icon: AiOutlineTag },
  { label: "Discounts", icon: AiOutlineTag },
];

const Dashboard = () => {
  return (
    <>
      <ShopifyHeader />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-[#f1f1f1] w-60">
          <nav className="mt-4">
            {menuItems.map((menuItem, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center hover:bg-gray-100 text-sm font-semibold mx-3 py-[5px] px-2 rounded-md text-gray-600 hover:text-gray-800"
              >
                {React.createElement(menuItem.icon, { className: "mr-2.5" })}
                {menuItem.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* Main Content Area */}
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Total Sales
                </h2>
                <p className="text-3xl font-bold text-gray-700">$10,000</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Products
                </h2>
                <p className="text-3xl font-bold text-gray-700">50</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Orders
                </h2>
                <p className="text-3xl font-bold text-gray-700">200</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Customers
                </h2>
                <p className="text-3xl font-bold text-gray-700">500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
