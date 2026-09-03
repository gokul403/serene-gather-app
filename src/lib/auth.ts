import { useEffect, useState } from "react";

const KEY = "evora.session";

export type Session = { phone: string; loggedInAt: string };

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(phone: string) {
  window.localStorage.setItem(KEY, JSON.stringify({ phone, loggedInAt: new Date().toISOString() }));
  window.dispatchEvent(new Event("evora-session"));
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("evora-session"));
}

/** Mock OTP — no backend. Any 6-digit code is accepted, this one is pre-filled. */
export const MOCK_OTP = "123456";

export function usePendingPhone() {
  const [phone, setPhone] = useState<string | null>(null);
  useEffect(() => {
    setPhone(window.sessionStorage.getItem("evora.pendingPhone"));
  }, []);
  return phone;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    setReady(true);
    window.addEventListener("evora-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("evora-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
