/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KNgH5iMkawg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  return (
    <>
      <main className="mt-[72px] flex-1 bg-gray-100 dark:bg-gray-800 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Unlock Your Potential with Our Online Courses
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Explore a wide range of online courses to enhance your skills
                and knowledge. Enroll now and start your learning journey.
              </p>
              <div className="flex gap-2">
                <Button variant="default">Browse Courses</Button>
                <Button variant="secondary">Explore Categories</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-40 object-cover"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Web Development</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Learn the latest web development technologies and build
                    modern web applications.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">12 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-40 object-cover"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Data Science</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Dive into the world of data science and learn to extract
                    insights from data.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">15 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-40 object-cover"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Digital Marketing</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Unlock the secrets of effective digital marketing and grow
                    your online presence.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">18 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-40 object-cover"
                  height={200}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Graphic Design</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Unleash your creative potential and master the art of
                    graphic design.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">20 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="bg-white dark:bg-gray-950 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link className="text-primary-500 hover:underline" href="#">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img
                alt="Course Image"
                className="w-full h-48 object-cover"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/250",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">
                  Introduction to Python
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Learn the fundamentals of Python programming and build your
                  first applications.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">10 hours</span>
                  <Button size="sm" variant="default">
                    Enroll
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img
                alt="Course Image"
                className="w-full h-48 object-cover"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/250",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">Mastering React.js</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Dive deep into the world of React.js and build modern web
                  applications.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">15 hours</span>
                  <Button size="sm" variant="default">
                    Enroll
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <img
                alt="Course Image"
                className="w-full h-48 object-cover"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/250",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">Become a Data Analyst</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Unlock the power of data and learn to extract valuable
                  insights from it.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">20 hours</span>
                  <Button size="sm" variant="default">
                    Enroll
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 space-y-4">
              <h3 className="text-lg font-semibold">Filter Courses</h3>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Category</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm">Web Development</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm">Data Science</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm">Digital Marketing</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm">Graphic Design</span>
                  </label>
                </div>
              </div>
              <Button className="w-full" variant="default">
                Apply Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-48 object-cover"
                  height={250}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/250",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Mastering JavaScript: From Beginner to Expert
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Learn the fundamentals of JavaScript and build interactive
                    web applications.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">25 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-48 object-cover"
                  height={250}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/250",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Comprehensive Guide to SQL and Database Design
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Dive into the world of databases and learn to design and
                    manage complex data structures.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">30 hours</span>
                    <Button size="sm" variant="default">
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
                <img
                  alt="Course Image"
                  className="w-full h-48 object-cover"
                  height={250}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/250",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Mastering the Art of Digital Marketing
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Unlock the secrets of effective digital marketing and grow
                    your online presence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
