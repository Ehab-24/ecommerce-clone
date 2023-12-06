import Link from "next/link"

export default async function CollectionsPage() {
  return (

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
  )
}
