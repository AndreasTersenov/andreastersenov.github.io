import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "Presentations — Andreas Tersenov" };

const SLIDES_BASE = "https://andreastersenov.github.io/talks";

type Talk = { date: string; title: string; event: string; location?: string; slug: string };
type YearGroup = { year: string; talks: Talk[] };

const groups: YearGroup[] = [
  {
    year: "2026",
    talks: [
      { date: "16 Jun 2026", title: "The Non-Gaussian Universe", event: "FORTH", location: "Heraklion", slug: "NonGaussian_Universe_2026" },
      { date: "16 Apr 2026", title: "Reconstructing the Non-Gaussian Universe: Mass Mapping, Higher-Order Statistics, and SBI in Weak Lensing", event: "LAM coffee club", location: "Marseille", slug: "LAM_2026" },
      { date: "17 Mar 2026", title: "Reconstructing the Non-Gaussian Universe: Mass Mapping, Higher-Order Statistics, and SBI in Weak Lensing", event: "ENS scattering club", location: "Paris", slug: "ENS_seminar_2026" },
      { date: "09 Mar 2026", title: "Weak Lensing Mass Mapping, Higher-Order Statistics, and Cosmology Inference", event: "Ciela Institute", location: "Montréal", slug: "JournalClub_Montreal_2026" },
    ],
  },
  {
    year: "2025",
    talks: [
      { date: "02 Dec 2025", title: "Weak Lensing Mass Mapping and Higher-Order Statistics for Precision Cosmology", event: "PhD Day", slug: "PhD_Day_2025" },
      { date: "11 Jun 2025", title: "Impact of Weak Lensing Mass-Mapping Algorithms on Cosmology Inference", event: "COLOURS workshop", location: "Saclay", slug: "COLOURS_Saclay_2025" },
      { date: "28 Mar 2025", title: "Advanced Inference in Weak Lensing: Mass Mapping and Higher-Order Statistics for Precision Cosmology", event: "CCA · Flatiron Institute", slug: "CCA_Predoc_2025" },
      { date: "16 Jan 2025", title: "Impact of Weak Lensing Mass-Mapping Algorithms on Cosmology Inference", event: "TITAN meeting", location: "Saclay", slug: "TITAN_Saclay_2025" },
    ],
  },
  {
    year: "2024",
    talks: [
      { date: "24 Jun 2024", title: "Impact of Mass Mapping for Cosmological Parameter Estimation", event: "UNIONS meeting", location: "Paris", slug: "UNIONS_Paris_2024" },
      { date: "12 Jun 2024", title: "Mass Mapping & Higher-Order Statistics — Project Review", event: "TITAN review", slug: "TITAN_Eval_2024" },
      { date: "06 Jun 2024", title: "Impact of Mass Mapping for Cosmological Parameter Estimation", event: "TITAN meeting", location: "FORTH, Crete", slug: "TITAN_Crete_2024" },
      { date: "26 Apr 2024", title: "Journal club — paper discussion", event: "IA-FORTH journal club", slug: "AstroML_JC_Mar24" },
      { date: "Feb 2024", title: "Mass-Mapping Algorithms and Higher-Order Statistics", event: "TITAN meeting", location: "Saclay", slug: "TITAN_Saclay_2024" },
    ],
  },
];

export default function PresentationsPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader
            title="Presentations"
            meta={
              <a className="pub-link" href={`${SLIDES_BASE}/`} target="_blank" rel="noreferrer">
                andreastersenov.github.io/talks ↗
              </a>
            }
          />

          <p className="lede" style={{ maxWidth: 620, margin: "0 0 8px" }}>
            Invited seminars, workshop and conference talks on weak-lensing mass mapping,
            higher-order statistics, and simulation-based inference. Slides are linked where available.
          </p>

          {groups.map((g) => (
            <div key={g.year}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
                {g.year}
              </h3>
              <Reveal stagger={0.04}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {g.talks.map((t) => (
                    <div className="cv-row" data-reveal key={t.slug}>
                      <span className="when">{t.date}</span>
                      <div className="what">
                        <p className="role" style={{ fontSize: 18, letterSpacing: "-0.2px" }}>{t.title}</p>
                        <p className="where">{t.location ? `${t.event} · ${t.location}` : t.event}</p>
                        <p className="desc" style={{ marginTop: 6 }}>
                          <a className="pub-link" href={`${SLIDES_BASE}/${t.slug}/`} target="_blank" rel="noreferrer">
                            Slides ↗
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </PageFade>
  );
}
