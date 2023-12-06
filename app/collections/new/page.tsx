"use client"

import React from "react"
import { toast } from "react-hot-toast"
import { CollectionSchema, Collection, Condition, Operator } from "@/types/collection"
import { ZodError } from "zod"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import Card from "@/components/Card"
import Input from "@/components/Input"
import Select from "@/components/Select"
import TextArea from "@/components/TextArea"
import FilledButton from "@/components/buttons/FilledButton"
import SectionTitle from "@/components/SectionTitle"
import Radio from "@/components/Radio"
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall"

export default function NewCollectionPage() {

    const defaultCollection: Collection = {
        title: "",
        description: "",
        collectionType: "manual",
        conditions: [],
        conditionsMatch: "all",
        seo: {
            title: "",
            description: ""
        }
    }

    const [collection, setCollection] = React.useState<Collection>(defaultCollection)

    async function handleSave() {
        try {
            const result = CollectionSchema.parse(collection)
            const resp = await fetch(
                "/api/collections",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(result)
                }
            )

            if (resp.status === 201) {
                toast.success("Product created successfully")
                setCollection(defaultCollection)
            }

        } catch (error) {
            toast.error((error as ZodError).errors[0].message)
        }
    }

    return (
        <div className="flex-col flex gap-6 p-8 ">
            <div className="flex gap-3 items-center ">
                <Link href="/products">
                    <FaArrowLeft className="text-sm text-[#1a1a1a]" />
                </Link>
                <h1 className="text-xl font-bold text-[#1a1a1a]">Create Collection</h1>
            </div>

            <div className=" flex flex-col w-full max-w-3xl self-center gap-4 mb-8">
                <Card className="flex flex-col gap-4 items-stretch">
                    <Input id="title" onChange={e => setCollection({ ...collection, title: e.target.value })} label="Title" placeholder="e.g. Summer collection, Under $100, Staff picks" />
                    <TextArea label="Description" onChange={e => setCollection({ ...collection, description: e.target.value })} />
                </Card>

                <Conditions collection={collection} setCollection={setCollection} />


                <Card className="flex flex-col items-stretch">
                    <SectionTitle title="Search Engine Listing" />
                    <p className=" text-xs text-gray-900 mb-8">Add a title and description to see how this collection might appear in a search engine listing</p>
                    <Input id="seo-title" onChange={e => setCollection({ ...collection, title: e.target.value })} label="SEO Title" placeholder="" />
                    <div className="h-4" />
                    <TextArea label="SEO Description" onChange={e => setCollection({ ...collection, description: e.target.value })} />
                </Card>

                <FilledButton onClick={handleSave}>
                    Save
                </FilledButton>
            </div>
        </div>
    )
}

function UpdateCondition({ condition, updateCondition }: { condition: Condition, updateCondition: (condition: Condition) => void }) {

    // const defaultCondition = { operator: Operator.Equals, value: "", field: "product-type" }
    // const [condition, setCondition] = useState<Condition>(defaultCondition)

    return (
        <div className=" flex gap-2 items-center">
            <Select label="Product Tag" onChange={e => updateCondition({ ...condition, field: e.target.value })} options={[
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

            <Select label="is equal to" onChange={e => updateCondition({ ...condition, operator: e.target.value as Operator })} options={[
                { label: "Is equal to", value: Operator.Equals },
                { label: "Is not equal to", value: Operator.NotEquals },
                { label: "Is greater than", value: Operator.GreaterThan },
                { label: "Is less than", value: Operator.LessThan },
                { label: "Starts with", value: Operator.StartsWith },
                { label: "Ends with", value: Operator.EndsWith },
                { label: "Contains", value: Operator.Contains },
                { label: "Does not contain", value: Operator.NotContains },
            ]} />

            <Input id="condition-value" label="" placeholder="" onChange={e => updateCondition({ ...condition, value: e.target.value })} />
        </div>
    )
}

function Conditions({ collection, setCollection }: { collection: Collection, setCollection: (collection: Collection) => void }) {
    return (
        <Card className="flex flex-col gap-4 items-stretch">
            <SectionTitle title="Collection Type" />
            <Radio name="collection-type" className="flex flex-col gap-10" onChange={e => setCollection({ ...collection, collectionType: e.target.value as "manual" | "automated" })} items={[
                { label: "Manual", value: "manual", description: "Add products to this collection one by one." },
                { label: "Automated", value: "automated", description: "Existing and future products that match the conditions you set will automatically be added to this collection." },
            ]} />

            {
                collection.collectionType === "automated" && (
                    <>
                        <h3 className="text-sm mt-4 font-bold mb-2 text-neutral-600">Conditions</h3>
                        <p className=" text-xs text-gray-900">Products must match:</p>
                        <Radio name="condition-match" className="flex items-center gap-10" onChange={e => setCollection({ ...collection, conditionsMatch: e.target.value as 'all' | 'any' })} items={[
                            { label: "All conditions", value: "all" },
                            { label: "Any condition", value: "any" },
                        ]} />

                    </>
                )
            }

            {
                collection.collectionType === "automated" && (
                    collection.conditions.map((c, i) =>
                        <UpdateCondition key={i} condition={c} updateCondition={(newCond) => {
                            const newConds: Condition[] = [...collection.conditions]
                            newConds[i] = newCond
                            setCollection({ ...collection, conditions: newConds })
                        }} />
                    )
                )
            }

            {
                collection.collectionType === "automated" && (
                    <div className=" flex flex-col gap-4 items-end">
                        <OutlinedButtonSmall onClick={() => {
                            const condition: Condition = { operator: Operator.Equals, value: "", field: "product-type" }
                            setCollection({ ...collection, conditions: [...collection.conditions, condition] })
                        }} >
                            <p className="whitespace-nowrap">Add condition</p>
                        </OutlinedButtonSmall>
                    </div>
                )
            }
        </Card>
    )
}
