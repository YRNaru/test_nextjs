import { LearningSection } from "@/types/react";
import { ParentSection } from "../types";

interface SectionTabsProps {
  sections: LearningSection[];
  activeSection: ParentSection;
  onSectionClick: (section: ParentSection) => void;
}

export default function SectionTabs({
  sections,
  activeSection,
  onSectionClick,
}: SectionTabsProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`w-[300px] h-15 flex items-center justify-center border-2 rounded-xl cursor-pointer text-lg font-semibold transition-all duration-200 ${
            activeSection === section.id
              ? "border-[#3498db] bg-gradient-to-br from-[var(--card-background)] to-[rgba(52,152,219,0.05)] text-[#3498db] shadow-[0_2px_8px_rgba(52,152,219,0.2)]"
              : "border-[rgba(52,152,219,0.3)] bg-gradient-to-br from-[var(--card-background)] to-[rgba(52,152,219,0.05)] text-[#3498db] hover:border-[#3498db] hover:shadow-[0_2px_8px_rgba(52,152,219,0.15)]"
          }`}
          onClick={() => onSectionClick(section.id as ParentSection)}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}
