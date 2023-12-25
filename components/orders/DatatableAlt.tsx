"use client";

import React, { useState } from "react";

import Card from "@/components/Card";
import Select from "@/components/Select";

import Checkbox from "../Checkbox";
import StatusText from "../StatusText";
import { useRouter } from "next/navigation";
import OutlinedButton from "../buttons/OutlinedButton";
import { Button } from "../ui/button";
import Text from "../Text";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import Input from "../Input";
import FilledButton from "../buttons/FilledButton";
import AddViewDialog from "../AddViewDialog";
import { Order } from "@/types/order";
import AddFilterPopover from "../AddFilterPopover";
import OrderCard from "./OrderCard";

const orders = [
  {
    _id: "1001",
    customer: {
      name: "John Doe",
      email: "jonhdoe@gmail.com",
    },
    total: "11.60",
    createdAt: "2021-09-22",
    status: "Draft",
    payment: {
      status: "Unpaid",
    },
    fulfillment: "Unfulfilled",
    items: "2",
    delivery: {
      status: "Not delivered",
      method: "Standard",
    },
    tags: ["Drafts"],
    date: "2021-09-22",
    channel: "Online Store",
  },
];

const Datatable = () => {
  const views = ["All", "Unfulfilled", "Unpaid", "Open", "Closed"];

  const [selectedView, setSelectedView] = useState(views[0]);

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);

  const allFilters = [
    "Drafts",
    "Open",
    "Paid",
    "Unpaid",
    "Overdue",
    "Cancelled",
  ];

  return (
    <div className="shadow-sm shadow-black/40 rounded-xl lg:w-full md:w-[70%]">
      <div className=" flex rounded-t-xl overflow-x-auto justify-between items-start bg-white px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col ">
            <div className="flex items-center ">
              <Input
                id="search"
                placeholder="Searching all products"
                value={search}
                icon={<IoSearchOutline size={16} className="text-gray-800" />}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="w-4" />
              <Button
                variant="ghost"
                className="px-2 mr-2 h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setIsSearching(false)}
              >
                Cancel
              </Button>
              <FilledButton>Save as</FilledButton>
            </div>

            <div className=" border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="outline"
                  className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                  onClick={() => {}}
                >
                  {f}
                  <IoClose
                    size={12}
                    className="inline-block ml-1"
                    onClick={() => setFilters(filters.filter((_f) => f !== _f))}
                  />
                </Button>
              ))}

              <AddFilterPopover
                disabled={filters}
                filters={allFilters}
                onSelect={(f) => setFilters([...filters, f])}
              />

              <Button
                variant="ghost"
                className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75"
                onClick={() => setFilters([])}
              >
                Clear all
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex mr-2 w-full justify-between items-center">
            <div className="flex gap-2 items-center">
              {views.map((v) => (
                <Button
                  key={v}
                  variant="ghost"
                  className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${
                    v === selectedView ? "bg-gray-200" : "bg-transparent"
                  }`}
                  onClick={() => setSelectedView(v)}
                >
                  <Text className="text-gray-800 capitalize">{v}</Text>
                </Button>
              ))}
              <AddViewDialog onSave={(name) => {}} />
            </div>

            <OutlinedButton
              className="p-1.5 flex gap-0.5"
              onClick={() => setIsSearching(true)}
            >
              <IoSearchOutline size={16} className="text-black" />
              <MdOutlineFilterList size={20} className="text-black" />
            </OutlinedButton>
          </div>
        )}
      </div>

      <div className="hidden sm:block overflow-x-auto overflow-y-hidden">
        <div className="grid px-4 grid-cols-11 p-1 gap-1 gap-x-32">
          <div className="text-sm text-gray-700 font-semibold flex gap-1">
            <Checkbox checked={false} id="selectAll" onChange={() => {}} />
            Order
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Date
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Customer
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Channel
          </div>
          <div className="text-sm text-gray-700 font-semibold text-end">
            Total
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Payment status
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Fulfillment status
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Items
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Delivery status
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Delivery method
          </div>
          <div className="text-sm text-gray-700 font-semibold whitespace-nowrap">
            Tags
          </div>
        </div>

        {orders.map((order, idx) => (
          <div
            key={order._id}
            className="grid bg-white grid-cols-11 p-1 gap-1 gap-x-32 px-4"
          >
            <div className="flex items-center gap-1">
              <Checkbox
                checked={false}
                id={`order-${order._id}`}
                onChange={() => {}}
              />
              {order._id}
            </div>
            <div className="whitespace-nowrap text-sm">{order.date}</div>
            <div className="whitespace-nowrap text-sm">
              {order.customer.name}
            </div>
            <div className="whitespace-nowrap text-sm">{order.channel}</div>
            <div className="whitespace-nowrap text-sm">
              {order.total && `Rs. ${order.total}`}
            </div>
            <div className="whitespace-nowrap text-sm">
              {order.payment.status}
            </div>
            <div className="whitespace-nowrap text-sm">{order.fulfillment}</div>
            <div className="whitespace-nowrap text-sm">{order.items}</div>
            <div className="whitespace-nowrap text-sm">
              {order.delivery.status}
            </div>
            <div className="whitespace-nowrap text-sm">
              {order.delivery.method}
            </div>
            <div className={`whitespace-nowrap text-sm`}>{order.tags[0]}</div>
          </div>
        ))}
      </div>

      <div>
        {orders.map((order, i) => (
          <OrderCard
            key={order._id}
            order={order}
            last={i === orders.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Datatable;
