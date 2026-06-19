"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/** Simple per-route page fade-in. Wrap a page body to give it a quiet entrance. */
export default function PageFade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    },
    { scope: ref, dependencies: [] }
  );

  return <div ref={ref}>{children}</div>;
}
