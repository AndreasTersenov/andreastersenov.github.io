"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { initHeroMeshWarp } from "../lib/hero-mesh-warp";

const HEADLINE = ["Cosmology,", "AI,", "and", "the"];
const HEADLINE_ITALIC = ["dark", "side"];
const HEADLINE_TAIL = ["of", "the", "Universe."];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = today.getFullYear();

  // Mesh-warp canvas — runs outside of GSAP context, manages its own RAF + listeners.
  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initHeroMeshWarp(canvasRef.current);
    return cleanup;
  }, []);

  // GSAP entrance timeline. Tasteful, not flashy.
  useGSAP(
    () => {
      if (!heroRef.current) return;
      const root = heroRef.current;
      const kicker = root.querySelector(".hero-kicker");
      const words = root.querySelectorAll<HTMLElement>(".hero-word");
      const lede = root.querySelector(".lede");
      const ctas = root.querySelectorAll(".ctaRow .btn");
      const profile = root.querySelector(".profile-card");
      const profileMeta = root.querySelectorAll(".profile-meta-row");

      gsap.set([kicker, lede, profile], { opacity: 0, y: 12 });
      gsap.set(words, { opacity: 0, y: 28 });
      gsap.set(ctas, { opacity: 0, y: 10 });
      gsap.set(profileMeta, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(kicker, { opacity: 1, y: 0, duration: 0.55 }, 0.05)
        .to(words, { opacity: 1, y: 0, duration: 0.9, stagger: 0.045 }, 0.15)
        .to(lede, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(ctas, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.35")
        .to(profile, { opacity: 1, y: 0, duration: 0.9 }, 0.25)
        .to(profileMeta, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.4");
    },
    { scope: heroRef, dependencies: [] }
  );

  return (
    <section className="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="hero-bg-canvas" aria-hidden="true" />
      <div className="container-1200">
        <Link href="/now" className="hero-kicker hero-kicker-link">
          <span className="ep">NOW</span>
          <span className="rule" />
          <span>
            CRETE &middot; {month} {year}
          </span>
          <span className="hero-kicker-arrow" aria-hidden="true">→</span>
        </Link>
        <div className="hero-grid">
          <div>
            <h1>
              {HEADLINE.map((w, i) => (
                <span className="hero-word" key={`a-${i}`}>
                  {w}
                  {" "}
                </span>
              ))}
              <em>
                {HEADLINE_ITALIC.map((w, i) => (
                  <span className="hero-word" key={`b-${i}`}>
                    {w}
                    {i < HEADLINE_ITALIC.length - 1 ? " " : ""}
                  </span>
                ))}
              </em>
              {" "}
              {HEADLINE_TAIL.map((w, i) => (
                <span className="hero-word" key={`c-${i}`}>
                  {w}
                  {i < HEADLINE_TAIL.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="lede">
              PhD candidate at the University of Crete / FORTH and CosmoStat &middot; CEA Paris-Saclay.
              I study the large-scale structure of the Universe through weak gravitational lensing —
              combining simulation-based inference, deep learning, and higher-order statistics.
            </p>
            <div className="ctaRow">
              <Link className="btn btn-primary" href="/publications">Read my work</Link>
              <Link className="btn btn-secondary" href="/cv">View CV</Link>
            </div>
          </div>

          <ProfileCard />
        </div>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-photo-frame">
        <Image
          src="/profile.jpeg"
          alt="Andreas Tersenov"
          fill
          sizes="(max-width: 900px) 100vw, 320px"
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="profile-meta">
        <div className="profile-meta-row">
          <span className="lbl">Now</span>
          <span className="val">PhD candidate · FORTH</span>
        </div>
        <div className="profile-meta-row">
          <span className="lbl">Visiting</span>
          <span className="val">CosmoStat · CEA Saclay</span>
        </div>
        <div className="profile-meta-row">
          <span className="lbl">Based in</span>
          <span className="val">Heraklion · Saclay</span>
        </div>
      </div>
    </div>
  );
}
