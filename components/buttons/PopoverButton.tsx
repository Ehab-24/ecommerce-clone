import React from "react";

const PopoverButton = ({
  className,
  children,
  props,
}: {
  className?: string;
  children?: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`text-xs text-left text-gray-500 align-top p-2 rounded-lg hover:bg-neutral-200 text-neutral-600" ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PopoverButton;
