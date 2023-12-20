"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { FaPencilAlt } from "react-icons/fa";

import { Address } from "@/types/address";

import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import ManageAddress from "./ManageAddress";
import { Customer } from "@/types/customer";

const AddressCard = ({ address }: { address: any }) => {
  console.log(address);
  return (
    <div className="flex justify-between p-4 border bg-neutral-100 rounded-lg">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-neutral-700">
          {address.firstName} {address.lastName}
        </p>
        <p className="text-sm text-neutral-500">{address.address}</p>
        <p className="text-sm text-neutral-500">
          {address.city}, {address.postalCode}
        </p>
        <p className="text-sm text-neutral-500">{address.country}</p>
        <p className="text-sm text-neutral-500">{address.phone}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <FaPencilAlt className="text-sm text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

const Addresses = ({ customer }: { customer: Customer }) => {
  const [addresses, setAddress] = useState(customer.addresses);

  const handleEditContact = () => {
    console.log("Edit Contact");
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Manage addresses
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Manage customers</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">
          {addresses.map((address, idx) => (
            <AddressCard key={idx} address={address} />
          ))}
        </div>

        <DialogFooter>
          <ManageAddress customer={customer} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Addresses;
