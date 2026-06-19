"use client";

import { useState } from "react";
import PageFade from "../components/PageFade";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <PageFade>
      <section className="section">
        <div className="container-1200">
          <SectionHeader title="Get in touch" meta="For research, talks, or industry conversations" />

          <Reveal stagger={0.1}>
            <div className="contact-grid">
              <form
                className="contact-form"
                data-reveal
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div>
                  <label>Your name</label>
                  <input
                    className="input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Researcher"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    className="input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@university.edu"
                  />
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="A few sentences about what you'd like to chat about."
                  />
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button className="btn btn-primary" type="submit">
                    {sent ? "Sent ✓" : "Send message"}
                  </button>
                  <span className="caption">Or email directly →</span>
                </div>
              </form>

              <div className="contact-info" data-reveal>
                <div className="item">
                  <span className="lbl">Email</span>
                  <span className="val">
                    <a href="mailto:atersenov@physics.uoc.gr">atersenov@physics.uoc.gr</a>
                  </span>
                </div>
                <div className="item">
                  <span className="lbl">GitHub</span>
                  <span className="val">
                    <a href="https://github.com/AndreasTersenov" target="_blank" rel="noreferrer">
                      @AndreasTersenov
                    </a>
                  </span>
                </div>
                <div className="item">
                  <span className="lbl">LinkedIn</span>
                  <span className="val">
                    <a href="#">andreas-tersenov</a>
                  </span>
                </div>
                <div className="item">
                  <span className="lbl">ORCID</span>
                  <span className="val">
                    <a href="https://orcid.org/0009-0007-5348-6701" target="_blank" rel="noreferrer">
                      0009-0007-5348-6701
                    </a>
                  </span>
                </div>
                <div className="item">
                  <span className="lbl">Based in</span>
                  <span className="val">Heraklion, Crete · Saclay, France</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageFade>
  );
}
