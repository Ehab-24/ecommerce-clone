"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Variant } from "@/types/product"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Card from "../../Card"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "../../ui/button"
import { ActionCardProps, FilterElements, HeaderItem, RowProps } from "@/types/datatable"
import Datatable from "../../Datatable"
import Text from "../../Text"
import { PiImageThin } from "react-icons/pi"
import Checkbox from "../../Checkbox"

export type VariantWithTitle = Variant & { title: string }

export default function InventoryDatable({ initialVariants }: { initialVariants: VariantWithTitle[] }) {


  // TODO: implement API for this
  const quantities = {
    incoming: 0,
    committed: 0,
    available: 0,
    onHand: 0,
    unavailable: 0,
  }
  const router = useRouter();

  function MobileRow({ item: v }: RowProps<VariantWithTitle>) {

    function QuantityDiv({ label, quantity }: { label: string, quantity: number }) {
      return (
        <div className="flex flex-col rounded-lg border-t border-gray-300 py-2">
          <div className="flex w-full justify-between items-center">
            <Text className="text-gray-800 capitalize">{label}</Text>
            <Text className="text-gray-800">{quantity}</Text>
          </div>
        </div>
      )
    }

    return (

      <div className="flex border-t border-gray-300 py-4 gap-4 w-full">
        {
          v.image ? (
            <div className="w-12 h-12 rounded-md overflow-hidden">
              <Image src={v.image} alt={v.name} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-300 grid place-items-center">
              <PiImageThin size={14} className="text-gray-500" />
            </div>
          )
        }
        <div className="flex w-full flex-col px-4 gap-6">
          <div className="flex flex-col gap-1">
            <Text className="text-gray-800 font-bold text-base">{v.title}</Text>
            <Text className="text-gray-800 bg-gray-200 px-1 w-min whitespace-nowrap py-0.5 rounded-lg">{v.name}</Text>
            <Text className="text-gray-500">{v.sku ?? "No SKU"}</Text>
          </div>
          <div className="flex flex-col">
            {
              Object.entries(quantities).map(([label, quantity]) => <QuantityDiv key={label} label={label} quantity={quantity} />)
            }
          </div>
        </div>
      </div>

    )
  }


  function Row({ item: v, isSelected, setSelected }: RowProps<VariantWithTitle>) {

    return (
      <tr key={v._id} className={`border-b transition-all ${isSelected ? "bg-gray-100 hover:bg-gray-200 " : "bg-white hover:bg-gray-50 "}`}>
        <td className="w-4 p-4">
          <Checkbox id={"select-" + v._id} checked={isSelected} label="" onChange={e => setSelected(e.target.checked)} />
        </td>

        <th scope="row" onClick={() => router.push(`/products/${v._id}`)} className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
          {
            v.image && <div className=" aspect-square h-8 bg-gray-200 rounded-md overflow-hidden">
              <Image width="32" height="32" src={v.image} alt={v.title} className="w-full h-full object-cover" />
            </div>
          }

          <div className="flex flex-col gap-1">
            <Text className="text-gray-800 text-base font-bold">{v.title}</Text>
            <Text className="text-gray-800 bg-gray-200 px-1 py-0.5 w-min whitespace-nowrap rounded-lg">{v.name}</Text>
          </div>
        </th>

        <td className="px-6 py-2">
          {v.sku ?? "No SKU"}
        </td>
        <td className="px-6 py-2">
          {quantities.unavailable}
        </td>
        <td className="px-6 py-2">
          {quantities.committed}
        </td>
        <td className="px-6 py-2">
          {quantities.available}
        </td>
        <td className="px-6 py-2">
          {quantities.onHand}
        </td>
        <td className="px-6 py-2">
          {quantities.incoming}
        </td>
      </tr>
    )
  }

  const views = ["all", "active", "draft", "archived", "some", "more"]

  return (
    <Datatable<VariantWithTitle>
      initialItems={initialVariants}
      sortPopoverProps={{
        //TODO: fecth new `initialProducts` from API
        onSelect: (value) => { console.log(value) },
        options: [
          { label: "Product title", value: "title" },
          { label: "Created", value: "createdAt" },
          { label: "Updated", value: "updatedAt" },
          { label: "Inventory", value: "inventory" },
          { label: "Product type", value: "productType" },
          { label: "Vendor", value: "vendor" },
        ]
      }}
      ActionsCard={ActionsCard}
      Row={Row}
      MobileRow={MobileRow}
      headerItems={getHeaderItems(initialVariants)}
      views={views}
      filters={getAllFilters()}
    />
  )
}



function ActionsCard({ selectedItems: selectedProducts }: ActionCardProps<VariantWithTitle>) {
  return (
    <div className="py-4 min-w-full w-full grid bg-white place-items-center">
      <Card className="px-4 py-2 flex gap-2">

        <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          Bulk edit
        </Button>
        <MoreActionsPopover selectedProducts={selectedProducts} />

      </Card>
    </div>
  )
}

function MoreActionsPopover({ selectedProducts }: { selectedProducts: Variant[] }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
          <HiOutlineDotsHorizontal size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl p-1.5 bg-white flex flex-col">
      </PopoverContent>
    </Popover >)
}


function getHeaderItems(variants: VariantWithTitle[]): HeaderItem<VariantWithTitle>[] {
  return [
    {
      label: "Product", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => a.title.localeCompare(b.title)); break;
          case "asc": sortedVariants.sort((a, b) => b.title.localeCompare(a.title)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    {
      label: "SKU", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.sku ?? "").localeCompare(b.sku ?? "")); break;
          case "asc": sortedVariants.sort((a, b) => (b.sku ?? "").localeCompare(a.sku ?? "")); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    //TODO: compare actual quantities
    {
      label: "Unavailable", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)); break;
          case "asc": sortedVariants.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    {
      label: "Committed", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)); break;
          case "asc": sortedVariants.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    {
      label: "Available", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)); break;
          case "asc": sortedVariants.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    {
      label: "On hand", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)); break;
          case "asc": sortedVariants.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },

    {
      label: "Incoming", sortable: true, onSort: (sortKey) => {
        let sortedVariants = [...variants]
        switch (sortKey) {
          case "desc": sortedVariants.sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0)); break;
          case "asc": sortedVariants.sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedVariants
      }
    },
  ]
}


function getAllFilters(): FilterElements {


  function handleProductVendorChange(vendorIds: string[] | null) {
    // TODO
  }

  function handleProductTagChange(tags: string | null) {
    // TODO
  }

  function handleStatusChange(statuses: string[] | null) {
    // TODO
  }

  function handleSalesChannelChange(salesChannelIds: string | null) {
    // TODO
  }

  function handleMarketChange(marketIds: string | null) {
    // TODO
  }

  function handleProductTypeChange(productTypes: string[] | null) {
    // TODO
  }

  function handleCollectionChange(collectionIds: string | null) {
    // TODO
  }

  return {
    "Sales channel": <div>Sales channel</div>,
    "Product type": <div>Product type</div>,
    "Product vendor": <div>Product vendor</div>,
    "Tagged with": <div>Tagged with</div>,
    "Incoming": <div>Incoming</div>,
    "Committed": <div>Committed</div>,
    "Available": <div>Available</div>,
    "On hand": <div>On hand</div>,
    "Unavailable": <div>Unavailable</div>,
  }
}
