import React from "react";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm shadow-neutral-400 ${className}`}>
      {children}
    </div>
  );
}
