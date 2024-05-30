import Link from "next/link";

import CoverImage from "@/components/cover-image";
import type { LessonsInCourseQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { lessonsInCourseQuery } from "@/sanity/lib/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import BadgePro from "@/components/badge-pro";

export default async function Lessons(params: { courseSlug: string }) {
  const data = await sanityFetch<LessonsInCourseQueryResult>({
    query: lessonsInCourseQuery,
    params,
  });
  return (
    <>
      {data?.sections && (
        <div className="flex flex-col">
          <hr className="border-accent-2 mb-24 mt-28" />
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            Lessons
          </h2>
          {data?.sections?.map((section, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-xl">
                <h3 className="mb-3 text-3xl leading-snug">{section?.title}</h3>
              </div>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 auto-rows-fr">
                {section?.lesson?.map((post) => {
                  const {
                    _id,
                    _type,
                    title,
                    slug,
                    coverImage,
                    excerpt,
                    locked,
                  } = post;
                  return (
                    <Card
                      key={_id}
                      className="overflow-hidden shadow-md transition-all hover:scale-[1.02] hover:shadow-lg relative flex flex-col"
                    >
                      <CardHeader className="p-0">
                        <Link
                          href={`/course/${params.courseSlug}/${_type}/${slug}`}
                          className="group mb-5 block"
                        >
                          <CoverImage image={coverImage} priority={false} />
                        </Link>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <h3 className="text-balance mb-3 text-3xl leading-snug">
                          <Link
                            href={`/course/${params.courseSlug}/${_type}/${slug}`}
                            className="hover:underline"
                          >
                            {title}
                          </Link>
                        </h3>

                        {excerpt && (
                          <p className="text-pretty mb-4 text-lg leading-relaxed">
                            {excerpt}
                          </p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <BadgePro locked={locked} />
                      </CardFooter>
                    </Card>
                  );
                })}
              </section>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
