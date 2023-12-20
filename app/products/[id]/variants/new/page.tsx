import Card from "@/components/Card"
import Heading from "@/components/Heading"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import StatusText from "@/components/products/StatusText"
import { apiUrl } from "@/lib/utils"
import { Product } from "@/types/product"
import Link from "next/link"
import React from "react"
import Text from "@/components/Text"
import Image from "next/image"
import SectionTitle from "@/components/SectionTitle"
import { PiImageThin } from "react-icons/pi";
import CreateVariantForm from "@/components/products/variants/CreateVariantForm"
import { Location } from "@/types/location"
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io"

export const runtime = "edge"

export default async function CreateVariantPage({ params }: { params: { id: string } }) {

    const requests = [
        fetch(apiUrl(`/api/products/${params.id}`), { cache: "no-cache" }),
        fetch(apiUrl(`/api/settings/locations`), { cache: "no-cache" }),
    ]
    const [productRes, locationsRes] = await Promise.all(requests)
    if (!productRes.ok) throw new Error("Failed to fetch product")
    if (!locationsRes.ok) throw new Error("Failed to fetch locations")

    const product: Product = await productRes.json()
    const locations: Location[] = await locationsRes.json()

    return (
        <div className="flex justify-center w-full py-6 bg-gray-100 min-h-screen ">
            <div className="max-w-4xl w-full flex gap-4 flex-col">

                <Taskbar title="Add Variant" />

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <VariantsList product={product} />
                    <CreateVariantForm product={product} locations={locations} />
                </div>

            </div>
        </div>
    )
}

export function Taskbar({ title, product, vi }: { title: string, product?: Product, vi?: number }) {
    return (

        <div className="flex w-full justify-between">
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-3 items-start ">
                <Link
                    href="/products"
                    className="p-2 rounded-md hover:bg-black/10 transition-all"
                >
                    <IoIosArrowRoundBack className="text-sm text-[#1a1a1a]" />
                </Link>
                <Heading>{title}</Heading>
            </div>

            <div className="flex w-max items-center">

                <OutlinedButton>
                    Duplicate
                </OutlinedButton>

                <div className="w-2" />

                {
                    vi !== undefined && (
                        <div className=" hidden  md:flex">
                            <Link href={`/products/${product!._id}/variants/${vi - 1}`} aria-disabled={vi === 0} className={`${vi === 0 ? "pointer-events-none text-gray-400" : "hover:bg-gray-300 "} border border-gray-300 bg-gray-200 py-1 px-2 grid place-items-center rounded-tl-md rounded-bl-md transition-all`}>
                                <IoIosArrowBack size={14} />
                            </Link>
                            <Link href={`/products/${product!._id}/variants/${vi + 1}`} aria-disabled={product!.variants.length === vi + 1} className={`${product!.variants.length === vi + 1 ? "pointer-events-none text-gray-400" : "hover:bg-gray-300 "} border-t border-b border-r border-gray-300 bg-gray-200 px-2 py-1 grid place-items-center rounded-tr-md rounded-br-md transition-all`}>
                                <IoIosArrowForward size={14} />
                            </Link>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export function VariantsList({ product }: { product: Product }) {
    return (

        <div className="md:max-w-[280px] w-full flex flex-col gap-4">

            <Card className="p-4">
                <div className="flex w-full gap-4">
                    {
                        product.media.length > 0 ? (
                            <div className="w-16 h-16 rounded-md overflow-hidden">
                                <Image src={product.media[0].url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                            </div>
                        ) : (
                            <Link href={`/products/${product._id}`} className="w-16 h-16 rounded-md overflow-hidden border border-gray-300 grid place-items-center">
                                <PiImageThin size={14} className="text-gray-500" />
                            </Link>
                        )
                    }
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <p className="text-sm text-gray-800">{product.title}</p>
                            <StatusText status={product.status} />
                        </div>

                        <Text className="text-neutral-500 mt-2">
                            {product.variants.length} variants
                        </Text>
                    </div>
                </div>
            </Card>

            <Card className="pt-4 overflow-hidden">
                <div className="px-4 mb-4">
                    <SectionTitle title="Variants" />
                </div>
                {
                    product.variants.map((v, i) => (
                        <Link key={i} href={`/products/${product._id}/variants/${i}`} className="hover:bg-gray-100/60 bg-white flex items-center gap-2 px-4 transition-all border-t border-gray-200 py-2">
                            {
                                v.image ? (
                                    <p>hello</p>
                                )
                                    : (
                                        <div className="w-10 h-10 border rounded-md border-gray-200 grid place-items-center">
                                            <PiImageThin size={14} className="text-gray-500" />
                                        </div>
                                    )
                            }
                            <Text className="text-gray-800">{v.name}</Text>
                        </Link>
                    ))
                }
            </Card>

        </div>
    )
}
