"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from "@/types/product"
import Checkbox from "../Checkbox"
import Image from "next/image"
import { useEffect, useState } from "react"
import StatusText from "../StatusText"
import { useRouter } from "next/navigation"
import Card from "../Card"
import OutlinedButton from "../buttons/OutlinedButton"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ChangeProductStatusDialog from "./dialogs/ChangeProductStatusDialog"
import ArchiveProductsDialog from "./dialogs/ArchiveProductsDialog"
import DeleteProductsDialog from "./dialogs/DeleteProductsDialog"
import AddTagsToProductsDialog from "./dialogs/AddTagsToProductsDialog"
import RemoveTagsFromProductsDialog from "./dialogs/RemoveTagsFromProductsDialog"
import AddProductsToCollectionsDialog from "./dialogs/AddProductsToCollectionsDialog"
import RemoveProductsFromCollectionsDialog from "./dialogs/RemoveProductsFromCollections"
import { Button } from "../ui/button"
import Text from "../Text"
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import SortPopover from "../SortPopover"
import Input from "../Input"
import FilledButton from "../buttons/FilledButton"
import AddViewDialog from "../AddViewDialog"
import HeaderItem from "@/types/headerItem"
import SortableHeader from "../SortableHeader"
import AddFilterPopover from "../AddFilterPopover"

type View = string;

export default function Datatable({ products }: { products: Product[] }) {

  const views: View[] = ["all", "active", "draft", "archived"]
  const headerItems: HeaderItem[] = [
    { label: "Product", sortable: true, sortKey: "title" },
    { label: "Status", sortable: false, sortKey: "" },
    { label: "Inventory", sortable: true, sortKey: "quantity" },
    { label: "Sales Channel", sortable: false, sortKey: "" },
    { label: "Markets", sortable: false, sortKey: "" },
    { label: "Category", sortable: true, sortKey: "category" },
    { label: "Vendor", sortable: true, sortKey: "vendor" },
  ]
  const allFilters = ["Product vendor", "collection", "Product type", "Product tag", "Product price", "Product inventory", "Product status", "Product availability", "Product variant", "Product variant price"]

  const router = useRouter()
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [selectedProducts, setSelectedProducts] = useState<boolean[]>(new Array(products.length).fill(false))
  const [selectedView, setSelectedView] = useState<View>("all")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<string[]>(['Product vendor', 'collection'])

  useEffect(() => {
    setAllChecked(selectedProducts.length > 0 && selectedProducts.every(p => p))
  }, [products, selectedProducts])

  return (
    <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg overflow-hidden">

      <div className=" flex justify-between items-start w-full bg-white px-2 py-1">

        {
          isSearching ? (
            <div className="flex mr-2 flex-col w-full">
              <div className="flex items-center w-full">
                <Input
                  id="search"
                  placeholder="Searching all products"
                  value={search}
                  icon={<IoSearchOutline size={16} className='text-gray-800' />}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="w-4" />
                <Button variant="ghost" className="px-2 mr-2 h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75" onClick={() => setIsSearching(false)}>
                  Cancel
                </Button>
                <FilledButton>
                  Save as
                </FilledButton>
              </div>

              <div className="w-full border-t border-gray-300 pt-2 mt-2 mb-1 flex gap-1">
                {
                  filters.map(f => (
                    <Button key={f} variant="outline" className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75" onClick={() => { }}>
                      {f}
                      <IoClose size={12} className="inline-block ml-1" onClick={() => setFilters(filters.filter(_f => f !== _f))} />
                    </Button>
                  ))
                }

                <AddFilterPopover filters={allFilters} onSelect={f => setFilters([...filters, f])} />

                <Button variant="ghost" className="px-2 rounded-lg h-min py-1 text-gray-800 text-xs hover:bg-gray-200/75" onClick={() => setFilters([])}>
                  Clear all
                </Button>
              </div>

            </div>
          ) : (

            <div className="flex mr-2 w-full justify-between items-center">
              <div className="flex gap-2 items-center">
                {
                  views.map(v => (
                    <Button key={v} variant="ghost" className={`hover:bg-gray-200/75 px-3 py-1.5 h-min ${v === selectedView ? "bg-gray-200" : "bg-transparent"}`} onClick={() => setSelectedView(v)}>
                      <Text className="text-gray-800 capitalize">{v}</Text>
                    </Button>
                  ))
                }
                <AddViewDialog onSave={name => { }} />
              </div>

              <OutlinedButton className="p-1.5 flex gap-0.5" onClick={() => setIsSearching(true)}>
                <IoSearchOutline size={16} className='text-black' />
                <MdOutlineFilterList size={20} className='text-black' />
              </OutlinedButton>
            </div>

          )
        }


        <SortPopover
          options={[
            { label: "Product title", value: "title" },
            { label: "Created", value: "createdAt" },
            { label: "Updated", value: "updatedAt" },
            { label: "Inventory", value: "inventory" },
            { label: "Product type", value: "productType" },
            { label: "Vendor", value: "vendor" },
          ]}
          onChange={val => { }} />


      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[10px] text-gray-700 uppercase bg-gray-100 border-t-2 border-b-2 ">
          <tr>
            <th scope="col" className="p-4">
              <Checkbox id="select-all-products" label={selectedProducts.some(p => p) ? selectedProducts.filter(p => p).length + " selected" : ""} checked={allChecked} onChange={e => setSelectedProducts(new Array(products.length).fill(e.target.checked))} />
            </th>
            {
              headerItems.map(h => (
                <th key={h.label} scope="col" className="px-6 py-1">
                  {selectedProducts.some(p => p) ? "" : h.sortable ? <SortableHeader header={h} onClick={() => { }} sorted="none" /> : h.label}
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody className="text-xs">
          {
            products.map((p, i) => (
              <tr key={p._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <Checkbox id={"select-" + p._id} checked={selectedProducts[i]} label="" onChange={e => {
                    const newSelectProducts = [...selectedProducts]
                    newSelectProducts[i] = e.target.checked
                    setSelectedProducts(newSelectProducts)
                  }} />
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
            ))
          }



        </tbody>
      </table>

      {
        selectedProducts.some(p => p) && (
          <div className="py-4 min-w-full w-full grid bg-white place-items-center">
            <Card className="px-4 py-2 flex gap-2">

              <OutlinedButton onClick={() => { }}>
                Bulk edit
              </OutlinedButton>

              <ChangeProductStatusDialog status="active" text="Setting products as {status} will make them available to their selected sales channels and apps. " selectedProducts={products.filter((_, i) => selectedProducts[i])} successMessage={`${selectedProducts.length} products archived`} />

              <ChangeProductStatusDialog status="draft" text="Setting products as draft will hide them from all sales channels and apps. " selectedProducts={products.filter((_, i) => selectedProducts[i])} successMessage={`${selectedProducts.length} products drafted`} />

              <MoreActionsPopover selectedProducts={products.filter((_, i) => selectedProducts[i])} />

            </Card>
          </div>
        )
      }

    </div >
  )
}


function MoreActionsPopover({ selectedProducts }: { selectedProducts: Product[] }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="select-none rounded-lg border-2 border-neutral-200 py-1 hover:bg-neutral-200 shadow-sm shadow-neutral-500/10 hover:shadow-lg hover:shadow-neutral-900/20 px-2 text-center align-middle font-sans text-xs font-bold text-neutral-900 transition-all focus:ring focus:ring-neutral-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-neutral-50" >
          <HiOutlineDotsHorizontal size={14} />
        </ button>
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

