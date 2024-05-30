"use client";

import type { Settings } from "@/sanity.types";
import Link from "next/link";

import { useActivePath } from "@/lib/hooks";

interface Props {
  navLinks: Exclude<Settings["navLinks"], undefined> | undefined;
}

export default function NavHeader({ navLinks }: Props) {
  const checkActivePath = useActivePath();

  return (
    <>
      {navLinks?.map((l) => (
        <Link
          key={l._key}
          className={`${checkActivePath(l.path) ? "underline decoration-primary" : ""}`}
          href={l?.path || "/"}
        >
          {l.title}
        </Link>
      ))}
    </>
  );
}
