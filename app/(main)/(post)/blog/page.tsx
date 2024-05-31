import Link from "next/link";
import { Suspense } from "react";

import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import MorePosts from "@/components/more-posts";
import Onboarding from "@/components/onboarding";

import type { BlogQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogQuery } from "@/sanity/lib/queries";

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Pick<
  Exclude<BlogQueryResult, null>,
  "title" | "coverImage" | "date" | "excerpt" | "author" | "slug"
>) {
  return (
    <article>
      <Link className="block mb-8 group md:mb-16" href={`/post/${slug}`}>
        <CoverImage image={coverImage} priority />
      </Link>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight text-pretty lg:text-6xl">
            <Link href={`/post/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="mb-4 text-lg leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          {author && (
            <div className="flex">
              {author.map((a) => (
                <Avatar key={a._id} name={a.title} coverImage={a?.coverImage} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function Page() {
  const [heroPost] = await Promise.all([
    sanityFetch<BlogQueryResult>({ query: blogQuery }),
  ]);
  return (
    <div className="container px-5 mx-auto">
      {heroPost ? (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
        />
      ) : (
        <Onboarding />
      )}
      {heroPost?._id && (
        <aside>
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            More Stories
          </h2>
          <Suspense fallback={<p>Loading feed...</p>}>
            <MorePosts type={heroPost._type} skip={heroPost._id} limit={4} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
