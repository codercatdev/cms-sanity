import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";

import contentType from "../partials/content";

export default defineType({
  ...contentType,
  name: "post",
  title: "Post",
  icon: DocumentTextIcon,
  type: "document",
});
