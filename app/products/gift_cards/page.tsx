import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import LinkMini from "@/components/LinkMini";
import Datatable from "@/components/products/gift_cards/Datatable";
import { GiftCard } from "@/types/giftCard";
import HeaderButtons from "@/components/products/gift_cards/HeaderButtons";

export default function CreateGiftCardPage() {
  const giftCards: GiftCard[] = [
    {
      _id: "1",
      code: "GIFT123",
      status: "active",
      initialValue: 50,
      hasExpiry: true,
      customer: "CustomerID123",
      internalNotes: "Birthday gift for a loyal customer",
      expiresAt: new Date("2024-12-31"),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        name: "John Doe",
      },
    },

    {
      _id: "2",
      code: "GIFT456",
      status: "inactive",
      initialValue: 25,
      hasExpiry: false,
      customer: "CustomerID789",
      internalNotes: "Promotional gift card for the holiday season",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        name: "John Doe",
      },
    },

    {
      _id: "3",
      code: "GIFT789",
      status: "redeemed",
      initialValue: 100,
      hasExpiry: true,
      customer: "CustomerID456",
      expiresAt: new Date("2023-12-25"),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        name: "John Doe",
      },
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" w-full flex justify-between">
        <Heading>Gift Cards</Heading>

        <div className=" flex items-center gap-4">
          <HeaderButtons />
          <LinkMini href="gift_cards/new">Create Gift Card</LinkMini>
        </div>
      </div>
      <div className="h-8" />

      {giftCards && giftCards.length > 0 ? (
        <Datatable giftCards={giftCards} />
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Image
            src="/orders-home-img.svg"
            width="250"
            height="250"
            alt="No Orders Image"
          />
          <Title>Start selling gift cards</Title>
          <Text className="text-center pb-4 w-96">
            Add gift card products to sell or create gift cards and send them
            directly to your customers.
          </Text>
          <div className=" flex gap-4 w-min self-center whitespace-nowrap">
            <LinkMini href="gift_cards/new">Create Gift Card</LinkMini>
            <LinkMini href="gift_cards/new">Add Gift Card Product</LinkMini>
          </div>
        </Card>
      )}
    </div>
  );
}
