import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  options: Option<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  className?: string;
};

export default function Select<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined && onChange;
  const selected = isControlled
    ? options.find((opt) => opt.value === value)
    : options.find((opt) => opt.value === internalValue);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option<T>) => {
    if (isControlled && onChange) {
      onChange(option.value);
    } else {
      setInternalValue(option.value);
    }
    setOpen(false);
  };

  return (
    <div
      className={cn("relative inline-block text-left min-w-28", className)}
      ref={dropdownRef}
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-full px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-md shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selected ? selected.label : placeholder}
        <ChevronDownIcon
          className={cn("w-4 h-4 ml-2 transition-transform", {
            "rotate-180": open,
            "rotate-0": !open,
          })}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option) => (
              <li key={String(option.value)}>
                <button
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full text-left px-4 py-2 hover:bg-gray-100",
                    {
                      "bg-gray-100 font-semibold":
                        option.value === selected?.value,
                    },
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
