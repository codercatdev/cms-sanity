import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;

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

// Post

export const blogQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  ${baseFieldsNoContent},
  author[]->{
    ...,
    "title": coalesce(title, "Anonymous"),
  }
}`;

export const morePostQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
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

export const morePodcastQuery = groq`*[_type == "podcast" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${baseFieldsNoContent},
  author[]->{
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

export const moreCourseQuery = groq`*[_type == "course" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
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
