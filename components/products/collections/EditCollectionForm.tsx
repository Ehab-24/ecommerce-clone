'use client'

import { IoIosClose } from "react-icons/io";
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import Heading from "@/components/Heading"
import Card from "@/components/Card"
import Input from "@/components/Input"
import Select from "@/components/Select"
import SectionTitle from "@/components/SectionTitle"
import Radio from "@/components/Radio"
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall"
import TextArea from "@/components/TextArea"
import FilledButton from "@/components/buttons/FilledButton"
import Text from "@/components/Text"
import Checkbox from "@/components/Checkbox"
import ImageUploader from "@/components/ImageUploader"
import Image from "next/image"
import { Condition, Operator, ApiCollectionSchema, ApiCollection, Collection } from "@/types/collection";
import React from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function CreateCollectionForm({ initialCollection }: { initialCollection: Collection }) {

  const [collection, setCollection] = React.useState<ApiCollection>(initialCollection)
  const [loading, setLoading] = React.useState<boolean>(false)

  async function handleSave() {

    setLoading(true)

    try {
      ApiCollectionSchema.parse(collection)
      const { status } = await axios.put(`/api/products/collections/${initialCollection._id}`, collection)

      if (status === 200) {
        toast.success("Collection saved!")
      }

    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message)
      }
      else {
        toast.error("Something went wrong")
        console.log(error)
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (

    <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
      <div className="flex gap-3 items-center ">
        <Link href="/products/collections" className="p-2 rounded-md hover:bg-black/10 transition-all">
          <FaArrowLeft className="text-sm text-[#1a1a1a]" />
        </Link>
        <Heading>{collection.title}</Heading>
      </div>



      <div className=" flex flex-col w-full max-w-4xl self-center gap-4 mb-8">
        <div className=" flex flex-col 2xl:flex-row w-full max-w-4xl self-center gap-4 mb-8">

          <div className="flex flex-col gap-6">
            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <Input id="title" value={collection.title} disabled={loading} onChange={e => setCollection({ ...collection, title: e.target.value })} label="Title" placeholder="e.g. Summer collection, Under $100, Staff picks" />
              <TextArea value={collection.description} disabled={loading} label="Description" onChange={e => setCollection({ ...collection, description: e.target.value })} />
            </Card>

            <Conditions loading={loading} collection={collection} setCollection={setCollection} />

            <Card className="flex p-4  flex-col items-stretch">
              <SectionTitle title="Search Engine Listing" />
              <p className=" text-xs text-gray-900 mb-8">Add a title and description to see how this collection might appear in a search engine listing</p>
              <Input id="seo-title" value={collection.seo.title} disabled={loading} onChange={e => setCollection({ ...collection, seo: { ...collection.seo, title: e.target.value } })} label="SEO Title" placeholder="" />
              <div className="h-4" />
              <TextArea label="SEO Description" disabled={loading} value={collection.seo.description} onChange={e => setCollection({ ...collection, seo: { ...collection.seo, title: e.target.value } })} />
            </Card>
          </div>

          <div className="flex 2xl:max-w-xs w-full flex-col gap-6">

            <Card className="p-4">
              <SectionTitle title="Publishing" />
              <Text className="text-gray-800">Will be included in {
                collection.includeInOnlineStore ? "1" : "0"
              } sales channel</Text>
              <div className="my-2 h-[1px] bg-gray-300 w-full" />
              <Checkbox id="include-in-online-store" disabled={loading} label="Online Store" checked={collection.includeInOnlineStore} onChange={e => setCollection({ ...collection, includeInOnlineStore: e.target.checked })} />
            </Card>

            <Card className="p-4">
              <SectionTitle title="Collection image" />
              {
                collection.image ? (
                  <div className="w-full">
                    <Image src={collection.image} alt={collection.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                  </div>
                ) : (
                  <ImageUploader onSave={url => setCollection({ ...collection, image: url })} />
                )
              }
            </Card>

          </div>
        </div>

        <div className="w-full max-w-4xl flex justify-end mb-8">
          {
            loading ? (
              <Spinner />
            ) : (
              <FilledButton disabled={loading || initialCollection === collection} onClick={handleSave}>Save</FilledButton>
            )
          }
        </div>
      </div >
    </div>
  )
}


function UpdateCondition({ condition, updateCondition, onRemove }: { condition: Condition, onRemove: () => void, updateCondition: (condition: Condition) => void }) {
  return (
    <div className=" flex flex-col gap-4 items-center">

      <div className="flex w-full gap-4 flex-row">
        <div className="w-full">

          <Select label="" value={condition.field} onChange={e => updateCondition({ ...condition, field: e.target.value })} options={[
            { label: "Product Title", value: "product-title" },
            { label: "Product Type", value: "product-type" },
            { label: "Product Category", value: "product-category" },
            { label: "Product Vendor", value: "product-vendor" },
            { label: "Product Tag", value: "product-tag" },
            { label: "Price", value: "price" },
            { label: "Compare at price", value: "compare-at-price" },
            { label: "Weight", value: "weight" },
            { label: "Inventory Stock", value: "inventory-stock" },
            { label: "Variant's Title", value: "variant-title" },
          ]} />
        </div>

        <div className="w-full">
          <Select label="" value={condition.operator} onChange={e => updateCondition({ ...condition, operator: e.target.value as Operator })} options={[
            { label: "Is equal to", value: Operator.Equals },
            { label: "Is not equal to", value: Operator.NotEquals },
            { label: "Is greater than", value: Operator.GreaterThan },
            { label: "Is less than", value: Operator.LessThan },
            { label: "Starts with", value: Operator.StartsWith },
            { label: "Ends with", value: Operator.EndsWith },
            { label: "Contains", value: Operator.Contains },
            { label: "Does not contain", value: Operator.NotContains },
          ]} />
        </div>
      </div>

      <div className="w-full flex gap-4">
        <Input id="condition-value" value={condition.value} onChange={e => updateCondition({ ...condition, value: e.target.value })} />
        <button onClick={onRemove} className="text-gray-900">
          <IoIosClose size={24} />
        </button>
      </div>

    </div>
  )
}

function Conditions({ collection, setCollection, loading }: { loading: boolean; collection: ApiCollection, setCollection: (collection: ApiCollection) => void }) {
  return (
    <Card className="flex p-4 flex-col gap-4 items-stretch">
      <SectionTitle title="Collection Type" />
      <Radio name="collection-type" className="flex flex-col gap-10" onChange={e => setCollection({ ...collection, collectionType: e.target.value as "manual" | "automated" })} items={[
        { label: "Manual", value: "manual", description: "Add products to this collection one by one.", checked: collection.collectionType === "manual" },
        { label: "Automated", value: "automated", description: "Existing and future products that match the conditions you set will automatically be added to this collection.", checked: collection.collectionType === "automated" },
      ]} />

      {
        collection.collectionType === "automated" && (
          <>
            <h3 className="text-sm mt-4 font-bold mb-2 text-neutral-600">Conditions</h3>
            <p className=" text-xs text-gray-900">Products must match:</p>
            <Radio name="condition-match" className="flex items-center gap-10" onChange={e => setCollection({ ...collection, conditionsMatch: e.target.value as 'all' | 'any' })} items={[
              { label: "All conditions", value: "all", checked: collection.conditionsMatch === "all" },
              { label: "Any condition", value: "any", checked: collection.conditionsMatch === "any" },
            ]} />

          </>
        )
      }

      {
        collection.collectionType === "automated" && (
          collection.conditions.map((c, i) =>
            <UpdateCondition key={i} condition={c} onRemove={() => {
              const newConds: Condition[] = [...collection.conditions]
              newConds.splice(i, 1)
              setCollection({ ...collection, conditions: newConds })
            }}
              updateCondition={(newCond) => {
                const newConds: Condition[] = [...collection.conditions]
                newConds[i] = newCond
                setCollection({ ...collection, conditions: newConds })
              }} />
          )
        )
      }

      {
        collection.collectionType === "automated" && (
          <div className=" flex flex-col gap-4 mt-2 items-end">
            <OutlinedButtonSmall disabled={loading} onClick={() => {
              const condition: Condition = { operator: Operator.Equals, value: "", field: "product-type" }
              setCollection({ ...collection, conditions: [...collection.conditions, condition] })
            }} >
              <p className="whitespace-nowrap">{collection.conditions.length === 0 ? "Add condition" : "Add another condition"}</p>
            </OutlinedButtonSmall>
          </div>
        )
      }
    </Card>
  )
}
