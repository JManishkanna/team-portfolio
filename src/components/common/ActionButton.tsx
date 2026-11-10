import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "lime" | "ink" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Renders the sliding arrow affordance. */
  withArrow?: boolean;
}

interface LinkProps extends BaseProps {
  to: string;
  href?: undefined;
  onClick?: undefined;
  type?: undefined;
  disabled?: undefined;
}

interface ExternalProps extends BaseProps {
  href: string;
  to?: undefined;
  onClick?: undefined;
  type?: undefined;
  disabled?: undefined;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  to?: undefined;
  href?: undefined;
}

type ActionButtonProps = LinkProps | ExternalProps | ButtonProps;

const variantClass: Record<Variant, string> = {
  primary: "",
  lime: "btn--lime",
  ink: "btn--ink",
  ghost: "btn--ghost",
};

export function ActionButton(props: ActionButtonProps) {
  const { children, variant = "primary", className = "", withArrow = true } = props;
  const classes = `btn ${variantClass[variant]} ${className}`;

  const arrow = withArrow ? (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
    />
  ) : null;

  if (props.to) {
    return (
      <Link to={props.to} className={`group/btn ${classes}`}>
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
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
        {external ? (
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
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
    >
      {children}
      {arrow}
    </button>
  );
}
