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
  disabled = false,
  onChange,
}: {
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  label?: string;
  value?: string;
}) {

  return (
    <div className="w-full min-w-[200px]">
      <label className="block pb-1 text-xs font-medium text-gray-700">
        {label}
      </label>
      <select
        // defaultValue={options[0].value}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="pl-3 w-full border border-gray-200 rounded-lg py-1 text-xs outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
