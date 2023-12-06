import React from "react";

export default function Input({
  id,
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  type = "text",
}: {
  id: string;
  value?: string | number;
  label: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex-1 mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="hover:bg-neutral-100 text-sm shadow-sm pl-3 py-1.5 border border-neutral-100 p-1 px-2 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
