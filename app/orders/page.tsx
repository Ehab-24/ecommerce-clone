// pages/orders.tsx
import React from "react";
import Link from "next/link";

const OrdersPage = () => {
  return (
    <div>
      <Link href="/orders/new">
        Add Order
      </Link>
    </div>
  );
};

export default OrdersPage;
