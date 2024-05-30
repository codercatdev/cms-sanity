/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FuqwWig8dyI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                CodingCat.dev Podcasts
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore the latest insights and trends in web development,
                software engineering, and the tech industry.
              </p>
              <div className="space-x-4 mt-6">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Subscribe
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <img
                alt="Podcast Cover"
                className="mx-auto aspect-[4/3] overflow-hidden rounded-t-xl object-cover"
                height="300"
                src="/placeholder.svg"
                width="400"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Latest Episodes
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out the latest episodes of the CodingCat.dev podcast.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <Card>
              <CardHeader>
                <img
                  alt="Episode Thumbnail"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover"
                  height="180"
                  src="/placeholder.svg"
                  width="320"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">
                  The Future of Web Development
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore the latest trends and technologies shaping the future
                  of web development.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img
                  alt="Episode Thumbnail"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover"
                  height="180"
                  src="/placeholder.svg"
                  width="320"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">
                  Mastering React: Best Practices and Patterns
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn the best practices and design patterns for building
                  scalable React applications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <img
                  alt="Episode Thumbnail"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover"
                  height="180"
                  src="/placeholder.svg"
                  width="320"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">
                  Navigating the Serverless Landscape
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore the benefits and challenges of serverless
                  architectures and how to leverage them effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Subscribe to the Podcast
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Don&apos;t miss out on the latest episodes. Subscribe to the
                CodingCat.dev podcast today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2" variant="outline">
                <AirplayIcon className="h-6 w-6" />
                Spotify
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <PodcastIcon className="h-6 w-6" />
                Apple Podcasts
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <PodcastIcon className="h-6 w-6" />
                Google Podcasts
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <RssIcon className="h-6 w-6" />
                RSS Feed
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 px-4 md:px-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Our Podcast Categories
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
              Browse our wide range of podcast episodes covering various topics
              in web development, software engineering, and the tech industry.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-950 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <nav className="grid gap-2">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Web Development
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Software Engineering
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Programming Languages
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                DevOps
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Career Development
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Tech Industry
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

function AirplayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7Z" />
    </svg>
  );
}

function MicIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function PodcastIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
      <path d="M8 14a5 5 0 1 1 8 0" />
      <circle cx="12" cy="11" r="1" />
      <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z" />
    </svg>
  );
}

function RssIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}
