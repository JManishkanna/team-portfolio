import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}

/** Standard entrance: opacity + translate only, fires once per element. */
export function Reveal({ children, delay = 0, y = 26, as = "div", className }: RevealProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.68, 0.32, 1] }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

/** Parent container for StaggerText / staggered children lists. */
export function StaggerGroup({ children, className, stagger = 0.08 }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger }}
      variants={{ hidden: {}, shown: {} }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0.32, 1] as const } },
};
