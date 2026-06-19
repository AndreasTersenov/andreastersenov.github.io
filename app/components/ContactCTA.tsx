"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const card = ref.current.querySelector(".coral-cta");
      gsap.set(card, { opacity: 0, y: 20 });
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
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
        <div className="coral-cta">
          <div>
            <h3>Want to collaborate, or just chat about cosmology and AI?</h3>
            <p>
              I&apos;m open to research collaborations, talks, and conversations with industry teams
              working on probabilistic ML, scientific inference, and large-scale data.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <Link className="btn btn-on-coral" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
