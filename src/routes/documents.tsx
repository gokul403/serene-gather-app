import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading } from "@/components/GlassPanel";
import { customer, documents, eventDetails } from "@/lib/mock-data";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Invoices & Agreements | Évora Events" },
      {
        name: "description",
        content:
          "View and download invoices, agreements and receipts related to your Évora event booking.",
      },
      { property: "og:title", content: "Documents — Invoices & Agreements" },
      { property: "og:description", content: "Invoices, agreements and receipts for your event." },
    ],
  }),
  component: DocumentsPage,
});

type Doc = (typeof documents)[number];

function DocumentsPage() {
  const [preview, setPreview] = useState<Doc | null>(null);

  return (
    <AppShell eyebrow="Paperwork" title="Documents">
      <GlassPanel className="mt-6">
        <SectionHeading title="All files" meta={`${documents.length} documents`} />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {documents.map((d) => (
            <div
              key={d.ref}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink2/40 p-4 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-cyan">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{d.name}</p>
                <p className="mt-0.5 text-xs text-mist">
                  {d.type} · {d.date} · {d.size}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setPreview(d)}
                  aria-label={`View ${d.name}`}
                  className="grid size-9 place-items-center rounded-xl border border-white/10 text-mist transition-colors hover:bg-white/5 hover:text-light"
                >
                  <Eye className="size-4" />
                </button>
                <button
                  onClick={() => setPreview(d)}
                  aria-label={`Download ${d.name}`}
                  className="grid size-9 place-items-center rounded-xl border border-white/10 text-mist transition-colors hover:bg-white/5 hover:text-light"
                >
                  <Download className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center p-5">
          <button
            aria-label="Close preview"
            onClick={() => setPreview(null)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <div className="glass rise-in relative w-full max-w-lg rounded-3xl bg-ink2/70 p-6">
            <button
              onClick={() => setPreview(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 text-mist hover:text-light"
            >
              <X className="size-5" />
            </button>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{preview.type}</p>
            <h2 className="mt-2 font-display text-xl font-bold">{preview.name}</h2>
            <div className="mt-5 space-y-2 rounded-2xl border border-white/10 bg-ink/50 p-5 text-sm text-mist">
              <p className="flex justify-between">
                <span>Reference</span>
                <span className="font-semibold text-light">{preview.ref}</span>
              </p>
              <p className="flex justify-between">
                <span>Issued to</span>
                <span className="font-semibold text-light">{customer.name}</span>
              </p>
              <p className="flex justify-between">
                <span>Event</span>
                <span className="font-semibold text-light">{eventDetails.name}</span>
              </p>
              <p className="flex justify-between">
                <span>Dated</span>
                <span className="font-semibold text-light">{preview.date}</span>
              </p>
            </div>
            <p className="mt-4 text-xs text-slate">
              Demo preview — documents are sample data and not downloadable in this portal.
            </p>
          </div>
        </div>
      )}
    </AppShell>
  );
}
