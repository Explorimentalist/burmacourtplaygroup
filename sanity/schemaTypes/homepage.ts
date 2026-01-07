import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          initialValue: 'Learning through play',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get in touch',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '#contact',
        }),
        defineField({
          name: 'heroImages',
          title: 'Hero Photo Collage',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }
              ]
            }
          ],
          validation: Rule => Rule.max(6),
        }),
      ],
    }),
    
    // Key Info Section
    defineField({
      name: 'keyInfo',
      title: 'Key Info Section',
      type: 'object',
      fields: [
        defineField({
          name: 'cards',
          title: 'Info Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'infoCard',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Card Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Card Description',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'icon',
                  title: 'Card Icon',
                  type: 'image',
                  options: {hotspot: true},
                }),
              ],
            }
          ],
          validation: Rule => Rule.max(4),
        }),
      ],
    }),
    
    // Testimonials Section (Using Google Reviews API)
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section Settings',
      type: 'object',
      description: 'Testimonials are automatically fetched from Google Reviews API',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'what parents say',
        }),
        defineField({
          name: 'showReviewCount',
          title: 'Number of Reviews to Display',
          type: 'number',
          initialValue: 3,
          validation: Rule => Rule.min(1).max(10),
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'See All Reviews',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          description: 'Link to your Google Business page or full reviews page',
        }),
      ],
    }),
    
    // Find Us Section
    defineField({
      name: 'findUs',
      title: 'Find Us Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'find us',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          initialValue: 'Burma Court, London E5 0RJ',
        }),
        defineField({
          name: 'mapImage',
          title: 'Map Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'mapIllustration',
          title: 'Map Illustration',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.tagline',
    },
    prepare(selection) {
      return {
        title: 'Homepage Content',
        subtitle: selection.title || 'Learning through play',
      }
    },
  },
})