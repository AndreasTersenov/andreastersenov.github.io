"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import PublicationCard, { type Pub } from "../components/PublicationCard";

type FullPub = Pub & { topic: string };

const all: FullPub[] = [
  {
    title: "Mitigating Baryonic Effects in Weak Lensing with Higher-Order Statistics",
    authors: "A. Tersenov, S. Guerrini, J.-L. Starck, M. Kilbinger",
    venue: "Submitted to Astronomy & Astrophysics",
    year: 2026, tags: ["HOS", "baryons"], topic: "stats", flag: "NEW",
  },
  {
    title: "Euclid preparation: Towards a DR1 application of higher-order weak lensing statistics",
    authors: "Euclid HOWLS Collaboration · S. Vinciguerra, …, A. Tersenov, et al.",
    venue: "A&A 707 (2026): A235 · arXiv:2510.04953",
    year: 2026, tags: ["Euclid", "HOWLS"], topic: "stats",
  },
  {
    title: "A plug-and-play approach with fast uncertainty quantification for weak lensing mass mapping",
    authors: "H. Leterme, A. Tersenov, J. Fadili, J.-L. Starck",
    venue: "Accepted, A&A · arXiv:2603.22006",
    year: 2026, tags: ["mass mapping", "UQ"], topic: "ml", flag: "ACCEPTED",
  },
  {
    title: "Impact of mass mapping algorithms on cosmology inference",
    authors: "A. Tersenov, L. Baumont, M. Kilbinger, J.-L. Starck",
    venue: "A&A 698 (2025): A25 · arXiv:2501.06961",
    year: 2025, tags: ["mass mapping"], topic: "lensing",
    thumb: "https://andreastersenov.github.io/assets/img/publication_preview/mass_maps_light.gif",
  },
  {
    title: "Validating Wavelet ℓ1-Norm Theory Predictions Through Cosmological Parameter Inference",
    authors: "A. Tersenov, V. Tinnaneri Sreekanth, M. Kilbinger, J.-L. Starck",
    venue: "In preparation",
    year: 2026, tags: ["wavelets", "theory"], topic: "stats",
  },
  {
    title:
      "Cosmic-ray air-shower simulations across the ankle: mixed Galactic composition with new physics above 50 TeV",
    authors: "S. Romanopoulos, A. Tersenov, V. Pavlidou",
    venue: "38th International Cosmic Ray Conference (2024), p. 495",
    year: 2024, tags: ["UHECR", "proceedings"], topic: "other",
  },
];

const filters = [
  { id: "all",     label: "All" },
  { id: "lensing", label: "Weak lensing" },
  { id: "stats",   label: "Higher-order statistics" },
  { id: "ml",      label: "ML & uncertainty" },
  { id: "other",   label: "Earlier work" },
] as const;

export default function PublicationsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const filtered = filter === "all" ? all : all.filter((p) => p.topic === filter);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const cards = listRef.current.querySelectorAll(".pub");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 }
      );
    },
    { scope: listRef, dependencies: [filter] }
  );

  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader title="Publications" meta={`${all.length} works · 2024–2026`} />

          <div className="filters" style={{ marginBottom: 32 }}>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((p, i) => (
              <PublicationCard key={`${filter}-${i}`} pub={p} />
            ))}
          </div>
        </div>
      </section>
    </PageFade>
  );
}
