// pages/orders.tsx
import React from "react";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import EmptyPage from "@/components/EmptyPage";

import OrdersTables from "@/components/orders/OrdersTables";

const OrdersPage = () => {
  return (
    <div className="p-5">
      <OrdersTables />
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

export default OrdersPage;
