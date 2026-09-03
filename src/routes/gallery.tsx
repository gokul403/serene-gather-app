import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { GlassPanel, SectionHeading } from "@/components/GlassPanel";
import { gallery } from "@/lib/mock-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Kapoor Wedding | Évora Events" },
      {
        name: "description",
        content:
          "Photo gallery from your event planning and functions — décor, venue, ceremony, catering and production shots.",
      },
      { property: "og:title", content: "Gallery — The Kapoor Wedding" },
      { property: "og:description", content: "Event photo gallery with full-screen viewer." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft") setIndex((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const active = index === null ? null : gallery[index];

  return (
    <AppShell eyebrow="Moments" title="Gallery">
      <GlassPanel className="mt-6">
        <SectionHeading title="Event album" meta={`${gallery.length} photos`} />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <button
              key={g.caption}
              onClick={() => setIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl outline-1 -outline-offset-1 outline-white/10"
            >
              <img
                src={g.src}
                alt={g.caption}
                width={1024}
                height={1024}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 text-left">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-cyan">{g.tag}</span>
                <span className="mt-0.5 block text-xs font-semibold text-light">{g.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </GlassPanel>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <button
            aria-label="Close gallery"
            onClick={() => setIndex(null)}
            className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-3xl">
            <img
              src={active.src}
              alt={active.caption}
              width={1024}
              height={1024}
              className="mx-auto max-h-[72vh] w-auto rounded-3xl object-contain outline-1 -outline-offset-1 outline-white/10"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                onClick={() => setIndex((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length)}
                aria-label="Previous photo"
                className="glass grid size-10 place-items-center rounded-xl text-mist hover:text-light"
              >
                <ChevronLeft className="size-5" />
              </button>
              <p className="text-center text-sm text-mist">{active.caption}</p>
              <button
                onClick={() => setIndex((i) => ((i ?? 0) + 1) % gallery.length)}
                aria-label="Next photo"
                className="glass grid size-10 place-items-center rounded-xl text-mist hover:text-light"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <button
              onClick={() => setIndex(null)}
              aria-label="Close gallery"
              className="glass absolute -top-2 right-0 grid size-10 place-items-center rounded-xl text-mist hover:text-light sm:-right-2"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
