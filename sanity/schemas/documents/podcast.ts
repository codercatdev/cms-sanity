import { FaPodcast } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

import contentType from "../partials/content";
import podcastType from "./podcastType";
import guestType from "./guest";
import authorType from "./author";

export default defineType({
  name: "podcast",
  title: "Podcast",
  icon: FaPodcast,
  type: "document",
  groups: [
    {
      name: 'podcast',
      title: 'Podcast Details',
      default: true,
    },
    {
      name: 'podcastExports',
      title: 'Podcast Exports',
    },
  ],
  fields:[...contentType.fields,
    defineField({
      name: "podcastType",
      title: "Podcast Type",
      type: "reference",
      group: "podcast",
      to: [{ type: podcastType.name }],
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "number",
      group: "podcast",
      validation: (rule) => [rule.required(), rule.min(1), rule.max(10), rule.integer()],
    }),
    defineField({
      name: "episode",
      title: "Episode",
      type: "number",
      group: "podcast",
      validation: (rule) => [rule.required(), rule.min(1), rule.max(100), rule.integer()],
    }),
    defineField({
      name: "recording_date",
      title: "Recording Date",
      type: "date",
      group: "podcast",
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "guest",
      title: "Guest(s)",
      type: "reference",
      group: "podcast",
      to: [{ type: guestType.name }],
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: "pick",
      title: "Pick(s)",
      type: "array",
      group: "podcast",
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: "user",
              title: "Author or Guest",
              type: "reference",
              to: [
                { type: guestType.name },
                { type: authorType.name }
              ],
              validation: (rule) => [rule.required()],
            }),
            defineField({
              name: "name",
              title: "Pick Name",
              type: "string",
            }),
            defineField({
              name: "site",
              title: "Pick Url",
              type: "url",
            }),
          ]
        }
      ]
    }),
    defineField({
      name: "devto",
      title: "Dev.to",
      type: "string",
      group: "podcastExports",
    }),
    defineField({
      name: "hashnode",
      title: "Hashnode",
      type: "string",
      group: "podcastExports",
    }),
    defineField({
      name: "spotify",
      title: "Spotify",
      type: "string",
      group: "podcastExports",
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
