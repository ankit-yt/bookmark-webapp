"use client"

import { JSX, useState } from "react"
import type { User } from "@supabase/supabase-js"

import TopBar from "./components/TopBar"
import BookmarkGrid from "./components/BookmarkGrid"
import AddBookmarkModal from "./components/AddBookmarkModal"
import BookmarkProvider from "./components/BookmarkProvider"


interface DashboardLayoutProps {
  user: User | null
}


export default function DashboardLayout({
  user,
}: DashboardLayoutProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <BookmarkProvider>
      <div className="min-h-screen  bg-neutral-50">

        <TopBar user={user} onAdd={() => setOpen(true)} />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <BookmarkGrid />
        </div>

        {open && (
          <AddBookmarkModal onClose={() => setOpen(false)} />
        )}

      </div>
    </BookmarkProvider>
  )
}
