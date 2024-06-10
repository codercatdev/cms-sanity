import { Suspense } from "react";

import MoreContent from "@/components/more-content";

import type { AuthorsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { authorsQuery } from "@/sanity/lib/queries";
import MoreHeader from "@/components/more-header";

export default async function Page() {
  const [heroAuthor] = await Promise.all([
    sanityFetch<AuthorsQueryResult>({ query: authorsQuery }),
  ]);
  return (
    <div className="container p-5 mx-auto">
      <MoreHeader title="Authors" href="/authors/page/1" showHr={false} />
      <Suspense fallback={<p>Loading feed...</p>}>
        <MoreContent
          type="author"
          limit={8}
          showMore={{ href: "/authors/page/1", text: "View More" }}
        />
      </Suspense>
    </div>
  );
}
