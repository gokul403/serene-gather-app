import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  CalendarClock,
  CalendarDays,
  Images,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Receipt,
  Sparkles,
  User,
  Wallet,
  X,
} from "lucide-react";

import { AuroraBackdrop } from "./AuroraBackdrop";
import { customer, eventDetails } from "@/lib/mock-data";
import { signOut, useSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/event", label: "My Event", icon: Sparkles },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/services", label: "Services", icon: CalendarClock },
  { to: "/payments", label: "Payments", icon: Wallet },
  { to: "/documents", label: "Documents", icon: Receipt },
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/support", label: "Support", icon: LifeBuoy },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const { session, ready } = useSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !session) navigate({ to: "/" });
  }, [ready, session, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!ready || !session) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-ink">
        <AuroraBackdrop />
      </div>
    );
  }

  const navList = (
    <nav className="mt-7 flex flex-col gap-1.5">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
              active
                ? "bg-white/10 font-semibold text-light ring-1 ring-white/15"
                : "font-medium text-mist hover:bg-white/5 hover:text-light",
            )}
          >
            <item.icon className={cn("size-4 shrink-0", active ? "text-cyan" : "text-slate")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarInner = (
    <>
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet font-display text-lg font-extrabold text-ink">
          É
        </div>
        <div>
          <p className="font-display text-base font-bold leading-none tracking-tight">Évora</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">Events Studio</p>
        </div>
      </div>
      {navList}
      <div className="mt-6 rounded-xl border border-white/10 bg-ink/40 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Signed in as</p>
        <p className="mt-1 font-display text-sm font-semibold">{customer.name}</p>
        <p className="text-xs text-mist">{customer.maskedPhone}</p>
        <button
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-xs font-semibold text-mist transition-colors hover:bg-white/5 hover:text-light"
        >
          <LogOut className="size-3.5" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink text-light">
      <AuroraBackdrop />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 lg:flex-row lg:px-8 lg:py-8">
        <aside className="hidden lg:block lg:w-[260px] lg:shrink-0">
          <div className="glass sticky top-8 rounded-2xl p-5">{sidebarInner}</div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="glass grid size-10 shrink-0 place-items-center rounded-xl text-mist lg:hidden"
              >
                <Menu className="size-5" />
              </button>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate">{eyebrow}</p>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-mist backdrop-blur-sm sm:flex">
                <span className="size-1.5 rounded-full bg-cyan" /> Event {eventDetails.status}
              </span>
              <img
                src={customer.avatar}
                alt={customer.name}
                width={512}
                height={512}
                loading="lazy"
                className="size-10 rounded-full object-cover outline-1 -outline-offset-1 outline-white/10"
              />
            </div>
          </header>

          <div className="rise-in">{children}</div>
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />
          <div className="glass rise-in absolute inset-y-0 left-0 w-[280px] max-w-[86vw] overflow-y-auto rounded-r-2xl bg-ink2/80 p-5">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-5 text-mist"
            >
              <X className="size-5" />
            </button>
            {sidebarInner}
          </div>
        </div>
      )}
    </div>
  );
}
