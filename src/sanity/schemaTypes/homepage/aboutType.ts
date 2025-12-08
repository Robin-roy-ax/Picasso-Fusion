import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export const aboutType = defineType({
    name: 'about',
    title: 'About Section',
    type: 'document',
    icon: InfoOutlineIcon,
    fields: [
        defineField({
            name: 'mainText',
            type: 'object',
            fields: [
                { name: 'part1', type: 'string', title: 'Part 1 (Normal)' },
                { name: 'part2', type: 'string', title: 'Part 2 (Italic/Gradient)' },
                { name: 'part3', type: 'string', title: 'Part 3 (Normal)' },
                { name: 'part4', type: 'string', title: 'Part 4 (Italic/Gradient)' },
                { name: 'part5', type: 'string', title: 'Part 5 (Normal)' },
                { name: 'part6', type: 'string', title: 'Part 6 (Italic/Gradient)' },
                { name: 'part7', type: 'string', title: 'Part 7 (Normal)' },
            ]
        }),
        defineField({
            name: 'buttonText',
            type: 'string',
            title: 'Button Text'
        })
    ]
})
