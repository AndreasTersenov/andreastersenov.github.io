import Link from "next/link";
import SpikeMark from "./SpikeMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-1200">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <SpikeMark size={20} />
              <span className="name">Andreas Tersenov</span>
            </div>
            <p className="blurb">
              PhD candidate in cosmology and astrostatistics. Working at the intersection of weak
              gravitational lensing, simulation-based inference, and deep learning for the physical
              sciences.
            </p>
          </div>
          <div>
            <div className="col-h">Site</div>
            <Link className="lk" href="/">About</Link>
            <Link className="lk" href="/now">Now</Link>
            <Link className="lk" href="/publications">Publications</Link>
            <Link className="lk" href="/repositories">Repositories</Link>
            <Link className="lk" href="/cv">CV</Link>
            <Link className="lk" href="/teaching">Teaching</Link>
            <Link className="lk" href="/academy">Academy</Link>
            <Link className="lk" href="/blog">Blog</Link>
          </div>
          <div>
            <div className="col-h">Research</div>
            <span className="lk">Euclid HOWLS</span>
            <span className="lk">UNIONS</span>
            <span className="lk">TITAN ERA Chair</span>
            <span className="lk">CosmoStat</span>
          </div>
          <div>
            <div className="col-h">Profiles</div>
            <a className="lk" href="https://github.com/AndreasTersenov" target="_blank" rel="noreferrer">GitHub</a>
            <a className="lk" href="https://arxiv.org/a/tersenov_a_1" target="_blank" rel="noreferrer">arXiv</a>
            <a className="lk" href="https://orcid.org/0009-0007-5348-6701" target="_blank" rel="noreferrer">ORCID</a>
            <span className="lk">LinkedIn</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Andreas Tersenov</span>
          <span>FORTH · CEA Saclay</span>
        </div>
      </div>
    </footer>
  );
}
