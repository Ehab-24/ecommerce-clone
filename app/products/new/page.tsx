"use client";

import { ZodError } from "zod";
import { ProductSchema, Product } from "@/types/product";
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

export default function NewProductPage() {
  const defaultProduct: Product = {
    title: "",
    description: "",
    price: 0,
    compareAtPrice: 0,
    chargeTaxes: false,
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
    collections: "",
    media: [] as any,
    tags: [] as string[],
  };

  const [product, setProduct] = React.useState<Product>(defaultProduct);

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

  async function handleSave() {
    try {
      const result = ProductSchema.parse(product);
      const resp = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (resp.status === 201) {
        toast.success("Product created successfully");
        setProduct(defaultProduct);
      }
    } catch (error) {
      console.log(product.description);
      toast.error((error as ZodError).errors[0].message);
    }
  }

  return (
    <div className="flex-col flex gap-6 p-8 ">
      <div className="flex gap-3 items-center ">
        <Link href="/products">
          <FaArrowLeft className="text-sm text-[#1a1a1a]" />
        </Link>
        <h1 className="text-xl font-bold text-[#1a1a1a]">Add Product</h1>
      </div>

      <div className=" flex flex-col w-full max-w-3xl self-center gap-4 mb-8">
        <Card className="flex flex-col gap-4 items-stretch">
          <Input
            id="title"
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            label="Title"
            placeholder="Title"
          />
          <TextArea
            label="Description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Card>

        <Card className="flex flex-col gap-4 items-stretch">
          <SectionTitle title="Pricing" />
          <Pricing product={product} setProduct={setProduct} />
        </Card>

        <Card className=" flex-col flex gap-4">
          <SectionTitle title="Inventory" />
          <Inventory product={product} setProduct={setProduct} />
        </Card>

        <Card className=" flex-col flex gap-4">
          <SectionTitle title="Shipping" />
          <Shipping product={product} setProduct={setProduct} />
        </Card>

        <Card className=" flex-col flex gap-4">
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

        <Card className=" flex-col flex gap-4">
          <SectionTitle title="Product Organization" />
          <ProductOrganization product={product} setProduct={setProduct} />
        </Card>

        <FilledButton onClick={handleSave}>Save</FilledButton>
      </div>
    </div>
  );
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
          label="Price"
          placeholder="$ 0.00"
          type="number"
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />
        <Input
          id="compare-at-price"
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
        label="Charge Taxes on this Product"
        onChange={(e) =>
          setProduct({ ...product, chargeTaxes: e.target.checked })
        }
      />
      <div className="flex gap-4 mt-4">
        <Input
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
        label="Track Quantity"
        onChange={(e) =>
          setProduct({ ...product, trackQuantity: e.target.checked })
        }
      />

      <div className=" flex items-center w-full justify-between mb-4">
        <p className="text-sm text-gray-900">Block 6-C2 Park</p>
        {product.trackQuantity ? (
          <Input
            id="quantity"
            label=""
            placeholder="0"
            type="number"
            onChange={(e) =>
              setProduct({ ...product, quantity: Number(e.target.value) })
            }
          />
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
            placeholder=""
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
        label="This is a physical product"
        onChange={(e) =>
          setProduct({ ...product, isPhysicalProduct: e.target.checked })
        }
      />

      <div className="h-4" />
      {product.isPhysicalProduct ? (
        <>
          <div className=" w-full flex items-end justify-between mb-4">
            <Input
              id="weight"
              label="Weight"
              placeholder="0.0"
              type="number"
              onChange={(e) =>
                setProduct({ ...product, weight: Number(e.target.value) })
              }
            />
            <Select
              label="Weight Unit"
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
          <Select
            label="Country/Region of origin"
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
        label="Product category"
        placeholder="Apparel & Accessories"
        onChange={(e) =>
          setProduct({ ...product, productCategory: e.target.value })
        }
      />
      <Input
        id="product-type"
        label="Product Type"
        placeholder=""
        onChange={(e) =>
          setProduct({ ...product, productType: e.target.value })
        }
      />
      <Input
        id="vendor"
        label="Vendor"
        placeholder=""
        onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
      />
      <Input
        id="collections"
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
