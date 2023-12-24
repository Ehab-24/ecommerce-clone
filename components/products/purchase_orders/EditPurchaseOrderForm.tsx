'use client'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SupplierDialog from "@/components/products/purchase_orders/SupplierDialog"
import { Supplier } from "@/types/supplier";
import Input from "@/components/Input";
import { IoIosArrowRoundBack, IoIosClose, IoIosSearch } from "react-icons/io";
import Text from "@/components/Text";
import React from "react";
import Link from "next/link";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import OutlinedButton from "@/components/buttons/OutlinedButtonSmall";
import AdjustmentsDialog from "@/components/products/purchase_orders/AdjustmentsDialog";
import TitleMini from "@/components/TitleMini";
import StatusText from "@/components/StatusText";
import Datatable from "@/components/products/Datatable";
import { AdjustmentName, ApiPurchaseOrder, ApiPurchaseOrderSchema, PurchaseOrder } from "@/types/purchaseOrder";
import FilledButton from "@/components/buttons/FilledButton";
import BrowseProductsDialog from "@/components/BrowseProductsDialog";
import { Product } from "@/types/product";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Spinner from "@/components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export default function EditPurchaseOrderForm({ initialOrder, currencies }: { currencies: { label: string, value: string }[], initialOrder: PurchaseOrder }) {

  const [purchaseOrder, setPurchaseOrder] = React.useState<ApiPurchaseOrder>({ ...initialOrder, products: initialOrder.products.map(p => p._id), supplier: initialOrder.supplier._id, destination: initialOrder.destination._id })
  const [loading, setLoading] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>(initialOrder.products)

  React.useEffect(() => {
    setPurchaseOrder(t => ({ ...t, products: [...t.products, ...products.map(p => p._id)] }))
  }, [products])


  function getTotalTax() {
    return initialOrder.products.reduce((acc, product) => acc + product.tax, 0);
  }

  async function handleSave() {
    setLoading(true)
    try {

      ApiPurchaseOrderSchema.parse(purchaseOrder)
      const { status } = await axios.put(`/api/products/transfers/${initialOrder._id}`, purchaseOrder)
      if (status === 200) {
        toast.success("Transfer saved!")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex px-4 md:px-0 justify-between items-start md:items-center ">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Link href="/products/purchase_orders" className="p-1 rounded-md hover:bg-black/10 transition-all">
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-neutral-800 flex gap-2 items-center">
            #{purchaseOrder.referenceNumber}
            <StatusText status={purchaseOrder.status} />
          </h1>
        </div>

        <div className="flex gap-2">
          <div className="hidden md:flex md:gap-2">
            <OutlinedButton onClick={() => { }}>
              Delete
            </OutlinedButton>
            <OutlinedButton onClick={() => { }}>
              Duplicate
            </OutlinedButton>
          </div>

          <div className="flex md:hidden">
            {/*TODO: handle onClick*/}
            <Button variant="ghost" className="p-2 bg-gray-200 text-black hover:bg-gray-300 h-min text-xs" onClick={() => { }}>
              <HiOutlineDotsHorizontal size={14} />
            </Button>
          </div>

          <FilledButton onClick={() => { }}>
            Mark as Ordered
          </FilledButton>
        </div>
      </div>

      <Card className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full h-full gap-4">
          <div className="w-full h-full flex flex-col items-start gap-4">
            <SectionTitle title="Supplier" />
            {
              purchaseOrder.supplier ?
                <div className="flex flex-col w-full items-start gap-2">
                  <h3 className="text-xl text-gray-900 font-bold">{initialOrder.supplier.company}</h3>
                  <div className="w-full flex justify-between">
                    <Text>{initialOrder.supplier.address}, {initialOrder.supplier.city}</Text>
                    <SupplierPopover supplier={initialOrder.supplier} />
                  </div>
                </div>
                :
                <SupplierDialog text="Create Supplier" heading="Create Supplier" onSave={s => setPurchaseOrder({ ...purchaseOrder, supplier: s._id })} />
            }
          </div>

          <div className="w-full h-full flex flex-col gap-4">
            <SectionTitle title="Destination" />
            <Select label="Select Destination" value={purchaseOrder.destination} onChange={() => { }} options={[
              { label: "Destination 1", value: "destination1" },
              { label: "Destination 2", value: "destination2" },
              { label: "Destination 3", value: "destination3" },
            ]} />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between gap-4 mt-8">
          <Select label="Payment Terms (optional)" value={purchaseOrder.paymentTerms} onChange={() => { }} options={[
            { "label": "None", "value": "" },
            { "label": "Cash on delivery", "value": "COD" },
            { "label": "Payment on receipt", "value": "ON_RECEIPT" },
            { "label": "Payment in advance", "value": "IN_ADVANCE" },
            { "label": "Net 7", "value": "NET7" },
            { "label": "Net 15", "value": "NET15" },
            { "label": "Net 30", "value": "NET30" },
            { "label": "Net 45", "value": "NET45" },
            { "label": "Net 60", "value": "NET60" }
          ]} />


          <Select label="Supplier Currency" value={purchaseOrder.currency} onChange={() => { }} options={currencies} />
        </div>

      </Card>

      <Card className="p-4 flex flex-col items-start  ">
        <SectionTitle title="Shipping Details" />
        <div className="mt-4 flex gap-4 flex-col w-full items-start xl:flex-row">
          <DatePicker date={purchaseOrder.shipping.arrivalDate ? new Date(purchaseOrder.shipping.arrivalDate) : undefined} setDate={d => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, arrivalDate: d ? d.toString() : "" } })} />
          <Input id="" value={purchaseOrder.shipping.carrier} label="Shipping carrier" onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, carrier: e.target.value } })} />
          <Input id="" value={purchaseOrder.shipping.trackingNumber} onChange={e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, trackingNumber: e.target.value } })} label="Tracking number" placeholder="" />
        </div>
      </Card>

      <Card className="p-4">
        <SectionTitle title="Add Products" />
        <div className=" w-full flex mb-8 gap-4">
          {/*TODO: replace with a select popover for suppliers*/}
          <Input
            icon={<IoIosSearch />}
            id="add-products"
            placeholder="Search products"
            onChange={() => { }}
          />

          <BrowseProductsDialog setProducts={ps => setProducts(ps)} />

        </div>

        <Datatable initialProducts={products} giftCards={[]} vendors={[]} statuses={[]} tags={[]} markets={[]} salesChannels={[]} collections={[]} productTypes={[]} />
      </Card>

      <div className=" flex flex-col 2xl:flex-row w-full gap-6">
        <Card className="p-4 w-full flex gap-4 flex-col">
          <SectionTitle title="Additional details" />
          <AdditionalDetails purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
        </Card>

        <Card className="p-4 w-full h-max">
          <div className="flex items-center justify-between w-full">
            <TitleMini text="Cost summary" />
            <AdjustmentsDialog text="Manage" purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
          </div>

          <div className="flex items-center justify-between w-full">
            <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
            <p className="text-xs text-neutral-800" >$ {getTotalTax()}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <TitleMini text="Subtotal" />
            <p className="text-xs whitespace-nowrap text-neutral-800" >$ 0.00</p>
          </div>
          <Text className="text-neutral-500 mb-4">{initialOrder.products.reduce((acc, p) => acc + p.quantity, 0)} items</Text>

          <TitleMini text="Cost adjustments" />
          <CostAdjustments adjustments={purchaseOrder.costAdjustments} />

          <div className="flex justify-between items-center w-full mt-4">
            <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
            <p className="text-xs text-neutral-800" >$ {initialOrder.products.reduce((acc, p) => acc + (p.price || 10) + p.tax, 0).toFixed(2)}</p>
          </div>
        </Card>
      </div>


      <div className="w-full max-w-4xl flex justify-end mb-8 px-4 md:px-0">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton disabled={loading} onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>
    </>
  )
}


