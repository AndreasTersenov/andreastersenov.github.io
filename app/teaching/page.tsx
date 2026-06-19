import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "Teaching — Andreas Tersenov" };

type Row = { when: string; role: string; where: string; desc?: string };
type Talk = { when: string; title: string; venue: string; kind: string };

const schools: Row[] = [
  { when: "Nov 2025",   role: "Lecturer, Sharjah Winter School for AstroStatistics", where: "SAASST, United Arab Emirates", desc: "Bayesian inference, advanced sampling, simulation-based inference: lectures and hands-on tutorials. About 35 international participants." },
  { when: "June 2025",  role: "Co-organiser and lecturer, Astrostatistics Summer School in Crete", where: "FORTH, Heraklion", desc: "Second edition. MCMC and advanced sampling, simulation-based inference. About 35 participants selected from 150 applicants across 20 countries." },
  { when: "July 2024",  role: "Co-organiser and lecturer, Astrostatistics Summer School in Crete", where: "FORTH, Heraklion", desc: "Inaugural edition. Introduction to Bayesian inference, Bayesian model selection, simulation-based inference." },
];

const courses: Row[] = [
  { when: "Fall 2024",  role: "Assistant lecturer, Introduction to Data Science and Machine Learning", where: "University of Crete, undergraduate", desc: "Core ML lectures, supplementary advanced topics, weekly hands-on coding assignments, final-project mentorship." },
  { when: "Fall 2022, Spring 2022, Spring 2020", role: "Teaching assistant, Undergraduate physics laboratories", where: "University of Crete", desc: "Advanced Physics Lab I, Physics Lab III (Optics), Physics Lab II (Electricity)." },
];

const talks: Talk[] = [
  { when: "Fall 2025",  title: "Impact of mass-mapping and baryonic effects on cosmology inference", venue: "WL-SWG and OU-SHE Meeting, Marseille, France", kind: "Contributed talk" },
  { when: "Summer 2025", title: "Impact of Weak Lensing Mass Mapping Algorithms on Cosmology Inference", venue: "COLOURS Workshop, Saclay, France", kind: "Talk" },
  { when: "Summer 2024", title: "Peak counts for UNIONS cosmology", venue: "UNIONS meeting, Paris, France", kind: "Contributed talk" },
  { when: "Fall 2025",  title: "SBI for robust beyond-two-point cosmology", venue: "MINOAS Workshop, Heraklion, Greece", kind: "Poster" },
  { when: "Fall 2025",  title: "Impact of baryonic feedback on weak-lensing higher-order statistics", venue: "Beyond-Two-Point Statistics Meets Survey Systematics, Kashiwa, Japan", kind: "Poster" },
  { when: "Spring 2024", title: "Impact of mass mapping algorithms on cosmology inference", venue: "COSMO 21 Conference, Chania, Greece", kind: "Poster" },
  { when: "Winter 2023", title: "Mass mapping and cosmology", venue: "Tonale Winter School on Cosmology, Tonale, Italy", kind: "Poster" },
];

function RowSection({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
        {title}
      </h3>
      <Reveal stagger={0.05}>
        {rows.map((r, i) => (
          <div className="cv-row" data-reveal key={i}>
            <span className="when">{r.when}</span>
            <div className="what">
              <p className="role">{r.role}</p>
              <p className="where">{r.where}</p>
              {r.desc && <p className="desc">{r.desc}</p>}
            </div>
          </div>
        ))}
      </Reveal>
    </>
  );
}

export default function TeachingPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader title="Teaching" meta="Schools, courses, talks, posters" />

          <RowSection title="Schools organised and lectured" rows={schools} />
          <RowSection title="University courses" rows={courses} />

          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
            Talks and posters
          </h3>
          <Reveal stagger={0.04}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {talks.map((t, i) => (
                <div className="cv-row" data-reveal key={i}>
                  <span className="when">{t.when}</span>
                  <div className="what">
                    <p className="role" style={{ fontSize: 18, letterSpacing: "-0.2px" }}>{t.title}</p>
                    <p className="where">{t.venue}</p>
                    <p className="desc">
                      <span className="badge" style={{ background: "var(--surface-cream-strong)", fontSize: 11 }}>
                        {t.kind}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
