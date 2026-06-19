"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import SectionHeader from "./SectionHeader";

type News = { date: string; body: ReactNode };

const items: News[] = [
  {
    date: "Nov 24, 2025",
    body: (
      <>
        🏆 Our team came <strong>2nd place</strong> at the{" "}
        <a href="#">NeurIPS 2025 Weak Lensing Uncertainty Challenge</a> — an international competition
        on uncertainty-aware and OOD-detection AI methods for cosmology.
      </>
    ),
  },
  {
    date: "Nov 10, 2025",
    body: (
      <>
        Lecturing at the <a href="#">Sharjah Winter School for AstroStatistics</a> on Bayesian inference,
        advanced sampling, and simulation-based inference.
      </>
    ),
  },
  {
    date: "Oct 06, 2025",
    body: (
      <>
        New Euclid HOWLS paper 🌌 — &ldquo;<em>Towards a DR1 application of higher-order weak-lensing
        statistics</em>&rdquo; is on arXiv. We show that higher-order statistics constrain dark energy
        2.5× better than standard methods in a realistic Euclid DR1 setup.
      </>
    ),
  },
  {
    date: "Mar 31, 2025",
    body: (
      <>
        Our paper &ldquo;<em>Impact of mass-mapping algorithms on cosmology inference</em>&rdquo; has been
        published in <strong>Astronomy &amp; Astrophysics</strong> 🎉
      </>
    ),
  },
  {
    date: "Jan 08, 2025",
    body: (
      <>
        Spending the next 3 months at the <a href="#">CosmoStat Lab</a>, CEA Paris-Saclay.
      </>
    ),
  },
];

export default function NewsStrip() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const rows = ref.current.querySelectorAll(".news-row");
      gsap.set(rows, { opacity: 0, y: 14 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <section className="section" ref={ref}>
      <div className="container-1200">
        <SectionHeader chapter="II" title="News" meta="Updates from the lab" />
        <div className="newslist">
          {items.map((n, i) => (
            <div className="news-row" key={i}>
              <span className="date">{n.date}</span>
              <span className="body">{n.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
