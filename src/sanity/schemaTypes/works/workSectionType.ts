import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const workSectionType = defineType({
    name: 'workSection',
    title: 'Work Section (Dribbble)',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
            title: 'Heading',
            initialValue: 'Our Creative Showcase'
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            initialValue: 'See how we transform imagination into visuals through design and creativity.'
        }),
        defineField({
            name: 'ctaText',
            type: 'string',
            title: 'CTA Button Text',
            initialValue: 'Explore Visuals'
        }),
        defineField({
            name: 'ctaUrl',
            type: 'url',
            title: 'CTA Button URL',
            initialValue: 'https://dribbble.com/PicassoFusion'
        })
    ],
    preview: {
        select: {
            title: 'heading'
        },
        prepare({ title }) {
            return {
                title: title || 'Work Section'
            }
        }
    }
})
