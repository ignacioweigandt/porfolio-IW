'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useGSAP(
  callback: (context: gsap.Context) => void,
  dependencies: any[] = []
) {
  const contextRef = useRef<gsap.Context>()

  useEffect(() => {
    // Create GSAP context
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!)
    })

    // Refresh ScrollTrigger after context is created
    ScrollTrigger.refresh()

    // Cleanup function
    return () => {
      contextRef.current?.revert()
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      contextRef.current?.revert()
    }
  }, [])

  return contextRef.current
}