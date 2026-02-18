import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function GET(request: Request) {
  console.log("OAuth callback hit")

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  console.log(code)
  if (!code) {
    return NextResponse.redirect(`${origin}/`)
  }
  
  if (code) {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  

  return NextResponse.redirect(`${origin}/dashboard`)
}
