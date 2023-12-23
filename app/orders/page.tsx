// pages/orders.tsx
import React from "react";

import OrdersTables from "@/components/orders/OrdersTables";
import { apiUrl } from "@/lib/utils";
import { Order } from "@/types/order";

export default async function OrdersPage() {

  // const res = await fetch(apiUrl("/api/orders"), { cache: "no-cache" })
  // if (!res.ok) throw new Error(res.statusText)
  // const orders: Order[] = await res.json()
  const orders: Order[] = []

  return (
    <div className="p-5">
      <OrdersTables orders={orders} />
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
