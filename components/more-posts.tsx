import Link from "next/link";

import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";

import type { MorePostQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  morePodcastQuery,
  morePostQuery,
  moreCourseQuery,
} from "@/sanity/lib/queries";

export default async function MorePosts(params: {
  type: string;
  skip?: string;
  limit?: number;
  offset?: number;
}) {
  const whichQuery = () => {
    switch (params.type) {
      case "post":
        return morePostQuery;
      case "podcast":
        return morePodcastQuery;
      case "course":
        return moreCourseQuery;
      default:
        return morePostQuery;
    }
  };

  const data = await sanityFetch<MorePostQueryResult>({
    query: whichQuery(),
    params: {
      type: params.type,
      skip: params.skip || "none",
      limit: params.limit || 4,
      offset: params.offset || 0,
    },
  });

  return (
    <>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {data?.map((post) => {
          const { _id, _type, title, slug, coverImage, excerpt, author } = post;
          return (
            <article key={_id}>
              <Link href={`/${_type}/${slug}`} className="block mb-5 group">
                <CoverImage image={coverImage} priority={false} />
              </Link>
              <h3 className="mb-3 text-3xl leading-snug text-balance">
                <Link href={`/${_type}/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h3>
              <div className="mb-4 text-lg">
                <DateComponent dateString={post.date} />
              </div>
              {excerpt && (
                <p className="mb-4 text-lg leading-relaxed text-pretty">
                  {excerpt}
                </p>
              )}
              {author && (
                <div className="flex">
                  {author.map((a) => (
                    <Avatar
                      key={a._id}
                      name={a.title}
                      coverImage={a?.coverImage}
                    />
                  ))}
                </div>
              )}{" "}
            </article>
          );
        })}
      </div>
    </>
  );
}
