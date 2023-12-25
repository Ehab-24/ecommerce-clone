"use client";

import Checkbox from "@/components/Checkbox";
import StatusText from "@/components/StatusText";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FilterElements, HeaderItem, RowProps } from "@/types/Datatable";
import Datatable from "../../Datatable";
import { GiftCard } from "@/types/giftCard";
import GiftCardCard from "./GiftcardCard";

export default function GiftCardsDatable({
  initialGiftCards,
}: {
  initialGiftCards: GiftCard[];
}) {
  const router = useRouter();

  function Row({ item: gc, isSelected, setSelected }: RowProps<GiftCard>) {
    return (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + gc._id}
            checked={isSelected}
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>
        <th
          scope="row"
          onClick={() => router.push(`/products/gift_cards/${gc._id}`)}
          className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
        >
          {gc.code.substring(gc.code.length - 4)}
        </th>
        <td className="px-6 py-4">
          <StatusText status={gc.status} />
        </td>
        <td className="px-6 py-4">
          {gc.customer.firstName} {gc.customer.lastName}
        </td>
        <td className="px-6 py-4">No Recipient</td>
        <td className="px-6 py-4">{gc.createdAt.substring(0, 10)}</td>
        <td className="px-6 py-4">
          {gc.expiresAt
            ? new Date(gc.expiresAt).toISOString().slice(0, 10)
            : ""}
        </td>
        <td className="px-6 py-4">$ {gc.initialValue}</td>
      </tr>
    );
  }

  return (
    <>
      <Datatable<GiftCard>
        initialItems={initialGiftCards}
        sortPopoverProps={{
          //TODO: fecth new `initialGiftCards` from API
          onSelect: (value) => {
            console.log(value);
          },
          options: [
            { label: "Gift code ending", value: "code" },
            { label: "Customer last name", value: "customer.lastName" },
            { label: "recipient last name", value: "recipient.lastName" },
            { label: "Date created", value: "createdAt" },
            { label: "Date edited", value: "updatedAt" },
            { label: "Expiry date", value: "expiresAt" },
            { label: "Total balance", value: "balance" },
          ],
        }}
        ActionsCard={ActionsCard}
        Row={Row}
        headerItems={getHeaderItems(initialGiftCards)}
        views={["all", "redeemable", "full", "partial", "empty", "deactivated"]}
        filters={getAllFilters()}
      />

      {initialGiftCards.map((gc, i) => (
        <GiftCardCard key={gc._id} giftCard={gc} />
      ))}
    </>
  );
}

function ActionsCard() {
  return (
    <div className="py-4 min-w-full w-full grid bg-white place-items-center">
      <Card className="px-4 py-2 flex gap-2">
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => {}}
        >
          Add tags
        </Button>
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => {}}
        >
          Remove tags
        </Button>
      </Card>
    </div>
  );
}

function getHeaderItems(products: GiftCard[]): HeaderItem<GiftCard>[] {
  return [
    {
      label: "Code ending",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...products];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) => a.code.localeCompare(b.code));
            break;
          case "asc":
            sortedGiftCards.sort((a, b) => b.code.localeCompare(a.code));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    { label: "Status", sortable: false },

    {
      label: "Supplier",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...products];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) =>
              a.customer.firstName.localeCompare(b.customer.firstName)
            );
            break;
          case "asc":
            sortedGiftCards.sort((a, b) =>
              b.customer.firstName.localeCompare(a.customer.firstName)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    {
      label: "Recipient",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...products];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) =>
              a.recipient.firstName.localeCompare(b.recipient.firstName)
            );
            break;
          case "asc":
            sortedGiftCards.sort((a, b) =>
              b.recipient.firstName.localeCompare(a.recipient.firstName)
            );
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },

    {
      label: "Date issued",
      sortable: true,
      onSort: (sortKey) => {
        let sortedGiftCards = [...products];
        switch (sortKey) {
          case "desc":
            sortedGiftCards.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              }
              return 0;
            });
            break;
          case "asc":
            sortedGiftCards.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              }
              return 0;
            });
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedGiftCards;
      },
    },
  ];
}

function getAllFilters(): FilterElements {
  // TODO: create popovers
  return {
    Status: <div className="flex flex-col gap-1">Status</div>,
    Balance: <div className="flex flex-col gap-1">Balance</div>,
    "Gift card value": (
      <div className="flex flex-col gap-1">Gift card value</div>
    ),
    "Date created": <div className="flex flex-col gap-1">Date created</div>,
    "Issue method": <div className="flex flex-col gap-1">Issue method</div>,
  };
}
