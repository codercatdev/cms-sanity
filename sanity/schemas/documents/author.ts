import { FaCat } from "react-icons/fa";
import { defineField, defineType } from "sanity";

import baseType from "../partials/base";


export default defineType({
  name: "author",
  title: "Author",
  icon: FaCat,
  type: "document",
  fields: [...baseType.fields],
});
