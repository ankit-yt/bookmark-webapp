"use client"

import { useMemo, useState, useEffect, useCallback } from "react"
import { useBookmarks } from "./BookmarkProvider"
import Image from "next/image"

interface AddBookmarkModalProps {
  onClose: () => void
}

const normalizeUrl = (input: string) => {
  if (!input) return ""
  if (input.startsWith("http")) return input
  return `https://${input}`
}


const isValidUrl = (input: string) => {
  try {
    new URL(normalizeUrl(input))
    return true
  } catch {
    return false
  }
}

const getDomain = (input: string) => {
  try {
    return new URL(normalizeUrl(input)).hostname
  } catch {
    return null
  }
}

export default function AddBookmarkModal({
  onClose,
}: AddBookmarkModalProps) {
  const [faviconError, setFaviconError] = useState(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  const { addBookmark } = useBookmarks() as {
    addBookmark: (title: string, url: string) => Promise<void>
  }

 const domain = useMemo<string | null>(() => getDomain(url), [url])

  const suggestedUrl = useMemo<string>(() => {
    if (!url) return ""
    if (url.startsWith("http")) return ""
    if (!url.includes(".")) return `https://${url}.com`
    return `https://${url}`
  }, [url])

   

    const handleSubmit = useCallback(async (): Promise<void> => {
    if (!title || !url) return

    const finalUrl = normalizeUrl(url)

    await addBookmark(title, finalUrl)
    onClose()
  }, [title, url, addBookmark, onClose])

   useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose()
      if (e.key === "Enter" && isValidUrl(url) && title) {
        handleSubmit()
      }
    }

    

   window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [url, title, handleSubmit, onClose])
  

 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/50 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-sm 
                      bg-white rounded-3xl 
                      shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                      border border-neutral-200
                      px-6 py-5">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-neutral-900">
            Add Bookmark
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Save a website for quick access
          </p>
        </div>

        <div className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-neutral-800 mb-1 block">
              Title
            </label>
            <input
              className="w-full px-3 py-2 text-sm rounded-xl 
                         border border-neutral-300 bg-white
                         text-neutral-900
                         placeholder-neutral-500
                         focus:ring-2 focus:ring-black/20
                         focus:border-black
                         outline-none transition"
              placeholder="Bookmark title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm font-medium text-neutral-800 mb-1 block">
              URL
            </label>

            <div className="flex items-center gap-3 
                            px-3 py-2 rounded-xl 
                            border border-neutral-300 
                            bg-white
                            focus-within:ring-2 
                            focus-within:ring-black/20
                            focus-within:border-black
                            transition">

              {/* Favicon */}
              <div className="w-6 h-6 flex items-center justify-center">
  <Image
    src={
      domain && !faviconError
        ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
        : "https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/globe-alt.svg"
    }
    width={32}
    height={32}
    alt="favicon"

    className="w-5 h-5 opacity-90"
    onError={() => setFaviconError(true)}
  />
</div>


              <input
                className="flex-1 text-sm bg-transparent 
                           text-neutral-900
                           placeholder-neutral-500
                           outline-none"
                placeholder="example.com"
                value={url}
                onChange={(e) => {
  setUrl(e.target.value)
  setFaviconError(false)
}}
              />
            </div>

            {/* Auto Suggestion */}
            {suggestedUrl && (
              <button
                type="button"
                onClick={() => setUrl(suggestedUrl)}
                className="mt-2 text-sm text-neutral-700 
                           hover:text-neutral-900 transition"
              >
                Use {suggestedUrl}
              </button>
            )}

            {/* Validation */}
            {url && !isValidUrl(url) && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid URL
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">

          <button
            onClick={onClose}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition"
          >
            Cancel
          </button>

          <button
  onClick={async () => {
    if (!isValidUrl(url)) return
    setLoading(true)
    await handleSubmit()
    setLoading(false)
  }}
  disabled={!title || !isValidUrl(url) || loading}
  className="px-5 py-2 rounded-full 
             bg-black text-white 
             text-sm font-medium
             disabled:opacity-40
             hover:bg-neutral-900 
             active:scale-95 transition-all
             flex items-center justify-center gap-2"
>
  {loading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}
  {loading ? "Saving..." : "Add"}
</button>

        </div>
      </div>
    </div>
  )
}
