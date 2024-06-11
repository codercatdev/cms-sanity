import { NonNull } from "@/lib/types";
import { PodcastQueryResult } from "@/sanity.types";
import Avatar from "@/components/avatar";

export default function AuthorList({
  author,
}: {
  author: NonNull<Exclude<NonNull<PodcastQueryResult>["author"], undefined>>;
}) {
  return (
    <div className="flex gap-8">
      {author.map((a) => (
        <Avatar
          key={a._id}
          href={`/author/${a?.slug}`}
          name={a.title}
          coverImage={a?.coverImage}
        />
      ))}
    </div>
  );
}
