import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Hash, Mail, MapPin, Phone, Users } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading } from "@/components/GlassPanel";
import { eventDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/event")({
  head: () => ({
    meta: [
      { title: "My Event — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "Full event details for The Kapoor Wedding: venue address, date and time, guest count and your dedicated event manager.",
      },
      { property: "og:title", content: "My Event — The Kapoor Wedding" },
      { property: "og:description", content: "Venue, date, guest count and event manager contact." },
    ],
  }),
  component: EventPage,
});

const facts = [
  { icon: Hash, label: "Booking ID", value: eventDetails.bookingId },
  { icon: CalendarDays, label: "Date", value: eventDetails.longDate },
  { icon: Clock, label: "Main ceremony", value: eventDetails.time },
  { icon: Users, label: "Guest count", value: `${eventDetails.guestCount} invited · ${eventDetails.confirmedGuests} confirmed` },
];

function EventPage() {
  return (
    <AppShell eyebrow="Event file" title="My Event">
      <section className="mt-6 grid gap-5 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <SectionHeading title={eventDetails.name} meta={eventDetails.type} />
          <p className="mt-2 text-sm text-mist">{eventDetails.tagline}</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-ink2/40 p-4">
                <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate">
                  <f.icon className="size-3.5" /> {f.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-2xl border border-white/10 bg-ink2/40 p-4">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate">
              <MapPin className="size-3.5" /> Venue
            </p>
            <p className="mt-1.5 font-display text-base font-semibold">{eventDetails.venue}</p>
            <p className="mt-1 text-sm text-mist">{eventDetails.venueAddress}</p>
            <p className="mt-2 text-xs text-mist">{eventDetails.venueNote}</p>
          </div>
        </GlassPanel>

        <GlassPanel>
          <SectionHeading title="Event Manager" />
          <div className="mt-4 rounded-2xl border border-white/10 bg-ink2/40 p-4">
            <p className="font-display text-base font-semibold">{eventDetails.manager.name}</p>
            <p className="text-xs text-mist">{eventDetails.manager.role}</p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={`tel:${eventDetails.manager.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-mist transition-colors hover:text-cyan"
              >
                <Phone className="size-3.5" /> {eventDetails.manager.phone}
              </a>
              <a
                href={`mailto:${eventDetails.manager.email}`}
                className="flex items-center gap-2 text-mist transition-colors hover:text-cyan"
              >
                <Mail className="size-3.5" /> {eventDetails.manager.email}
              </a>
            </div>
            <p className="mt-4 text-xs text-slate">{eventDetails.manager.hours}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-ink2/40 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Planning progress</p>
            <p className="mt-1.5 font-display text-2xl font-bold text-cyan">
              {eventDetails.tasksDone}/{eventDetails.tasksTotal}
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                style={{ width: `${(eventDetails.tasksDone / eventDetails.tasksTotal) * 100}%` }}
              />
            </div>
          </div>
        </GlassPanel>
      </section>
    </AppShell>
  );
}
