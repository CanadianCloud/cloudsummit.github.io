import { s as supabase } from '../../chunks/supabase_DGuu650d.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const company = formData.get("company");
  const { error } = await supabase.from("votes").insert({
    company
  });
  if (error) {
    return redirect("/nomination?success=false");
  }
  return redirect("/nomination?success=true");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
