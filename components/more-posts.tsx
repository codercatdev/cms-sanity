import Link from "next/link";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";

import type { MorePostQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { morePodcastQuery, morePostQuery } from "@/sanity/lib/queries";

export default async function MorePosts(params: {
  type: string;
  skip: string;
  limit: number;
}) {
  const whichQuery = () => {
    switch (params.type) {
      case "post":
        return morePostQuery;
      case "podcast":
        return morePodcastQuery;
      default:
        return morePostQuery;
    }
  };

  const data = await sanityFetch<MorePostQueryResult>({
    query: whichQuery(),
    params,
  });

  return (
    <>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {data?.map((post) => {
          const { _id, title, slug, coverImage, excerpt, author } = post;
          return (
            <article key={_id}>
              <Link href={`/post/${slug}`} className="group mb-5 block">
                <CoverImage image={coverImage} priority={false} />
              </Link>
              <h3 className="text-balance mb-3 text-3xl leading-snug">
                <Link href={`/post/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h3>
              <div className="mb-4 text-lg">
                <DateComponent dateString={post.date} />
              </div>
              {excerpt && (
                <p className="text-pretty mb-4 text-lg leading-relaxed">
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
