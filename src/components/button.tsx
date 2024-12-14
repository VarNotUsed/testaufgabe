import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  disabled = false
} : ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md px-4 py-3 bg-default text-white w-full"
    >
      {children}
    </button>
  );
};

export default Button;
