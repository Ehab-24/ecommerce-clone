import Card from "@/components/Card"
import Heading from "@/components/Heading"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import StatusText from "@/components/products/StatusText"
import { apiUrl } from "@/lib/utils"
import { Product } from "@/types/product"
import Link from "next/link"
import React from "react"
import { FaArrowLeft } from "react-icons/fa"
import Text from "@/components/Text"
import Image from "next/image"
import SectionTitle from "@/components/SectionTitle"
import { PiImageThin } from "react-icons/pi";
import EditVariantForm from "@/components/products/variants/EditVariantForm"

export const runtime = "edge"

export default async function EditVariantPage({ params }: { params: { id: string, variant: string } }) {

    const res = await fetch(apiUrl(`/api/products/${params.id}`))
    if (!res.ok) throw new Error(res.statusText)
    const product: Product = await res.json()

    const vi = Number(params.variant)
    const variant = product.variants[vi]

    return (
        <div className="flex justify-center w-full py-6 bg-gray-100 min-h-screen ">
            <div className="max-w-4xl w-full flex gap-4 flex-col">

                <div className="flex w-full justify-between">
                    <div className="flex gap-3 items-start ">
                        <Link
                            href="/products"
                            className="p-2 rounded-md hover:bg-black/10 transition-all"
                        >
                            <FaArrowLeft className="text-sm text-[#1a1a1a]" />
                        </Link>
                        <Heading>{variant.name}</Heading>
                    </div>

                    <OutlinedButton>
                        Duplicate
                    </OutlinedButton>

                </div>

                <div className="flex gap-4 w-full">

                    <div className="max-w-[280px] w-full flex flex-col gap-4">

                        <Card className="p-4">
                            <div className="flex w-full gap-4">
                                <div className="w-16 h-16 rounded-md overflow-hidden">
                                    <Image src={product.media[0].url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
                                </div>
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
                                    <Link key={i} href={`/products/${product._id}/variants/${i}`} className={`${i == vi ? "hover:bg-gray-100 bg-gray-100" : "hover:bg-gray-100/60 bg-white"} flex items-center gap-2 px-4 transition-all border-t border-gray-200 py-2`}>
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
                                        <Text className={i === vi ? "text-blue-700" : "text-gray-800"}>{v.name}</Text>
                                    </Link>
                                ))
                            }
                        </Card>

                    </div>

                    <EditVariantForm initialProduct={product} vi={vi} />

                </div>

            </div>
        </div>
    )
}
