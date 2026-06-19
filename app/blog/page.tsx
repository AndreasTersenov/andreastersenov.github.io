import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "Blog — Andreas Tersenov" };

const posts = [
  {
    title: "Why I think simulation-based inference is the right tool for next-generation cosmology",
    excerpt:
      "A short essay on why we should stop pretending we have analytic likelihoods, and what we gain when we let neural density estimators do the work.",
    date: "Coming soon",
    tag: "Essay",
  },
  {
    title: "From Kaiser-Squires to plug-and-play: a tour of mass-mapping algorithms",
    excerpt:
      "What changes when you swap a hand-tuned regulariser for a learned denoising prior, and why uncertainty quantification stops being optional.",
    date: "Coming soon",
    tag: "Method",
  },
  {
    title: "Notes from the Sharjah Winter School",
    excerpt:
      "Teaching SBI to 35 astronomers in five days. What worked, what didn't, and the questions that kept coming back.",
    date: "Coming soon",
    tag: "Notes",
  },
];

export default function BlogPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader title="Blog" meta="Occasional essays, methods, and school write-ups" />

          <Reveal stagger={0.08}>
            <div className="blog-list">
              {posts.map((p, i) => (
                <article className="blog-row" data-reveal key={i}>
                  <div className="blog-meta">
                    <span className="badge">{p.tag}</span>
                    <span className="caption" style={{ marginTop: 8 }}>
                      {p.date}
                    </span>
                  </div>
                  <div>
                    <h3 className="blog-title">{p.title}</h3>
                    <p className="blog-excerpt">{p.excerpt}</p>
                    <span className="pub-link">Read</span>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <div style={{ marginTop: 64, padding: 24, background: "var(--surface-soft)", borderRadius: 12, textAlign: "center" }}>
            <p className="caption-uppercase" style={{ marginBottom: 8 }}>Newsletter</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.3px", margin: "0 0 16px", color: "var(--ink)" }}>
              An occasional dispatch from the lab.
            </p>
            <form
              action="#"
              method="post"
              style={{ display: "inline-flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
            >
              <input className="input" placeholder="you@somewhere.edu" style={{ width: 280 }} />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </PageFade>
  );
}
