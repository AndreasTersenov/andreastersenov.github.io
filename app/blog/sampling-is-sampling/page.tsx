import PageFade from "../../components/PageFade";
import { postHtml } from "./post-html";

export const metadata = {
  title: "Sampling is sampling — Andreas Tersenov",
  description:
    "An outsider's audit of LLM test-time compute: the benchmark-winning particle filter samples the wrong distribution, the damage to its confidence signal is irreversible, and a 25% insurance stratum prevents it.",
};

const KATEX = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist";

const postCss = `
.post-header { max-width: 760px; margin: 0 auto 40px; }
.post-header h1 {
  font-family: var(--font-display); font-weight: 400; letter-spacing: -0.5px;
  font-size: clamp(30px, 4.5vw, 44px); line-height: 1.15; color: var(--ink); margin: 14px 0 10px;
}
.post-body blockquote {
  margin: 0 0 26px; padding: 14px 18px; border-left: 3px solid var(--accent-teal);
  background: var(--surface-soft); border-radius: 0 10px 10px 0;
  color: var(--body); font-size: 16px; line-height: 1.65;
}
.post-body blockquote p { margin: 0; }
.post-body { max-width: 760px; margin: 0 auto; font-size: 17px; line-height: 1.72; color: var(--body); }
.post-body h2 {
  font-family: var(--font-display); font-weight: 400; letter-spacing: -0.3px;
  font-size: 27px; color: var(--ink); margin: 44px 0 14px;
}
.post-body p { margin: 0 0 18px; }
.post-body strong { color: var(--body-strong); }
.post-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
html[data-theme="dark"] .post-body a { color: var(--accent-teal); }
.post-body img {
  display: block; margin: 22px auto; max-width: 92%; max-height: 440px; width: auto; height: auto;
  border: 1px solid var(--hairline); border-radius: 10px; background: #fff;
}
.post-body table {
  border-collapse: collapse; font-size: 14.5px; margin: 20px auto; display: block;
  overflow-x: auto; max-width: 100%; width: fit-content;
}
.post-body th, .post-body td { border: 1px solid var(--hairline); padding: 6px 12px; }
.post-body code {
  font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 14px;
  background: var(--surface-soft); padding: 1px 5px; border-radius: 4px;
}
.post-body .katex-display { overflow-x: auto; overflow-y: hidden; padding: 4px 0; }
.post-body .katex { font-size: 1.06em; }
.viz-embed { margin: 26px 0; }
.viz-embed iframe {
  width: 100%; height: 1080px; border: 1px solid var(--hairline); border-radius: 12px;
  background: #fdfdfc;
}
.viz-note { font-size: 14px; color: var(--muted); margin-top: 8px; }
@media (max-width: 700px) { .viz-embed iframe { height: 900px; } }
`;

const katexInit = `
window.addEventListener("load", function () {
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById("post-article"), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }
});
`;

export default function SamplingIsSamplingPost() {
  return (
    <PageFade>
      <link rel="stylesheet" href={`${KATEX}/katex.min.css`} />
      <script defer src={`${KATEX}/katex.min.js`} />
      <script defer src={`${KATEX}/contrib/auto-render.min.js`} />
      <style dangerouslySetInnerHTML={{ __html: postCss }} />

      <section className="section">
        <div className="container-1200">
          <header className="post-header">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="badge">Research</span>
              <span className="caption">July 2, 2026 · Andreas Tersenov</span>
            </div>
            <h1>Sampling is sampling: an outsider's audit of LLM test-time compute</h1>
          </header>

          <article
            id="post-article"
            className="post-body"
            dangerouslySetInnerHTML={{ __html: postHtml }}
          />

          <script dangerouslySetInnerHTML={{ __html: katexInit }} />
        </div>
      </section>
    </PageFade>
  );
}
