"use client";

import React from 'react'
import { AddModal } from './modals/ContainerBarModals/AddModal'
import { SortPopover } from './popovers/ContainerbarPopover'
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { set } from 'date-fns';

const CardTopBar = () => {

    const [searchclicked, setSearchClicked] = React.useState(true)

    const [search, setSearch] = React.useState('')

    return (
        <div className="py-2 w-full border-b border-gray-300 ">
            {searchclicked ? (<div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-2">
                    <button className="w-10 h-7 py-1 px-3 bg-gray-200 rounded-md text-xs font-semibold text-gray-900 hover:bg-gray-100 transition">All</button>
                    <AddModal />
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={()=> setSearchClicked(false)} className="py-1 px-1 border rounded-md flex items-center shadow-sm shadow-neutral-200">
                        <Image
                            src="/SearchIcon.svg"
                            width={20}
                            height={20}
                            alt="Plus button Image"
                        />
                        <Image
                            src="/ThreeLines.svg"
                            width={20}
                            height={20}
                            alt="Plus button Image"
                        />
                    </button>

                    <SortPopover />
                </div>
            </div>) :
                (
                    <div className="flex justify-between items-center px-5">
                        <Input className='h-8 w-[85%]' type="Text" placeholder="Searching in All" />
                        <div className='flex items-center gap-3'>
                            <button className='text-xs text-gray-700 font-semibold' onClick={()=> setSearchClicked(true)}>
                                Cancel
                            </button>
                            <button className="h-7 py-1 px-2 rounded-md text-xs font-semibold text-gray-400  bg-gray-100 transition">
                                Save as
                            </button>
                            <SortPopover />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CardTopBar
