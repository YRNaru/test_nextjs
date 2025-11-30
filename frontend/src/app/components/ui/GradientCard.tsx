import { ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
}

export default function GradientCard({
  children,
  gradientFrom,
  gradientTo,
  className = "",
}: GradientCardProps) {
  return (
    <div
      className={`relative p-5 rounded-2xl backdrop-blur-md bg-gradient-to-br border shadow-xl overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}10, ${gradientTo}10)`,
        borderColor: `${gradientFrom}33`,
      }}
    >
      {children}
    </div>
  );
}

