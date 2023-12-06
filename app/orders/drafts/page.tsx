// pages/orders.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";

const DraftOrders = () => {
  return (
    <div>
      <Heading>Draft Orders</Heading>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/orders-draft.svg"
          width="250"
          height="250"
          alt="No Orders Image"
        />
        <Title>Manually create orders and invoices</Title>
        <Text className="text-center pb-4 w-96">
          Use draft orders to take orders over the phone, email invoices to
          customers, and collect payments.
        </Text>
        <Link href="/orders/new">
          <FilledButton>Create Draft Order</FilledButton>
        </Link>
      </Card>
    </div>
  );
};

export default DraftOrders;
