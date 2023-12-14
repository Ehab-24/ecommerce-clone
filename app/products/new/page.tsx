"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import Heading from "@/components/Heading";
import { ZodError } from "zod";
import { ApiProductSchema, ApiProduct } from "@/types/product";
import Link from "next/link";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import SectionTitle from "@/components/SectionTitle";
import countries from "@/data/countries";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import TextButton from "@/components/buttons/TextButton";
import axios from "axios";

export default function NewProductPage() {
  const defaultProduct: ApiProduct = {
    title: "",
    description: "",
    price: 0,
    compareAtPrice: 0,
    chargeTaxes: false,
    tax: 0,
    taxRate: 0,
    costPerItem: 0,
    profit: 0,
    margin: 0,
    trackQuantity: false,
    quantity: 0,
    continueSellingWhenOutOfStock: false,
    hasSku: false,
    isPhysicalProduct: true,
    weight: 0,
    weightUnit: "kg",
    countryOfOrigin: "",
    status: "active",
    productCategory: "",
    productType: "",
    vendor: "",
    collection: "",
    variants: [],
    media: [],
    seo: {
      title: "",
      description: "",
    },
    tags: [],
  };

  const [product, setProduct] = React.useState<ApiProduct>(defaultProduct);
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (product.price !== 0 && product.costPerItem !== 0) {
      setProduct({
        ...product,
        profit: product.price - product.costPerItem,
        margin:
          Math.round(
            ((product.price - product.costPerItem) / product.price) * 10000
          ) / 100,
      });
    }
  }, [product.price, product.costPerItem]);

  useEffect(() => {
    console.log(product.variants.map(v => v.name))
  }, [product.variants])

  function getNextVriant(): string {
    const variants: string[] = ["color", "size", "material", "style"]
    for (let i = 0; i < variants.length; i++) {
      if (!product.variants.map(v => v.name).includes(variants[i])) return variants[i]
    }
    return "color"
  }

  async function handleSave() {

    setLoading(true)

    try {

      const result = ApiProductSchema.parse(product);
      const { status } = await axios.post(`/api/products`, result)

      if (status === 201) {
        toast.success("Product created successfully");
        setProduct(defaultProduct);
      }

    } catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      }
      else {
        toast.error("Something went wrong");
        console.log(error);
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" w-full bg-gray-100 items-center flex flex-col">
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-start ">
          <Link href="/products" className="p-2 rounded-md hover:bg-black/10 transition-all">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <Heading>Add Product</Heading>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
          <div className=" flex flex-col w-full self-center gap-4 mb-8">
            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <Input
                id="title"
                value={product.title}
                onChange={e => setProduct({ ...product, title: e.target.value })}
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

              <div className={product.media.length === 0 ? "w-full" : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"}>
                {
                  product.media.map((m, i) => (
                    <div key={i} className="rounded-md overflow-hidden" >
                      <Image src={m.url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                    </div>
                  ))
                }

                <ImageUploader onSave={(url) => setProduct({ ...product, media: [...product.media, { type: "image", url }] })} />
              </div>

            </Card>

            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <SectionTitle title="Pricing" />
              <Pricing loading={loading} product={product} setProduct={setProduct} />
            </Card>

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Inventory" />
              <Inventory loading={loading} product={product} setProduct={setProduct} />
            </Card>

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Shipping" />
              <Shipping loading={loading} product={product} setProduct={setProduct} />
            </Card>

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Variants" />
              <Variants loading={loading} product={product} setProduct={setProduct} />

              {
                product.variants.length < 4 && (
                  <div className="flex">
                    <TextButton onClick={() => setProduct({ ...product, variants: [...product.variants, { name: getNextVriant(), values: [] }] })}>
                      {
                        product.variants.length === 0 ? "+ Add options like color or size" : "+ Add another option"
                      }
                    </TextButton>
                  </div>
                )
              }

            </Card>

            <Card className="flex p-4 flex-col items-stretch">
              <SectionTitle title="Search Engine Listing" />
              <p className=" text-xs text-gray-900 mb-8">Add a title and description to see how this collection might appear in a search engine listing</p>
              <Input id="seo-title" disabled={loading} onChange={e => setProduct({ ...product, seo: { ...product.seo, title: e.target.value } })} label="SEO Title" placeholder="" />
              <div className="h-4" />
              <TextArea label="SEO Description" disabled={loading} onChange={e => setProduct({ ...product, seo: { ...product.seo, description: e.target.value } })} />
            </Card>
          </div>

          <div className="flex flex-col 2xl:max-w-xs w-full gap-4">
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

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Product Organization" />
              <ProductOrganization loading={loading} product={product} setProduct={setProduct} />
            </Card>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-8">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>
    </div>
  );
}

function Pricing({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <div className="flex gap-4 mt-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />
        <Input
          id="compare-at-price"
          disabled={loading}
          label="Compare-at Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, compareAtPrice: Number(e.target.value) })
          }
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        onChange={(e) =>
          setProduct({ ...product, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
          disabled={loading}
          id="cost-per-item"
          label="Cost per Item"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, costPerItem: Number(e.target.value) })
          }
        />
        <Input
          id="profit"
          disabled={loading}
          value={product.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, profit: Number(e.target.value) })
          }
        />
        <Input
          id="margin"
          disabled={loading}
          label="Margin %"
          value={product.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, margin: Number(e.target.value) })
          }
        />
      </div>
    </>
  );
}

