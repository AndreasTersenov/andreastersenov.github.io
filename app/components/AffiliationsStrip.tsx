"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import SpikeMark from "./SpikeMark";

const affiliations = [
  { name: "FORTH",      sub: "Institute of Computer Science · Astrophysics" },
  { name: "CEA Saclay", sub: "CosmoStat lab" },
  { name: "TITAN",      sub: "EU ERA Chair · AI in Astrophysics" },
  { name: "Euclid",     sub: "Cosmological Survey" },
  { name: "UNIONS",     sub: "Cosmological Survey" },
];

export default function AffiliationsStrip() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = ref.current.querySelectorAll(".affil .item");
      gsap.set(items, { opacity: 0, y: 10 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <section className="section section-tight" ref={ref}>
      <div className="container-1200">
        <div className="affil">
          <div className="label">
            <span style={{ color: "var(--primary)", fontFamily: "var(--font-mono)", marginRight: 10 }}>I</span>
            Affiliations &amp; collaborations
          </div>
          {affiliations.map((a, i) => (
            <div className="item" key={i}>
              <SpikeMark size={12} />
              <div>
                {a.name}
                <span className="sub">{a.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
