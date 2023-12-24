// pages/orders.tsx
import React from "react";

import OrdersTables from "@/components/orders/OrdersTables";
import { apiUrl } from "@/lib/utils";
import { Order } from "@/types/order";

import EmptyPage from "@/components/EmptyPage";
import Heading from "@/components/Heading";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import Link from "next/link";
import Datatable from "@/components/orders/Datatable";

export default async function OrdersPage() {

  // const res = await fetch(apiUrl("/api/orders"), { cache: "no-cache" })
  // if (!res.ok) throw new Error(res.statusText)
  // const orders: Order[] = await res.json()
  const orders: Order[] = []

  return (
    <div className="p-0 md:p-5">
    <div className="flex p-5 md:p-0 md:pb-5 justify-between items-center">
      <Heading>Orders</Heading>

      <div>
        <OutlinedButton className="mr-2">Export</OutlinedButton>
        <Link href="/orders/new">
          <FilledButton>Create Order</FilledButton>
        </Link>
      </div>
    </div>
    <Datatable />
  </div>

    // <EmptyPage
    //   heading="Orders"
    //   title="Your orders will show here"
    //   text="This is where you’ll fulfill orders, collect payments, and track order progress."
    //   img="/orders-home-img.svg"
    // >
    //   <Link href="/orders/new">
    //     <FilledButton>Create Order</FilledButton>
    //   </Link>
    // </EmptyPage>
  );
};
