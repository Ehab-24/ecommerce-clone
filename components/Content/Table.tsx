"use client"

import React from 'react'
import Checkbox from '../Checkbox'

const MetaTable = () => {



    return (
        <div className="relative overflow-x-auto overflow-y-scroll">
            <table className="w-full text-left rtl:text-right">
                <thead className="text-xs font-light text-table-header bg-gray-50 border-b-2">
                    <tr >
                        <th scope='col' className="pl-6 flex flex-row">
                            <Checkbox id={''} label={''} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.')
                            }} />
                            <th scope='col'  className="py-3">
                                Display Name
                            </th>
                        </th>
                        <th scope='col' className="px-3 py-3"></th>
                        <th scope='col' className="px-3 py-3"></th>
                        <th scope='col' className="px-6 py-3">
                            Defination
                        </th>
                        <th scope='col' className="px-6 py-3">
                            Storefront access
                        </th>
                        <th scope='col' className="px-6 py-3">
                            Status
                        </th>
                        <th scope='col' className="px-6 py-3">
                            Last updated
                        </th>
                        <th scope='col' className="px-6 py-3">
                            References
                        </th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                    <tr className="hover:bg-gray-50">
                        <td className="pl-6 flex flex-row">
                            <Checkbox id={''} label={''} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.')
                            }} />
                            <td className="px-6 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900"></div>
                                    <div className="text-sm text-gray-500"></div>
                                </div>
                            </div>
                        </td>
                        </td>
                        
                        <td className="px-6 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}></span>
                        </td>
                        <td className="px-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900"></div>
                            <div className="text-sm text-gray-500"></div>
                        </td>
                        <td className="px-6 whitespace-nowrap text-sm text-gray-500"></td>
                        <td className="px-6 whitespace-nowrap text-sm text-gray-500"></td>
                        <td className="px-6 whitespace-nowrap text-sm text-gray-500"></td>
                        <td className="px-6 whitespace-nowrap text-sm text-gray-500"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MetaTable
