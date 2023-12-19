'use client'

import { useParams, useRouter } from "next/navigation";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ApiProduct, ApiProductSchema, Product } from "@/types/product";
import Link from "next/link";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import { IoIosClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import SectionTitle from "@/components/SectionTitle";
import countries from "@/data/countries";
import Heading from "@/components/Heading";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import { useEffect } from "react";
import React from "react";
import OutlinedButton from "../buttons/OutlinedButton";
import { Location } from "@/types/location";
import VariantsCardEditPage from '@/components/products/variants/VariantsCardEditPage';

export default function EditProductForm({ initialProduct, locations }: { locations: Location[], initialProduct: Product }) {

  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<ApiProduct>({ ...initialProduct, vendor: initialProduct.vendor._id, locations: initialProduct.locations.map(l => l._id) })
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (product.price !== 0 && product.costPerItem !== 0) {
      setProduct(p => ({
        ...p,
        profit: (p.price || 0) - (p.costPerItem || 0),
        margin:
          Math.round(
            (((p.price || 0) - (p.costPerItem || 0)) / (p.price || 0)) * 10000
          ) / 100,
      }));
    }
  }, [product?.price, product?.costPerItem]);

  async function handleSave() {
    try {

      ApiProductSchema.parse(product)
      const { status } = await axios.put(`/api/products/${params.id}`, product)
      if (status === 200) {
        toast.success("Product saved successfully");
      }

    } catch (error) {

      if (error instanceof ZodError) {
        toast.error((error as ZodError).errors[0].message);
      } else if (error instanceof AxiosError) {
        toast.error(error.message);
        console.log(error)
      } else {
        toast.error("Something went wrong");
        console.log(error)
      }

    }
  }

  async function handleDelete() {

    setLoading(true)

    try {

      const { status } = await axios.delete(`/api/products/${params.id}`)
      if (status === 200) {
        router.push("/products")
      }

    } catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
        console.log(error)
      }

    } finally {
      setLoading(false)
    }
  }

  async function handleProductStatusChange(status: string): Promise<void> {
    setLoading(true)
    try {

      const res = await axios.put(`/api/products/${params.id}`, { status })
      if (res.status === 200) {
        toast.success("Product archived successfully")
      }

    }
    catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
        console.log(error)
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-col max-w-4xl w-full flex gap-6 p-8 ">
        <div className="flex gap-3 items-start ">
          <Link href="/products" className="p-2 rounded-md hover:bg-black/10 transition-all">
            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
          </Link>
          <Heading>{product.title}</Heading>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
          <div className=" flex flex-col w-full self-center gap-4 mb-8">
            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <Input
                id="title"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                label="Title"
                placeholder="Title"
              />
              <TextArea
                label="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Card>

            <Card className="flex p-4 flex-col gap-4 items-stretch ">
              <SectionTitle title="Media" />

              <div className={product.media?.length === 0 ? "w-full" : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"}>
                {
                  product.media?.map((m, i) => (
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
              <Pricing product={product} setProduct={setProduct} />
            </Card>

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Inventory" />
              <Inventory product={product} setProduct={setProduct} />
            </Card>

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Shipping" />
              <Shipping product={product} setProduct={setProduct} />
            </Card>

            <VariantsCardEditPage loading={loading} locations={locations} initialProduct={initialProduct} product={product} setProduct={setProduct} />

            <Card className="flex p-4 flex-col mb-4 items-stretch">
              <SectionTitle title="Search Engine Listing" />
              <p className=" text-xs text-gray-900 mb-8">Add a title and description to see how this collection might appear in a search engine listing</p>
              <Input id="seo-title" onChange={e => setProduct({ ...product, seo: { ...product.seo, title: e.target.value } })} label="SEO Title" placeholder="" />
              <div className="h-4" />
              <TextArea label="SEO Description" onChange={e => setProduct({ ...product, seo: { ...product.seo, description: e.target.value } })} />
            </Card>
          </div>

          <div className="flex w-full 2xl:max-w-[280px] flex-col gap-4">
            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Status" />
              <Select
                label="Status"
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
              <ProductOrganization product={product} setProduct={setProduct} />
            </Card>
          </div>

        </div>
      </div>

      <div className="w-full max-w-4xl flex gap-4 justify-end mb-8">
        {
          product.status === "archived" ? (
            <OutlinedButton onClick={() => handleProductStatusChange("active")}>Unarchive Product</OutlinedButton>
          ) : (
            <OutlinedButton onClick={() => handleProductStatusChange("archived")}>Archive Product</OutlinedButton>
          )
        }
        <FilledButton bgClass="bg-red-500" onClick={handleDelete}>Delete Product</FilledButton>
        {/*TODO: add shouldSave logic*/}
        <FilledButton disabled={false} onClick={handleSave}>Save</FilledButton>
      </div>

    </>

  )
}


function Pricing({
  product,
  setProduct,
}: {
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <div className="flex gap-4 mt-4">
        <Input
          id="price"
          value={product.price}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />
        <Input
          id="compare-at-price"
          value={product.compareAtPrice}
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
        checked={product.chargeTaxes}
        label="Charge Taxes on this Product"
        onChange={(e) =>
          setProduct({ ...product, chargeTaxes: e.target.checked })
        }
      />

      <div className="flex gap-4 mt-4">
        <Input
          id="cost-per-item"
          value={product.costPerItem}
          label="Cost per Item"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, costPerItem: Number(e.target.value) })
          }
        />
        <Input
          id="profit"
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
  product,
  setProduct,
}: {
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="tarck-quantity"
        checked={product.trackQuantity}
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
              value={product.quantity}
              label=""
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
        label="This product has a SKU or barcode"
        onChange={(e) => setProduct({ ...product, hasSku: e.target.checked })}
      />

      {product.hasSku && (
        <div className=" w-full flex gap-4 mt-4">
          <Input
            id="product-sku"
            value={product.sku}
            placeholder=""
            label="SKU (Stock Keeping Unit)"
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          />
          <Input
            id="product-barcode"
            value={product.barcode}
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



function Shipping({
  product,
  setProduct,
}: {
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Checkbox
        id="physical-product"
        checked={product.isPhysicalProduct}
        label="This is a physical product"
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
                id="weight"
                value={product.weight}
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
                value={product.weightUnit}
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
            value={product.countryOfOrigin}
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
  product,
  setProduct,
}: {
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Input
        id="product-category"
        value={product.category}
        label="Product category"
        placeholder="Apparel & Accessories"
        onChange={(e) =>
          setProduct({ ...product, category: e.target.value })
        }
      />
      <Input
        id="product-type"
        value={product.type}
        label="Product Type"
        placeholder=""
        onChange={(e) =>
          setProduct({ ...product, type: e.target.value })
        }
      />

      { /*TODO: change to Select*/}
      <Input
        id="vendor"
        value={product.vendor}
        label="Vendor"
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
        value={product.collection}
        label="Collections"
        placeholder=""
        onChange={(e) =>
          setProduct({ ...product, collections: e.target.value })
        }
      />

      <Input
        id="tags"
        label="Tags"
        placeholder=""
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

