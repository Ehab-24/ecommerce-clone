import React from "react"

export default function FilledButtonSmall({ children, onClick, bgClass = "bg-gray-900" }: { bgClass?: string, children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      onClick={onClick}
      className={`select-none rounded-lg ${bgClass} py-1 px-2.5 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
      type="button"
    >
      {children}
    </button>
  )
}
