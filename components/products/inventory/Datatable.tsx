"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from "@/types/product"
import Image from "next/image"
import { useState } from "react"
import StatusText from "../../StatusText"
import { useRouter } from "next/navigation"
import Card from "../../Card"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "../../ui/button"
import { ActionCardProps, FilterElements, HeaderItem, RowProps } from "@/types/datatable"
import Datatable from "../../Datatable"
import Text from "../../Text"
import { PiImageThin } from "react-icons/pi"
import Link from "next/link"
import Checkbox from "../../Checkbox"

export default function InventoryDatable({ initialProducts }: { initialProducts: Product[] }) {

  const router = useRouter();

  function MobileRow({ item: p }: RowProps<Product>) {
    return (

      <Link href={`/products/${p._id}`} key={p._id} className="flex w-full gap-2 px-3">
        {
          p.media?.length > 0 ? (
            <div className="w-12 h-12 rounded-md overflow-hidden">
              <Image src={p.media[0].url} alt={p.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-300 grid place-items-center">
              <PiImageThin size={14} className="text-gray-500" />
            </div>
          )
        }

        <div className="flex flex-col gap-1">
          <Text className="text-gray-800 font-bold text-base">{p.title}</Text>
          <Text className="text-gray-500">{p.quantity} in stock {p.variants?.length > 0 && `for ${p.variants.length}`}</Text>
          <Text className="text-gray-500">{p.vendor.name}</Text>
          <StatusText status={p.status} />
        </div>
      </Link>
    )
  }


  function Row({ item: p, isSelected, setSelected }: RowProps<Product>) {

    return (
      <tr key={p._id} className={`border-b transition-all ${isSelected ? "bg-gray-100 hover:bg-gray-200 " : "bg-white hover:bg-gray-50 "}`}>
        <td className="w-4 p-4">
          <Checkbox id={"select-" + p._id} checked={isSelected} label="" onChange={e => setSelected(e.target.checked)} />
        </td>

        <th scope="row" onClick={() => router.push(`/products/${p._id}`)} className="flex gap-1 items-center xl:min-w-[240px] py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
          {
            p.media?.length > 0 && (p.media.map((m, i) =>
              <div key={i} className=" aspect-square h-8 bg-gray-200 rounded-md overflow-hidden">
                <Image width="32" height="32" src={m.url} alt={p.title} className="w-full h-full object-cover" />
              </div>
            ))
          }

          <p className="ml-4">{p.title}</p>
        </th>

        <td className="px-6 py-2">
          <StatusText status={p.status} />
        </td>
        <td className="px-6 py-2">
          {p.quantity} in stock
        </td>
        <td className="px-6 py-2">
          -
        </td>
        <td className="px-6 py-2">
          -
        </td>
        <td className="px-6 py-2">
          {p.category}
        </td>
        <td className="px-6 py-2">
          {p.vendor?.name}
        </td>
      </tr>
    )
  }

  const views = ["all", "active", "draft", "archived", "some", "more"]

  return (
    <Datatable<Product>
      initialItems={initialProducts}
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
      headerItems={getHeaderItems(initialProducts)}
      views={views}
      filters={getAllFilters()}
    />
  )
}



function ActionsCard({ selectedItems: selectedProducts }: ActionCardProps<Product>) {
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

function MoreActionsPopover({ selectedProducts }: { selectedProducts: Product[] }) {

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


function getHeaderItems(products: Product[]): HeaderItem<Product>[] {
  return [
    {
      label: "Product", sortable: true, onSort: (sortKey) => {
        let sortedProducts = [...products]
        switch (sortKey) {
          case "desc": sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); break;
          case "asc": sortedProducts.sort((a, b) => b.title.localeCompare(a.title)); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedProducts
      }
    },

    { label: "Status", sortable: false },

    {
      label: "Inventory", sortable: true, onSort: (sortKey) => {
        let sortedProducts = [...products]
        switch (sortKey) {
          case "desc": sortedProducts.sort((a, b) => a.quantity - b.quantity); break;
          case "asc": sortedProducts.sort((a, b) => b.quantity - a.quantity); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedProducts
      }
    },

    { label: "Sales Channel", sortable: false },
    { label: "Markets", sortable: false },

    {
      label: "Category", sortable: true, onSort: (sortKey) => {
        let sortedProducts = [...products]
        switch (sortKey) {
          case "desc": sortedProducts.sort((a, b) => a.category?.localeCompare(b.category ?? "") ?? 0); break;
          case "asc": sortedProducts.sort((a, b) => b.category?.localeCompare(a.category ?? "") ?? 0); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedProducts
      }
    },

    {
      label: "Vendor", sortable: true, onSort: (sortKey) => {
        let sortedProducts = [...products]
        switch (sortKey) {
          case "desc": sortedProducts.sort((a, b) => a.vendor?.name?.localeCompare(b.vendor?.name ?? "") ?? 0); break;
          case "asc": sortedProducts.sort((a, b) => b.vendor?.name?.localeCompare(a.vendor?.name ?? "") ?? 0); break;
          default: throw new Error("Sort type not allowed")
        }
        return sortedProducts
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
