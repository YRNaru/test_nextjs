interface SectionHeaderProps {
  icon: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
  iconSize?: string;
  className?: string;
}

export default function SectionHeader({
  icon,
  title,
  gradientFrom,
  gradientTo,
  iconSize = "text-lg",
  className = "",
}: SectionHeaderProps) {
  return (
    <h4 className={`relative font-bold m-0 flex items-center gap-2 ${className}`}>
      <span className={iconSize}>{icon}</span>
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {title}
      </span>
    </h4>
  );
}

