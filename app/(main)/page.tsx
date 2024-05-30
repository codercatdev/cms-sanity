import Onboarding from "@/components/onboarding";

import type { HeroQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [heroPost] = await Promise.all([
    sanityFetch<HeroQueryResult>({ query: heroQuery }),
  ]);
  return (
    <div className="container mx-auto px-5">
      <Onboarding />
    </div>
  );
}
