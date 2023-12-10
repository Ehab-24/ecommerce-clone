// pages/orders.tsx
import React from "react";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import EmptyPage from "@/components/EmptyPage";

import { CustomerSchema } from "@/types/customer";

import { generateMock } from "@anatine/zod-mock";
import DataTable from "@/components/customers/Datatable";
import Heading from "@/components/Heading";
import ExportImportButtons from "@/components/products/ExportImportButtons";

const mockCustomer = generateMock(CustomerSchema);
const mockCustomers = Array.from({ length: 10 }, () => mockCustomer);

const DraftOrders = () => {
  if (mockCustomers.length == 0) {
    return;
    <EmptyPage
      heading="Customers"
      title="Everything customers-related in one place"
      text="Manage customer details, see customer order history, and group customers into segments."
      img="/customers-img.svg"
    >
      <Link href="/customers/new">
        <FilledButton>Add Customer</FilledButton>
      </Link>
    </EmptyPage>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <Heading className="!pb-0">Customers</Heading>

        <div className="flex gap-2">
          <ExportImportButtons />
          <Link href="/customers/new">
            <FilledButton>Add Customer</FilledButton>
          </Link>
        </div>
      </div>
      <DataTable customers={mockCustomers} />
    </div>
  );
};

export default DraftOrders;
