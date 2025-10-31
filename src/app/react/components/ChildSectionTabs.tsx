import styles from '../../styles/react.module.css';
import { LearningSection } from '@/types/react';
import { ChildSection } from '../types';

interface ChildSectionTabsProps {
    sections: LearningSection[];
    activeSection: ChildSection | null;
    onSectionClick: (section: ChildSection) => void;
}

export default function ChildSectionTabs({ sections, activeSection, onSectionClick }: ChildSectionTabsProps) {
    return (
        <div className={styles.childTabs}>
            {sections.map(section => (
                <button
                    key={section.id}
                    className={`${styles.childTab} ${activeSection === section.id ? styles.activeChildTab : ''}`}
                    onClick={() => onSectionClick(section.id as ChildSection)}
                >
                    {section.title}
                </button>
            ))}
        </div>
    );
}

