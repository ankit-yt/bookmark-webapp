import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import DashboardLayout from "./DashboardLayout"

export default async function Dashboard() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect("/")

  return <DashboardLayout user={session.user} />
}
