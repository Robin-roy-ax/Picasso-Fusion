import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqSectionType = defineType({
    name: 'faqSection',
    title: 'FAQ Section',
    type: 'document',
    icon: HelpCircleIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title (e.g. Your Questions,)',
            initialValue: 'Your Questions,'
        }),
        defineField({
            name: 'titleHighlight',
            type: 'string',
            title: 'Title Highlight (e.g. Simplified)',
            initialValue: 'Simplified'
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            initialValue: 'Explore our FAQ section for clear answers to common questions about how Picasso Fusion works, its features, and how to get the most out of our design platform.'
        })
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({ title }) {
            return {
                title: title || 'FAQ Section Config'
            }
        }
    }
})
