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
    <div className="p-5">
      <Heading>Customers</Heading>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/customers-img.svg"
          width="250"
          height="250"
          alt="No Orders Image"
        />
        <Title>Everything customers-related in one place</Title>
        <Text className="text-center pb-4 w-96">
          Manage customer details, see customer order history, and group
          customers into segments.
        </Text>
        <Link href="/customers/new">
          <FilledButton>Add Customer</FilledButton>
        </Link>
      </Card>
    </div>
  );
};

export default DraftOrders;
