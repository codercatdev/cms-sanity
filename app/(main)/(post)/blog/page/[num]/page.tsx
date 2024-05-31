import MorePosts from "@/components/more-posts";
import { DocCountResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";

import PaginateList from "@/components/paginate-list";
import { docCount } from "@/sanity/lib/queries";

const LIMIT = 10;

export async function generateStaticParams() {
  const count = await sanityFetch<DocCountResult>({
    query: docCount,
    params: {
      type: "post",
    },
    perspective: "published",
    stega: false,
  });
  return new Array(Math.ceil((count || 1) / LIMIT)).fill(0).map((_, i) => ({
    params: {
      number: i + 1,
    },
  }));
}

type Props = {
  params: { num: string };
};

export default async function Page({ params }: Props) {
  const [count] = await Promise.all([
    sanityFetch<DocCountResult>({
      query: docCount,
      params: {
        type: "post",
      },
    }),
  ]);

  const { num } = params;
  const pageNumber = Number(num);
  const offset = (pageNumber - 1) * LIMIT;
  const limit = offset + LIMIT;

  return (
    <div className="container px-5 mx-auto mb-32">
      <MorePosts type="post" limit={limit} offset={offset} />
      <PaginateList num={Number(num)} limit={LIMIT} count={count} />
    </div>
  );
}
