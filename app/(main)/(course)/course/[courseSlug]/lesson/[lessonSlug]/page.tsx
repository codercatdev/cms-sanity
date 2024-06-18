import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import type {
  LessonQueryResult,
  LessonsInCourseQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { lessonQuery, lessonsInCourseQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import LessonPanel from "./lesson-panel";
import MoreContent from "@/components/more-content";
import { cookies } from "next/headers";
import MoreHeader from "@/components/more-header";
import PortableText from "@/components/portable-text";
import { groq, type PortableTextBlock } from "next-sanity";

type Props = {
  params: { lessonSlug: string; courseSlug: string };
};

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

  if (!lesson && !course) {
    return notFound();
  }

  return (
    <>
      {lesson?._id && course?._id && (
        <div className="container px-5 mx-auto grid gap-2">
          <LessonPanel lesson={lesson} course={course} />
          {lesson?.content?.length && (
            <PortableText
              className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
              value={lesson.content as PortableTextBlock[]}
            />
          )}
          <aside>
            <MoreHeader title="Recent Courses" href="/courses/page/1" />
            <Suspense>
              <MoreContent type="course" skip={lesson._id} limit={2} />
            </Suspense>
          </aside>
        </div>
      )}
    </>
  );
}
