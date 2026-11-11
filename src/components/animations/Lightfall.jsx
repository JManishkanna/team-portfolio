import { useMemo } from "react";
import "./Lightfall.css";

const defaultColors = ["#ecfdf5", "#6ee7b7", "#22d3ee"];

/**
 * Lightweight Lightfall background effect inspired by the attached React Bits
 * component. It stays decorative, pointer-safe, and respects reduced motion.
 */
export default function Lightfall({
    colors = defaultColors,
    backgroundColor = "#0f9f8a",
    speed = 0.4,
    streakCount = 12,
    streakWidth = 1,
    opacity = 0.7,
    mouseInteraction = true,
    className = "",
    style,
}) {
    const streaks = useMemo(() => Array.from({ length: Math.max(1, Math.min(24, streakCount)) }), [streakCount]);
    const palette = Array.isArray(colors) && colors.length ? colors : defaultColors;

    return <div
        className={`lightfall-container ${className}`}
        style={{ "--lightfall-bg": backgroundColor, "--lightfall-duration": `${Math.max(1, 5 / Math.max(0.05, speed))}s`, "--lightfall-opacity": opacity, "--lightfall-width": `${Math.max(0.5, streakWidth)}px`, ...style }}
        data-mouse-interaction={mouseInteraction}
        aria-hidden="true"
    >
        <div className="lightfall-glow" />
        <div className="lightfall-streaks">
            {streaks.map((_, index) => <span
                className="lightfall-streak"
                key={index}
                style={{ "--lightfall-index": index, "--lightfall-color": palette[index % palette.length] }}
            />)}
        </div>
    </div>;
}
