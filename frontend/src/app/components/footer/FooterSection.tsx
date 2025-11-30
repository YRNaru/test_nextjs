interface FooterSectionProps {
  icon: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
  children: React.ReactNode;
  iconSize?: string;
  titleSize?: string;
}

export default function FooterSection({
  icon,
  title,
  gradientFrom,
  gradientTo,
  children,
  iconSize = "text-3xl md:text-2xl",
  titleSize = "text-2xl md:text-xl",
}: FooterSectionProps) {
  return (
    <div className="group">
      <h3 className={`font-bold mb-4 m-0 ${titleSize} flex items-center gap-2`}>
        <span className={iconSize}>{icon}</span>
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          {title}
        </span>
      </h3>
      {children}
    </div>
  );
}
