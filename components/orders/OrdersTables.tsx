"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";
import Checkbox from "../Checkbox";
import InputSearch from "../InputSearch";
import FilledButton from "../buttons/FilledButton";
import Link from "next/link";
import SortPopover from "./SortPopover";

import { Order } from "@/types/order";

const Pill = ({ text, success }: { text: string; success: boolean }) => (
  <span
    className={`p-1 rounded-full text-[12px] px-2 bg-primary-500 text-neutral-100 ${
      success ? "bg-green-200 !text-green-900" : "bg-red-200 !text-red-900"
    } text-center`}
  >
    {text}
  </span>
);

const Datatable = ({
  orders,
  handleDelete,
}: {
  orders?: Order[];
  handleDelete?: any;
}) => {
  const [ordersLocal, setordersLocal] = useState<Order[]>(orders || []);
  const [selected, setSelected] = useState<Order[]>([]);

  const handleSelect = (order: Order) => {
    if (selected.some((c) => c._id === order._id)) {
      setSelected(selected.filter((c) => c._id !== order._id));
    } else {
      setSelected([...selected, order]);
    }
  };

  const toggleSelectAll = () => {
    // if (selected.length === orders.length) {
    //   setSelected([]);
    // } else {
    //   setSelected([...orders]);
    // }

    console.log("toggleSelectAll");
  };

  const headerItems = [
    "Date",
    "Customer",
    "Channel",
    "Total",
    "Payment status",
    "Fulfillment status",
    "Items",
    "Delivery status",
    "Delivery method",
    "Tags",
  ];

  return (
    <div className="border text-xs relative w-[70%] overflow-x-auto rounded-xl shadow-sm shadow-black/40 overflow-hidden">
      <div className="p-2 flex gap-2 item bg-white">
        <SortPopover />
      </div>

      <div className="hidden sm:flex overflow-x-auto relative gap-2 p-1.5 border-y bg-neutral-50 text-neutral-600 items-center font-medium">
        <div className="flex-none pl-2">
          <Checkbox
            id="select-all"
            label=""
            checked={selected.length === 1}
            onChange={toggleSelectAll}
          />
        </div>
        <div className="flex-1">Order</div>
        {headerItems.map((item) => (
          <div className="flex-1 w-[100px]" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Datatable;
