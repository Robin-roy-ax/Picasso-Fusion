'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { locations, mainDocuments } from './src/sanity/lib/presentation/resolve'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        structureTool(),
        // Presentation tool for visual editing with live preview
        presentationTool({
            resolve: {
                locations,
                mainDocuments,
            },
            previewUrl: {
                origin: process.env.NEXT_PUBLIC_PREVIEW_URL || 'http://localhost:3000',
                draftMode: {
                    enable: '/api/draft-mode/enable',
                    disable: '/api/draft-mode/disable',
                },
            },
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
