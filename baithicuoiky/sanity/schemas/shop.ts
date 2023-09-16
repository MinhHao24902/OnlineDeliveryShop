import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  fields: [
    {name: "name", type: "string", title: "Shop name", validation: Rule => Rule.required(),},
    {name: "short_description", type: "string", title: "Short description", validation: Rule => Rule.max(200),},
    {name: "image", type: "image", title: "Image of the shop"},
    {name: "lat", type: "number", title: "Latitude of the shop"},
    {name: "long", type: "number", title: "Longitude of the shop"},
    {name: "address", type: "string", title: "Address of the shop", validation: Rule => Rule.required(),},
    {name: "rating", type: "number", title: "Rating (1-5) Stars", validation: Rule => Rule.required() .min(1) .max(5) .error("Please enter a Value between 1 and 5"),},
    {name: "type", title: "Category", validation: Rule => Rule.required(), type: "reference", to: [{ type: "category"}]},
    {name: "dishes", type: "array", title: "Dishes", of: [{ type: "reference", to: [{ type: "dish"}] }]},
  ],
})
