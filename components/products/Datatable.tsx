"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from "@/types/product"
import Checkbox from "../Checkbox"
import Image from "next/image"
import { useState } from "react"
import StatusText from "../StatusText"
import { useRouter } from "next/navigation"
import Card from "../Card"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ChangeProductStatusDialog from "./dialogs/ChangeProductStatusDialog"
import ArchiveProductsDialog from "./dialogs/ArchiveProductsDialog"
import DeleteProductsDialog from "./dialogs/DeleteProductsDialog"
import AddTagsToProductsDialog from "./dialogs/AddTagsToProductsDialog"
import RemoveTagsFromProductsDialog from "./dialogs/RemoveTagsFromProductsDialog"
import AddProductsToCollectionsDialog from "./dialogs/AddProductsToCollectionsDialog"
import RemoveProductsFromCollectionsDialog from "./dialogs/RemoveProductsFromCollections"
import { Button } from "../ui/button"
import ProductVendorFilterPopover from "./popovers/ProductVendorFilterPopover"
import { Vendor } from "@/types/vendor"
import CollectionFilterPopover from "./popovers/CollectionFilterPopover"
import TagFilterPopover from "./popovers/TagFilterPopover"
import StatusFilterPopover from "./popovers/StatusFilterPopover"
import SalesChannelFilterPopover from "./popovers/SalesChannelFilterPopover"
import MarketFilterPopover from "./popovers/MarketFilterPopover"
import ProductTypeFilterPopover from "./popovers/ProductTypeFilterPopover"
import { Market } from "@/types/market"
import { Collection } from "@/types/collection"
import { SalesChannel } from "@/types/salesChannel"
import GiftCardFilterPopover from "./popovers/GiftCardFilterPopover"
import { GiftCard } from "@/types/giftCard"
import { ActionCardProps, FilterElements, HeaderItem, RowProps } from "@/types/Datatable"
import Datatable from "../Datatable"


export default function ProductDatable({ initialProducts, giftCards, statuses, collections, salesChannels, markets, tags, productTypes, vendors }: { initialProducts: Product[], giftCards: GiftCard[], statuses: string[], collections: Collection[], salesChannels: SalesChannel[], markets: Market[], tags: string[], productTypes: string[], vendors: Vendor[] }) {

  const router = useRouter()


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
      headerItems={getHeaderItems(initialProducts)}
      views={["all", "active", "draft", "archived"]}
      filters={getAllFilters(vendors, salesChannels, tags, statuses, markets, productTypes, collections, giftCards)}
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

        <ChangeProductStatusDialog status="active" text="Setting products as {status} will make them available to their selected sales channels and apps. " selectedProducts={selectedProducts} successMessage={`${selectedProducts.length} products archived`} />

        <ChangeProductStatusDialog status="draft" text="Setting products as draft will hide them from all sales channels and apps. " selectedProducts={selectedProducts} successMessage={`${selectedProducts.length} products drafted`} />

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

        <ArchiveProductsDialog selectedProducts={selectedProducts} />
        <DeleteProductsDialog selectedProducts={selectedProducts} />
        <AddTagsToProductsDialog selectedProducts={selectedProducts} />
        <RemoveTagsFromProductsDialog selectedProducts={selectedProducts} />
        <AddProductsToCollectionsDialog selectedProducts={selectedProducts} />
        <RemoveProductsFromCollectionsDialog selectedProducts={selectedProducts} />

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


function getAllFilters(vendors: Vendor[], salesChannels: SalesChannel[], tags: string[], statuses: string[], markets: Market[], productTypes: string[], collections: Collection[], giftCards: GiftCard[]): FilterElements {


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

  const selectedTag = tags[0]
  const selectedMarket = markets[0]
  const selectedCollection = collections[0]
  const selectedSalesChannel = salesChannels[0]


  return {
    "Product vendor": <ProductVendorFilterPopover vendors={vendors} onChange={handleProductVendorChange} />,
    "Tagged with": <TagFilterPopover tags={tags} selectedTag={selectedTag} onChange={handleProductTagChange} />,
    "Status": <StatusFilterPopover statuses={statuses} onChange={handleStatusChange} />,
    "Sales channel": <SalesChannelFilterPopover salesChannels={salesChannels} selectedSalesChannel={selectedSalesChannel} onChange={handleSalesChannelChange} />,
    "Market": <MarketFilterPopover markets={markets} selectedMarket={selectedMarket} onChange={handleMarketChange} />,
    "Product type": <ProductTypeFilterPopover productTypes={productTypes} onChange={handleProductTypeChange} />,
    "Collection": <CollectionFilterPopover collections={collections} selectedCollection={selectedCollection} onChange={handleCollectionChange} />,
    "Gift card": <GiftCardFilterPopover giftCards={giftCards} onChange={handleProductTypeChange} />,
  }
}
