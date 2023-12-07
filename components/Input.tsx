import React from "react";

export default function Input({
  id,
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  type = "text",
  className = "",
}: {
  id: string;
  value?: string | number;
  label: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block pb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`hover:bg-neutral-100 text-sm shadow-sm pl-3 py-1.5 border border-neutral-400 p-1 px-2 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full ${className}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
