import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import type {
  // LessonSlugsResult,
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
import MoreHeader from "@/components/more-header";

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
        <MoreHeader title="Recent Courses" href="/courses/page/1" />
        <Suspense>
          <MorePosts type="course" skip={lesson._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
