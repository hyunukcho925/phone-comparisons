import React from "react";

interface PlusCircleIconProps {
  className?: string;
  strokeWidth?: number;
}

const PlusCircleIcon: React.FC<PlusCircleIconProps> = ({
  className = "size-6",
  strokeWidth = 2,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default PlusCircleIcon;