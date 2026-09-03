import { useEffect, useState } from "react";

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ target }: { target: string }) {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { value: t ? pad(t.days) : "—", label: "Days", accent: true },
    { value: t ? pad(t.hours) : "—", label: "Hours", accent: false },
    { value: t ? pad(t.minutes) : "—", label: "Minutes", accent: false },
    { value: t ? pad(t.seconds) : "—", label: "Seconds", accent: false },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {cells.map((c) => (
        <div key={c.label}>
          <p
            className={`font-display text-3xl font-bold tabular-nums tracking-tight ${c.accent ? "text-cyan" : ""}`}
          >
            {c.value}
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
