import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    icon: ColorWheelIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
})
