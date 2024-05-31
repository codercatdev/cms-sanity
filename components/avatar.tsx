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
        <div className="w-12 h-12 mr-4">
          <CldImage
            className="w-full h-auto"
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
      <div className="text-xl font-bold text-pretty">{name}</div>
    </div>
  );
}