function Inventory({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="tarck-quantity"
        disabled={loading}
        label="Track Quantity"
        onChange={(e) =>
          setProduct({ ...product, trackQuantity: e.target.checked })
        }
      />

      <div className=" flex items-center w-full justify-between mb-4">
        <p className="text-sm text-gray-900">Block 6-C2 Park</p>
        {product.trackQuantity ? (
          <div>
            <Input
              id="quantity"
              disabled={loading}
              placeholder="0"
              type="number"
              onChange={(e) =>
                setProduct({ ...product, quantity: Number(e.target.value) })
              }
            />
          </div>
        ) : (
          <p className=" text-sm text-gray-700">Not Tracked</p>
        )}
      </div>
      {product.trackQuantity && (
        <Checkbox
          id="continue-selling-when-out-of-stock"
          disabled={loading}
          label="Continue selling when out of stock"
          onChange={(e) =>
            setProduct({
              ...product,
              continueSellingWhenOutOfStock: e.target.checked,
            })
          }
        />
      )}
      <Checkbox
        id="has-sku"
        disabled={loading}
        label="This product has a SKU or barcode"
        onChange={(e) => setProduct({ ...product, hasSku: e.target.checked })}
      />

      {product.hasSku && (
        <div className=" w-full flex gap-4 mt-4">
          <Input
            id="product-sku"
            disabled={loading}
            label="SKU (Stock Keeping Unit)"
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          />
          <Input
            id="product-barcode"
            placeholder=""
            label="Barcode (ISBN, UPC, GTIN, etc.)"
            onChange={(e) =>
              setProduct({ ...product, barcode: e.target.value })
            }
          />
        </div>
      )}
    </>
  );
}

