import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  delay: number;
  inView: boolean;
}

export default function SkillBar({
  name,
  percentage,
  delay,
  inView,
}: SkillBarProps) {
  return (
    <div className="skill-item">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
