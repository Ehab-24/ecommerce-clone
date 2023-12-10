// pages/orders.tsx
import React from "react";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import EmptyPage from "@/components/EmptyPage";
import DataTable from "@/components/customers/Datatable";
import Heading from "@/components/Heading";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { serverURL } from "@/lib/utils";

// const mockCustomers = [
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
//   {
//     _id: "subito",
//     firstName: "Mona",
//     lastName: "Hessel",
//     language: "amo",
//     email: "Gerson_Ondricka@example.org",
//     phone: "tremo",
//     marketing: false,
//     smsMarketing: true,
//     address: {
//       country: "Netherlands",
//       firstName: "Loyal",
//       lastName: "Greenfelder",
//       company: "minima",
//       address: "tempora",
//       apartment: "commodi",
//       city: "South Marianehaven",
//       postalCode: "decor",
//       phone: "deinde",
//     },
//     taxExempt: true,
//     note: "quae",
//     tags: [undefined, undefined, undefined, undefined, undefined],
//   },
// ];

const DraftOrders = async () => {
  const response = await fetch(serverURL + "/api/customers", {
    cache: "no-cache",
  })
  const customers = await response.json()

  console.log(customers)

  if (customers.length == 0) {
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
      <DataTable customers={customers} />
    </div>
  );
};

export default DraftOrders;
