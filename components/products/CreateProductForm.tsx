'use client'

import React, { useEffect } from "react";
import { ZodError } from "zod";
import { ApiProductSchema, ApiProduct, VariantValue } from "@/types/product";
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import { toast } from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import SectionTitle from "@/components/SectionTitle";
import countries from "@/data/countries";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import TextButton from "@/components/buttons/TextButton";
import axios from "axios";
import Text from "@/components/Text";
import { Location } from "@/types/location";
import VariantsCard from "./variants/VariantsCard";

export default function CreateProductForm({ locations }: { locations: Location[] }) {

  const [product, setProduct] = React.useState<ApiProduct>(defaultProduct);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setProduct(p => ({
      ...p, variants: multiplyArrays(p.variantOptions.map(v => v.name), ...p.variantOptions.map(v => v.values))
        .map((obj, i) => ({ _id: i.toString(), name: Object.values(obj).join(" / "), values: obj, trackQuantity: false, continueSellingWhenOutOfStock: false }))
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

  function multiplyArrays(arrayNames: string[], ...arrays: string[][]): VariantValue[] {
    const combineArrays = (result: string[][], arr: string[]) => {
      if (arr.length === 0) {
        return result;
      }
      if (result.length === 0) {
        return arr.map(item => [item]);
      }
      return result.flatMap(combination =>
        arr.map(item => [...combination, item])
      );
    };

    let result: string[][] = [];
    arrays.forEach(arr => {
      result = combineArrays(result, arr);
    });

    const ans: VariantValue[] = result.map(arr => {
      const obj: VariantValue = {};
      for (let i = 0; i < arrayNames.length; i++) {
        obj[arrayNames[i]] = arr[i];
      }
      return obj;
    });

    return ans
  }

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
      <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
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

        <div className="flex flex-col 2xl:max-w-[280px] w-full gap-4">
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

          <ProductOrganization
            loading={loading}
            product={product}
            setProduct={setProduct}
          />
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
    <Card className="flex p-4 flex-col gap-4 items-stretch">
      <SectionTitle title="Pricing" />
      <div className="flex gap-4">
        <Input
          id="price"
          disabled={loading}
          label="Price"
          placeholder="$ 0.00"
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="compare-at-price"
          value={product.compareAtPrice}
          disabled={loading}
          label="Compare-at Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, compareAtPrice: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
      </div>
      <Checkbox
        id="charge-taxes"
        disabled={loading}
        label="Charge Taxes on this Product"
        checked={product.chargeTaxes}
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
          value={product.costPerItem}
          onChange={(e) =>
            setProduct({ ...product, costPerItem: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="profit"
          disabled={true}
          value={product.profit}
          label="Profit"
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, profit: Number(e.target.value) })
          }
          icon={<Text>$ </Text>}
        />
        <Input
          id="margin"
          disabled={true}
          label="Margin"
          value={product.margin}
          placeholder="--"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, margin: Number(e.target.value) })
          }
          icon={<Text>% </Text>}
        />
      </div>
    </Card>
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
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Inventory" />
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
    </Card>
  );
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
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Shipping" />
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
    </Card>
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
    <Card className=" flex-col flex p-4 gap-4">
      <SectionTitle title="Product Organization" />
      <Input
        id="product-category"
        disabled={loading}
        label="Product category"
        placeholder="Apparel & Accessories"
        value={product.category}
        onChange={(e) =>
          setProduct({ ...product, cateogry: e.target.value })
        }
      />
      <Input
        id="product-type"
        disabled={loading}
        label="Product Type"
        value={product.type}
        onChange={(e) =>
          setProduct({ ...product, type: e.target.value })
        }
      />
      <Input
        id="vendor"
        label="Vendor"
        disabled={loading}
        value={product.vendor}
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
        label="Collections"
        disabled={loading}
        // TODO:
        onChange={(e) => { }}
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
    </Card>
  );
}

function SearchEngineListing({
  product,
  setProduct,
  loading,
}: {
  loading: boolean;
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [edit, setEdit] = React.useState<boolean>(false);

  return (
    <Card className="flex p-4  flex-col items-stretch">
      <div className="flex w-full justify-between">
        <SectionTitle title="Search Engine Listing" />
        {!edit && <TextButton onClick={() => setEdit(true)}>Edit</TextButton>}
      </div>
      <p className=" text-xs text-gray-900">
        Add a title and description to see how this collection might appear in a
        search engine listing
      </p>
      {edit && (
        <>
          <div className="h-8" />
          <Input
            id="seo-title"
            value={product.seo.title}
            disabled={loading}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
            label="SEO Title"
          />
          <div className="h-4" />
          <TextArea
            label="SEO Description"
            disabled={loading}
            value={product.seo.description}
            onChange={(e) =>
              setProduct({
                ...product,
                seo: { ...product.seo, title: e.target.value },
              })
            }
          />
        </>
      )}
    </Card>
  );
}



const defaultProduct: ApiProduct = {
  title: "",
  chargeTaxes: false,
  locations: [],
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
  media: [],
  seo: {
    title: "",
    description: "",
  },
  tags: [],
};
