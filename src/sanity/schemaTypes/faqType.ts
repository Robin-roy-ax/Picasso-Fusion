import { HelpCircleIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const faqType = defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    icon: HelpCircleIcon,
    fields: [
        defineField({
            name: 'question',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'question'
            }
        }),
        defineField({
            name: 'answer',
            type: 'string',
        }),
    ]
})
