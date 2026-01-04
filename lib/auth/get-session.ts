import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
