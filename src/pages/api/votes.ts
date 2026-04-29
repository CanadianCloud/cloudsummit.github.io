import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const company = formData.get("company");

  const { error } = await supabase.from("votes").insert({
    company,
  });

  if (error) {
    return redirect("/nomination?success=false");
  }

  return redirect("/nomination?success=true");
};
