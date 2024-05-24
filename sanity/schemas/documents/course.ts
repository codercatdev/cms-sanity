import { GiTeacher } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

import contentType from "../partials/content";
import lessonType from "./lesson";


export default defineType({
  name: "course",
  title: "Course",
  icon: GiTeacher,
  type: "document",
  fields:[...contentType.fields,
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: lessonType.name }],
    }),
  ],
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
