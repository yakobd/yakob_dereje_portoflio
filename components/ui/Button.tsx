import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary:
    "border border-border-strong text-foreground hover:border-foreground",
  accent: "bg-accent-strong text-background hover:brightness-95",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base md:text-lg",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps>;

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();
}

export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, ...rest } = props;
    return (
      <Link className={buttonClasses(variant, size, className)} {...rest} />
    );
  }

  const { variant, size, className, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...rest}
    />
  );
}
