import { defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const navigationType = defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: MenuIcon,
    fields: [
        defineField({
            name: 'items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'href', type: 'string', title: 'Href' },
                        { name: 'id', type: 'string', title: 'ID (for scrolling)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'logo',
            type: 'object',
            fields: [
                { name: 'text', type: 'string', title: 'Logo Text' },
                { name: 'symbol', type: 'string', title: 'Symbol' },
                { name: 'image', type: 'image', title: 'Logo Image' }
            ]
        }),
        defineField({
            name: 'ctaText',
            type: 'string',
            title: 'CTA Button Text'
        })
    ]
})
