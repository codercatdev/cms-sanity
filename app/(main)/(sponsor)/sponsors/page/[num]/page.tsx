import MoreContent from "@/components/more-content";
import { DocCountResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";

import PaginateList from "@/components/paginate-list";
import { docCount } from "@/sanity/lib/queries";

const LIMIT = 10;

type Props = {
  params: { num: string };
};

export default async function Page({ params }: Props) {
  const [count] = await Promise.all([
    sanityFetch<DocCountResult>({
      query: docCount,
      params: {
        type: "sponsor",
      },
    }),
  ]);

  const { num } = params;
  const pageNumber = Number(num);
  const offset = (pageNumber - 1) * LIMIT;
  const limit = offset + LIMIT;

  return (
    <div className="container px-5 mx-auto mb-32">
      <MoreContent type="sponsor" limit={limit} offset={offset} showHeader />
      <PaginateList
        base="sponsors"
        num={Number(num)}
        limit={LIMIT}
        count={count}
      />
    </div>
  );
}
