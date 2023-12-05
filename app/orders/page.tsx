// pages/orders.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";

const OrdersPage = () => {
  return (
    <div>
      <Heading>Orders</Heading>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/orders-home-img.svg"
          width="250"
          height="250"
          alt="No Orders Image"
        />
        <Title>Your orders will show here</Title>
        <Text className="text-center pb-4 w-96">
          This is where you’ll fulfill orders, collect payments, and track order
          progress.
        </Text>
        <Link href="/orders/new">
          <FilledButton>Create Order</FilledButton>
        </Link>
      </Card>
    </div>
  );
};

export default OrdersPage;
