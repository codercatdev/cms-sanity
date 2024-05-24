import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import baseType from "../partials/base";


export default defineType({
  name: "guest",
  title: "Guest",
  icon: UserIcon,
  type: "document",
  fields: [...baseType.fields],
});
