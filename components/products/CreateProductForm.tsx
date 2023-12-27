'use client'

import React, { useEffect } from "react";
import { ZodError } from "zod";
import { ApiProductSchema, ApiProduct, InventoryLevel } from "@/types/product";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import { toast } from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { Location } from "@/types/location";
import VariantsCard from "./variants/VariantsCard";
import { multiplyArrays } from "@/lib/products/utils";
import { SalesChannel } from "@/types/salesChannel";
import { Market } from "@/types/market";
import { Publishing } from "./Publishing";
import ProductOrganization from "./ProductOrganization";
import Pricing from "./Pricing";
import Inventory from "./Inventory";
import Shipping from "./Shipping";
import SearchEngineListing from "./SearchEngineListing";

export default function CreateProductForm({ locations }: { locations: Location[] }) {

  const salesChannels: SalesChannel[] = [
    { _id: "1", name: "Online Store", createdAt: (new Date).toString(), updatedAt: (new Date).toString() },
    { _id: "2", name: "POS", createdAt: (new Date).toString(), updatedAt: (new Date).toString() },
  ]
  const markets: Market[] = [
    { _id: "1", name: "US", createdAt: (new Date).toString(), updatedAt: (new Date).toString() },
    { _id: "2", name: "CA", createdAt: (new Date).toString(), updatedAt: (new Date).toString() },
    { _id: "3", name: "UK", createdAt: (new Date).toString(), updatedAt: (new Date).toString() },
  ]

  const [product, setProduct] = React.useState<ApiProduct>(defaultProduct);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setProduct(p => ({
      ...p, variants: multiplyArrays(p.variantOptions.map(v => v.name), ...p.variantOptions.map(v => v.values))
        .map((obj, i) => ({ _id: i.toString(), name: Object.values(obj).join(" / "), values: obj, trackQuantity: false, continueSellingWhenOutOfStock: false, inventoryLevels: [] }))
    }))
  }, [product.variantOptions])

  useEffect(() => {
    if (product.costPerItem && product.price && product.price !== 0 && product.costPerItem !== 0) {
      setProduct(p => ({
        ...p,
        profit: (p.price || 0) - (product.costPerItem || 0),
        margin:
          Math.round(
            (((p.price || 0) - (product.costPerItem || 0)) / (product.price || 0)) * 10000
          ) / 100,
      }));
    }
  }, [product.price, product.costPerItem]);

  async function handleSave() {
    setLoading(true);

    try {

      if (!product.price) product.price = 0
      const result = ApiProductSchema.parse(product);
      const { status } = await axios.post(`/api/products`, result);

      if (status === 201) {
        toast.success("Product created successfully");
        setProduct(defaultProduct);
      }
    } catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);

    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <div className="w-full flex flex-col xl:flex-row justify-center gap-4">
        <div className=" flex flex-col w-full self-center gap-4 mb-8">

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <Input
              id="title"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              label="Title"
              placeholder="Title"
              disabled={loading}
            />
            <TextArea
              label="Description"
              disabled={loading}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Card>

          <Card className="flex p-4 flex-col gap-4 items-stretch">
            <SectionTitle title="Media" />

            <div
              className={
                product.media.length === 0
                  ? "w-full"
                  : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"
              }
            >
              {product.media.map((m, i) => (
                <div key={i} className="rounded-md overflow-hidden">
                  <Image
                    src={m.url}
                    alt={product.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}

              <ImageUploader
                onSave={(url) =>
                  setProduct({
                    ...product,
                    media: [...product.media, { type: "image", url }],
                  })
                }
              />
            </div>
          </Card>

          <Pricing
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <Inventory
            locations={locations}
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <VariantsCard loading={loading} locations={locations} product={product} setProduct={setProduct} />

          <Shipping
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <SearchEngineListing
            product={product}
            setProduct={setProduct}
            loading={loading}
          />
        </div>

        <div className="flex flex-col xl:max-w-[280px] w-full gap-4">
          <Card className=" flex-col flex p-4 gap-4">
            <SectionTitle title="Status" />
            <Select
              label="Status"
              disabled={loading}
              options={[
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
              ]}
              onChange={(e) =>
                setProduct({
                  ...product,
                  status: e.target.value as "active" | "draft",
                })
              }
            />
          </Card>

          <Publishing product={product} setProduct={setProduct} markets={markets} salesChannels={salesChannels} />

          <ProductOrganization
            loading={loading}
            product={product}
            setProduct={setProduct}
          />

          <Card className="p-4">
            <Select label="Theme template" options={[
              { label: "Default theme", value: "default" }
            ]} onChange={() => { }} />
          </Card>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8 px-4 md:px-0">
        {loading ? (
          <Spinner />
        ) : (
          <FilledButton onClick={handleSave}>Save</FilledButton>
        )}
      </div>

    </>
  )
}

const defaultProduct: ApiProduct = {
  title: "",
  chargeTaxes: false,
  locations: [],
  salesChannels: [],
  markets: [],
  quantity: 0,
  tax: 0,
  taxRate: 0,
  trackQuantity: false,
  continueSellingWhenOutOfStock: false,
  hasSku: false,
  isPhysicalProduct: true,
  weight: 0,
  weightUnit: "kg",
  countryOfOrigin: "",
  status: "active",
  vendor: "",
  collection: "",
  variants: [],
  variantOptions: [],
  variantImages: [],
  inventoryLevels: [],
  media: [],
  seo: {
    title: "",
    description: "",
  },
  tags: [],
};

const defaultInventoryLevel: InventoryLevel = {
  location: "",
  available: 0,
}
