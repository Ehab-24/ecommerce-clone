'use client'

import { useParams, useRouter } from "next/navigation";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ApiProduct, ApiProductSchema, Product, Variant, VariantOption } from "@/types/product";
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
import { RxDragHandleDots2 } from "react-icons/rx";
import TextButton from "../buttons/TextButton";
import Text from "../Text";
import OutlinedButton from "../buttons/OutlinedButton";
import EditVariantDialog from "./variants/EditVariantDialog";
import EditVariantImagesDialog from "./variants/EditVariantImagesDialog";

export default function EditProductForm({ initialProduct }: { initialProduct: Product }) {

  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<ApiProduct>({ ...initialProduct, vendor: initialProduct.vendor._id })
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

            <Variants loading={loading} product={product} setProduct={setProduct} />

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

function Variants({
  loading,
  product,
  setProduct,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {

  const [selectedVariants, setSelectedVariants] = React.useState<Variant[]>([]);

  function getNextVariant(): string {
    const vs: string[] = ["color", "size", "material", "style"];
    for (let i = 0; i < vs.length; i++) {
      if (!product.variantOptions.map((v) => v.name).includes(vs[i]))
        return vs[i];
    }
    return "color";
  }


  return (
    <Card className=" flex-col w-full py-4 flex">

      <div className="px-4">
        <SectionTitle title="Variants" />
      </div>

      {product.variantOptions.map((variant, index) => (
        <div
          key={index}
          className="flex px-4 flex-col border-b pb-4 border-gray-300"
        >
          <EditVariant loading={loading} variantOption={variant} index={index} product={product} setProduct={setProduct} />
        </div>
      ))}

      <div className="flex px-4 mt-4">
        <TextButton
          onClick={() =>
            setProduct({ ...product, variantOptions: [...product.variantOptions, { name: getNextVariant(), values: [] },] })
          }
        >
          {product.variants.length === 0
            ? "+ Add options like color or size"
            : "+ Add another option"}
        </TextButton>
      </div>

      {
        product.variants.length > 0 && (
          <div className="w-full mt-4 flex px-4 pt-4 border-t border-gray-200 gap-2 flex-col">
            <div className="flex gap-4 w-full">
              <Text>Select</Text>
              <TextButton onClick={() => { }}>All</TextButton>
              <TextButton onClick={() => { }}>None</TextButton>
              {
                product.variantOptions.map(v => (
                  <TextButton key={v.name} onClick={() => { }}>
                    <Text className="text-blue-700 hover:underline capitalize">{v.name}</Text>
                  </TextButton>
                ))
              }
            </div>
            <div className="flex gap-4 ml-2 w-full">
              <Text>Available inventory at:</Text>
              <TextButton onClick={() => { }}>All locations</TextButton>
            </div>
          </div>
        )
      }

      {
        product.variants.length > 0 && (
          <div className="flex mt-4 justify-between border-t border-gray-200 p-4">
            <Checkbox id="showing-variants" label={`Showing ${product.variants.length} variants`} onChange={e => {
              e.stopPropagation()
              if (e.target.checked) {
                setSelectedVariants(product.variants)
              } else {
                setSelectedVariants([])
              }
            }} />
            <OutlinedButton onClick={() => { }}>Edit</OutlinedButton>
          </div>
        )
      }

      {
        product.variants.length > 0 && (
          product.variants.map(v => (
            <div key={v.name} className="flex h-20 border-t border-gray-200 w-full">
              <div className="h-full grid place-items-center pl-4">
                <Checkbox id={v.name} checked={selectedVariants.includes(v)} onChange={e => {
                  e.stopPropagation()
                  if (e.target.checked) {
                    setSelectedVariants([...selectedVariants, v])
                  } else {
                    setSelectedVariants(selectedVariants.filter(sv => sv !== v))
                  }
                }} />
              </div>

              {
                v.images && v.images.length > 0 ? (
                  <div className="rounded-md overflow-hidden mt-8 mr-2" >
                    <Image src={v.images[0]} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                  </div>
                ) : (
                  <EditVariantImagesDialog onSave={images => setProduct({ ...product, media: [...product.media, ...images.map(url => ({ url, type: "image" }))] })} altText={product.title} />
                )
              }

              <EditVariantDialog initialVariant={v} onSave={v => {
                setProduct({ ...product, variants: product.variants.map(pv => pv.name === v.name ? v : pv) })
              }} button={
                <div className="flex py-4 pr-4 pl-2 w-full hover:bg-gray-100 bg-white transition-all justify-between cursor-pointer">

                  <div className="flex flex-col w-full items-start h-full justify-center">
                    <Text className="font-bold text-gray-800">{v.name}</Text>
                    <Text className="text-gray-800">{v.sku}</Text>
                  </div>
                  <div className="flex flex-col whitespace-nowrap items-end">
                    <Text className="text-gray-800">$ {v.price}</Text>
                    <Text className="text-gray-800">33 available at 2 locations</Text>
                  </div>
                </div>

              } />

            </div>
          ))
        )
      }

      {
        product.variants.length > 0 && (
          <div className="flex border-t border-gray-200 pt-4 px-4 justify-between">
            <Text className="text-gray-800">Total inventory at all locations</Text>
            <Text className="text-gray-800">0 available</Text>
          </div>
        )
      }

    </Card>
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

function EditVariant({ variantOption, index, product, setProduct, loading }: { index: number, product: ApiProduct, setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>, variantOption: VariantOption, loading: boolean }) {

  const [edit, setEdit] = React.useState(false);

  function variantsInclude(name: string): boolean {
    return product.variantOptions.map((v) => v.name).includes(name);
  }

  function getPlaceholder(name: string): string {
    switch (name) {
      case "color":
        return "Red, Blue, Green";
      case "size":
        return "Small, Medium, Large";
      case "material":
        return "Cotton, Polyester";
      case "style":
        return "Slim fit, Regular fit";
      default:
        return "";
    }
  }

  return (
    <div className="flex pt-4 gap-4 w-full items-start">

      <button disabled={true} className={`${edit ? "mt-7" : ""}`}>
        <RxDragHandleDots2
          className="text-sm text-[#1a1a1a]"
          size={20}
        />
      </button>

      {
        edit ? (
          <div className="flex-col w-full">
            <Select
              disabled={loading}
              value={variantOption.name}
              label="Option Name"
              onChange={(e) => {
                const newVariants = [...product.variantOptions];
                newVariants[index].name = e.target.value as string;
                setProduct({ ...product, variantOptions: newVariants });
              }}
              options={[
                {
                  value: "color",
                  label: "Color",
                  disabled: variantsInclude("color"),
                },
                {
                  value: "size",
                  label: "Size",
                  disabled: variantsInclude("size"),
                },
                {
                  value: "material",
                  label: "Material",
                  disabled: variantsInclude("material"),
                },
                {
                  value: "style",
                  label: "Style",
                  disabled: variantsInclude("style"),
                },
              ]}
            />

            <div className="w-full mt-4">
              <Input
                id="variant-values"
                disabled={loading}
                label="Option Values"
                placeholder={getPlaceholder(variantOption.name)}
                onKeyDown={(e) => {
                  const value = e.currentTarget.value;
                  if (e.key === "Enter" && value !== "") {
                    const newVariants = [...product.variantOptions];
                    newVariants[index].values = [
                      ...newVariants[index].values,
                      value,
                    ];
                    setProduct({ ...product, variantOptions: newVariants });
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>

            <div className="w-full flex mt-4 gap-1">
              {variantOption.values.map((v, i) => (
                <div
                  key={i}
                  className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {v}
                  <button
                    disabled={loading}
                    onClick={() => {
                      const newVariants = [...product.variantOptions];
                      newVariants[index].values = newVariants[
                        index
                      ].values.filter((val) => val !== v);
                      setProduct({ ...product, variantOptions: newVariants });
                    }}
                  >
                    <IoIosClose size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        ) : (

          <div className="flex flex-col w-full">
            <Text className="text-gray-900 font-bold">{variantOption.name}</Text>
            <div className="flex gap-4 mt-2 ml-2">
              {variantOption.values.map(v => (
                <Text key={v}>{v}</Text>
              ))}
            </div>
          </div>

        )
      }

      <div className={`${edit ? "mt-[22px]" : ""}`}>
        <OutlinedButton onClick={() => setEdit(!edit)}>{edit ? "Done" : "Edit"}</OutlinedButton>
      </div>
    </div >
  )
}
