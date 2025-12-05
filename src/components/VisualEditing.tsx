'use client'

import { enableVisualEditing, type DisableVisualEditing } from '@sanity/visual-editing'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function VisualEditing() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Enable visual editing overlays
        const disable = enableVisualEditing({
            history: {
                subscribe: (navigate) => {
                    return () => {}
                },
                update: (update) => {
                    switch (update.type) {
                        case 'push':
                            return router.push(update.url)
                        case 'replace':
                            return router.replace(update.url)
                        case 'pop':
                            return router.back()
                    }
                },
            },
        })

        return () => {
            disable()
        }
    }, [router])

    return null
}

