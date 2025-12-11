import { defineType, defineField } from 'sanity'

export const propertySchema = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'area',
      title: 'Area (sq ft)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Mansion', value: 'mansion' },
          { title: 'Penthouse', value: 'penthouse' },
          { title: 'Villa', value: 'villa' },
          { title: 'Estate', value: 'estate' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'location',
    },
  },
})
