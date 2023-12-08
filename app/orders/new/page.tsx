// pages/orders.tsx
import Dashboard from "@/components/Dashboard";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import InputSearch from "@/components/InputSearch";
import React from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import Heading from "@/components/Heading";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrdersPage = () => {
  return (
    <div className="min-h-screen p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/orders">
            <FaArrowLeft className="text-sm text-neutral-800" />
          </Link>
          <Heading>Create Order</Heading>
        </div>

        <Section>
          <div className="flex justify-between align-middle">
            <SectionTitle title="Order Information" />

            <Dialog>
              <DialogTrigger>
                <span className="text-xs text-blue-600">Add Custom Item</span>
              </DialogTrigger>

              <DialogTitle>Add Custom Item</DialogTitle>
              <DialogContent>
                <DialogDescription>
                  Add a custom item to this order.
                </DialogDescription>
              </DialogContent>
              
            </Dialog>
          </div>

          <div className="flex justify-between gap-2">
            <InputSearch placeholder="Search for a product" />
            <button className="hover:bg-neutral-100 text-sm shadow-sm border border-neutral-100 p-1 px-2 rounded-lg">
              Browse
            </button>
          </div>
        </Section>

        <Section>
          <div className="flex justify-between align-middle">
            <SectionTitle title="Notes" />
            <FaPencilAlt className="text-sm text-neutral-500" />
          </div>

          <div className="text-sm">No notes</div>
        </Section>

        <Section>
          <div className="flex justify-between align-middle">
            <SectionTitle title="Customer" />
          </div>

          <InputSearch placeholder="Search for a customer" />
        </Section>

        <Section>
          <SectionTitle title="Customer" />
          <p className="text-sm font-semibold text-neutral-700">
            Primary Market
          </p>
          <p className="text-xs">Kingdom of Saudi Arabia (SAR riyals)</p>
        </Section>

        <Section>
          <SectionTitle title="Tags" />
          <InputSearch placeholder="" />
        </Section>
      </div>
    </div>
  );
};

export default OrdersPage;
