"use client";
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
import BadgePro from "@/components/badge-pro";
import NavLesson from "./nav-lesson";
import PortableText from "@/components/portable-text";
import { type PortableTextBlock } from "next-sanity";
import CoverMedia from "@/components/cover-media";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LessonPanel({
  lesson,
  course,
  defaultLayout,
}: {
  lesson: LessonQueryResult;
  course: LessonsInCourseQueryResult;
  defaultLayout: number[];
}) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  return (
    <>
      <div className="hidden lg:grid w-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="hidden border-r lg:flex lg:flex-col lg:gap-2"
          onLayout={onLayout}
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            minSize={20}
            collapsible
          >
            {course?.sections && (
              <>
                <div className="flex h-[60px] items-center border-b px-6">
                  <Link
                    href={"/course/" + course.slug}
                    className="flex items-center gap-2 font-semibold"
                    prefetch={false}
                  >
                    <span className="flex flex-wrap">{course.title}</span>
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
          <ResizablePanel defaultSize={defaultLayout[1]}>
            <div className="flex flex-col">
              <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 dark:bg-gray-800/40">
                <div className="flex-1 w-full">
                  <h1>{lesson?.title}</h1>
                </div>
                <BadgePro locked={lesson?.locked} />
              </header>
              <main className="flex-1 overflow-auto">
                <div className="mb-8 sm:mx-0 md:mb-16">
                  <CoverMedia
                    cloudinaryImage={lesson?.coverImage}
                    cloudinaryVideo={lesson?.videoCloudinary}
                    youtube={lesson?.youtube}
                  />
                </div>
              </main>
            </div>
            {lesson?.content?.length && (
              <PortableText
                className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
                value={lesson.content as PortableTextBlock[]}
              />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <section className="grid gap-2 lg:hidden">
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b  px-6 dark:bg-gray-800/40">
            <div className="flex-1 w-full">
              <h1>{lesson?.title}</h1>
            </div>
            <BadgePro locked={lesson?.locked} />
          </header>
          <main className="flex-1 overflow-auto">
            <div className="mb-8 sm:mx-0 md:mb-16">
              <CoverMedia
                cloudinaryImage={lesson?.coverImage}
                cloudinaryVideo={lesson?.videoCloudinary}
                youtube={lesson?.youtube}
              />
            </div>
          </main>
        </div>
        <ScrollArea className="rounded-md border h-[calc(100vh/4)]">
          {course?.sections && (
            <>
              <div className="flex-1 py-2 overflow-auto">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavLesson course={course} />
                </nav>
              </div>
            </>
          )}
        </ScrollArea>
        {lesson?.content?.length && (
          <PortableText
            className="mx-auto prose-violet lg:prose-xl dark:prose-invert"
            value={lesson.content as PortableTextBlock[]}
          />
        )}
      </section>
    </>
  );
}
