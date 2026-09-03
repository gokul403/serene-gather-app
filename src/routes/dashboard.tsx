import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { Countdown } from "@/components/Countdown";
import { GlassPanel, SectionHeading, StatusPill } from "@/components/GlassPanel";
import {
  customer,
  eventDetails,
  formatINR,
  gallery,
  payments,
  services,
  upcomingActivities,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "Live countdown, venue, event status, payment summary and upcoming activities for The Kapoor Wedding.",
      },
      { property: "og:title", content: "Dashboard — The Kapoor Wedding | Évora Events" },
      {
        property: "og:description",
        content: "Countdown, payment summary and upcoming activities for your event.",
      },
    ],
  }),
  component: DashboardPage,
});

const toneDot: Record<string, string> = {
  cyan: "bg-cyan",
  violet: "bg-violet",
  muted: "bg-white/30",
};

function DashboardPage() {
  const paidPct = Math.round((payments.paid / payments.total) * 100);

  return (
    <AppShell eyebrow="Welcome back" title={`Good evening, ${customer.firstName}`}>
      <section className="relative mt-6">
        <div
          aria-hidden="true"
          className="glass absolute inset-0 -skew-x-6 rounded-3xl"
        />
        <div className="relative grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-cyan to-violet px-3 py-1 text-[11px] font-semibold text-ink">
                {eventDetails.type}
              </span>
              <span className="text-xs text-mist">{eventDetails.dateLabel}</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              {eventDetails.name}
            </h2>
            <p className="mt-3 max-w-md text-sm text-mist">{eventDetails.tagline}</p>
            <div className="mt-6">
              <Countdown target={eventDetails.date} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-ink2/50 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Venue</p>
              <p className="mt-1 font-display text-sm font-semibold">{eventDetails.venue}</p>
              <p className="text-xs text-mist">{eventDetails.venueCity}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink2/50 p-4 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Status</p>
              <p className="mt-1 font-display text-sm font-semibold text-cyan">{eventDetails.status}</p>
              <p className="text-xs text-mist">
                {eventDetails.tasksDone} of {eventDetails.tasksTotal} tasks done
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <GlassPanel className="md:col-span-2">
          <SectionHeading title="Payment Summary" meta={`Event ${eventDetails.dateLabel}`} />
          <div className="mt-5 grid grid-cols-3 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Total</p>
              <p className="mt-1 font-display text-2xl font-bold">{formatINR(payments.total)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Paid</p>
              <p className="mt-1 font-display text-2xl font-bold text-cyan">
                {formatINR(payments.paid)}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate">Pending</p>
              <p className="mt-1 font-display text-2xl font-bold text-violet">
                {formatINR(payments.pending)}
              </p>
            </div>
          </div>
          <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
              style={{ width: `${paidPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-mist">
            {paidPct}% paid · Next due {payments.nextDue}
          </p>
        </GlassPanel>

        <GlassPanel>
          <h3 className="font-display text-lg font-bold">Up Next</h3>
          <ul className="mt-4 space-y-4">
            {upcomingActivities.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span className={`mt-1 size-2 shrink-0 rounded-full ${toneDot[a.tone]}`} />
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-mist">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <SectionHeading
            title="Booked Services"
            meta={
              <Link to="/services" className="text-xs font-semibold text-cyan">
                View all
              </Link>
            }
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.slice(0, 4).map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-white/10 bg-ink2/40 p-4 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <StatusPill status={s.status} />
                </div>
                <p className="mt-1 text-xs text-mist">{s.detail}</p>
                <p className="mt-3 font-display text-base font-bold">{formatINR(s.price)}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeading
            title="Gallery"
            meta={
              <Link to="/gallery" className="text-xs font-semibold text-cyan">
                Open
              </Link>
            }
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {gallery.slice(0, 4).map((g) => (
              <img
                key={g.caption}
                src={g.src}
                alt={g.caption}
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover outline-1 -outline-offset-1 outline-white/10"
              />
            ))}
          </div>
        </GlassPanel>
      </section>
    </AppShell>
  );
}
