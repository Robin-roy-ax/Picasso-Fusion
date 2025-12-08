import { BoltIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const workType = defineType({
    name: 'work',
    title: 'Work',
    type: 'document',
    icon: BoltIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'client',
            type: 'string',
        }),
        defineField({
            name: 'timeline',
            type: 'string',
        }),
        defineField({
            name: 'services',
            type: 'reference',
            to: { type: 'service' },
        }),
        defineField({
            name: 'tags',
            type: 'array',
            of: [{type: 'string'}],
            title: 'Tags'
        }),
        defineField({
            name: 'route',
            type: 'string',
            title: 'Route/Link (e.g. /projects/auluxe)'
        }),
        defineField({
            name: 'website',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                })
            ]
        }),
        defineField({
            name: 'video',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        }),
        defineField({
            name: 'testimonial',
            type: 'reference',
            to: { type: 'testimonial' },
        }),
        defineField({
            name: 'strategies',
            type: 'array',
            of: [
                defineField({
                    name: 'strategy',
                    type: 'object',
                    fields: [
                        { name: 'tag', type: 'string', title: 'Tag' },
                        { name: 'title', type: 'string', title: 'Title' },
                    ]
                })
            ],
        }),
        defineField({
            name: 'body',
            type: 'blockContent',
        }),
    ]
})
