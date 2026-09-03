import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";

import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { GlassPanel } from "@/components/GlassPanel";
import { MOCK_OTP, signIn } from "@/lib/auth";

export const Route = createFileRoute("/otp")({
  head: () => ({
    meta: [
      { title: "Verify OTP — Évora Events Portal" },
      {
        name: "description",
        content: "Enter the 6-digit verification code sent to your mobile number to access your Évora event dashboard.",
      },
      { property: "og:title", content: "Verify OTP — Évora Events Portal" },
      { property: "og:description", content: "Mobile OTP verification for the Évora client portal." },
    ],
  }),
  component: OtpPage,
});

function OtpPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(30);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const pending = window.sessionStorage.getItem("evora.pendingPhone");
    if (!pending) {
      navigate({ to: "/" });
      return;
    }
    setPhone(pending);
  }, [navigate]);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const setDigit = (i: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    setError("");
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Enter all 6 digits of the code.");
      return;
    }
    if (code !== MOCK_OTP) {
      setError(`Incorrect code. For this demo use ${MOCK_OTP}.`);
      return;
    }
    signIn(phone);
    window.sessionStorage.removeItem("evora.pendingPhone");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink text-light">
      <AuroraBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
        <GlassPanel className="rise-in w-full" contentClassName="p-6 sm:p-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-xs font-semibold text-mist transition-colors hover:text-light"
          >
            <ArrowLeft className="size-3.5" /> Change number
          </button>
          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-slate">Verification</p>
          <h1 className="mt-2 font-display text-2xl font-bold">Enter your code</h1>
          <p className="mt-2 text-sm text-mist">
            Sent to +91 {phone.replace(/(\d{5})(\d{5})/, "$1 $2")}. Demo code is{" "}
            <span className="font-semibold text-cyan">{MOCK_OTP}</span>.
          </p>

          <form onSubmit={verify} className="mt-7">
            <div className="flex gap-2 sm:gap-3">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={d}
                  inputMode="numeric"
                  aria-label={`Digit ${i + 1}`}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
                  }}
                  className="h-14 w-full rounded-2xl border border-white/10 bg-ink2/50 text-center font-display text-xl font-bold text-light outline-none focus:border-cyan/60"
                />
              ))}
            </div>
            {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet py-3.5 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Verify &amp; continue <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs text-slate">
            <span className="flex items-center gap-2">
              <KeyRound className="size-3.5" /> Mock OTP, no backend
            </span>
            {seconds > 0 ? (
              <span>Resend in 0:{String(seconds).padStart(2, "0")}</span>
            ) : (
              <button
                onClick={() => setSeconds(30)}
                className="font-semibold text-cyan hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
