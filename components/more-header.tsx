import { NonNull } from "@/lib/types";
import { PodcastQueryResult } from "@/sanity.types";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MoreHeader({
  title,
  href,
  text = "View More",
}: {
  title: string;
  href: string;
  text?: string;
}) {
  return (
    <>
      <hr className="mb-24 border-accent-2 mt-28" />

      <div className="flex flex-col md:flex-row md:justify-between">
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          {title}
        </h2>
        <Button
          asChild
          className="mb-8 text-3xl font-bold md:text-4xl p-2 md:p-8"
        >
          <Link href={href}>{text}</Link>
        </Button>
      </div>
    </>
  );
}
