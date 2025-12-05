'use client'

import dynamic from 'next/dynamic'
import { DisableDraftMode } from './DisableDraftMode'

const VisualEditing = dynamic(() =>
    import('./VisualEditing').then((mod) => mod.VisualEditing)
)

export function DraftModeProvider() {
    return (
        <>
            <DisableDraftMode />
            <VisualEditing />
        </>
    )
}
