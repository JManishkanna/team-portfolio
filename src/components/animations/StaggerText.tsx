import { motion } from "framer-motion";
import type { ElementType } from "react";

interface StaggerTextProps {
  words: readonly string[];
  as?: ElementType;
  className?: string;
  accentWords?: readonly string[];
  delay?: number;
  /** Highlighted words get the accent treatment instead of the base colour. */
  accentClassName?: string;
}

/**
 * Word-by-word headline entrance. Words are laid out as inline-blocks so the
 * container keeps normal wrapping and the text stays selectable.
 */
export function StaggerText({
  words,
  as: Tag = "h1",
  className = "",
  accentWords = [],
  delay = 0,
  accentClassName = "",
}: StaggerTextProps) {
  const MotionTag = motion[Tag as "h1"];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="shown"
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
      variants={{ hidden: {}, shown: {} }}
    >
      {words.map((word, index) => {
        const isAccent = accentWords.includes(word);
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
            <motion.span
              className={`inline-block ${isAccent ? accentClassName : ""}`}
              variants={{
                hidden: { y: "108%", opacity: 0 },
                shown: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.62, ease: [0.22, 0.68, 0.32, 1] as const },
                },
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? <span className="inline-block"> </span> : null}
          </span>
        );
      })}
    </MotionTag>
  );
}
