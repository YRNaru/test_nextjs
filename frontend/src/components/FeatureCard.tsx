import { FeatureCardProps } from "@/types";

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div
      className="bg-black/5 dark:bg-white/6 p-5 rounded-lg border border-black/[0.08] dark:border-white/[0.145] text-center transition-transform duration-200 hover:-translate-y-0.5"
      data-oid="wp9tsql"
    >
      <div className="text-3xl mb-3" data-oid="93hp1_v">
        {icon}
      </div>
      <h3
        className="m-0 mb-2 text-lg font-semibold text-foreground"
        data-oid="n.ppz2i"
      >
        {title}
      </h3>
      <p className="m-0 text-sm text-foreground opacity-80" data-oid="yc1tuj3">
        {description}
      </p>
    </div>
  );
}
