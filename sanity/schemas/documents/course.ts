import { GiTeacher } from "react-icons/gi";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

import contentType from "../partials/content";
import lessonType from "./lesson";

export default defineType({
  ...contentType,
  name: "course",
  title: "Course",
  icon: GiTeacher,
  type: "document",
  fields: [
    ...contentType.fields,
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: lessonType.name }],
    }),
  ],
});
