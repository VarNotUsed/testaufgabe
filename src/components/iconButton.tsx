import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-3 bg-secondary text-default relative w-[40px] h-[40px] flex items-center justify-center"
    >
      <div className="absolute">{children}</div>
    </button>
  );
};

export default IconButton;
