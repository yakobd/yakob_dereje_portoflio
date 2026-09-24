type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

export default function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`.trim()}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-balance text-3xl font-normal tracking-tight md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
    </div>
  );
}
