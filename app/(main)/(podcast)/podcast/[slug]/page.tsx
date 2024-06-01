import type { Metadata, ResolvingMetadata } from "next";
import { groq, type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import AvatarList from "@/components/author-list";
import DateComponent from "@/components/date";
import MorePosts from "@/components/more-posts";
import PortableText from "@/components/portable-text";

import type { PodcastQueryResult, PodcastSlugsResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { podcastQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import CoverMedia from "@/components/cover-media";
import MoreHeader from "@/components/more-header";
import { BreadcrumbLinks } from "@/components/breadrumb-links";

type Props = {
  params: { slug: string };
};

const podcastSlugs = groq`*[_type == "podcast"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<PodcastSlugsResult>({
    query: podcastSlugs,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const podcast = await sanityFetch<PodcastQueryResult>({
    query: podcastQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(podcast?.coverImage);

  return {
    authors:
      podcast?.author?.map((a) => {
        return { name: a.title };
      }) || [],
    title: podcast?.title,
    description: podcast?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PodcastPage({ params }: Props) {
  const [podcast] = await Promise.all([
    sanityFetch<PodcastQueryResult>({
      query: podcastQuery,
      params,
    }),
  ]);

  if (!podcast?._id) {
    return notFound();
  }

  return (
    <div className="container px-5 mx-auto">
      <BreadcrumbLinks
        links={[
          { title: "Podcasts", href: "/podcasts" },
          { title: podcast.title },
        ]}
      />
      <article>
        <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tighter text-balance md:text-7xl md:leading-none lg:text-8xl">
          {podcast.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          <div className="flex flex-col gap-8">
            {podcast?.author && <AvatarList author={podcast.author} />}
            <div className="text-lg">
              <DateComponent dateString={podcast.date} />
            </div>
          </div>
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverMedia
            cloudinaryImage={podcast?.coverImage}
            cloudinaryVideo={podcast?.videoCloudinary}
            youtube={podcast?.youtube}
          />
        </div>
        <div className="block md:hidden">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              {podcast.author && (
                <div className="flex">
                  {podcast?.author && <AvatarList author={podcast.author} />}
                </div>
              )}
            </div>
            <div className="mb-4 text-lg">
              <DateComponent dateString={podcast.date} />
            </div>
          </div>
        </div>
        {podcast.content?.length && (
          <PortableText
            className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
            value={podcast.content as PortableTextBlock[]}
          />
        )}
      </article>
      <aside>
        <MoreHeader title="Recent Podcasts" href="/podcasts/page/1" />
        <Suspense>
          <MorePosts type={podcast._type} skip={podcast._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
