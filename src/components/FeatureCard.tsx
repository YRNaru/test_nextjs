import styles from "./FeatureCard.module.css";
import { FeatureCardProps } from "@/types";

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
} 