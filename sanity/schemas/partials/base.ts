import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

const baseType = defineType({
  name: "base",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    description:
                      "Read https://css-tricks.com/use-target_blank/",
                    type: "boolean",
                  },
                ],
              },
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      { type: "post" },
                      { type: "podcast" },
                      { type: "course" },
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: "cloudinary.asset",
        },
        defineField({
          type: "code",
          name: "code",
          title: "Code",
          options: {
            language: "typescript",
          },
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "cloudinary.asset",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      _createdAt: "_createdAt",
      _updatedAt: "_updatedAt",
    },
    prepare({ title, _createdAt, _updatedAt }) {
      const subtitles = [
        _createdAt && `on ${format(parseISO(_createdAt), "LLL d, yyyy")}`,
        _updatedAt && `upd ${format(parseISO(_updatedAt), "LLL d, yyyy")}`,
      ].filter(Boolean);

      return {
        title,
        subtitle: subtitles.join(" "),
      };
    },
  },
});
export default baseType;
