import {defineField, defineType} from 'sanity'

export const termsPageType = defineType({
  name: 'termsPage',
  title: 'Terms & Conditions Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Page Header',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          initialValue: 'Terms & Conditions',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated Date',
          type: 'date',
        }),
      ],
    }),
    
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          title: 'Introduction Content',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),
    
    defineField({
      name: 'sections',
      title: 'Terms Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'termsSection',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'subsections',
              title: 'Subsections',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'subsection',
                  fields: [
                    defineField({
                      name: 'subheading',
                      title: 'Subsection Heading',
                      type: 'string',
                    }),
                    defineField({
                      name: 'content',
                      title: 'Subsection Content',
                      type: 'array',
                      of: [{type: 'block'}],
                    }),
                  ],
                }
              ],
            }),
          ],
          preview: {
            select: {
              title: 'heading',
            },
            prepare(selection) {
              return {
                title: selection.title,
              }
            },
          },
        }
      ],
    }),
    
    defineField({
      name: 'admissionTerms',
      title: 'Admission Terms',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Admission Terms',
        }),
        defineField({
          name: 'ageRequirements',
          title: 'Age Requirements',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'capacity',
          title: 'Capacity Information',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'applicationProcess',
          title: 'Application Process',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),
    
    defineField({
      name: 'feesAndPayments',
      title: 'Fees & Payments',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Fees & Payments',
        }),
        defineField({
          name: 'feeStructure',
          title: 'Fee Structure',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'fundedHours',
          title: 'Funded Hours Information',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'paymentTerms',
          title: 'Payment Terms',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),
    
    defineField({
      name: 'policies',
      title: 'Policies & Procedures',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Policies & Procedures',
        }),
        defineField({
          name: 'safeguarding',
          title: 'Safeguarding Policy',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'healthSafety',
          title: 'Health & Safety',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'behaviour',
          title: 'Behaviour Policy',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'attendance',
          title: 'Attendance Policy',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),
    
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Contact Us',
        }),
        defineField({
          name: 'content',
          title: 'Contact Content',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({
          name: 'email',
          title: 'Contact Email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Contact Phone',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      lastUpdated: 'hero.lastUpdated',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Terms & Conditions',
        subtitle: selection.lastUpdated ? `Last updated: ${selection.lastUpdated}` : 'Terms & Conditions Page',
      }
    },
  },
})