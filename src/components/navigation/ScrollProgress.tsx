import { motion, useScroll, useSpring } from "framer-motion";

/** Reading-progress bar. Pure transform, so it stays off the layout path. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #4361EE, #06D6A0, #FFD166, #FF6B35, #FF5A7A)",
      }}
    />
  );
}
