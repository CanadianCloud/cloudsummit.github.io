import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const company = formData.get("company");
  const website = formData.get("website");
  const justification = formData.get("justification");

  console.log({ company, website, justification });

  const { data, error } = await supabase.from("nominations").insert({
    company,
    website,
    justification,
  });

  console.log("SUPABASE RESULT:", { data, error });

  if (error) {
    return redirect("/nomination?success=false");
  }

  return redirect("/nomination?succes=true");
};
