import { draftMode } from 'next/headers'
import { client, previewClient } from './client'

/**
 * Get the appropriate Sanity client based on draft mode state
 * - In draft mode: returns previewClient with stega encoding and draft perspective
 * - In published mode: returns standard client
 */
export async function getClient() {
    const { isEnabled } = await draftMode()
    return isEnabled ? previewClient : client
}

/**
 * Get query options for Sanity client based on draft mode
 */
export async function getQueryOptions() {
    const { isEnabled } = await draftMode()

    return isEnabled
        ? {
            perspective: 'previewDrafts' as const,
            useCdn: false,
            token: process.env.SANITY_VIEWER_TOKEN,
            stega: true,
        }
        : {
            perspective: 'published' as const,
            useCdn: true,
        }
}
