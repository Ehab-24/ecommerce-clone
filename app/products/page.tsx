import LinkMini from "@/components/LinkMini";
import OutlinedButtonSmall from "@/components/buttons/OutlinedButtonSmall";
import Datatable from "@/components/products/Datatable";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { apiUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import axios from "axios";
import Link from "next/link";
import { type } from "os";
import React from "react";
import { toast } from "react-hot-toast";

// export const runtime = "edge";

export default function ProductsPage() {
  // const res = await fetch(apiUrl("/api/products"), {
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  //
  // const products: Product[] = []

  // const [products, setProducts] = React.useState<Product[]>([])
  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const { data } = await axios.get("/api/products")
  //       console.log(data)
  //       setProducts(data)
  //     } catch (error) {
  //       console.log(error)
  //       toast.error('Could not load data!')
  //     }
  //   }
  //   fetchProducts()
  // }, [])


  // fill with dummy products
  const products: Product[] = [
    {
      title: "Coffee Maker",
      description: "Modern coffee maker with multiple brewing options",
      price: 79.99,
      compareAtPrice: 99.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 50.0,
      profit: 29.99,
      margin: 37,
      trackQuantity: true,
      quantity: 30,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "CM001",
      barcode: "1122334455",
      isPhysicalProduct: true,
      weight: 1.5,
      weightUnit: "kg",
      countryOfOrigin: "China",
      status: "active",
      productCategory: "Appliances",
      productType: "Coffee Maker",
      vendor: "Vendor C",
      collection: "Kitchen Essentials",
      tags: ["Kitchen", "Coffee", "Appliances"],
      seo: {
        title: "Coffee Maker",
        description: "Modern coffee maker with multiple brewing options",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Yoga Mat",
      description: "Eco-friendly yoga mat for comfortable workouts",
      price: 29.99,
      compareAtPrice: 39.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 15.0,
      profit: 14.99,
      margin: 50,
      trackQuantity: true,
      quantity: 60,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "YM001",
      barcode: "9876543211",
      isPhysicalProduct: true,
      weight: 1.0,
      weightUnit: "kg",
      countryOfOrigin: "India",
      status: "active",
      productCategory: "Fitness",
      productType: "Yoga Mat",
      vendor: "Vendor D",
      collection: "Fitness Gear",
      tags: ["Yoga", "Fitness", "Health"],
      seo: {
        title: "Yoga Mat",
        description: "Eco-friendly yoga mat for comfortable workouts",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Desk Lamp",
      description: "Adjustable LED desk lamp for study or work",
      price: 39.99,
      compareAtPrice: 49.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 20.0,
      profit: 19.99,
      margin: 50,
      trackQuantity: true,
      quantity: 50,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "DL001",
      barcode: "9988776655",
      isPhysicalProduct: true,
      weight: 0.8,
      weightUnit: "kg",
      countryOfOrigin: "Taiwan",
      status: "active",
      productCategory: "Home & Office",
      productType: "Desk Lamp",
      vendor: "Vendor E",
      collection: "Home Essentials",
      tags: ["Home", "Office", "Lighting"],
      seo: {
        title: "Desk Lamp",
        description: "Adjustable LED desk lamp for study or work",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "T-shirt",
      description: "A comfortable cotton t-shirt",
      price: 19.99,
      compareAtPrice: 24.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 8.5,
      profit: 11.49,
      margin: 57,
      trackQuantity: true,
      quantity: 50,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "TS001",
      barcode: "123456789",
      isPhysicalProduct: true,
      weight: 0.3,
      weightUnit: "kg",
      countryOfOrigin: "USA",
      status: "active",
      productCategory: "Clothing",
      productType: "T-shirt",
      vendor: "Vendor X",
      collection: "Summer Collection",
      tags: ["Men", "Cotton", "Casual"],
      seo: {
        title: "T-shirt",
        description: "A comfortable cotton t-shirt",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Running Shoes",
      description: "High-performance running shoes for athletes",
      price: 89.99,
      compareAtPrice: 109.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 45.0,
      profit: 44.99,
      margin: 50,
      trackQuantity: true,
      quantity: 75,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "RS001",
      barcode: "135792468",
      isPhysicalProduct: true,
      weight: 0.5,
      weightUnit: "kg",
      countryOfOrigin: "Vietnam",
      status: "active",
      productCategory: "Footwear",
      productType: "Running Shoes",
      vendor: "Vendor Z",
      collection: "Athletic Gear",
      tags: ["Sports", "Running", "Athletic"],
      seo: {
        title: "Running Shoes",
        description: "High-performance running shoes for athletes",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Leather Wallet",
      description: "Handcrafted genuine leather wallet",
      price: 49.99,
      compareAtPrice: 69.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 20.0,
      profit: 29.99,
      margin: 60,
      trackQuantity: true,
      quantity: 40,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "LW001",
      barcode: "246813579",
      isPhysicalProduct: true,
      weight: 0.1,
      weightUnit: "kg",
      countryOfOrigin: "Italy",
      status: "active",
      productCategory: "Accessories",
      productType: "Wallet",
      vendor: "Vendor A",
      collection: "Leather Goods",
      tags: ["Fashion", "Leather", "Accessories"],
      seo: {
        title: "Leather Wallet",
        description: "Handcrafted genuine leather wallet",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Gaming Laptop",
      description: "High-performance laptop for gaming enthusiasts",
      price: 1499.99,
      compareAtPrice: 1699.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 1100.0,
      profit: 399.99,
      margin: 27,
      trackQuantity: true,
      quantity: 25,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "GL001",
      barcode: "9876543210",
      isPhysicalProduct: true,
      weight: 2.0,
      weightUnit: "kg",
      countryOfOrigin: "USA",
      status: "draft",
      productCategory: "Electronics",
      productType: "Laptop",
      vendor: "Vendor B",
      collection: "Gaming Essentials",
      tags: ["Gaming", "Laptop", "Tech"],
      seo: {
        title: "Gaming Laptop",
        description: "High-performance laptop for gaming enthusiasts",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_53113720087_74e1377b87_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        },
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: "Smartphone",
      description: "A powerful smartphone with great features",
      price: 699.99,
      compareAtPrice: 799.99,
      chargeTaxes: true,
      tax: 0,
      taxRate: 0,
      variants: [],
      costPerItem: 450,
      profit: 249.99,
      margin: 36,
      trackQuantity: true,
      quantity: 100,
      continueSellingWhenOutOfStock: false,
      hasSku: true,
      sku: "SP001",
      barcode: "987654321",
      isPhysicalProduct: true,
      weight: 0.2,
      weightUnit: "kg",
      countryOfOrigin: "China",
      status: "active",
      productCategory: "Electronics",
      productType: "Smartphone",
      vendor: "Vendor Y",
      collection: "Tech Gadgets",
      tags: ["Tech", "Mobile", "Android"],
      seo: {
        title: "Smartphone",
        description: "A powerful smartphone with great features",
      },
      media: [
        {
          url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
          altText: 'Coffee Maker',
          type: 'image'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className=" flex gap-4">
          <ExportImportButtons />
          <LinkMini href="products/new">Add Product</LinkMini>
        </div>
      </div>

      <Datatable products={products} />
    </div>
  );
}
