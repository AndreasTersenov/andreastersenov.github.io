import Link from "next/link";
import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "CV — Andreas Tersenov" };

type Row = { when: string; role: string; where: string; desc?: string };

const education: Row[] = [
  {
    when: "2023 — 2026 (exp.)",
    role: "PhD in Physics",
    where: "University of Crete · FORTH & CEA Paris-Saclay",
    desc: "Project: TITAN EU ERA Chair — Artificial Intelligence in Astrophysics. Topic: weak-lensing mass mapping and higher-order statistics for precision cosmology. Supervisors: J.-L. Starck, M. Kilbinger, V. Pavlidou.",
  },
  {
    when: "2022 — 2023",
    role: "MSc in Advanced Physics (Astrophysics & Space Physics)",
    where: "University of Crete",
    desc: "Thesis: comparison of weak-lensing mass-mapping techniques, applied to UNIONS. Supervisors: J.-L. Starck, V. Pavlidou.",
  },
  {
    when: "2018 — 2022",
    role: "BSc in Physics",
    where: "University of Crete",
    desc: "Thesis on cosmic-ray air-shower simulations with new physics above 50 TeV. Supervisors: V. Pavlidou, E. Kiritsis.",
  },
];

const research: Row[] = [
  {
    when: "2023 — present",
    role: "Lead contributor & WG member · Euclid Collaboration",
    where: "Weak Lensing Science Working Group · HOWLS · OU-LE3",
    desc: "Lead of the Euclid key paper on cosmic-shear higher-order statistics for DR1. Lead of the Mass Mapping & Tomography brick within HOWLS.",
  },
  {
    when: "2023 — present",
    role: "PhD fellow",
    where: "FORTH (Heraklion) · CosmoStat, CEA Paris-Saclay",
    desc: "Data-driven methods for weak lensing — physical forward models + simulation-based inference + deep learning. Member of Euclid and UNIONS.",
  },
  {
    when: "Feb — Jun 2023",
    role: "Research intern",
    where: "CosmoStat Laboratory · CEA Paris-Saclay",
    desc: "Compared convergence map-making algorithms; refined the shear-pipe-peaks inference pipeline on preliminary UNIONS data.",
  },
  {
    when: "2020 — 2023",
    role: "Research assistant",
    where: "Institute of Astrophysics · FORTH",
    desc: "Mixed-composition ultra-high-energy cosmic-ray air showers (CIRCE project) — Monte Carlo simulations of the Galactic–extragalactic transition.",
  },
  {
    when: "2021 — 2022",
    role: "Research assistant",
    where: "Crete Center for Theoretical Physics",
    desc: "Holographic RG flows in Einstein–Maxwell–dilaton gravity duals of deformed S³ QFTs.",
  },
];

const honors: Row[] = [
  {
    when: "Nov 2025",
    role: "2nd place — NeurIPS 2025 Weak Lensing Uncertainty Challenge",
    where: "International AI competition",
    desc: "Team award for uncertainty-aware and OOD-detection methods applied to weak-lensing cosmology.",
  },
  { when: "2023 — 2024", role: "PhD Fellowship", where: "Foundation for Research & Technology – Hellas (FORTH)" },
  { when: "2018 — 2019", role: "“Chrysanthos and Anastasia Karidis” Bequest Scholarship", where: "University of Crete" },
];

const teaching: Row[] = [
  {
    when: "June 2026",
    role: "Lecturer · AstroStat School — New York",
    where: "CUNY Graduate Center, New York",
    desc: "Bayesian inference, advanced sampling, deep learning (lectures + hands-on).",
  },
  {
    when: "Nov 2025",
    role: "Lecturer · Winter School for AstroStatistics",
    where: "SAASST, Sharjah, UAE",
    desc: "Bayesian inference, advanced sampling, simulation-based inference (lectures + hands-on).",
  },
  {
    when: "2024 & 2025",
    role: "Co-organiser & lecturer · Astrostatistics Summer School in Crete",
    where: "FORTH, Heraklion",
    desc: "Two editions. Bayesian inference & model selection (2024); MCMC & advanced sampling (2025); simulation-based inference (both).",
  },
  {
    when: "Fall 2024",
    role: "Assistant lecturer · Introduction to Data Science & Machine Learning",
    where: "University of Crete (undergraduate)",
    desc: "Core ML lectures, hands-on programming assignments, final-project mentoring.",
  },
];

const oss = [
  { name: "wl-stats-torch", role: "Author / maintainer",        desc: "GPU-accelerated PyTorch library for weak-lensing summary statistics (2D & HEALPix)." },
  { name: "bar-impact",     role: "Author / maintainer",        desc: "Tools to analyse the impact of baryons on cosmological weak-lensing contours via implicit-likelihood inference." },
  { name: "weaklensing-uq", role: "Co-author / co-maintainer",  desc: "PnPMass mass-mapping algorithm + distribution-free uncertainty quantification for inverse problems." },
  { name: "cosmostat",      role: "Contributor / maintainer",   desc: "Python/C++ package for cosmostatistics developed at the CosmoStat lab." },
];

function Subsection({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
        {title}
      </h3>
      <Reveal stagger={0.04}>
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

export default function CVPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader
            title="Curriculum vitae"
            meta={
              <a className="btn btn-secondary" href="/cv.pdf" download>
                Download PDF
              </a>
            }
          />

          <Subsection title="Education" rows={education} />
          <Subsection title="Research roles" rows={research} />
          <Subsection title="Honors & awards" rows={honors} />
          <Subsection title="Teaching & schools organised" rows={teaching} />

          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
            Open-source software
          </h3>
          <Reveal stagger={0.06}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {oss.map((o) => (
                <div className="card" data-reveal key={o.name} style={{ padding: 20 }}>
                  <code style={{ color: "var(--primary)", fontSize: 14 }}>{o.name}</code>
                  <p className="caption" style={{ marginTop: 4 }}>{o.role}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--body)", margin: "8px 0 0" }}>
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.3px", margin: "48px 0 8px" }}>
            Skills
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px 32px", fontFamily: "var(--font-body)", fontSize: 14 }}>
            <span className="caption">Languages</span>
            <span>Python · C++ · MATLAB · JavaScript · Mathematica</span>
            <span className="caption">ML / AI</span>
            <span>JAX · PyTorch · Pyro / NumPyro · TensorFlow · DeepInverse · Hugging Face · W&amp;B</span>
            <span className="caption">HPC</span>
            <span>MPI · CUDA · multiprocessing · national & international HPC clusters</span>
            <span className="caption">Tooling</span>
            <span>Git · Docker / Singularity · CI · reproducible pipelines · Python packaging</span>
            <span className="caption">Spoken</span>
            <span>Greek (native) · English (C2) · Russian (B2)</span>
          </div>

          <p style={{ marginTop: 56, fontSize: 13, color: "var(--muted)" }}>
            Looking for a deeper dive?{" "}
            <Link href="/publications" style={{ color: "var(--primary)" }}>
              See the publications list →
            </Link>
          </p>
        </div>
      </section>
    </PageFade>
  );
}
