import { DocumentTextIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

import baseType from "./base";
import authorType from "../documents/author";
import sponsorType from "../documents/sponsor";

const content = defineType({
  name: "content",
  type: "object",
  fields: [
    ...baseType.fields,
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: authorType.name }],
    }),
    defineField({
      name: "sponsor",
      title: "Sponsor",
      type: "reference",
      to: [{ type: sponsorType.name }],
    }),
    defineField({
      title: "Tags",
      name: "tags",
      type: "tags",
      options: {
        includeFromRelated: "tags",
      },
      validation: (Rule) => Rule.unique(),
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

export default content;
