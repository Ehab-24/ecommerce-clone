"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";
import Checkbox from "../Checkbox";
import InputSearch from "../InputSearch";
import FilledButton from "../buttons/FilledButton";
import Link from "next/link";
import SortPopover from "./SortPopover";

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
  customers,
  handleDelete,
}: {
  customers: Customer[];
  handleDelete: any;
}) => {
  const [customersLocal, setCustomersLocal] = useState<Customer[]>(customers); // [1
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
    <div className="border text-xs rounded-xl shadow-sm shadow-black/40 overflow-hidden">
      <div className="p-2 flex gap-2 item bg-white border-b">
        <InputSearch
          onChange={(e: any) => {
            const value = e.target.value;
            const filtered = customers.filter((customer) =>
              customer.firstName.toLowerCase().includes(value.toLowerCase())
            );
            setCustomersLocal(filtered);
          }}
          className="!outline-none !border-none hover:bg-neutral-50"
          placeholder="Search customers"
        />
        <SortPopover />
      </div>

      {customersLocal.length === 0 && (
        <div className="flex flex-col bg-white py-16 justify-center text-neutral-600 items-center">
          <p className="text-[15px] font-semibold">No customers found</p>
          <p className="text-sm pt-5">Try changing the search terms.</p>
        </div>
      )}

      {customersLocal.length > 0 && (
        <>
          <div className="flex gap-2 p-1.5 border-y bg-neutral-50 text-neutral-600 items-center font-medium">
            <div className="flex-none pl-2">
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
            {customersLocal.map((customer) => (
              <>
                <Link
                  href={`customers/${customer._id}`}
                  key={customer._id}
                  className="flex items-center gap-2 p-1.5 hover:bg-neutral-50"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(customer);
                    }}
                    className="flex-none pl-2"
                  >
                    <Checkbox
                      id={customer._id}
                      label=""
                      checked={selected.some((c) => c._id === customer._id)}
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`customers/${customer._id}`}
                      className="hover:underline"
                    >
                      {customer.firstName}
                    </Link>
                  </div>
                  <div className="flex-1">
                    {customer.marketing ? (
                      <Pill text="Subscribed" success={true} />
                    ) : (
                      <Pill text="Not subscribed" success={false} />
                    )}
                  </div>
                  {customer.note && (
                    <div className="flex-1">{customer.note}</div>
                  )}
                  <div className="flex-1">{customer.address.address}</div>
                  <div className="flex-1">0</div>
                  <div className="flex-1">0</div>
                </Link>

                {selected.length > 0 && selected.includes(customer) && (
                  <div
                    key={customer._id}
                    className="p-2 bg-neutral-100 flex justify-center"
                  >
                    <FilledButton onClick={() => handleDelete(customer._id)}>
                      Delete
                    </FilledButton>
                  </div>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Datatable;
