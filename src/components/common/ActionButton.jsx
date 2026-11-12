
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const variantClass = {
  primary: "",
  lime: "btn--lime",
  ink: "btn--ink",
  ghost: "btn--ghost",
};

export function ActionButton(props) {
  const {
    children,
    variant = "primary",
    className = "",
    withArrow = true,
    style,
  } = props;

  const classes = `btn ${variantClass[variant]} ${className}`;

  const arrow = withArrow ? (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
    />
  ) : null;

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`group/btn ${classes}`}
        style={style}
      >
        {children}
        {arrow}
      </Link>
    );
  }

  if (props.href) {
    const external = props.href.startsWith("http");

    return (
      <a
        href={props.href}
        className={`group/btn ${classes}`}
        style={style}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
        {external ? (
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
          />
        ) : (
          arrow
        )}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`group/btn ${classes}`}
      style={style}
    >
      {children}
      {arrow}
    </button>
  );
}
