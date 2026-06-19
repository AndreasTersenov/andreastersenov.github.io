import Hero from "./components/Hero";
import AffiliationsStrip from "./components/AffiliationsStrip";
import NewsStrip from "./components/NewsStrip";
import SectionHeader from "./components/SectionHeader";
import PublicationCard, { type Pub } from "./components/PublicationCard";
import ContactCTA from "./components/ContactCTA";
import Reveal from "./components/Reveal";
import Link from "next/link";

const selected: Pub[] = [
  {
    title: "Impact of mass mapping algorithms on cosmology inference",
    authors: "A. Tersenov, L. Baumont, M. Kilbinger, J.-L. Starck",
    venue: "A&A 698 (2025): A25 · arXiv:2501.06961",
    year: 2025,
    tags: ["mass mapping", "inference"],
    thumb: "https://andreastersenov.github.io/assets/img/publication_preview/mass_maps_light.gif",
    flag: "PUBLISHED",
  },
  {
    title: "Mitigating Baryonic Effects in Weak Lensing with Higher-Order Statistics",
    authors: "A. Tersenov, S. Guerrini, J.-L. Starck, M. Kilbinger",
    venue: "Submitted to Astronomy & Astrophysics",
    year: 2026,
    tags: ["HOS", "baryons"],
    flag: "NEW",
  },
  {
    title: "Euclid preparation: Towards a DR1 application of higher-order weak lensing statistics",
    authors: "Euclid HOWLS Collaboration · A. Tersenov et al.",
    venue: "A&A 707 (2026): A235 · arXiv:2510.04953",
    year: 2026,
    tags: ["Euclid", "HOWLS"],
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <AffiliationsStrip />
      <NewsStrip />

      <section className="section section-soft">
        <div className="container-1200">
          <SectionHeader
            chapter="III"
            title="Selected publications"
            meta={<Link href="/publications" style={{ color: "var(--primary)" }}>View all →</Link>}
          />
          <Reveal stagger={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {selected.map((p, i) => (
                <PublicationCard key={i} pub={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
