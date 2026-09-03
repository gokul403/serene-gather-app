import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";

import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { GlassPanel } from "@/components/GlassPanel";
import { useSession } from "@/lib/auth";
import { customer, eventDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Évora Events — Client Sign In" },
      {
        name: "description",
        content:
          "Sign in with your mobile number to track your wedding event schedule, services, payments and documents in the Évora client portal.",
      },
      { property: "og:title", content: "Évora Events — Client Sign In" },
      {
        property: "og:description",
        content: "Mobile OTP sign-in for the Évora Events client portal.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [phone, setPhone] = useState("98765 43420");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && session) navigate({ to: "/dashboard" });
  }, [ready, session, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    window.sessionStorage.setItem("evora.pendingPhone", digits);
    navigate({ to: "/otp" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink text-light">
      <AuroraBackdrop />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-10 px-5 py-10 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="rise-in">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet font-display text-lg font-extrabold text-ink">
              É
            </div>
            <div>
              <p className="font-display text-base font-bold leading-none">Évora</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">Events Studio</p>
            </div>
          </div>
          <h1 className="mt-8 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            Your celebration,
            <br />
            in one calm place.
          </h1>
          <p className="mt-4 max-w-md text-sm text-mist">
            {eventDetails.tagline}. Track the timeline, services, payments and documents for{" "}
            {eventDetails.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="font-display text-2xl font-bold text-cyan">{eventDetails.guestCount}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Guests</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">3</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Days of events</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">6</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Booked services</p>
            </div>
          </div>
        </div>

        <GlassPanel className="rise-in" contentClassName="p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate">Client sign in</p>
          <h2 className="mt-2 font-display text-2xl font-bold">Mobile number</h2>
          <p className="mt-2 text-sm text-mist">
            We&apos;ll send a 6-digit verification code. Demo number: {customer.maskedPhone}
          </p>

          <form onSubmit={submit} className="mt-6">
            <label htmlFor="phone" className="text-[11px] uppercase tracking-[0.18em] text-slate">
              Registered mobile
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink2/50 px-4 py-3 focus-within:border-cyan/50">
              <Phone className="size-4 text-slate" />
              <span className="text-sm font-semibold text-mist">+91</span>
              <input
                id="phone"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                placeholder="98765 43210"
                className="w-full bg-transparent text-base font-semibold tracking-wide text-light outline-none placeholder:text-slate"
              />
            </div>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet py-3.5 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send OTP <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-5 flex items-center gap-2 text-xs text-slate">
            <ShieldCheck className="size-3.5" /> Demo portal · mock OTP, no data leaves your device
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
