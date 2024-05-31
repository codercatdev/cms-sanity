import { CloudinaryAsset } from "@/sanity.types";
import CloudinaryImage from "@/components/cloudinary-image";
import { stegaClean } from "@sanity/client/stega";

interface CoverImageProps {
  image: CloudinaryAsset | null;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: originalImage, priority } = props;

  const source = stegaClean(originalImage);

  const image = source?.public_id ? (
    <CloudinaryImage
      className="w-full h-auto"
      width={1920}
      height={1080}
      priority={priority}
      sizes="100vw"
      alt={source?.context?.custom?.alt || ""}
      src={source?.public_id}
      config={{
        url: {
          secureDistribution: "media.codingcat.dev",
          privateCdn: true,
        },
      }}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }} />
  );

  return (
    <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
      {image}
    </div>
  );
}
