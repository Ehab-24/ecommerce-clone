"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Checkbox from "@/components/Checkbox";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Collection } from "@/types/collection";
import { FilterElements, HeaderItem, RowProps } from "@/types/Datatable";
import Datatable from "../../Datatable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import CollectionCard from "./CollectionCard";

export default function Datable({
  initialCollections,
}: {
  initialCollections: Collection[];
}) {
  const router = useRouter();

  function Row({ item: c, isSelected, setSelected }: RowProps<Collection>) {
    return (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td className="w-4 p-4">
          <Checkbox
            id={"select-" + c._id}
            checked={isSelected}
            onChange={(e) => setSelected(e.target.checked)}
          />
        </td>

        <th
          scope="row"
          onClick={() => router.push(`/products/collections/${c._id}`)}
          className="px-6 flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap  cursor-pointer"
        >
          {c.title}
        </th>
        <td className="px-6 py-4">{c.products.length}</td>
        <td className="px-6 py-4">
          <p className="capitalize">
            {c.conditions
              .map(
                (condition) =>
                  condition.field +
                  " is " +
                  condition.operator +
                  " " +
                  condition.value
              )
              .join(",\n")}
          </p>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Datatable<Collection>
        initialItems={initialCollections}
        sortPopoverProps={{
          //TODO: fecth new `initialCollections` from API
          onSelect: (value) => {
            console.log(value);
          },
          options: [
            { label: "Collection title", value: "title" },
            { label: "Updated", value: "updatedAt" },
          ],
        }}
        ActionsCard={ActionsCard}
        Row={Row}
        headerItems={getHeaderItems(initialCollections)}
        views={["all"]}
        filters={getAllFilters()}
      />

      {initialCollections.map((c) => (
        <CollectionCard key={c._id} collection={c} />
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
          Bulk edit
        </Button>

        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => {}}
        >
          Include in sales channels
        </Button>

        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => {}}
        >
          Exclude from sales channels
        </Button>

        <MoreActionsPopover />
      </Card>
    </div>
  );
}

function MoreActionsPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs"
          onClick={() => {}}
        >
          <HiOutlineDotsHorizontal size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl p-1.5 bg-white flex flex-col">
        <Button
          variant="ghost"
          className="py-1 px-2 flex items-start text-xs text-gray-800 rounded-lg"
        >
          Delete collections
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function getHeaderItems(products: Collection[]): HeaderItem<Collection>[] {
  return [
    {
      label: "Title",
      sortable: true,
      onSort: (sortKey) => {
        let sortedCollections = [...products];
        switch (sortKey) {
          case "desc":
            sortedCollections.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "asc":
            sortedCollections.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            throw new Error("Sort type not allowed");
        }
        return sortedCollections;
      },
    },

    { label: "Products", sortable: false },
    { label: "Product conditions", sortable: false },
  ];
}

function getAllFilters(): FilterElements {
  return {
    "Sales channel": <div>Sales channel</div>,
    Type: <div>Type</div>,
  };
}
