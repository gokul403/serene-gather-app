import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading, StatusPill } from "@/components/GlassPanel";
import { formatINR, payments } from "@/lib/mock-data";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "Total, paid and pending amounts with the full payment history and due dates for your Évora event booking.",
      },
      { property: "og:title", content: "Payments — The Kapoor Wedding" },
      { property: "og:description", content: "Payment summary and full transaction history." },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const paidPct = Math.round((payments.paid / payments.total) * 100);

  return (
    <AppShell eyebrow="Billing" title="Payments">
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Total</p>
          <p className="mt-1 font-display text-3xl font-bold">{formatINR(payments.total)}</p>
          <p className="mt-2 text-xs text-mist">All services & venue</p>
        </GlassPanel>
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Paid</p>
          <p className="mt-1 font-display text-3xl font-bold text-cyan">{formatINR(payments.paid)}</p>
          <p className="mt-2 text-xs text-mist">{paidPct}% of total</p>
        </GlassPanel>
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Pending</p>
          <p className="mt-1 font-display text-3xl font-bold text-violet">
            {formatINR(payments.pending)}
          </p>
          <p className="mt-2 text-xs text-mist">Due {payments.nextDue}</p>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-5">
        <SectionHeading title="Progress" meta={`Next due ${payments.nextDue}`} />
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
            style={{ width: `${paidPct}%` }}
          />
        </div>
      </GlassPanel>

      <GlassPanel className="mt-5">
        <SectionHeading title="Payment History" meta={`${payments.history.length} entries`} />
        <div className="mt-4 space-y-3">
          {payments.history.map((h) => (
            <div
              key={h.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink2/40 p-4"
            >
              <div>
                <p className="text-sm font-semibold">{h.label}</p>
                <p className="mt-0.5 text-xs text-mist">
                  {h.id} · {h.date} · {h.method}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-display text-base font-bold">{formatINR(h.amount)}</p>
                <StatusPill status={h.status} />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </AppShell>
  );
}
