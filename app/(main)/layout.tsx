import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Nunito } from "next/font/google";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { JSX, SVGProps, Suspense } from "react";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import type { SettingsQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  // const ogImage = resolveOpenGraphImage(settings?.ogImage);
  const ogImage = settings?.ogImage?.secure_url;
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

async function Footer() {
  const data = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });
  const footer = data?.footer || [];
  return (
    <footer className="bg-accent-1 border-accent-2 border-t">
      <div className="container mx-auto px-5">
        {footer.length > 0 ? (
          <PortableText
            className="prose-sm prose-violet dark:prose-invert text-pretty bottom-0 w-full max-w-none py-12 text-center md:py-20"
            value={footer as PortableTextBlock[]}
          />
        ) : (
          <div className="flex flex-col items-center py-28 lg:flex-row">
            <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
              Built with Next.js.
            </h3>
            <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
              <a
                href="https://nextjs.org/docs"
                className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8"
              >
                Read Documentation
              </a>
              <a
                href="https://github.com/vercel/next.js/tree/canary/examples/cms-sanity"
                className="mx-3 font-bold hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          nunito.variable,
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {draftMode().isEnabled && <AlertBanner />}

          <section className="flex flex-col min-h-[100dvh]">
            <header className="fixed left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
              <div className="flex items-center gap-4">
                <Link className="text-lg md:text-2xl font-bold" href="/">
                  CodingCat.dev
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  {data?.navLinks?.map((l) => (
                    <Link
                      key={l._key}
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      href={l?.path || "/"}
                    >
                      {l.title}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default">Enroll Now</Button>
                <Button className="hidden md:flex" variant="secondary">
                  Sign In
                </Button>
                <ModeToggle />

                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="sm:hidden" size="icon" variant="ghost">
                      <MenuIcon className="h-6 w-6" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="grid gap-2 py-6">
                      <Link
                        className="flex w-full items-center py-2 text-lg font-semibold"
                        href="#"
                      >
                        Home
                      </Link>
                      {data?.navLinks?.map((l) => (
                        <Link
                          key={l._key}
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          href={l?.path || "/"}
                        >
                          {l.title}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </header>

            <main className="mt-32">{children}</main>
            <Suspense>
              <Footer />
            </Suspense>
          </section>
          {draftMode().isEnabled && <VisualEditing />}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
