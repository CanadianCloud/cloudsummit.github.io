import { s as supabase } from '../../chunks/supabase_DGuu650d.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const company = formData.get("company");
  const website = formData.get("website");
  const justification = formData.get("justification");
  console.log({ company, website, justification });
  const { data, error } = await supabase.from("nominations").insert({
    company,
    website,
    justification
  });
  console.log("SUPABASE RESULT:", { data, error });
  if (error) {
    return redirect("/nomination?success=false");
  }
  return redirect("/nomination?succes=true");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
