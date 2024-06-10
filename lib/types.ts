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
