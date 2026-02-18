"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase-browser"
import type { User } from "@supabase/supabase-js"


interface TopBarProps {
  user: User | null
  onAdd: () => void
}

export default function TopBar({ user, onAdd }: TopBarProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)


  const logout = async (): Promise<void> => {
    setLoading(true)

    await supabase.auth.signOut()

    router.push("/")
    router.refresh()
  }


  const avatarUrl: string =
    user?.user_metadata?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.email ?? "User"
    )}`


  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Smart Bookmark
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={onAdd}
            className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            + Add
          </button>

          <div className="flex items-center gap-3">

            <div className="relative w-9 h-9">
              <Image
                src={avatarUrl}
                alt="User avatar"
                fill
                sizes="36px"
                className="rounded-full border border-neutral-200 object-cover"
              />
            </div>

            <button
              onClick={logout}
              disabled={loading}
              className="text-sm text-neutral-500 hover:text-black transition disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}
