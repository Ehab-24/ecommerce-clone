'use client'

import React, { useEffect } from "react";
import { Product, Variant } from "@/types/product";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Input from "@/components/Input";
import EditVariantImagesDialog from "./EditVariantImagesDialog";
import Image from "next/image";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import TextButton from "@/components/buttons/TextButton";
import Checkbox from "@/components/Checkbox";
import Text from "@/components/Text";
import Select from "@/components/Select";
import countries from "@/data/countries";
import FilledButton from "@/components/buttons/FilledButton";

export default function EditVariantForm({ initialProduct, vi }: { initialProduct: Product, vi: number }) {

  const [product, setProduct] = React.useState(initialProduct)
  const [variant, setVariant] = React.useState(initialProduct.variants[vi])

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

      <Inventory loading={false} variant={variant} setVariant={setVariant} />

      <Shipping loading={false} variant={variant} setVariant={setVariant} />

      <div className="flex gap-2 self-end">
        <FilledButton bgClass="bg-red-500 hover:bg-red-700">Delete variant</FilledButton>
        <FilledButton>Save</FilledButton>
      </div>

    </div>
  )
}

function Pricing({
  loading,
  variant,
  setVariant
}: {
  loading: boolean;
  variant: Variant,
  setVariant: React.Dispatch<React.SetStateAction<Variant>>;
}) {
  return (
    <Card className="flex p-4 flex-col gap-4 items-stretch">
      <SectionTitle title="Pricing" />
      <div className="flex gap-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          value={variant.price}
          onChange={(e) =>
            setVariant({ ...variant, price: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="compare-at-price"
          value={variant.compareAtPrice}
          disabled={loading}
          label="Compare-at Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, compareAtPrice: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        checked={variant.chargeTaxes}
        onChange={(e) =>
          setVariant({ ...variant, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
          disabled={loading}
          id="cost-per-item"
          label="Cost per Item"
          placeholder="$ 0.00"
          type="number"
          value={variant.costPerItem}
          onChange={(e) =>
            setVariant({ ...variant, costPerItem: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="profit"
          disabled={true}
          value={variant.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, profit: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="margin"
          disabled={true}
          label="Margin"
          value={variant.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setVariant({ ...variant, margin: Number(e.target.value) })
          }
          icon={<Text>% </Text>}
        />
      </div>
    </Card>
  );
}

function Inventory({
  loading,
  variant,
  setVariant
}: {
  loading: boolean;
  variant: Variant,
  setVariant: React.Dispatch<React.SetStateAction<Variant>>;
}) {

  useEffect(() => console.log(variant), [variant])

  return (
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Inventory" />

      <div className=" flex w-full gap-4">
        <Input id="variant-sku" label="SKU (Stock Keeping Unit)" value={variant.sku} onChange={e => setVariant({ ...variant, sku: e.target.value })} />
        <Input id="variant-barcode" label="Barcode (ISBN, UPC, GTIN, etc.)" value={variant.barcode} onChange={e => setVariant({ ...variant, barcode: e.target.value })} />
      </div>

      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        checked={variant.trackQuantity}
        onChange={(e) =>
          setVariant({ ...variant, trackQuantity: e.target.checked })
        }
      />
      {variant.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          checked={variant.continueSellingWhenOutOfStock}
          onChange={(e) =>
            setVariant({ ...variant, continueSellingWhenOutOfStock: e.target.checked })
          }
        />
      )}

    </Card>
  );
}

function Shipping({
  loading,
  variant,
  setVariant
}: {
  loading: boolean;
  variant: Variant,
  setVariant: React.Dispatch<React.SetStateAction<Variant>>;
}) {

  const [editCustomsInfo, setEditCustomsInfo] = React.useState(false)

  return (
    <Card className=" flex-col flex p-4">
      <SectionTitle title="Shipping" />
      <div className="h-4" />
      <Checkbox
        id="physical-product"
        disabled={loading}
        label="This is a physical product"
        checked={variant.isPhysicalProduct}
        onChange={(e) =>
          setVariant({ ...variant, isPhysicalProduct: e.target.checked })
        }
      />

      <div className="h-4" />

      {variant.isPhysicalProduct ? (
        <>
          <div className=" w-full flex gap-4 items-end justify-between mb-4">
            <div className="w-full">
              <Input
                disabled={loading}
                id="weight"
                label="Weight"
                placeholder="0.0"
                type="number"
                value={variant.weight}
                onChange={(e) =>
                  setVariant({ ...variant, weight: Number(e.target.value) })
                }
              />
            </div>

            <div className="w-full">
              <Select
                label="Weight Unit"
                disabled={loading}
                value={variant.weightUnit}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
                onChange={(e) =>
                  setVariant({ ...variant, weightUnit: e.target.value as "kg" | "g" | "lb" | "oz" })
                }
              />
            </div>
          </div>

          {/*TODO: handle onChange*/}
          <Checkbox id="apply-wieight-to-all" label="Apply weight to all variants of this product" onChange={e => { }} />
          <div className="h-4" />

          {
            editCustomsInfo ? (
              <div className="border-t pt-4 mt-4 flex flex-col gap-4 border-gray-200">

                <Select
                  label="Country/Region of origin"
                  disabled={loading}
                  options={countries}
                  value={variant.countryOfOrigin}
                  onChange={(e) =>
                    setVariant({ ...variant, countryOfOrigin: e.target.value })
                  }
                />
                <Input
                  id="variant-hs-code"
                  disabled={loading}
                  label="Harmonized System (HS) code"
                  value={variant.hsCode}
                  onChange={(e) =>
                    setVariant({ ...variant, hsCode: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="self-start">
                <TextButton onClick={() => setEditCustomsInfo(true)}>
                  + Add customs information
                </TextButton>
              </div>
            )
          }
        </>
      ) : (
        <p>Customers won’t enter shipping details at checkout.</p>
      )}
    </Card>
  );
}
