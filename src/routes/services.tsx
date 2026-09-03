import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, StatusPill } from "@/components/GlassPanel";
import { formatINR, services } from "@/lib/mock-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "All booked services for your event — catering, photography, floral décor, makeup, sound and transport — with vendor, status and price.",
      },
      { property: "og:title", content: "Services — The Kapoor Wedding" },
      { property: "og:description", content: "Booked services with vendor, status and pricing." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const total = services.reduce((sum, s) => sum + s.price, 0);

  return (
    <AppShell eyebrow="Booked with Évora" title="Services">
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {services.map((s) => (
          <GlassPanel key={s.name} className="transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold">{s.name}</h3>
                <p className="mt-0.5 text-xs text-mist">{s.vendor}</p>
              </div>
              <StatusPill status={s.status} />
            </div>
            <p className="mt-4 text-sm text-mist">{s.detail}</p>
            <p className="mt-4 font-display text-xl font-bold">{formatINR(s.price)}</p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Services subtotal</p>
            <p className="mt-1 font-display text-2xl font-bold">{formatINR(total)}</p>
          </div>
          <p className="text-xs text-mist">{services.length} services across 3 event days</p>
        </div>
      </GlassPanel>
    </AppShell>
  );
}
