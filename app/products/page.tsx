
import Link from "next/link";
import React from "react";

const OrdersPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Link href="/products/new">
        Add Product
      </Link>
    </div>
  );
};

export default OrdersPage;
