import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const processSectionType = defineType({
    name: 'processSection',
    title: 'Process Section',
    type: 'document',
    icon: PlayIcon,
    fields: [
        defineField({
            name: 'heading',
            type: 'string',
            title: 'Heading (e.g. Smooth)',
            initialValue: 'Smooth'
        }),
        defineField({
            name: 'headingHighlight',
            type: 'string',
            title: 'Heading Highlight (e.g. Process,)',
            initialValue: 'Process,'
        }),
        defineField({
            name: 'subHeading',
            type: 'string',
            title: 'Sub Heading (e.g. Stunning)',
            initialValue: 'Stunning'
        }),
        defineField({
            name: 'subHeadingHighlight',
            type: 'string',
            title: 'Sub Heading Highlight (e.g. Outcomes)',
            initialValue: 'Outcomes'
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            initialValue: 'At Picasso Fusion, our refined process ensures efficiency, clarity, and exceptional results. From concept to final delivery, we guide you with transparency and precision, turning your vision into impactful, polished designs.'
        })
    ],
    preview: {
        select: {
            title: 'heading'
        },
        prepare({ title }) {
            return {
                title: title || 'Process Section Config'
            }
        }
    }
})
