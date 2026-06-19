import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export const metadata = { title: "Repositories — Andreas Tersenov" };

type Repo = { name: string; role: string; desc: string; tags: string[]; lang: string };

const repos: Repo[] = [
  {
    name: "wl-stats-torch",
    role: "Author / Maintainer",
    desc: "GPU-accelerated PyTorch library for weak-lensing summary statistics (2D and HEALPix). Power spectrum, peak counts, wavelet L1-norm, Minkowski functionals, all differentiable.",
    tags: ["PyTorch", "CUDA", "weak lensing"],
    lang: "Python",
  },
  {
    name: "bar-impact",
    role: "Author / Maintainer",
    desc: "Tools to analyse the impact of baryons on cosmological weak-lensing contours through different summary statistics and Implicit-Likelihood Inference on HEALPix maps.",
    tags: ["SBI", "baryons", "HEALPix"],
    lang: "Python",
  },
  {
    name: "weaklensing-uq",
    role: "Co-author / Co-maintainer",
    desc: "Reference repository for the PnPMass mass-mapping algorithm and for the application of distribution-free uncertainty quantification to inverse problems.",
    tags: ["UQ", "plug-and-play", "inverse problems"],
    lang: "Python",
  },
  {
    name: "cosmostat",
    role: "Contributor / Maintainer",
    desc: "Python / C++ software package for cosmostatistics, developed at the CosmoStat lab (CEA Paris-Saclay).",
    tags: ["cosmostatistics", "C++"],
    lang: "Python",
  },
];

export default function RepositoriesPage() {
  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader title="Repositories" meta="Open-source software I author or maintain" />
          <Reveal stagger={0.08}>
            <div className="repo-grid">
              {repos.map((r) => (
                <article className="repo-card" data-reveal key={r.name}>
                  <header className="repo-head">
                    <code className="repo-name">{r.name}</code>
                    <span className="repo-lang">{r.lang}</span>
                  </header>
                  <p className="repo-role">{r.role}</p>
                  <p className="repo-desc">{r.desc}</p>
                  <div className="repo-tags">
                    {r.tags.map((t) => (
                      <span className="badge" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <footer className="repo-foot">
                    <a className="pub-link" href={`https://github.com/AndreasTersenov/${r.name}`} target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                    <span className="pub-link">Docs</span>
                  </footer>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
