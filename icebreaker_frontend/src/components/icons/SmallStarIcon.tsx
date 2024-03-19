import React from "react";

interface StarIconProps {
  className?: string;
  filled: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  stroke?: string;
  fill?: string;
}

const StarIcon = ({
  className,
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  stroke,
  fill,
}: StarIconProps) => {
  return (
    <svg
      className={className}
      viewBox="-20 -20 328.457 328.457"
      fill={filled ? fill || "yellow" : "none"}
      stroke={stroke || "white"}
      strokeWidth={filled ? "0" : "30"}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }} // Add cursor pointer
    >
      <path d="M 277.478 106.28 C 275.125 99.04 268.867 93.763 261.332 92.669 L 189.353 82.209 L 157.163 16.985 C 153.794 10.159 146.842 5.837 139.228 5.837 C 131.614 5.837 124.663 10.159 121.293 16.985 L 89.103 82.209 L 17.124 92.669 C 9.591 93.763 3.332 99.039 0.979 106.28 C -1.374 113.521 0.588 121.468 6.041 126.782 L 58.125 177.552 L 45.83 249.24 C 44.543 256.743 47.627 264.327 53.786 268.802 C 59.946 273.276 68.11 273.867 74.849 270.324 L 139.229 236.477 L 203.609 270.324 C 206.535 271.862 209.73 272.621 212.914 272.621 C 217.06 272.621 221.187 271.333 224.672 268.802 C 230.831 264.327 233.915 256.743 232.628 249.24 L 220.333 177.552 L 272.417 126.782 C 277.868 121.468 279.83 113.52 277.478 106.28 Z" />
    </svg>
  );
};

export default StarIcon;
