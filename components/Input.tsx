import { cn } from "@/lib/utils";
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
  disabled = false,
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
  disabled?: boolean;
  className?: string;
}) {

  const [isFocus, setIsFocus] = React.useState(false)

  return (
    <div className="relative flex-1 text-xs w-full">
      {label && (
        <label
          htmlFor={id}
          className="block w-full pb-1 text-xs font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {
        icon ? (
          <div className={cn(`flex items-center gap-2 w-full py-1.5 px-2.5 ring-0 rounded-lg ${isFocus ? "border-2 border-gray-500" : "border border-gray-500"}`, className)}>
            {icon}
            <input
              disabled={disabled}
              type={type}
              id={id}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder={placeholder}
              className="h-full text-xs w-full outline-none bg-transparent"
              required
            />
          </div>

        ) : (
          <input
            disabled={disabled}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={cn("pl-3 text-sm sm:text-xs w-full border border-gray-200 rounded-lg py-1 outline outline-1 outline-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent", className)}
            placeholder={placeholder}
            required
          />
        )
      }
    </div>
  );
}
