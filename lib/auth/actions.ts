"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "./schema";
import { redirect } from "next/navigation";

export async function loginAction(values: unknown) {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid credentials" };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function registerAction(values: unknown) {
  const parsed = registerSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
