import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const heroType = defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'subtitle',
            type: 'string',
        }),
        defineField({
            name: 'mainHeading',
            type: 'object',
            fields: [
                { name: 'part1', type: 'string', title: 'Part 1 (Normal)' },
                { name: 'part1Italic', type: 'string', title: 'Part 1 (Italic)' },
                { name: 'part2', type: 'string', title: 'Part 2 (Normal)' },
                { name: 'part2Italic', type: 'string', title: 'Part 2 (Italic)' }
            ]
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'buttons',
            type: 'object',
            fields: [
                { name: 'primary', type: 'string', title: 'Primary Button Text' },
                { name: 'secondary', type: 'string', title: 'Secondary Button Text' }
            ]
        }),
        defineField({
            name: 'avatars',
            type: 'array',
            of: [{
                type: 'image',
                fields: [
                    {
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text',
                    }
                ]
            }],
            title: 'Client Avatars'
        }),
        defineField({
            name: 'clientCount',
            type: 'object',
            fields: [
                { name: 'number', type: 'string', title: 'Count (e.g. 1000+)' },
                { name: 'description', type: 'string', title: 'Description' }
            ]
        }),
        defineField({
            name: 'scrollText',
            type: 'string',
            title: 'Scroll Down Text'
        })
    ]
})
