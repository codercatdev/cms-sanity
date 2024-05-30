"use client";

import { CldImage } from "next-cloudinary";
import { stegaClean } from "@sanity/client/stega";
import type { Author } from "@/sanity.types";

interface Props {
  name: string;
  coverImage: Exclude<Author["coverImage"], undefined> | undefined;
}

export default function Avatar({ name, coverImage }: Props) {
  const source = stegaClean(coverImage);

  return (
    <div className="flex items-center text-xl">
      {source?.public_id ? (
        <div className="mr-4 h-12 w-12">
          <CldImage
            className="h-auto w-full"
            width={48}
            height={48}
            alt={source?.context?.custom?.alt || ""}
            src={source.public_id}
            config={{
              url: {
                secureDistribution: "media.codingcat.dev",
                privateCdn: true,
              },
            }}
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="text-pretty text-xl font-bold">{name}</div>
    </div>
  );
}
