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

import Checkbox from "@/components/Checkbox";

import { Customer } from "@/types/customer";
import FilledButton from "@/components/buttons/FilledButton";

const ManageTax = ({ customer }: { customer: Customer }) => {
  const [tax, setTax] = useState(customer.taxExempt);

  const handleEditTax = () => {
    console.log("Edit Tax");
  };

  const handleTaxExempt = (val: boolean) => {
    setTax(val);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Manage tax exemptions
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Tax</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Checkbox
            id="taxExempt"
            label="Collect Tax"
            checked={tax}
            onChange={(e) => {
              handleTaxExempt(e.target.checked);
            }}
          />
        </div>

        <DialogFooter>
          <DialogClose className="btn btn-md btn-default">Cancel</DialogClose>
          <FilledButton onClick={handleEditTax}>Save</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTax;