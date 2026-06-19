import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "AstroStat Academy — Andreas Tersenov" };

type School = { year: string; title: string; venue: string; url?: string };

const editions: School[] = [
  {
    year: "July 2026",
    title: "AstroStat School — Rome (7th edition)",
    venue: "dotcampus · Rome, Italy",
    url: "https://astrostat-academy.github.io/website-school-7/",
  },
  {
    year: "June 2026",
    title: "AstroStat School — New York",
    venue: "CUNY Graduate Center · New York, USA",
    url: "https://astrostat-academy.github.io/website-school-8/",
  },
  {
    year: "July 2024",
    title: "Astrostatistics Summer School in Crete — 2nd edition",
    venue: "FORTH · Heraklion, Greece",
    url: "https://astro.physics.uoc.gr/Conferences/Astrostatistics_School_Crete_2025/",
  },
  {
    year: "Sept 2023",
    title: "Astrostatistics Summer School in Crete — inaugural edition",
    venue: "FORTH · Heraklion, Greece",
    url: "https://astro.physics.uoc.gr/Conferences/Astrostatistics_School_Crete_2023/",
  },
];

export default function AcademyPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader
            title="AstroStat Academy"
            meta={
              <a className="pub-link" href="https://astrostat.academy" target="_blank" rel="noreferrer">
                astrostat.academy ↗
              </a>
            }
          />

          <div className="academy-hero">
            <Reveal>
              <div data-reveal>
                <p className="lede" style={{ fontSize: 20, maxWidth: 620, margin: 0 }}>
                  A small academy I co-founded to teach astrostatistics and machine-learning methods to
                  astronomers — Bayesian inference, MCMC, simulation-based inference — through
                  one-week residential schools held in Crete and abroad.
                </p>
                <p style={{ marginTop: 20, color: "var(--body)", maxWidth: 620 }}>
                  Each cohort takes around 35 participants from ~20 countries, selected from a pool of
                  ~150 applicants. Lectures are paired with hands-on tutorials in Python; the goal is
                  to leave with working code, not just notes.
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="https://astrostat.academy" target="_blank" rel="noreferrer">
                    Visit astrostat.academy
                  </a>
                  <a className="btn btn-secondary" href="https://astrostat-academy.github.io/website-school-8/" target="_blank" rel="noreferrer">
                    Latest school
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="card" data-reveal style={{ padding: 24 }}>
                <p className="caption-uppercase" style={{ marginBottom: 12 }}>By the numbers</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                  <li><strong style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>4</strong> &nbsp;schools organised since 2023</li>
                  <li><strong style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>~140</strong> &nbsp;alumni across 20 countries</li>
                  <li><strong style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>2</strong> &nbsp;continents · 1 community</li>
                </ul>
                <p className="caption" style={{ marginTop: 16 }}>
                  Co-founded with colleagues at FORTH, the University of Crete and partner institutions.
                </p>
              </div>
            </Reveal>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "56px 0 16px" }}>
            Past editions
          </h3>
          <Reveal stagger={0.07}>
            <div className="academy-schools">
              {editions.map((s) => (
                <a
                  className="school-card"
                  data-reveal
                  key={s.title}
                  href={s.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", textDecoration: "none", color: "inherit" }}
                >
                  <div className="yr">{s.year}</div>
                  <div className="ttl">{s.title}</div>
                  <p className="loc">{s.venue}</p>
                  <p className="pub-link" style={{ marginTop: 12 }}>Open site ↗</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