function Variants({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {

  function variantsInclude(name: string): boolean {
    return product.variants.map(v => v.name).includes(name)
  }

  function getPlaceholder(name: string): string {
    switch (name) {
      case "color":
        return "Red, Blue, Green"
      case "size":
        return "Small, Medium, Large"
      case "material":
        return "Cotton, Polyester"
      case "style":
        return "Slim fit, Regular fit"
      default:
        return ""
    }
  }

  return (
    <>
      {product.variants.map((variant, index) => (
        <div key={index} className="flex flex-col border-b pb-4 border-gray-300">
          <button disabled={loading} onClick={() => setProduct({ ...product, variants: product.variants.filter(v => v !== variant) })} className="p-2 rounded-md hover:bg-black/10 self-end transition-all">
            <RiDeleteBin6Line className="text-sm text-[#1a1a1a]" />
          </button>

          <Select disabled={loading} value={variant.name} label="Variant Name" onChange={e => {
            const newVariants = [...product.variants];
            newVariants[index].name = e.target.value as string;
            setProduct({ ...product, variants: newVariants })
          }} options={[
            { value: "color", label: "Color", disabled: variantsInclude("color") },
            { value: "size", label: "Size", disabled: variantsInclude("size") },
            { value: "material", label: "Material", disabled: variantsInclude("material") },
            { value: "style", label: "Style", disabled: variantsInclude("style") },
          ]} />

          <div className="w-full mt-4">
            <Input
              id="variant-values"
              disabled={loading}
              label="Variant Values"
              placeholder={getPlaceholder(variant.name)}
              onKeyDown={e => {
                const value = e.currentTarget.value;
                if (e.key === "Enter" && value !== "") {
                  const newVariants = [...product.variants];
                  newVariants[index].values = [...newVariants[index].values, value];
                  setProduct({ ...product, variants: newVariants });
                  e.currentTarget.value = "";
                }
              }}
            />

            <div className="w-full flex mt-4 gap-1">
              {
                variant.values.map((v, i) => (
                  <div key={i} className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    {v}
                    <button disabled={loading} onClick={() => {
                      const newVariants = [...product.variants];
                      newVariants[index].values = newVariants[index].values.filter(val => val !== v);
                      setProduct({ ...product, variants: newVariants })
                    }}>
                      <IoIosClose size={20} />
                    </button>
                  </div>
                ))
              }
            </div>

          </div>
        </div>

      ))}
    </>
  )
}

function Shipping({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="physical-product"
        disabled={loading}
        label="This is a physical product"
        checked={product.isPhysicalProduct}
        onChange={(e) =>
          setProduct({ ...product, isPhysicalProduct: e.target.checked })
        }
      />

      <div className="h-4" />
      {product.isPhysicalProduct ? (
        <>
          <div className=" w-full flex gap-4 items-end justify-between mb-4">
            <div className="w-full">
              <Input
                disabled={loading}
                id="weight"
                label="Weight"
                placeholder="0.0"
                type="number"
                onChange={(e) =>
                  setProduct({ ...product, weight: Number(e.target.value) })
                }
              />
            </div>

            <div className="w-full">
              <Select
                label="Weight Unit"
                disabled={loading}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
                onChange={(e) =>
                  setProduct({ ...product, weightUnit: e.target.value })
                }
              />
            </div>
          </div>

          <Select
            label="Country/Region of origin"
            disabled={loading}
            options={countries}
            onChange={(e) =>
              setProduct({ ...product, countryOfOrigin: e.target.value })
            }
          />
        </>
      ) : (
        <p>Customers won’t enter shipping details at checkout.</p>
      )}
    </>
  );
}

function ProductOrganization({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Input
        id="product-category"
        disabled={loading}
        label="Product category"
        placeholder="Apparel & Accessories"
        onChange={(e) =>
          setProduct({ ...product, productCategory: e.target.value })
        }
      />
      <Input
        id="product-type"
        disabled={loading}
        label="Product Type"
        onChange={(e) =>
          setProduct({ ...product, productType: e.target.value })
        }
      />
      <Input
        id="vendor"
        label="Vendor"
        disabled={loading}
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
        label="Collections"
        disabled={loading}
        onChange={(e) =>
          setProduct({ ...product, collections: e.target.value })
        }
      />

      <Input
        id="tags"
        label="Tags"
        disabled={loading}
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setProduct({ ...product, tags: [...product.tags, value] });
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {product.tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button
              disabled={loading}
              onClick={() =>
                setProduct({
                  ...product,
                  tags: product.tags.filter((t) => t !== tag),
                })
              }
            >
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
