// pages/orders.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import EmptyPage from "@/components/EmptyPage";

const OrdersPage = () => {
  return (
    <EmptyPage
      heading="Orders"
      title="Your orders will show here"
      text="This is where you’ll fulfill orders, collect payments, and track order progress."
      img="/orders-home-img.svg"
    >
      <Link href="/orders/new">
        <FilledButton>Create Order</FilledButton>
      </Link>
    </EmptyPage>
  );
};

export default OrdersPage;
