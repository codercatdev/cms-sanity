import { CloudinaryAsset } from "@/sanity.types";
import CloudinaryVideo from "@/components/cloudinary-video";
import { stegaClean } from "@sanity/client/stega";
import { YouTube } from "@/components/youtube";
import CoverImage from "@/components/cover-image";
import CoverVideo from "@/components/cover-video";

export interface CoverMediaProps {
  cloudinaryImage: CloudinaryAsset | null | undefined;
  cloudinaryVideo: CloudinaryAsset | null | undefined;
  youtube: string | null | undefined;
}

export default function CoverMedia(props: CoverMediaProps) {
  const { cloudinaryImage, cloudinaryVideo, youtube } = props;

  if (cloudinaryVideo && cloudinaryVideo?.public_id) {
    return <CoverVideo cloudinaryVideo={cloudinaryVideo} />;
  }
  if (youtube) {
    return <YouTube youtube={youtube} />;
  }
  return <CoverImage image={cloudinaryImage} priority={true} />;
}
