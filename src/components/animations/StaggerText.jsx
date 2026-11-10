import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
/**
 * Word-by-word headline entrance. Words are laid out as inline-blocks so the
 * container keeps normal wrapping and the text stays selectable.
 */
export function StaggerText({ words, as: Tag = "h1", className = "", accentWords = [], delay = 0, accentClassName = "", }) {
    const MotionTag = motion[Tag];
    return (_jsx(MotionTag, { className: className, initial: "hidden", animate: "shown", transition: { staggerChildren: 0.09, delayChildren: delay }, variants: { hidden: {}, shown: {} }, children: words.map((word, index) => {
            const isAccent = accentWords.includes(word);
            return (_jsxs("span", { className: "inline-block overflow-hidden pb-[0.06em] align-bottom", children: [_jsx(motion.span, { className: `inline-block ${isAccent ? accentClassName : ""}`, variants: {
                            hidden: { y: "108%", opacity: 0 },
                            shown: {
                                y: "0%",
                                opacity: 1,
                                transition: { duration: 0.62, ease: [0.22, 0.68, 0.32, 1] },
                            },
                        }, children: word }), index < words.length - 1 ? _jsx("span", { className: "inline-block", children: " " }) : null] }, `${word}-${index}`));
        }) }));
}
