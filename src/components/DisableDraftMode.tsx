'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
    const environment = useDraftModeEnvironment()

    // Only show exit button when in Draft Mode, but not when inside an iframe (Presentation Tool)
    if (environment !== 'live' && environment !== 'unknown') {
        return null
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
        }}>
            <a
                href="/api/draft-mode/disable"
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#1f2937',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#374151'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1f2937'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                Exit Preview Mode
            </a>
        </div>
    )
}
