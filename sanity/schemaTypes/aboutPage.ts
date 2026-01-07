import {defineField, defineType} from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'About Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          initialValue: 'About Burma Court Playgroup',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Main Description',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        }),
      ],
    }),
    
    defineField({
      name: 'history',
      title: 'Our History',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our History',
        }),
        defineField({
          name: 'content',
          title: 'History Content',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'images',
          title: 'History Images',
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
        }),
      ],
    }),
    
    defineField({
      name: 'team',
      title: 'Our Team',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Meet Our Team',
        }),
        defineField({
          name: 'members',
          title: 'Team Members',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'teamMember',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Role/Position',
                  type: 'string',
                }),
                defineField({
                  name: 'bio',
                  title: 'Biography',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'photo',
                  title: 'Photo',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                    }
                  ]
                }),
                defineField({
                  name: 'qualifications',
                  title: 'Qualifications',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
              ],
            }
          ],
        }),
      ],
    }),
    
    defineField({
      name: 'values',
      title: 'Our Values & Approach',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our Values',
        }),
        defineField({
          name: 'content',
          title: 'Values Content',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'valuesList',
          title: 'Core Values',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'value',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Value Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Value Description',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'icon',
                  title: 'Value Icon',
                  type: 'image',
                  options: {hotspot: true},
                }),
              ],
            }
          ],
        }),
      ],
    }),
    
    defineField({
      name: 'curriculum',
      title: 'Learning & Curriculum',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Learning Through Play',
        }),
        defineField({
          name: 'content',
          title: 'Curriculum Content',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'activities',
          title: 'Key Activities',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'activity',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Activity Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Activity Description',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'ageGroup',
                  title: 'Age Group',
                  type: 'string',
                }),
                defineField({
                  name: 'image',
                  title: 'Activity Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
              ],
            }
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
    prepare(selection) {
      return {
        title: selection.title || 'About Page',
        subtitle: selection.subtitle,
      }
    },
  },
})