import { defineLocations, defineDocuments, type PresentationPluginOptions } from 'sanity/presentation'

// Map document types to their corresponding frontend routes
export const locations = {
    testimonial: defineLocations({
        select: {
            name: 'name',
            title: 'title',
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: doc?.name || 'Testimonial',
                    href: '/testimonials',
                },
                {
                    title: 'Home',
                    href: '/',
                },
            ],
        }),
    }),
}

// Define which documents should open when navigating to specific URLs
export const mainDocuments = defineDocuments([
    {
        route: '/testimonials',
        filter: `_type == "testimonial"`,
    },
])
