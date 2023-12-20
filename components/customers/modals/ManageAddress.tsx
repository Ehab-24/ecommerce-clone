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

import Input from "@/components/Input";
import Select from "@/components/Select";
import countries from "@/data/countries";

import { Customer } from "@/types/customer";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const ManageAddress = ({ customer }: { customer: Customer }) => {
  const [address, setAddress] = useState(customer.addresses[0]);

  const handleEditAddress = () => {
    console.log("Edit Address");
  };

  const handleAddressFieldChange = (field: string, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs text-left align-top border py-1 shadow-sm shadow-black/50 p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Add new address
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Add new address</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 p-4">
          <Select
            label="Country/Region of origin"
            options={countries}
            onChange={(e) => {
              handleAddressFieldChange("country", e.target.value);
            }}
          />
          <div className="flex gap-4 flex-col sm:flex-row">
            <Input
              onChange={(e) => {
                handleAddressFieldChange("firstName", e.target.value);
              }}
              label="First Name"
              id="firstName"
              placeholder=""
            />
            <Input
              onChange={(e) => {
                handleAddressFieldChange("lastName", e.target.value);
              }}
              label="Last Name"
              id="lastName"
              placeholder=""
            />
          </div>
          <Input
            onChange={(e) => {
              handleAddressFieldChange("company", e.target.value);
            }}
            label="Phone"
            id="phone"
            placeholder=""
          />
          <Input
            onChange={(e) => {
              handleAddressFieldChange("address", e.target.value);
            }}
            label="Address"
            id="address"
            placeholder=""
          />
          <Input
            onChange={(e) => {
              handleAddressFieldChange("apartment", e.target.value);
            }}
            label="Apartment, suite, etc."
            id="apartment"
            placeholder=""
          />

          <div className="flex gap-4 flex-col sm:flex-row">
            <Input label="City" id="city" placeholder="" />
            <Input label="Postal Code" id="postalCode" placeholder="" />
          </div>

          <Input label="Company" id="company" placeholder="" />
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton onClick={handleEditAddress}>
                Cancel
              </OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton onClick={handleEditAddress}>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAddress;
