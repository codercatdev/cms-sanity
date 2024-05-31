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
import MorePosts from "@/components/more-posts";
import { cookies } from "next/headers";

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
  const [lesson, course] = await Promise.all([
    sanityFetch<LessonQueryResult>({
      query: lessonQuery,
      params,
    }),
    sanityFetch<LessonsInCourseQueryResult>({
      query: lessonsInCourseQuery,
      params,
    }),
  ]);

  if (!lesson?._id) {
    return notFound();
  }

  const layout = cookies().get("react-resizable-panels:layout");
  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return (
    <div className="container px-5 mx-auto">
      <LessonPanel
        lesson={lesson}
        course={course}
        defaultLayout={defaultLayout}
      />
      <Suspense>
        <Lessons courseSlug={params.courseSlug} />
      </Suspense>
      <aside>
        <hr className="mb-24 border-accent-2 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Courses
        </h2>
        <Suspense>
          <MorePosts type="course" skip={lesson._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
