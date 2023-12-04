import React from "react"

export default function Card({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
      {children}
    </div>
  )
}
