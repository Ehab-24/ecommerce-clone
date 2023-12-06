import Link from "next/link"
import { Collection, Operator } from "@/types/collection"
import Datatable from "@/components/products/collections/Datatable"

export default async function CollectionsPage() {

  const collections: Collection[] = [
    {
      title: "Automated Collection",
      description: "This collection is automated",
      collectionType: "automated",
      conditions: [
        {
          field: "price",
          operator: Operator.GreaterThan,
          value: 50
        },
        {
          field: "category",
          operator: Operator.Equals,
          value: "electronics"
        }
      ],
      conditionsMatch: "all",
      products: 8,
      seo: {
        title: "Automated Collection",
        description: "Discover our automated collection"
      }
    },
    {
      title: "Manual Collection",
      description: "This collection is manually curated",
      collectionType: "manual",
      conditions: [
        {
          field: "brand",
          operator: Operator.Contains,
          value: "Nike"
        }
      ],
      conditionsMatch: "any",
      products: 25,
      seo: {
        title: "Manual Collection",
        description: "Explore our manually curated collection"
      }
    },
    {
      title: "Summer Sale",
      description: "Collection for summer discounts",
      collectionType: "automated",
      conditions: [
        {
          field: "season",
          operator: Operator.Equals,
          value: "summer"
        },
        {
          field: "discount",
          operator: Operator.GreaterThan,
          value: 20
        }
      ],
      conditionsMatch: "all",
      products: 22,
      seo: {
        title: "Summer Sale Collection",
        description: "Get exciting discounts on summer products"
      }
    },
    {
      title: "Best Sellers",
      description: "Handpicked best-selling items",
      collectionType: "manual",
      conditions: [
        {
          field: "salesCount",
          operator: Operator.GreaterThan,
          value: 1000
        }
      ],
      conditionsMatch: "any",
      products: 50,
      seo: {
        title: "Best Sellers Collection",
        description: "Discover our most popular products"
      }
    }
  ]

  return (
    <div className="bg-gray-100 min-h-screen p-8" >
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Collections</h1>

        <div className=" flex gap-4">
          <Link href="/products/collections/new"
            className="select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Create Collection
          </Link>
        </div>

      </div>
      <Datatable collections={collections} />
    </div>
  )
}
