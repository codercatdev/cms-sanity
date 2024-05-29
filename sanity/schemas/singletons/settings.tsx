import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import SVG from "react-inlinesvg";

import internalLink from "../custom/internalLink";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your blog.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      description:
        "Used both for the <meta> description tag for SEO, and the blog subheader.",
      title: "Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: "object",
                name: "link",
                fields: [
                  {
                    type: "string",
                    name: "href",
                    title: "URL",
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "footer",
      description:
        "This is a block of text that will be displayed at the bottom of the page.",
      title: "Footer Info",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "navLinks",
      description:
        "This is an array of links that will be displayed at the top of the page.",
      title: "Nav Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (rule) => rule.required(),
            },
            {
              name: "path",
              type: "string",
              title: "Link Path",
              initialValue: "/",
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      description: "This is an array of socials that will appear in the footer",
      title: "Socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: {
              icon: "icon",
              href: "href",
            },
            prepare({ icon, href }) {
              return {
                title: href,
                media: () => <SVG src={icon.svg} />,
              };
            },
          },
          fields: [
            {
              name: "href",
              type: "url",
              title: "Url",
              validation: (rule) => rule.required(),
            },
            {
              name: "icon",
              type: "iconPicker",
              title: "Icon",
              options: {
                storeSvg: true,
              },
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "cloudinary.asset",
      description: "Displayed on social cards and search engine results.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
