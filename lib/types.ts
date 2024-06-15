import { LessonsInCourseQueryResult, PageQueryResult } from "@/sanity.types";

export type NonNull<T> = Exclude<T, null | undefined>;

export enum ContentType {
  author = "author",
  course = "course",
  framework = "framework",
  forum = "forum",
  guest = "guest",
  group = "group",
  language = "language",
  lesson = "lesson",
  page = "page",
  podcast = "podcast",
  post = "post",
  sponsor = "sponsor",
}

export type BaseContent = Omit<
  NonNullable<PageQueryResult>,
  | "content"
  | "youtube"
  | "author"
  | "devto"
  | "hashnode"
  | "sponsor"
  | "tags"
  | "_type"
>;

export interface BaseBookmarkContent extends BaseContent {
  _type: string;
}
export interface BookmarkPath extends BaseBookmarkContent {
  _cc_pathname: string;
  _cc_updated: number;
}

export interface CompletedLesson
  extends NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<LessonsInCourseQueryResult>["sections"]
      >[0]["lesson"]
    >[0]
  > {
  _cc_updated: number;
}
