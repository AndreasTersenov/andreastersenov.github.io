import PageFade from "../components/PageFade";
import Reveal from "../components/Reveal";

export const metadata = { title: "Now — Andreas Tersenov" };

const focus = [
  { label: "Writing",      body: "Writing up the PhD thesis and preparing for the defense — pulling several years of weak-lensing and simulation-based-inference work into one coherent argument." },
  { label: "Researching",  body: "Simulation-based inference under model misspecification: how baryonic feedback contaminates higher-order weak-lensing statistics, and what scale cuts actually recover." },
  { label: "Teaching",     body: "Preparing lectures for the AstroStat School in Rome (late July) — astrostatistics and machine-learning methods for astronomers." },
  // Personal entries (e.g. Reading / Travelling / Listening to) can be added back here later.
];

export default function NowPage() {
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  return (
    <PageFade>
      <section className="section">
        <div className="container-1200" style={{ maxWidth: 900 }}>
          <div className="hero-kicker" style={{ marginBottom: 20 }}>
            <span className="ep">UPDATED</span>
            <span className="rule" />
            <span>{month.toUpperCase()} {year} &middot; HERAKLION</span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-1.2px",
            margin: "0 0 24px",
            color: "var(--ink)",
          }}>
            What I&rsquo;m doing right now.
          </h1>
          <Reveal stagger={0.05}>
            <div className="now-list">
              {focus.map((f, i) => (
                <div className="cv-row" data-reveal key={i}>
                  <span
                    className="when"
                    style={{ textTransform: "uppercase", letterSpacing: 1.5, color: "var(--cosmic-navy)" }}
                  >
                    {f.label}
                  </span>
                  <div className="what">
                    <p style={{ margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <p style={{ marginTop: 56, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
            Last updated — {month} {year}
          </p>
        </div>
      </section>
    </PageFade>
  );
}
