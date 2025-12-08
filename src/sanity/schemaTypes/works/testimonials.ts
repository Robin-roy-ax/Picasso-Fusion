import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    icon: CommentIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title/Role',
        }),
        defineField({
            name: 'quote',
            type: 'text',
            title: 'Quote',
        }),
        defineField({
            name: 'image',
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
    ]
})
