import { Image } from "next-sanity/image";

import type { Author } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
  name: string;
  coverImage: Exclude<Author["coverImage"], undefined> | undefined;
}

export default function Avatar({ name, coverImage }: Props) {
  return (
    <div className="flex items-center text-xl">
      {coverImage?.secure_url ? (
        <div className="mr-4 h-12 w-12">
          <img
            src={coverImage.secure_url}
            alt={coverImage.context?.custom?.alt}
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="text-pretty text-xl font-bold">{name}</div>
    </div>
  );
}
