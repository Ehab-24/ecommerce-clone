// pages/orders.tsx
import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";

const DraftOrders = () => {
  return (
    <div>
      <Heading>Abandoned Checkouts</Heading>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/abandoned-checkouts.svg"
          width="250"
          height="250"
          alt="Abandoned Checkouts Image"
        />
        <Title>Abandoned checkouts will show here</Title>
        <Text className="text-center pb-4 w-96">
          See when customers put an item in their cart but don’t check out. You
          can also email customers a link to their cart.
        </Text>
      </Card>
    </div>
  );
};

export default DraftOrders;
