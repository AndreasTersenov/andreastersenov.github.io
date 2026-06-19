"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type Props = {
  chapter?: string;
  title: string;
  meta?: ReactNode;
  onMetaClick?: () => void;
};

export default function SectionHeader({ chapter, title, meta, onMetaClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const chapterEl = ref.current.querySelector(".chapter");
      const h2 = ref.current.querySelector("h2");
      const metaEl = ref.current.querySelector(".meta");

      gsap.set([chapterEl, h2, metaEl].filter(Boolean), { opacity: 0, y: 12 });

      gsap.to([chapterEl, h2, metaEl].filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <div className="section-h" ref={ref}>
      <div className="title-block">
        {chapter && <span className="chapter">{chapter}</span>}
        <h2>{title}</h2>
      </div>
      {meta != null && (
        <span
          className="meta"
          onClick={onMetaClick}
          style={onMetaClick ? { cursor: "pointer", color: "var(--primary)" } : undefined}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
