import type { Metadata, ResolvingMetadata } from "next";
import { groq, type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import MoreContent from "@/components/more-content";
import PortableText from "@/components/portable-text";

import type { AuthorQueryResult, AuthorSlugsResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { authorQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import CoverMedia from "@/components/cover-media";
import MoreHeader from "@/components/more-header";
import { BreadcrumbLinks } from "@/components/breadrumb-links";

import {
  FaDev,
  FaGithub,
  FaCodepen,
  FaDiscord,
  FaLastfm,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaMastodon,
  FaMedium,
  FaStackOverflow,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { BsSubstack } from "react-icons/bs";

import Dribble from "./dribble.svg";
import Link from "next/link";
import { IconContext } from "react-icons/lib";
import UserSocials from "@/components/user-socials";

type Props = {
  params: { slug: string };
};

const authorSlugs = groq`*[_type == "author"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<AuthorSlugsResult>({
    query: authorSlugs,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const author = await sanityFetch<AuthorQueryResult>({
    query: authorQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(author?.coverImage);

  return {
    title: author?.title,
    description: author?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function AuthorPage({ params }: Props) {
  const [author] = await Promise.all([
    sanityFetch<AuthorQueryResult>({
      query: authorQuery,
      params,
    }),
  ]);

  if (!author?._id) {
    return notFound();
  }

  return (
    <div className="container px-5 mx-auto">
      <BreadcrumbLinks
        links={[
          { title: "Authors", href: "/authors/page/1" },
          { title: author.title },
        ]}
      />
      <div className="w-full flex flex-col gap-4 md:gap-8">
        <div className="flex gap-2 md:gap-8">
          <div>
            <CoverMedia
              cloudinaryImage={author?.coverImage}
              cloudinaryVideo={author?.videoCloudinary}
              youtube={author?.youtube}
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-">
            <h1 className="text-xl font-bold leading-tight tracking-tighter text-balance md:text-2xl md:leading-none lg:text-4xl">
              {author.title}
            </h1>
            {author?.socials && (
              <div className="flex flex-wrap gap-2">
                <UserSocials socials={author.socials} />
              </div>
            )}
          </div>
        </div>
        <article>
          {author.content?.length && (
            <PortableText
              className="prose-violet lg:prose-xl dark:prose-invert"
              value={author.content as PortableTextBlock[]}
            />
          )}
        </article>
      </div>
      <aside>
        <MoreHeader title="Recent Authors" href="/authors/page/1" />
        <Suspense>
          <MoreContent type={author._type} skip={author._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
