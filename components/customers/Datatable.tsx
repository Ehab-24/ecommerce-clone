"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";
import Checkbox from "../Checkbox";
import InputSearch from "../InputSearch";

const Pill = ({ text, success }: { text: string; success: boolean }) => (
  <span
    className={`p-1 rounded-full bg-primary-500 text-neutral-100 ${
      success ? "bg-green-300 !text-green-900" : "bg-red-300 !text-red-900"
    } text-center`}
  >
    {text}
  </span>
);

const Datatable = ({ customers }: { customers: Customer[] }) => {
  const [selected, setSelected] = useState<Customer[]>([]);

  const handleSelect = (customer: Customer) => {
    if (selected.some((c) => c._id === customer._id)) {
      setSelected(selected.filter((c) => c._id !== customer._id));
    } else {
      setSelected([...selected, customer]);
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === customers.length) {
      setSelected([]);
    } else {
      setSelected([...customers]);
    }
  };

  return (
    <div className="border text-xs rounded-lg shadow-sm shadow-black/30 overflow-hidden">
      <div className="p-2 bg-white">
        <InputSearch className="!outline-none" placeholder="Search customers" />
      </div>
      <div className="flex gap-2 p-2 bg-neutral-50 items-center font-semibold">
        <div className="flex-none">
          <Checkbox
            id="select-all"
            label=""
            checked={selected.length === customers.length}
            onChange={toggleSelectAll}
          />
        </div>
        <div className="flex-1">Customer name</div>
        <div className="flex-1">Email subscription</div>
        <div className="flex-1">Location</div>
        <div className="flex-1">Orders</div>
        <div className="flex-1">Amount Spent</div>
      </div>

      <div className="bg-white">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="flex items-center gap-2 p-2 hover:bg-neutral-50"
          >
            <div className="flex-none">
              <Checkbox
                id={customer._id}
                label=""
                checked={selected.some((c) => c._id === customer._id)}
                onChange={() => handleSelect(customer)}
              />
            </div>
            <div className="flex-1">{customer.firstName}</div>
            <div className="flex-1">
              {customer.marketing ? (
                <Pill text="Subscribed" success={true} />
              ) : (
                <Pill text="Not subscribed" success={false} />
              )}
            </div>
            <div className="flex-1">{customer.address.city}</div>
            <div className="flex-1">0</div>
            <div className="flex-1">0</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Datatable;
