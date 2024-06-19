import { HomePageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function HomePage() {
  const [homePage] = await Promise.all([
    sanityFetch<HomePageQueryResult>({
      query: homePageQuery,
    }),
  ]);
  console.log(homePage);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Featured Course
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Mastering React: From Beginner to Pro
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Learn how to build modern, scalable, and performant web
                applications with React. Includes hands-on projects and
                real-world examples.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Buy Course
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Go Pro
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Latest Podcast
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Exploring the Future of Web Development
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join us as we discuss the latest trends and technologies shaping
                the future of web development.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Listen Now
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Featured Podcasts
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Top Podcasts
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest and greatest podcast episodes covering a
                  wide range of topics in web development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={320}
                      height={180}
                      alt="Podcast Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">
                      The Future of Web Development
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Exploring the latest trends and technologies shaping the
                      web.
                    </p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={320}
                      height={180}
                      alt="Podcast Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">
                      Mastering React: From Beginner to Pro
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to build modern, scalable, and performant web
                      applications with React.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="grid gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={320}
                      height={180}
                      alt="Podcast Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">
                      Optimizing Web Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Techniques and strategies to improve the speed and
                      responsiveness of your web applications.
                    </p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={320}
                      height={180}
                      alt="Podcast Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">
                      Building Accessible Web Applications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring your web applications are inclusive and
                      accessible to all users.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Latest Blog Post
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  From the Blog
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest blog posts on a variety of web
                  development topics.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Link
                href="#"
                className="flex flex-col items-start gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={1200}
                  height={675}
                  alt="Blog Post Cover"
                  className="rounded-lg aspect-video"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Mastering React Hooks: A Comprehensive Guide
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dive deep into the power of React Hooks and learn how to
                    build more efficient and maintainable web applications.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>June 15, 2023</span>
                  </div>
                </div>
              </Link>
              <div className="grid gap-4">
                <Link
                  href="#"
                  className="flex items-start gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt="Blog Post Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">
                      Optimizing Web Performance: Strategies and Techniques
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to improve the speed and responsiveness of your
                      web applications.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>June 10, 2023</span>
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-start gap-4 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={225}
                      alt="Blog Post Cover"
                      className="rounded-lg aspect-video"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">
                      Building Accessible Web Applications: A Comprehensive
                      Guide
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ensure your web applications are inclusive and accessible
                      to all users.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4" />
                      <span>June 5, 2023</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Trending Blog Posts
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Popular on the Blog
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CatIcon(props) {
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
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </svg>
  );
}