function CostAdjustments({ adjustments }: { adjustments: { name: AdjustmentName, value: number }[] }) {
  if (adjustments.length === 0) {
    return <Text>None</Text>
  }
  return (
    <>
      {adjustments.map(a => (
        <div key={a.name} className="flex justify-between items-center w-full">
          <h3 className="text-xs mb-2 text-neutral-800">{a.name}</h3>
          <p className="text-xs text-neutral-800" >$ {a.value}</p>
        </div>
      ))}
    </>
  )
}

function AdditionalDetails({ purchaseOrder, setPurchaseOrder }: { purchaseOrder: ApiPurchaseOrder, setPurchaseOrder: React.Dispatch<React.SetStateAction<ApiPurchaseOrder>> }) {

  return (
    <>
      <Input id="reference-number" value={purchaseOrder.referenceNumber} label="Reference number" onChange={e => setPurchaseOrder({ ...purchaseOrder, referenceNumber: e.target.value })} />
      <Input id="note-to-supplier" value={purchaseOrder.noteToSupplier} label="Note to supplier" onChange={e => setPurchaseOrder({ ...purchaseOrder, noteToSupplier: e.target.value })} />

      <Input
        id="tags"
        label="Tags"
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setPurchaseOrder({ ...purchaseOrder, tags: [...purchaseOrder.tags, value] })
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {purchaseOrder.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              onClick={() =>
                setPurchaseOrder({ ...purchaseOrder, tags: purchaseOrder.tags.filter((t) => t !== tag) })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>

    </>
  )
}

function SupplierPopover({ supplier }: { supplier: Supplier }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="link" className="text-xs text-blue-700">
          View Supplier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-1 items-start">

        <Text className="font-bold text-gray-900">Address</Text>
        <Text className="text-gray-900 mt-1">{supplier.address}</Text>
        <Text className="text-gray-900">{supplier.apartment}</Text>
        <Text className="text-gray-900">{supplier.city} {supplier.postalCode}</Text>
        <Text className="text-gray-900">{supplier.country}</Text>

        <Text className="font-bold text-gray-900 mt-3">Contact</Text>
        <Text className="text-gray-900 mt-1">{supplier.contactName}</Text>
        <Text className="text-gray-900">{supplier.email}</Text>
        <Text className="text-gray-900 mb-3">{supplier.phoneNumber}</Text>

        <SupplierDialog text="Edit Supplier" heading="Edit Supplier" onSave={s => console.log(s)} />

      </PopoverContent>
    </Popover >
  )
}
