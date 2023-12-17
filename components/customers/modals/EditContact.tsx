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

import { Customer } from "@/types/customer";
import FilledButton from "@/components/buttons/FilledButton";

const EditContact = ({ customer }: { customer: Customer }) => {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [language, setLanguage] = useState(customer.language);

  const handleEditContact = () => {
    console.log("Edit Contact");
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
        Edit contact information
      </DialogTrigger>

      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-4">
            <Input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              label="First Name"
              id="firstName"
              placeholder=""
            />
            <Input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label="Last Name"
              id="lastName"
              placeholder=""
            />
          </div>

          <label
            htmlFor="language"
            className="block w-full pb-1 text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <select
            name="language"
            id="language"
            value={customer?.language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            className="px-3 w-full border border-gray-200 rounded-lg py-1 text-sm outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="English">English</option>
            {/* Add other language options if needed */}
          </select>

          <Input
            label="Email"
            id="email"
            placeholder=""
            value={customer?.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="flex">
            <Input
              label="Phone"
              id="phone"
              placeholder=""
              value={customer?.phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="btn btn-ghost">Cancel</DialogClose>
          <FilledButton onClick={handleEditContact}>Save</FilledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
