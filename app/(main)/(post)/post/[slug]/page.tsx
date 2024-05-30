import type { Metadata, ResolvingMetadata } from "next";
import { groq, type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import MorePosts from "@/components/more-posts";
import PortableText from "@/components/portable-text";

import type { PostQueryResult, PostSlugsResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: { slug: string };
};

const postSlugs = groq`*[_type == "post"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<PostSlugsResult>({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch<PostQueryResult>({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.map((a) => {
        return { name: a.title };
      }) || [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post] = await Promise.all([
    sanityFetch<PostQueryResult>({
      query: postQuery,
      params,
    }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-5">
      <article>
        <h1 className="text-balance mb-12 text-4xl font-bold leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          <div className="flex flex-col gap-8">
            {post?.author && (
              <div className="flex">
                {post.author.map((a) => (
                  <Avatar
                    key={a._id}
                    name={a.title}
                    coverImage={a?.coverImage}
                  />
                ))}
              </div>
            )}
            <div className="text-lg">
              <DateComponent dateString={post.date} />
            </div>
          </div>
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage image={post.coverImage} priority />
        </div>
        <div className="block md:hidden">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6">
              {post.author && (
                <div className="flex">
                  {post.author.map((a) => (
                    <Avatar
                      key={a._id}
                      name={a.title}
                      coverImage={a?.coverImage}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4 text-lg">
              <DateComponent dateString={post.date} />
            </div>
          </div>
        </div>
        {post.content?.length && (
          <PortableText
            className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Stories
        </h2>
        <Suspense>
          <MorePosts type={post._type} skip={post._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
