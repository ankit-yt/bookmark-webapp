"use client"
import React, { useState } from 'react'
import Image from "next/image"

import { supabase } from "@/lib/supabase-browser"
function Login() {
    const [loading, setLoading] = useState(false)
    
  const handleLogin = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
    redirectTo: `${location.origin}/auth/callback`,
  },
    })
    setLoading(false)
  }
  return (
    <div className="flex md:w-full  max-w-4xl bg-white border border-neutral-200 rounded-3xl shadow-xl overflow-hidden">

    <div className="w-1/2 relative hidden md:block">
      <Image
        src="/login.jpg"
        alt="Login"
        fill
        className="object-cover"
        priority
      />
    </div>

    <div className="w-full  md:w-1/2 p-12 flex flex-col items-center justify-center space-y-8">

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Smart Bookmark
        </h1>
        <p className="text-sm text-neutral-500">
          Organize your links. Privately. Instantly.
        </p>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full rounded-full bg-neutral-900 text-white py-3 text-sm font-medium transition hover:bg-neutral-800 disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Continue with Google"}
      </button>

      <p className="text-xs text-neutral-400">
        Secure login powered by Google OAuth
      </p>

    </div>
  </div>

  )
}

export default Login
