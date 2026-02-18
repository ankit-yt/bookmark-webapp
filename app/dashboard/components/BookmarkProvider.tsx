"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { supabase } from "@/lib/supabase-browser"
import type { User } from "@supabase/supabase-js"
import { Bookmark } from "@/lib/types/bookmark"


interface BookmarkContextType {
  bookmarks: Bookmark[]
  loading: boolean
  addBookmark: (title: string, url: string) => Promise<void>
  deleteBookmark: (id: string) => Promise<void>
}


const BookmarkContext = createContext<BookmarkContextType | null>(null)

export function useBookmarks(): BookmarkContextType {
  const context = useContext(BookmarkContext)

  if (!context) {
    throw new Error("useBookmarks must be used within BookmarkProvider")
  }

  return context
}


interface BookmarkProviderProps {
  children: ReactNode
}

export default function BookmarkProvider({
  children,
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    getUser()
  }, [])


  const fetchBookmarks = async (userId: string): Promise<void> => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookmarks(data as Bookmark[])
    }

    setLoading(false)
  }


  const addBookmark = async (
    title: string,
    url: string
  ): Promise<void> => {
    if (!user) return

    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`

    // Optimistic Update
    const temp: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url: formattedUrl,
      user_id: user.id,
    }

    setBookmarks((prev) => [temp, ...prev])

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url: formattedUrl,
      user_id: user.id,
    })

    if (!error) {
      fetchBookmarks(user.id)
    }
  }


  const deleteBookmark = async (id: string): Promise<void> => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))

    await supabase.from("bookmarks").delete().eq("id", id)
  }

useEffect(() => {
  if (!user) return

  const loadBookmarks = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }

    setLoading(false)
  }

  loadBookmarks()

  const channel = supabase
    .channel("bookmarks-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
        filter: `user_id=eq.${user.id}`,
      },
      () => {
        loadBookmarks()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [user])


  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        loading,
        addBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}
