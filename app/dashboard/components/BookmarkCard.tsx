"use client"

import Image from "next/image"
import { useBookmarks } from "./BookmarkProvider"
import React, { useState } from "react"


interface Bookmark {
  id: string
  title: string
  url: string
}

interface BookmarkCardProps {
  bookmark: Bookmark
}


export default function BookmarkCard({
  bookmark,
}: BookmarkCardProps) {
  const [imgError, setImgError] = useState(false)
  const { deleteBookmark } = useBookmarks() as {
    deleteBookmark: (id: string) => void
  }

   const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }
  
  const domain = getDomain(bookmark.url)

  const [imgSrc, setImgSrc] = useState<string>(
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
)
 


  


  const openLink = (): void => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer")
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation() // prevent triggering openLink
    deleteBookmark(bookmark.id)
  }


  return (
    <div
      onClick={openLink}
      className="relative group cursor-pointer w-full max-w-md"
    >
      <div
        className="absolute inset-0 rounded-3xl 
                  bg-linear-to-br from-indigo-400 to-purple-400
                  blur-2xl opacity-20 
                  group-hover:opacity-30 
                  transition duration-500"
      />

      <div
        className="relative bg-white rounded-3xl 
                  px-5 py-4
                  shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                  border border-neutral-200"
      >
        <div className="flex items-center gap-4">

          <div
            className="w-10 h-10 rounded-xl 
                      bg-neutral-100 
                      flex items-center justify-center 
                      overflow-hidden"
          >
           <Image
  src={imgSrc}
  alt="favicon"
  width={38}
  height={32}
  className="object-contain"
  onError={() => setImgSrc("https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/globe-alt.svg")}
/>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-neutral-900 truncate">
              {bookmark.title}
            </h3>
            <p className="text-xs text-neutral-500 truncate mt-1">
              {bookmark.url}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">

          <button
            className="px-5 py-2 rounded-full 
                       bg-black text-white 
                       text-xs font-medium
                       hover:bg-neutral-900
                       active:scale-95
                       transition"
          >
            Visit
          </button>

          <button
            onClick={handleDelete}
            className="w-8 h-8 rounded-full 
                       border border-neutral-200 
                       flex items-center justify-center
                       text-neutral-500
                       hover:bg-neutral-100
                       transition"
          >
            🗑
          </button>

        </div>
      </div>
    </div>
  )
}
