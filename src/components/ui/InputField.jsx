import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  name,
  required = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1.5 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className={`h-5 w-5 ${error ? "text-red-400" : "text-gray-400"}`} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full rounded-xl py-2.5 text-sm text-gray-900 transition-colors focus:bg-white focus:outline-none focus:ring-1 
            ${Icon ? "pl-10" : "pl-3"} 
            ${isPassword ? "pr-10" : "pr-3"}
            ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 bg-gray-50 focus:border-purple-500 focus:ring-purple-500 hover:border-gray-300"
            }
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500">{error}</p>
      )}
    </div>
  );
}
