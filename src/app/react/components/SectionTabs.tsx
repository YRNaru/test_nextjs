import styles from '../../styles/react.module.css';
import { LearningSection } from '@/types/react';
import { ParentSection } from '../types';

interface SectionTabsProps {
    sections: LearningSection[];
    activeSection: ParentSection;
    onSectionClick: (section: ParentSection) => void;
}

export default function SectionTabs({ sections, activeSection, onSectionClick }: SectionTabsProps) {
    return (
        <div className={styles.sectionTabs}>
            {sections.map(section => (
                <button
                    key={section.id}
                    className={`${styles.tab} ${activeSection === section.id ? styles.activeTab : ''}`}
                    onClick={() => onSectionClick(section.id as ParentSection)}
                >
                    {section.title}
                </button>
            ))}
        </div>
    );
}

