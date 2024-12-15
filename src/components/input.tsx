import { Eye } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  label: string;
  value: string;
  type?: "text" | "password" | "email";
  error?: string | undefined;
  onChange: (value: string) => void;
}

const Input = ({
  label,
  value,
  type = "text",
  onChange,
  error,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block mb-1">{label}</label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`border border-default rounded-md p-3 w-full ${
            type === "password" && "pr-10"
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-[14px]"
            onClick={toggleShowPassword}
          >
            <Eye size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
