import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const processType = defineType({
    name: 'process',
    title: 'Process',
    type: 'document',
    icon: PlayIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
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
