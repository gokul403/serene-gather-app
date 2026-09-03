import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Signature surface of the design system: a skewed frosted-glass slab behind
 * upright content.
 */
export function GlassPanel({
  children,
  className,
  contentClassName,
  skew = true,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  skew?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn("glass absolute inset-0 rounded-3xl", skew && "-skew-x-6")}
      />
      <div className={cn("relative rounded-3xl p-6", contentClassName)}>{children}</div>
    </div>
  );
}

export function SectionHeading({
  title,
  meta,
  className,
}: {
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {meta ? <span className="text-xs text-mist">{meta}</span> : null}
    </div>
  );
}

const toneMap: Record<string, string> = {
  Confirmed: "bg-cyan/15 text-cyan",
  Completed: "bg-cyan/15 text-cyan",
  "In Progress": "bg-violet/15 text-violet",
  Scheduled: "bg-white/10 text-mist",
  Pending: "bg-white/10 text-mist",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
        toneMap[status] ?? "bg-white/10 text-mist",
        className,
      )}
    >
      {status}
    </span>
  );
}
