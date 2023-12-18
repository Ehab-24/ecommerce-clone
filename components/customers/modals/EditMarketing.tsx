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

import { Customer } from "@/types/customer";

import Checkbox from "@/components/Checkbox";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const EditMarketing = ({ customer }: { customer: Customer }) => {
  const [marketing, setMarketing] = useState(customer.marketing);
  const [smsMarketing, setSmsMarketing] = useState(customer.smsMarketing);

  const handleEditMarketing = () => {
    console.log("Edit Marketing");
  };

  const handleEditSmsMarketing = () => {
    console.log("Edit SMS Marketing");
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Edit marketing settings
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Marketing</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Checkbox
            checked={customer.marketing}
            onChange={(e) => {
              handleEditMarketing();
            }}
            id="marketingEmail"
            label="Customer agreed to receive marketing emails."
          />

          <Checkbox
            checked={customer.smsMarketing}
            onChange={(e) => {
              handleEditSmsMarketing();
            }}
            id="smsMarketing"
            label="Customer agreed to receive SMS marketing text messages."
          />

          <p className="mt-2 text-sm">
            You should ask your customers for permission before you subscribe
            them to your marketing emails or SMS.
          </p>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose>
              <OutlinedButton>Cancel</OutlinedButton>
            </DialogClose>

            <DialogClose>
              <FilledButton>Save</FilledButton>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMarketing;
