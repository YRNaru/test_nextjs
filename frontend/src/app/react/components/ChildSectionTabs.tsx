import { LearningSection } from "@/types/react";
import { ChildSection } from "../types";

interface ChildSectionTabsProps {
  sections: LearningSection[];
  activeSection: ChildSection | null;
  onSectionClick: (section: ChildSection) => void;
}

export default function ChildSectionTabs({
  sections,
  activeSection,
  onSectionClick,
}: ChildSectionTabsProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap" data-oid="0m8-615">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`px-4 py-2 border-2 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 ${
            activeSection === section.id
              ? "border-[#27ae60] bg-[#27ae60] text-white shadow-[0_2px_6px_rgba(39,174,96,0.3)]"
              : "border-[#ccc] bg-white text-[#27ae60] hover:border-[#27ae60] hover:shadow-[0_2px_6px_rgba(39,174,96,0.15)]"
          }`}
          onClick={() => onSectionClick(section.id as ChildSection)}
          data-oid="h.wvcw0"
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}
