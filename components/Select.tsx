import React from "react";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export default function Select({
  label,
  value,
  options,
  onChange,
}: {
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  label?: string;
  value?: string;
}) {
  return (
    <div className="w-full min-w-[200px]">
      <label className="block pb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="pl-3 w-full border border-gray-200 rounded-lg py-1 text-sm outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option
            key={option.value}
            disabled={option.disabled || false}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
