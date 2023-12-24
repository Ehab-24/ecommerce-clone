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
    <div className="shadow-sm shadow-black/40 md:rounded-xl">
      <div className=" flex md:rounded-t-xl overflow-x-auto justify-between items-start whitespace-nowrap bg-white px-2 py-1">
        {isSearching ? (
          <div className="flex mr-2 flex-col w-full">
            <div className="flex items-center w-full">
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

            <div className="w-full border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
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

      <div className="overflow-x-auto hidden md:table">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 text-sm items-center bg-gray-100 border-b">
              <th className="whitespace-nowrap px-0 py-1.5">
                <Checkbox checked={false} id="selectAll" onChange={() => {}} />
              </th>
              <th className="text-start">Order</th>
              <th className="whitespace-nowrap pr-10">Date</th>
              <th className="whitespace-nowrap pr-10">Customer</th>
              <th className="whitespace-nowrap pr-10">Channel</th>
              <th className="text-end whitespace-nowrap pr-10">Total</th>
              <th className="whitespace-nowrap pr-10">Payment status</th>
              <th className="whitespace-nowrap pr-10">Fulfillment status</th>
              <th className="whitespace-nowrap pr-10">Items</th>
              <th className="whitespace-nowrap pr-10">Delivery status</th>
              <th className="whitespace-nowrap pr-10">Delivery method</th>
              <th className="whitespace-nowrap pr-10">Tags</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="text-gray-600 font-semibold text-sm bg-gray-100 border-b"
              >
                <td className="">
                  <div className="flex items-center">
                    <Checkbox
                      checked={false}
                      id={`order-${order._id}`}
                      onChange={() => {}}
                    />
                    <p className="ml-2">{order._id}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap">{order.date}</td>
                <td className="whitespace-nowrap">{order.customer.name}</td>
                <td className="whitespace-nowrap">{order.channel}</td>
                <td className="text-center whitespace-nowrap">
                  {order.total && `Rs. ${order.total}`}
                </td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
                    <span className="rounded-full outline-1 p-1.5 bg-gray-500"></span>
                    <p className="text-gray-500 text-xs">
                      {order.payment.status}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
                    <span className="rounded-full outline-1 p-1.5 bg-yellow-500"></span>
                    <p className="text-gray-500 text-xs">{order.fulfillment}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap">{order.items}</td>
                <td className="whitespace-nowrap">{order.delivery.status}</td>
                <td className="whitespace-nowrap">{order.delivery.method}</td>
                <td className="whitespace-nowrap">{order.tags[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
