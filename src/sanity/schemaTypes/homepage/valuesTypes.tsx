import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const homepageValueType = defineType({
    name: 'homepageValue',
    title: 'Homepage Values',
    type: 'document',
    icon: LinkIcon,
    fields: [
        defineField({
            name: 'tag',
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
            name: 'color',
            type: 'color',
        }),
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
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
        defineField({
            name: 'isLink',
            type: 'boolean',
        }),
    ]
})
