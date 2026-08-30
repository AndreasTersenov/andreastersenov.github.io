import PageFade from "../../components/PageFade";
import { postHtml } from "./post-html";

export const metadata = {
  title: "What does it take to discover science? — Andreas Tersenov",
  description:
    "Language models are already good at searching within an existing scientific description. The harder thing is deciding when that description itself has to change, and our training record and research objectives may be exactly the wrong ones for it.",
};

const postCss = `
.post-header { max-width: 760px; margin: 0 auto 40px; }
.post-header h1 {
  font-family: var(--font-display); font-weight: 400; letter-spacing: -0.5px;
  font-size: clamp(30px, 4.5vw, 44px); line-height: 1.15; color: var(--ink); margin: 14px 0 10px;
}
.post-body { max-width: 760px; margin: 0 auto; font-size: 17px; line-height: 1.72; color: var(--body); }
.post-body h2 {
  font-family: var(--font-display); font-weight: 400; letter-spacing: -0.3px;
  font-size: 27px; color: var(--ink); margin: 44px 0 14px;
}
.post-body p { margin: 0 0 18px; }
.post-body strong { color: var(--body-strong); }
.post-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
html[data-theme="dark"] .post-body a { color: var(--accent-teal); }
.post-body blockquote {
  margin: 0 0 26px; padding: 14px 18px; border-left: 3px solid var(--accent-teal);
  background: var(--surface-soft); border-radius: 0 10px 10px 0;
  color: var(--body); font-size: 16px; line-height: 1.65;
}
.post-body blockquote p { margin: 0; }
.post-body ol.post-refs { font-size: 15px; line-height: 1.6; padding-left: 22px; color: var(--muted); }
.post-body ol.post-refs li { margin: 0 0 10px; }
.post-body ol.post-refs a { color: inherit; }
html[data-theme="dark"] .post-body ol.post-refs a { color: inherit; }
`;

export default function DiscoverSciencePost() {
  return (
    <PageFade>
      <style dangerouslySetInnerHTML={{ __html: postCss }} />

      <section className="section">
        <div className="container-1200">
          <header className="post-header">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="badge">Essay</span>
              <span className="caption">August 30, 2026 · Andreas Tersenov</span>
            </div>
            <h1>What does it take to discover science?</h1>
          </header>

          <article
            id="post-article"
            className="post-body"
            dangerouslySetInnerHTML={{ __html: postHtml }}
          />
        </div>
      </section>
    </PageFade>
  );
}
