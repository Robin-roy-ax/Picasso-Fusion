import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const aboutPageType = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    icon: UsersIcon,
    fields: [
        defineField({
            name: 'hero',
            type: 'object',
            title: 'Hero Section',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'titleHighlight', type: 'string', title: 'Title Highlight (Italic)' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'heroImage',
                    type: 'image',
                    title: 'Hero Image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alt Text' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'overview',
            type: 'object',
            title: 'Overview Section',
            fields: [
                { name: 'text', type: 'text', title: 'Overview Text' }
            ]
        }),
        defineField({
            name: 'sections',
            type: 'array',
            title: 'Content Sections (Mission, Approach, etc.)',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'description', type: 'text', title: 'Description' }
                ]
            }]
        }),
        defineField({
            name: 'stats',
            type: 'array',
            title: 'Statistics',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', type: 'number', title: 'Value' },
                    { name: 'suffix', type: 'string', title: 'Suffix (e.g. +, %)' },
                    { name: 'label', type: 'string', title: 'Label' }
                ]
            }]
        }),
        defineField({
            name: 'team',
            type: 'object',
            title: 'Team Section',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'titleHighlight', type: 'string', title: 'Title Highlight' },
                { name: 'description', type: 'text', title: 'Description' },
                {
                    name: 'members',
                    type: 'array',
                    title: 'Team Members',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', type: 'string', title: 'Name' },
                            { name: 'role', type: 'string', title: 'Role' },
                            { name: 'description', type: 'text', title: 'Description' },
                            {
                                name: 'image',
                                type: 'image',
                                title: 'Photo',
                                options: { hotspot: true },
                                fields: [
                                    { name: 'alt', type: 'string', title: 'Alt Text' }
                                ]
                            }
                        ]
                    }]
                }
            ]
        })
    ]
})
