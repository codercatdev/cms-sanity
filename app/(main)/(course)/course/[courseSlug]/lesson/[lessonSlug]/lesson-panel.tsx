import { notFound } from "next/navigation";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Link from "next/link";

import type {
  LessonQueryResult,
  LessonsInCourseQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { lessonQuery, lessonsInCourseQuery } from "@/sanity/lib/queries";
import CoverImage from "@/components/cover-image";
import BadgePro from "@/components/badge-pro";
import NavLesson from "./nav-lesson";
import PortableText from "@/components/portable-text";
import { type PortableTextBlock } from "next-sanity";

type Props = {
  params: { lessonSlug: string; courseSlug: string };
};

export default async function LessonPanel({ params }: Props) {
  const [post, course] = await Promise.all([
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
    <div className="grid w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="hidden border-r lg:flex lg:flex-col lg:gap-2"
      >
        <ResizablePanel defaultSize={25} minSize={20} collapsible>
          {course?.sections && (
            <>
              <div className="flex h-[60px] items-center border-b px-6">
                <Link
                  href={"/courses/" + params.courseSlug}
                  className="flex items-center gap-2 font-semibold"
                  prefetch={false}
                >
                  <span className="truncate">{course.title}</span>
                </Link>
              </div>

              <div className="flex-1 py-2 overflow-auto">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavLesson course={course} />
                </nav>
              </div>
            </>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 dark:bg-gray-800/40">
              <div className="flex-1 w-full">
                <h1>{post.title}</h1>
              </div>
              <BadgePro locked={post?.locked} />
            </header>
            <main className="flex-1 overflow-auto">
              <div className="mb-8 sm:mx-0 md:mb-16">
                <CoverImage image={post.coverImage} priority />
              </div>
            </main>
          </div>
          {post.content?.length && (
            <PortableText
              className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
              value={post.content as PortableTextBlock[]}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
