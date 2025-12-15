import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const footerType = defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    icon: LinkIcon,
    fields: [
        defineField({
            name: 'ctaSection',
            type: 'object',
            title: 'Pre-Footer CTA Section',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading (e.g. Your Next Big Idea)' },
                { name: 'subHeading', type: 'string', title: 'Sub Heading (e.g. Starts Here)' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'buttonText', type: 'string', title: 'Button Text' }
            ]
        }),
        defineField({
            name: 'newsletterHeading',
            type: 'string',
            title: 'Newsletter Heading',
            initialValue: 'Subscribe to our newsletter'
        }),
        defineField({
            name: 'socialLinks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Platform Name' },
                        { name: 'href', type: 'url', title: 'URL' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'menuLinks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'href', type: 'string', title: 'Href' },
                        { name: 'id', type: 'string', title: 'ID' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'copyright',
            type: 'string',
            title: 'Copyright Text',
            initialValue: '© Picasso Fusion 2025. All rights reserved'
        }),
        defineField({
            name: 'tagline',
            type: 'string',
            title: 'Botom Tagline',
            initialValue: 'Your Vision, Our Design.'
        })
    ]
})
