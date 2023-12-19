'use client'

import React from "react";
import { Product, VariantSchema } from "@/types/product";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import EditVariantImagesDialog from "./EditVariantImagesDialog";
import Image from "next/image";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import TextButton from "@/components/buttons/TextButton";
import FilledButton from "@/components/buttons/FilledButton";
import { ZodError } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Shipping from "./form/Shipping";
import Inventory from "./form/Inventory";
import Pricing from "./form/Pricing";
import { Location } from "@/types/location";

export default function EditVariantForm({ initialProduct, vi, locations }: { locations: Location[], initialProduct: Product, vi: number }) {

  const [loading, setLoading] = React.useState(false)
  const [product, setProduct] = React.useState(initialProduct)
  const [variant, setVariant] = React.useState(initialProduct.variants[vi])
  const router = useRouter()

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleSave() {
    setLoading(true)

    try {

      VariantSchema.parse(variant)
      const { status } = await axios.put(`/api/products/${product._id}/variants/${vi}`, variant)
      if (status === 200) {
        toast.success("Variant created")
        router.push(`/products/${product._id}/variants/${product.variants.length}`)
      } else {
        toast.error("Failed to create variant")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      } else {
        toast.error("Something went wrong")
      }
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const { status } = await axios.delete(`/api/products/${product._id}/variants/${vi}`)
      if (status === 200) {
        toast.success("Variant deleted")
        router.push(`/products/${product._id}`)
      } else {
        toast.error("Failed to delete variant")
      }
    }
    catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      } else {
        toast.error("Something went wrong")
      }
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">

      <Card className="p-4 flex flex-col gap-4">
        <SectionTitle title="Options" />
        {
          product.variantOptions.map(vo => (
            <Input key={vo.name} id={product.title + vo} label={capitalize(vo.name)} value={variant.values[vo.name]} />
          ))
        }

        {
          variant.image ? (
            <div className="flex flex-col gap-2">
              <Image alt={product.title} src={variant.image} width={16} height={16} />
              <EditVariantImagesDialog altText={product.title} onSave={() => { }} />
            </div>
          ) : (
            <EditVariantImagesDialog altText={product.title} onSave={() => { }}
              text="Select variant image"
              button={
                <div className="w-full flex gap-4 items-center justify-center border border-gray-400 border-dashed hover:border-gray-500 hover:bg-gray-50 transition-all h-40 rounded-md cursor-pointer">
                  <OutlinedButton>Add image</OutlinedButton>
                  <TextButton>Choose Existing</TextButton>
                </div>
              }
            />
          )
        }

      </Card>

      <Pricing loading={false} variant={variant} setVariant={setVariant} />

      <Inventory loading={false} variant={variant} locations={locations} setVariant={setVariant} />

      <Shipping loading={false} variant={variant} setVariant={setVariant} />

      {
        loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-2 self-end px-4 md:px-0">
            <FilledButton bgClass="bg-red-500 hover:bg-red-700" onClick={handleDelete}>Delete variant</FilledButton>
            <FilledButton onClick={handleSave}>Save</FilledButton>
          </div>
        )
      }

    </div>
  )
}
