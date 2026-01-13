"use client"

import { useState } from "react"
import Image from "next/image"
import { Globe } from "lucide-react"

interface WebsiteImageProps {
  src: string
  alt: string
}

export function WebsiteImage({ src, alt }: WebsiteImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Globe className="h-7 w-7 text-primary" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="h-12 w-12 object-contain"
      onError={() => setImageError(true)}
      unoptimized
    />
  )
}

