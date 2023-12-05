"use client";

import React, { ReactChild, useState } from "react";
import { usePathname } from "next/navigation";
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

interface MenuItem {
  label: string;
  icon: any;
  link: string;
  subMenu?: MenuItem[]; // Submenu items
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: AiFillHome, link: "/home", subMenu: [
    {label: "Home Sub", icon: AiFillHome, link: "/home-sub"}
  ] },
  { label: "Orders", icon: AiOutlineShopping, link: "/orders" },
  { label: "Products", icon: AiOutlineShop, link: "/products" },
  { label: "Customers", icon: AiOutlineUser, link: "/customers" },
  { label: "Content", icon: AiOutlineBars, link: "/content" },
  { label: "Analytics", icon: AiOutlineAreaChart, link: "/analytics" },
  { label: "Marketing", icon: AiOutlineTag, link: "/marketing" },
  { label: "Discounts", icon: AiOutlineTag, link: "/discounts" },
];

const Sidebar: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubMenu = (link: string) => {
    setOpenSubMenu(link === openSubMenu ? null : link);
  };

  const isSubMenuOpen = (link: string) => {
    return link === openSubMenu;
  };

  const isCurrentPath = (link: string) => {
    return link === pathname;
  };

  const handleBaseLinkClick = (link: string) => {
    setOpenSubMenu(link === openSubMenu ? null : link);
  };

  return (
    <div className="bg-[#f1f1f1] w-60">
      <nav className="mt-4">
        {menuItems.map((menuItem, index) => (
          <div key={index}>
            <Link href={menuItem.link} passHref>
              <div
                className={`flex items-center ${
                  isCurrentPath(menuItem.link)
                    ? "bg-gray-100 text-gray-800"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                } text-sm font-semibold mx-3 py-[5px] px-2 rounded-md cursor-pointer`}
                onClick={() => handleBaseLinkClick(menuItem.link)}
              >
                {React.createElement(menuItem.icon, { className: "mr-2.5" })}
                {menuItem.label}
                {menuItem.subMenu && (
                  <span className="ml-auto">
                    {isSubMenuOpen(menuItem.link) ? "▲" : "▶"}
                  </span>
                )}
              </div>
            </Link>
            {menuItem.subMenu && isSubMenuOpen(menuItem.link) && (
              <div className="ml-6">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <Link key={subIndex} href={subMenuItem.link} passHref>
                    <div
                      className={`flex items-center ${
                        isCurrentPath(subMenuItem.link)
                          ? "bg-gray-200 text-gray-800"
                          : "hover:bg-gray-200 text-gray-600 hover:text-gray-800"
                      } text-sm font-semibold mx-3 py-[5px] px-2 rounded-md cursor-pointer`}
                    >
                      <span>▶</span>
                      {React.createElement(subMenuItem.icon, {
                        className: "mr-2.5 ml-1",
                      })}
                      {subMenuItem.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
