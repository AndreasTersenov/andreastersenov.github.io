"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type Props = {
  children: ReactNode;
  /** stagger applied to children marked with `data-reveal` */
  stagger?: number;
  /** translate-Y starting offset, px */
  y?: number;
  /** animation duration */
  duration?: number;
  /** delay before kickoff */
  delay?: number;
  /** trigger immediately on mount instead of on scroll */
  immediate?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  stagger = 0.06,
  y = 14,
  duration = 0.7,
  delay = 0,
  immediate = false,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const tagged = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
      const items = tagged.length ? Array.from(tagged) : [ref.current];

      gsap.set(items, { opacity: 0, y });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
