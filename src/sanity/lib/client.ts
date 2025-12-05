import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    perspective: 'published',
    stega: {
        enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
        studioUrl: '/studio',
    },
})

// Client with authentication for preview/draft mode
export const previewClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_VIEWER_TOKEN,
    perspective: 'previewDrafts',
    stega: {
        enabled: true,
        studioUrl: '/studio',
    },
})

