import Link from "next/link";

import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import { Button } from "@/components/ui/button";

import type { MorePostQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  morePodcastQuery,
  morePostQuery,
  moreCourseQuery,
  moreAuthorQuery,
} from "@/sanity/lib/queries";
import { ContentType } from "@/lib/types";
import { pluralize } from "@/lib/utils";

export default async function MoreContent(params: {
  type: string;
  skip?: string;
  limit?: number;
  offset?: number;
  showMore?: {
    href: string;
    text: string;
  };
}) {
  const whichQuery = () => {
    switch (params.type) {
      case ContentType.author:
        return moreAuthorQuery;
      case ContentType.course:
        return moreCourseQuery;
      case ContentType.podcast:
        return morePodcastQuery;
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
    <div className="flex flex-col">
      <h2 className="mb-8 text-4xl font-bold mt-10 capitalize">
        {pluralize(params.type)}
      </h2>
      <hr className="mb-24 border-accent-2 " />

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
                      href={`/author/${a?.slug?.current}`}
                      coverImage={a?.coverImage}
                    />
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {params?.showMore && params?.showMore.href && (
        <Button
          asChild
          className="mb-8 text-3xl font-bold md:text-4xl p-2 md:p-8"
        >
          <Link href={params?.showMore?.href}>{params?.showMore?.text}</Link>
        </Button>
      )}
    </div>
  );
}
