"use client"

import { ReactNode, useEffect } from 'react'
import { useLiveMode } from '@sanity/react-loader'
import { client, previewClient } from '@/sanity/lib/loader'

export function SanityProvider({ 
  children, 
  isPreview = false 
}: { 
  children: ReactNode
  isPreview?: boolean 
}) {
  useLiveMode({ client: isPreview ? previewClient : client })
  
  return <>{children}</>
}
