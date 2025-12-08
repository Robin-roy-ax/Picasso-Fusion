import { defineField, defineType } from 'sanity'
import { CreditCardIcon } from '@sanity/icons'

export const pricingType = defineType({
    name: 'pricing',
    title: 'Pricing Section',
    type: 'document',
    icon: CreditCardIcon,
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
            title: 'Heading',
            initialValue: 'Flexible Plans Tailored to Your Needs'
        }),
        defineField({
            name: 'subtitle',
            type: 'text',
            title: 'Subtitle',
            initialValue: 'Find the plan that fits your needs best with no surprises and No hidden fees.'
        }),
        defineField({
            name: 'plans',
            type: 'array',
            title: 'Pricing Plans',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string', title: 'Plan Name' },
                    { name: 'price', type: 'number', title: 'Price (in cents/lowest unit)' },
                    { name: 'period', type: 'string', title: 'Period (e.g. /mo)' },
                    { name: 'description', type: 'text', title: 'Description/Target Audience' },
                    {
                        name: 'features',
                        type: 'array',
                        of: [{ type: 'string' }],
                        title: 'Features List'
                    },
                    { name: 'credits', type: 'number', title: 'Credits' },
                    { name: 'addOns', type: 'number', title: 'Add-ons' },
                    { name: 'buttonLabel', type: 'string', title: 'Primary Button Label' },
                    { name: 'secondaryButton', type: 'string', title: 'Secondary Button Label' },
                    { name: 'highlight', type: 'boolean', title: 'Highlight (Popular)' },
                    { name: 'badge', type: 'string', title: 'Badge Text' },
                    {
                        name: 'subFeatures',
                        type: 'array',
                        title: 'Detailed Features (Accordion)',
                        of: [{
                            type: 'object',
                            name: 'category',
                            title: 'Category',
                            fields: [
                                { name: 'name', type: 'string', title: 'Category Name' },
                                {
                                    name: 'features',
                                    type: 'array',
                                    title: 'Features',
                                    of: [{
                                        type: 'object',
                                        fields: [
                                            { name: 'label', type: 'string', title: 'Feature Label' },
                                            { name: 'value', type: 'string', title: 'Value (e.g. true/Included)' }
                                        ],
                                        preview: {
                                            select: {
                                                title: 'label',
                                                subtitle: 'value'
                                            }
                                        }
                                    }]
                                }
                            ],
                            preview: {
                                select: {
                                    title: 'name'
                                }
                            }
                        }]
                    }
                ]
            }]
        })
    ],
    preview: {
        select: {
            title: 'heading'
        },
        prepare({ title }) {
            return {
                title: title || 'Pricing Section'
            }
        }
    }
})
