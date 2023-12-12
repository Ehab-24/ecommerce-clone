import Link from "next/link";
import { Collection, Operator } from "@/types/collection";
import Datatable from "@/components/products/collections/Datatable";
import FilledButton from "@/components/buttons/FilledButton";

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
          value: 50,
        },
        {
          field: "category",
          operator: Operator.Equals,
          value: "electronics",
        },
      ],
      conditionsMatch: "all",
      products: ["8", "9"],
      seo: {
        title: "Automated Collection",
        description: "Discover our automated collection",
      },
      _id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Manual Collection",
      description: "This collection is manually curated",
      collectionType: "manual",
      conditions: [
        {
          field: "brand",
          operator: Operator.Contains,
          value: "Nike",
        },
      ],
      conditionsMatch: "any",
      products: ["1", "2", "3", "4", "5", "6", "7"],
      seo: {
        title: "Manual Collection",
        description: "Explore our manually curated collection",
      },
      _id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Summer Sale",
      description: "Collection for summer discounts",
      collectionType: "automated",
      conditions: [
        {
          field: "season",
          operator: Operator.Equals,
          value: "summer",
        },
        {
          field: "discount",
          operator: Operator.GreaterThan,
          value: 20,
        },
      ],
      conditionsMatch: "all",
      products: ["1", "2", "3", "4", "5", "6", "7"],
      seo: {
        title: "Summer Sale Collection",
        description: "Get exciting discounts on summer products",
      },
      _id: "3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Best Sellers",
      description: "Handpicked best-selling items",
      collectionType: "manual",
      conditions: [
        {
          field: "salesCount",
          operator: Operator.GreaterThan,
          value: 1000,
        },
      ],
      conditionsMatch: "any",
      products: ["1", "2", "3", "4", "5", "6", "7"],
      seo: {
        title: "Best Sellers Collection",
        description: "Discover our most popular products",
      },
      _id: "4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mb-8 w-full flex justify-between">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Collections</h1>

        <FilledButton>
          <Link href="/products/collections/new">Create Collection</Link>
        </FilledButton>
      </div>
      <Datatable collections={collections} />
    </div>
  );
}
