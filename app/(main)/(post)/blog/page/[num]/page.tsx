import MorePosts from "@/components/more-posts";
import { PostCountResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginateList from "@/components/paginate-list";

const LIMIT = 10;
const postCount = groq`count(*[_type == "post"])`;

export async function generateStaticParams() {
  const count = await sanityFetch<PostCountResult>({
    query: postCount,
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
    sanityFetch<PostCountResult>({
      query: postCount,
    }),
  ]);

  const { num } = params;
  const pageNumber = Number(num);
  const offset = (pageNumber - 1) * LIMIT;
  const limit = offset + LIMIT;
  const total = Math.ceil((count || 1) / LIMIT);

  return (
    <div className="container px-5 mx-auto mb-32">
      <MorePosts type="post" limit={limit} offset={offset} />
      <PaginateList num={Number(num)} limit={LIMIT} count={count} />
    </div>
  );
}
