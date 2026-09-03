import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Mail, MapPin, Phone, Smartphone } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading } from "@/components/GlassPanel";
import { signOut } from "@/lib/auth";
import { customer, eventDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Évora Events Client Portal" },
      {
        name: "description",
        content: "Your customer details, contact information, booking reference and sign-out for the Évora client portal.",
      },
      { property: "og:title", content: "Profile — Évora Events Client Portal" },
      { property: "og:description", content: "Customer details and account controls." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();

  const rows = [
    { icon: Phone, label: "Primary mobile", value: customer.phone },
    { icon: Smartphone, label: "Alternate mobile", value: customer.altPhone },
    { icon: Mail, label: "Email", value: customer.email },
    { icon: MapPin, label: "Address", value: customer.address },
  ];

  return (
    <AppShell eyebrow="Account" title="Profile">
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar}
              alt={customer.name}
              width={512}
              height={512}
              loading="lazy"
              className="size-16 rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
            />
            <div>
              <h3 className="font-display text-xl font-bold">{customer.name}</h3>
              <p className="text-xs text-mist">Client since {customer.memberSince}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="rounded-2xl border border-white/10 bg-ink2/40 p-4">
                <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate">
                  <r.icon className="size-3.5" /> {r.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">{r.value}</dd>
              </div>
            ))}
          </dl>
        </GlassPanel>

        <GlassPanel>
          <SectionHeading title="Booking" />
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex justify-between gap-3">
              <span className="text-mist">Reference</span>
              <span className="font-semibold">{eventDetails.bookingId}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-mist">Event</span>
              <span className="font-semibold">{eventDetails.name}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-mist">Date</span>
              <span className="font-semibold">{eventDetails.dateLabel}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-mist">Manager</span>
              <span className="font-semibold">{eventDetails.manager.name}</span>
            </p>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm font-semibold text-mist transition-colors hover:bg-white/5 hover:text-light"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </GlassPanel>
      </div>
    </AppShell>
  );
}
