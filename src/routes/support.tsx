import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading } from "@/components/GlassPanel";
import { eventDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Contact Your Event Manager | Évora Events" },
      {
        name: "description",
        content:
          "Reach your dedicated Évora event manager by phone or email, or send a support request about your event.",
      },
      { property: "og:title", content: "Support — Contact Your Event Manager" },
      { property: "og:description", content: "Contact your event manager or raise a support request." },
    ],
  }),
  component: SupportPage,
});

const topics = ["Schedule change", "Payment question", "Service update", "Guest logistics", "Other"];

function SupportPage() {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AppShell eyebrow="We're here" title="Support">
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <GlassPanel className="lg:col-span-2">
          <SectionHeading title="Send a request" meta="Replies within 4 hours" />
          {sent ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-white/10 bg-ink2/40 p-8 text-center">
              <CheckCircle2 className="size-8 text-cyan" />
              <p className="mt-4 font-display text-lg font-bold">Request received</p>
              <p className="mt-1 max-w-sm text-sm text-mist">
                {eventDetails.manager.name} will get back to you on {eventDetails.manager.phone}. This
                is a demo form, nothing was sent.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setMessage("");
                }}
                className="mt-5 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-mist hover:bg-white/5 hover:text-light"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim().length < 5) return;
                setSent(true);
              }}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="text-[11px] uppercase tracking-[0.18em] text-slate">Topic</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        topic === t
                          ? "border-cyan/50 bg-cyan/15 text-cyan"
                          : "border-white/10 text-mist hover:bg-white/5"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="msg" className="text-[11px] uppercase tracking-[0.18em] text-slate">
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with…"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-ink2/50 p-4 text-sm text-light outline-none placeholder:text-slate focus:border-cyan/50"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet py-3.5 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageSquare className="size-4" /> Send request
              </button>
            </form>
          )}
        </GlassPanel>

        <GlassPanel>
          <SectionHeading title="Your manager" />
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
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate">On-site desk</p>
            <p className="mt-1.5 text-sm text-mist">
              A coordination desk operates at {eventDetails.venue} from 8:00 AM on all three event
              days.
            </p>
          </div>
        </GlassPanel>
      </div>
    </AppShell>
  );
}
