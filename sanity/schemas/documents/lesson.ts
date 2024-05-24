import { PiStudentBold } from "react-icons/pi";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

import contentType from "../partials/content";

export default defineType({
  name: "lesson",
  title: "Lesson",
  icon: PiStudentBold,
  type: "document",
  fields:[...contentType.fields],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "date",
      media: "coverImage",
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), "LLL d, yyyy")}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
