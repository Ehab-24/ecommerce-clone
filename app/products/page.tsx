
import Link from "next/link";
import React from "react";

const OrdersPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Link href="/products/new"
        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Add Product
      </Link>
    </div>
  );
};

export default OrdersPage;
