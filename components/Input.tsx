import React from "react"

export default function Input({ id, label, value, placeholder, onChange, onKeyDown, type = "text" }: { id: string, value?: string | number, label: string, placeholder: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>, type?: React.HTMLInputTypeAttribute }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} onKeyDown={onKeyDown} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
  )
}
