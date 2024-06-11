"use client";

import type { Settings } from "@/sanity.types";
import Link from "next/link";

import { useActivePath } from "@/lib/hooks";
import NavLink from "@/components/nav-link";

interface Props {
  navLinks: Exclude<Settings["navLinks"], undefined> | undefined;
  className?: string;
}

export default function NavHeader({ navLinks, className }: Props) {
  const checkActivePath = useActivePath();

  return (
    <>
      {navLinks?.map((l) => (
        <NavLink
          key={l._key}
          className={`${className || ""} ${checkActivePath(l.path) ? "underline decoration-primary" : ""}`}
          href={l?.path || "/"}
        >
          {l.title}
        </NavLink>
      ))}
    </>
  );
}
