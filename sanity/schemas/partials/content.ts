import { defineField, defineType } from "sanity";

import baseType from "./base";
import authorType from "../documents/author";
import sponsorType from "../documents/sponsor";

const content = defineType({
  ...baseType,
  name: "content",
  type: "object",
  groups: [
    {
      name: "export",
      title: "External Exports",
    },
  ],
  fields: [
    ...baseType.fields,
    defineField({
      name: "author",
      title: "Author",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: authorType.name }],
        },
      ],
      initialValue: [
        {
          _type: "reference",
          _ref: "RIgC5r4TJ0hCGOzxHszD1w",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "devto",
      title: "Dev.to",
      type: "url",
      group: "export",
    }),
    defineField({
      name: "hashnode",
      title: "Hashnode",
      type: "string",
      group: "export",
    }),
    defineField({
      name: "sponsor",
      title: "Sponsor",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: sponsorType.name }],
        },
      ],
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
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "string",
    }),
  ],
});

export default content;
