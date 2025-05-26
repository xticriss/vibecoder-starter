"use client"

import { useEffect, useRef } from "react"
import feather from "feather-icons"

interface FeatherIconProps {
  name: string
  size?: number
  className?: string
  strokeWidth?: number
}

export function FeatherIcon({ 
  name, 
  size = 16, 
  className = "",
  strokeWidth = 2 
}: FeatherIconProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (iconRef.current && feather.icons[name]) {
      iconRef.current.innerHTML = feather.icons[name].toSvg({
        width: size,
        height: size,
        class: className,
        "stroke-width": strokeWidth
      })
    }
  }, [name, size, className, strokeWidth])

  if (!feather.icons[name]) {
    return null
  }

  return <div ref={iconRef} className="inline-flex items-center justify-center" />
}