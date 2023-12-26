"use client";

import { multiplyArrays } from "@/lib/products/utils";
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
import { IoIosArrowRoundBack, IoIosClose } from "react-icons/io";
import SectionTitle from "@/components/SectionTitle";
import countries from "@/data/countries";
import Heading from "@/components/Heading";
import ImageUploader from "@/components/ImageUploader";
import Image from "next/image";
import { useEffect } from "react";
import React from "react";
import OutlinedButton from "../buttons/OutlinedButton";
import { Location } from "@/types/location";
import VariantsCardEditPage from "@/components/products/variants/VariantsCardEditPage";
import StatusText from "../StatusText";
import Text from "@/components/Text";
import TextButton from "../buttons/TextButton";
import Spinner from "../Spinner";
import { Publishing } from "./Publishing";
import { SalesChannel } from "@/types/salesChannel";
import { Market } from "@/types/market";
import Shipping from "./Shipping";
import SearchEngineListing from "./SearchEngineListing";
import ProductOrganization from "./ProductOrganization";
import Inventory from "./Inventory";

export default function EditProductForm({
  initialProduct,
  locations,
}: {
  locations: Location[];
  initialProduct: Product;
}) {
  const salesChannels: SalesChannel[] = [
    {
      _id: "1",
      name: "Online Store",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "POS",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];
  const markets: Market[] = [
    {
      _id: "1",
      name: "US",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "CA",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "3",
      name: "UK",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];

  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = React.useState<ApiProduct>({
    ...initialProduct,
    vendor: initialProduct.vendor?._id,
    locations: initialProduct.locations?.map((l) => l._id) || [],
    markets: initialProduct.markets?.map((m) => m._id) || [],
  });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setProduct((p) => ({
      ...p,
      variants: multiplyArrays(
        p.variantOptions.map((v) => v.name),
        ...p.variantOptions.map((v) => v.values)
      ).map((obj, i) => ({
        _id: i.toString(),
        name: Object.values(obj).join(" / "),
        values: obj,
        trackQuantity: false,
        continueSellingWhenOutOfStock: false,
      })),
    }));
  }, [product.variantOptions]);

  useEffect(() => {
    if (product.price !== 0 && product.costPerItem !== 0) {
      setProduct((p) => ({
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
    setLoading(true);
    try {
      ApiProductSchema.parse(product);
      const { status } = await axios.put(`/api/products/${params.id}`, product);
      if (status === 200) {
        toast.success("Product saved successfully");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error((error as ZodError).errors[0].message);
      } else if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      const { status } = await axios.delete(`/api/products/${params.id}`);
      if (status === 200) {
        router.push("/products");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleProductStatusChange(status: string): Promise<void> {
    setLoading(true);
    try {
      const res = await axios.put(`/api/products/${params.id}`, { status });
      if (res.status === 200) {
        toast.success("Product archived successfully");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex-col max-w-4xl w-full flex gap-4 md:p-8 ">
        <div className="flex flex-col md:flex-row px-4 md:px-0 gap-3 mt-4 md:mt-0 items-start">
          <Link
            href="/products"
            className="p-0.5 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={24} className="text-black" />
          </Link>
          <div className="flex  items-center gap-2">
            <Heading>{product.title}</Heading>
            <StatusText status={product.status} />
          </div>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center gap-4">
          <div className=" flex flex-col w-full self-center gap-4 ">
            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <Input
                id="title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
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

              <div
                className={
                  product.media?.length === 0
                    ? "w-full"
                    : "w-full gap-2 grid grid-cols-2 lg:grid-cols-3"
                }
              >
                {product.media?.map((m, i) => (
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

            <Card className="flex p-4 flex-col gap-4 items-stretch">
              <SectionTitle title="Pricing" />
              <Pricing product={product} setProduct={setProduct} />
            </Card>

            <Inventory
              product={product}
              setProduct={setProduct}
              loading={loading}
            />

            <Shipping
              loading={loading}
              product={product}
              setProduct={setProduct}
            />

            <VariantsCardEditPage
              loading={loading}
              productId={initialProduct._id}
              locations={locations}
              initialProduct={initialProduct}
              product={product}
              setProduct={setProduct}
            />

            <SearchEngineListing
              product={product}
              setProduct={setProduct}
              loading={loading}
            />
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

            <Publishing
              product={product}
              setProduct={setProduct}
              markets={markets}
              salesChannels={salesChannels}
            />

            <ProductOrganization
              product={product}
              setProduct={setProduct}
              loading={loading}
            />

            <Card className="p-4">
              <Select
                label="Theme template"
                options={[{ label: "Default theme", value: "default" }]}
                onChange={() => {}}
              />
            </Card>
          </div>
        </div>
      </div>

      <div
        className="w-full items-center justify-between
      max-w-4xl flex gap-4 mb-8 mt-8 md:mt-0 px-4 mx-10
      md:px-8 lg:px-0"
      >
        <div className="flex gap-4">
          {product.status === "archived" ? (
            <OutlinedButton
              disabled={loading}
              onClick={() => handleProductStatusChange("active")}
            >
              Unarchive Product
            </OutlinedButton>
          ) : (
            <OutlinedButton
              disabled={loading}
              onClick={() => handleProductStatusChange("archived")}
            >
              Archive Product
            </OutlinedButton>
          )}
          <FilledButton
            bgClass="bg-red-500"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete Product
          </FilledButton>
        </div>
        {/*TODO: add shouldSave logic*/}
        {loading ? (
          <Spinner />
        ) : (
          <FilledButton disabled={loading} onClick={handleSave}>
            Save
          </FilledButton>
        )}
      </div>
    </>
  );
}

function Pricing({
  product,
  setProduct,
}: {
  product: ApiProduct;
  setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>;
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
