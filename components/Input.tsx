import React from "react";

export default function Input({
  id,
  label,
  value,
  placeholder = "",
  onChange,
  onKeyDown,
  icon,
  type = "text",
  className = "",
}: {
  id: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}) {

  const [isFocus, setIsFocus] = React.useState(false)

  return (
    <div className="relative flex-1 text-sm">
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
        className={`pl-3 w-full border border-gray-200 rounded-lg py-1 outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
