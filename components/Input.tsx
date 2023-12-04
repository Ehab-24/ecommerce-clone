import React from "react"

export default function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div>
      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
  )
}
