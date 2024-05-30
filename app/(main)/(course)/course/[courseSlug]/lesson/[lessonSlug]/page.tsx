import type { Metadata, ResolvingMetadata } from "next";
import { groq, type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import type {
  LessonSlugsResult,
  LessonQueryResult,
  LessonsInCourseQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { lessonQuery, lessonsInCourseQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Lessons from "../../lessons";
import LessonPanel from "./lesson-panel";

type Props = {
  params: { lessonSlug: string; courseSlug: string };
};

const lessonSlugs = groq`*[_type == "lesson"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<LessonSlugsResult>({
    query: lessonSlugs,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch<LessonQueryResult>({
    query: lessonQuery,
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

export default async function LessonPage({ params }: Props) {
  const [post, lessons] = await Promise.all([
    sanityFetch<LessonQueryResult>({
      query: lessonQuery,
      params,
    }),
    sanityFetch<LessonsInCourseQueryResult>({
      query: lessonsInCourseQuery,
      params,
    }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-5">
      <LessonPanel params={params} />
      <Suspense>
        <Lessons courseSlug={params.courseSlug} />
      </Suspense>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Courses
        </h2>
        {/* <Suspense>
          <MorePosts type="course" skip={post._id} limit={2} />
        </Suspense> */}
      </aside>
    </div>
  );
}
