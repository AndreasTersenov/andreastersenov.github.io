"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SpikeMark from "./SpikeMark";
import ThemeToggle from "./ThemeToggle";

const items = [
  { href: "/",             label: "about" },
  { href: "/now",          label: "now" },
  { href: "/publications", label: "publications" },
  { href: "/repositories", label: "repositories" },
  { href: "/cv",           label: "cv" },
  { href: "/presentations", label: "presentations" },
  { href: "/teaching",     label: "teaching" },
  { href: "/academy",      label: "academy" },
  { href: "/blog",         label: "blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="nav-shell">
      <div className="container-1200 nav-row">
        <Link href="/" className="nav-brand" aria-label="Andreas Tersenov — home">
          <SpikeMark />
          <span className="name">Andreas Tersenov</span>
        </Link>
        <nav className="nav-links">
          {items.map((it) => {
            const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-cta">
          <ThemeToggle />
          <button
            className="btn btn-primary"
            onClick={() => router.push("/contact")}
            type="button"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
