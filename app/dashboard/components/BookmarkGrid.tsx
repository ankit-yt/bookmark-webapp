"use client"

import { Bookmark } from "@/lib/types/bookmark"
import { useBookmarks } from "./BookmarkProvider"
import EmptyState from "./EmptyState"
import { JSX } from "react"
import BookmarkCard from "./BookmarkCard"


export default function BookmarkGrid(): JSX.Element {
  const { bookmarks, loading } = useBookmarks() as {
    bookmarks: Bookmark[]
    loading: boolean
  }


  if (loading) {
    return <div className="text-gray-400">Loading...</div>
  }


  if (bookmarks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {bookmarks.map((bookmark: Bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}
