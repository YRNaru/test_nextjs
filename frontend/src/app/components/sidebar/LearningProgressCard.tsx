import GradientCard from "../ui/GradientCard";
import SectionHeader from "../ui/SectionHeader";

interface ProgressItem {
  label: string;
  percentage: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const progressItems: ProgressItem[] = [
  {
    label: "Next.js基礎",
    percentage: 75,
    color: "text-green-500",
    gradientFrom: "rgb(34, 197, 94)",
    gradientTo: "rgb(16, 185, 129)",
  },
  {
    label: "React基礎",
    percentage: 60,
    color: "text-blue-500",
    gradientFrom: "rgb(59, 130, 246)",
    gradientTo: "rgb(6, 182, 212)",
  },
  {
    label: "TypeScript",
    percentage: 85,
    color: "text-purple-500",
    gradientFrom: "rgb(168, 85, 247)",
    gradientTo: "rgb(236, 72, 153)",
  },
];

export default function LearningProgressCard() {
  return (
    <GradientCard
      gradientFrom="rgb(34, 197, 94)"
      gradientTo="rgb(16, 185, 129)"
      className="p-3"
    >
      <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
      <SectionHeader
        icon="📊"
        title="学習進捗"
        gradientFrom="rgb(34, 197, 94)"
        gradientTo="rgb(16, 185, 129)"
        iconSize="text-lg"
        className="text-base mb-4"
      />
      <div className="relative space-y-4">
        {progressItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className={`text-sm font-bold ${item.color}`}>
                {item.percentage}%
              </span>
            </div>
            <div className="relative w-full h-3 bg-white/30 dark:bg-gray-800/30 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute inset-0 rounded-full transition-all duration-300 shadow-lg"
                style={{
                  width: `${item.percentage}%`,
                  backgroundImage: `linear-gradient(to right, ${item.gradientFrom}, ${item.gradientTo})`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  );
}

