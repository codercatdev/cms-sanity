import { groq } from "next-sanity";

export const docCount = groq`count(*[_type == $type])`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

// Partials

const baseFieldsNoContent = `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _createdAt)
`;

const contentFields = `
  content,
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  },
  devto,
  hashnode,
  sponsor[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  },
  tags,
  videoCloudinary,
  youtube
`;

const podcastFields = `
  podcastType[]->{
    ...,
    "title": coalesce(title, "Missing Podcast Title"),
  },
  season,
  episode,
  recordingDate,
  guest[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  },
  pick[]{
    user[]->{
      ...,
      "title": coalesce(title, "Anonymous"),
    },
    name,
    site
  }
`;

const lessonFields = `
  locked,
  videoCloudinary
`;

const userFields = `
  socials,
  websites
`;

const userRelated = `
  "related":{
    "course": *[_type == "course" && (^._id in author[]._ref || ^._id in guest[]._ref)] | order(date desc) [0...4] {
      ${baseFieldsNoContent}
    },
    "podcast": *[_type == "podcast" && (^._id in author[]._ref || ^._id in guest[]._ref)] | order(date desc) [0...4] {
      ${baseFieldsNoContent}
    },
    "post": *[_type == "post" && (^._id in author[]._ref || ^._id in guest[]._ref)] | order(date desc) [0...4] {
      ${baseFieldsNoContent}
    },
  }
`;

// Pages

export const pageQuery = groq`*[_type == "page" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields}
}`;

// Post

export const blogQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const morePostQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [$offset...$limit] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields}
}`;

// Podcast

export const podcastsQuery = groq`*[_type == "podcast" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const morePodcastQuery = groq`*[_type == "podcast" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [$offset...$limit] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  },
  guest[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const podcastQuery = groq`*[_type == "podcast" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${podcastFields}
}`;

// Courses

export const coursesQuery = groq`*[_type == "course" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const moreCourseQuery = groq`*[_type == "course" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [$offset...$limit] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const courseQuery = groq`*[_type == "course" && slug.current == $courseSlug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${podcastFields}
}`;

// Lessons

export const lessonsInCourseQuery = groq`*[_type == "course" && slug.current == $courseSlug] [0] {
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  sections[]{
    title,
    lesson[]->{
      ${baseFieldsNoContent},
      ${lessonFields}
    }
  }
}`;

export const lessonQuery = groq`*[_type == "lesson" && slug.current == $lessonSlug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${lessonFields}
}`;

// Author

export const authorsQuery = groq`*[_type == "author" && defined(slug.current)] | order(title) [0] {
  ${baseFieldsNoContent}
}`;

export const moreAuthorQuery = groq`*[_type == "author" && _id != $skip && defined(slug.current)] | order(title) [$offset...$limit] {
  ${baseFieldsNoContent}
}`;

export const authorQuery = groq`*[_type == "author" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${userFields}
}`;

export const authorQueryWithRelated = groq`*[_type == "author" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${userFields},
  ${userRelated}
}`;

// Guest

export const guestsQuery = groq`*[_type == "guest" && defined(slug.current)] | order(title) [0] {
  ${baseFieldsNoContent}
}`;

export const moreGuestQuery = groq`*[_type == "guest" && _id != $skip && defined(slug.current)] | order(title) [$offset...$limit] {
  ${baseFieldsNoContent}
}`;

export const guestQuery = groq`*[_type == "guest" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${userFields}
}`;

export const guestQueryWithRelated = groq`*[_type == "guest" && slug.current == $slug] [0] {
  ${baseFieldsNoContent},
  ${contentFields},
  ${userFields},
  ${userRelated}
}`;
