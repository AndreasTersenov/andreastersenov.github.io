import Link from "next/link";
import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "Blog — Andreas Tersenov" };

type Post = { title: string; excerpt: string; date: string; tag: string; href?: string };

const posts: Post[] = [
  {
    title: "Sampling is sampling: a cosmologist audits LLM test-time compute",
    excerpt:
      "The benchmark-winning way of making an LLM think harder samples the wrong distribution and silently destroys its own confidence signal. With an interactive replay of real runs, a seventy-year-old fix, and a dictionary between cosmology and test-time compute.",
    date: "July 2, 2026",
    tag: "Research",
    href: "/blog/sampling-is-sampling/",
  },
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
                    {p.href ? (
                      <Link className="pub-link" href={p.href}>
                        Read
                      </Link>
                    ) : (
                      <span className="pub-link">Read</span>
                    )}
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
