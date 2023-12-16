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

interface subMenu {
  label: string;
  link: string;
}
interface MenuItem {
  label: string;
  icon: any;
  link: string;
  subMenu?: subMenu[]; // Submenu items
}

const ordersMenu: subMenu[] = [
  { label: "Drafts", link: "/orders/drafts" },
  {
    label: "Abandoned Checkouts",
    link: "/orders/abandoned_checkouts",
  },
];

const ContentMenu: subMenu[] = [
  { label: "Metaobjects", link: "/content/metaobjects" },
  { label: "Files", link: "/content/files" },
];

const productsMenu: subMenu[] = [
  { label: "Collections", link: "/products/collections" },
  { label: "Inventory", link: "/products/inventory" },
  { label: "Purchase Orders", link: "/products/purchase_orders" },
  { label: "Transfers", link: "/products/transfers" },
  { label: "Gift Cards", link: "/products/gift_cards" },
];

const menuItems: MenuItem[] = [
  { label: "Home", icon: AiFillHome, link: "/home" },
  {
    label: "Orders",
    icon: AiOutlineShopping,
    link: "/orders",
    subMenu: ordersMenu,
  },
  {
    label: "Products",
    icon: AiOutlineShop,
    link: "/products",
    subMenu: productsMenu,
  },
  { label: "Customers", icon: AiOutlineUser, link: "/customers" },
  {
    label: "Content",
    icon: AiOutlineBars,
    link: "/content",
    subMenu: ContentMenu,
  },
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
    <div className="bg-[#ebebeb] w-60 h-[100%]">
      <nav className="pt-4">
        {menuItems.map((menuItem, index) => (
          <div key={index}>
            <Link href={menuItem.link} passHref>
              <div
                className={`flex items-center ${isCurrentPath(menuItem.link)
                    ? "bg-gray-200 text-gray-800"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                  } text-sm font-semibold mx-3 py-[5px] px-2 rounded-md cursor-pointer`}
                onClick={() => handleBaseLinkClick(menuItem.link)}
              >
                {React.createElement(menuItem.icon, { className: "mr-2.5" })}
                {menuItem.label}
              </div>
            </Link>
            {menuItem.subMenu && isSubMenuOpen(menuItem.link) && (
              <div className="mx-3">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <Link key={subIndex} href={subMenuItem.link} passHref>
                    <div
                      className={`${isCurrentPath(subMenuItem.link)
                          ? "bg-gray-200 text-gray-800"
                          : "hover:bg-gray-200 text-gray-600 hover:text-gray-800"
                        } text-xs ml-1 py-[5px] pl-8 rounded-md cursor-pointer`}
                    >
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
