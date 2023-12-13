'use client'

import { useParams, useRouter } from "next/navigation";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ApiProductSchema, Product } from "@/types/product";
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
import { RiDeleteBin6Line } from "react-icons/ri";
import Heading from "@/components/Heading";
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import { useEffect } from "react";
import React from "react";


export default function EditProductForm({ initialProduct }: { initialProduct: Product }) {

  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = React.useState<Product>(initialProduct)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(`/api/products/${params.id}`)
      setProduct(data as Product)
      setProduct(data as Product)
    }
    getProduct()
  }, [params.id])

  useEffect(() => {
    if (product && product.price !== 0 && product.costPerItem !== 0) {
      setProduct({
        ...product,
        profit: product.price - product.costPerItem,
        margin:
          Math.round(
            ((product.price - product.costPerItem) / product.price) * 10000
          ) / 100,
      });
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

            <Card className=" flex-col flex p-4 gap-4">
              <SectionTitle title="Variants" />
              <Variants product={product} setProduct={setProduct} />
              <div className="flex ">
                <OutlinedButtonSmall onClick={() => setProduct({ ...product, variants: [...product.variants, { name: "", values: [] }] })}>Add Variant</OutlinedButtonSmall>
              </div>
            </Card>

            <Card className="flex p-4 flex-col mb-4 items-stretch">
              <SectionTitle title="Search Engine Listing" />
              <p className=" text-xs text-gray-900 mb-8">Add a title and description to see how this collection might appear in a search engine listing</p>
              <Input id="seo-title" onChange={e => setProduct({ ...product, seo: { ...product.seo, title: e.target.value } })} label="SEO Title" placeholder="" />
              <div className="h-4" />
              <TextArea label="SEO Description" onChange={e => setProduct({ ...product, seo: { ...product.seo, description: e.target.value } })} />
            </Card>
          </div>

          <div className="flex w-full 2xl:max-w-xs flex-col gap-4">
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
        <FilledButton bgClass="bg-red-500" onClick={handleDelete}>Delete Product</FilledButton>
        <FilledButton disabled={product === initialProduct} onClick={handleSave}>Save</FilledButton>
      </div>

    </>

  )
}


function Pricing({
  product,
  setProduct,
}: {
  product: Product;
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
  product: Product;
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

function Variants({
  product,
  setProduct,
}: {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      {product.variants?.map((variant, index) => (
        <div key={index} className="flex flex-col border-b pb-4 border-gray-300">
          <button onClick={() => setProduct({ ...product, variants: product.variants.filter(v => v !== variant) })} className="p-2 rounded-md hover:bg-black/10 self-end transition-all">
            <RiDeleteBin6Line className="text-sm text-[#1a1a1a]" />
          </button>

          <Select label="Variant Name" value={variant.name} onChange={e => {
            const newVariants = [...product.variants];
            newVariants[index].name = e.target.value;
            setProduct({ ...product, variants: newVariants })
          }} options={[
            { value: "color", label: "Color" },
            { value: "size", label: "Size" },
            { value: "material", label: "Material" },
            { value: "style", label: "Style" },
          ]} />

          <div className="w-full mt-4">
            <Input
              id="variant-values"
              label="Variant Values"
              placeholder="S, M, L"
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
                    <button onClick={() => {
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
  product,
  setProduct,
}: {
  product: Product;
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
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <>
      <Input
        id="product-category"
        value={product.productCategory}
        label="Product category"
        placeholder="Apparel & Accessories"
        onChange={(e) =>
          setProduct({ ...product, productCategory: e.target.value })
        }
      />
      <Input
        id="product-type"
        value={product.productType}
        label="Product Type"
        placeholder=""
        onChange={(e) =>
          setProduct({ ...product, productType: e.target.value })
        }
      />

      { /*TODO: change to Select*/}
      <Input
        id="vendor"
        value={product.vendor._id}
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
