import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, StatusPill } from "@/components/GlassPanel";
import { schedule } from "@/lib/mock-data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "Day-by-day timeline of every function: mehndi, haldi, sangeet, baraat, pheras, reception and vidaai with times and locations.",
      },
      { property: "og:title", content: "Schedule — The Kapoor Wedding" },
      { property: "og:description", content: "Full event timeline with all functions and activities." },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <AppShell eyebrow="Timeline" title="Schedule">
      <div className="mt-6 space-y-5">
        {schedule.map((day) => (
          <GlassPanel key={day.day}>
            <h3 className="font-display text-lg font-bold">{day.day}</h3>
            <ol className="mt-5 space-y-0">
              {day.items.map((item, i) => (
                <li key={item.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < day.items.length - 1 && (
                    <span className="absolute left-[5px] top-4 h-full w-px bg-white/10" />
                  )}
                  <span className="relative mt-1.5 size-2.5 shrink-0 rounded-full bg-gradient-to-br from-cyan to-violet" />
                  <div className="flex flex-1 flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-xs text-mist">
                        {item.time} · {item.place}
                      </p>
                    </div>
                    <StatusPill status={item.status} />
                  </div>
                </li>
              ))}
            </ol>
          </GlassPanel>
        ))}
      </div>
    </AppShell>
  );
}
